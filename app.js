// 1. GLOBAL VARIABLES & TEMPLATES (Must be at the very top)
const htmlBoilerplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>`;

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const clear = document.getElementById("clear");
const noteTitleInput = document.getElementById("noteTitle");
const noteListUI = document.getElementById("noteList");
const newNoteBtn = document.getElementById("newNoteBtn");

let notesArray = []; 
let currentNoteId = null; 

// 2. CORE FEATURES & FUNCTIONS
function renderTextToHTML(rawText) {
    let formattedHtml = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formattedHtml;
}

function insertHtmlBoilerplate() {
    if (!editor || currentNoteId === null) return;

    const startPos = editor.selectionStart;
    const endPos = editor.selectionEnd;
    const currentText = editor.value;

    const updatedText = currentText.substring(0, startPos) + 
                        htmlBoilerplate + 
                        currentText.substring(endPos, currentText.length);

    editor.value = updatedText;

    const activeNote = notesArray.find(note => note.id === currentNoteId);
    if (activeNote) {
        activeNote.content = updatedText;
        saveToDisk();
    }

    preview.innerHTML = renderTextToHTML(updatedText);

    editor.focus();
    editor.selectionStart = editor.selectionEnd = startPos + htmlBoilerplate.length;
}

function loadInitialData() {
    const savedData = localStorage.getItem('ansh_multiple_notes');
    if (savedData) {
        notesArray = JSON.parse(savedData);
        renderSidebarList();
        if (notesArray.length > 0) {
            openNote(notesArray[0].id); // FIXED: Added [0] index
        }
    } else {
        createNewNote("Welcome Note", "Type here! Use **bold text** to test.");
    }
}

function createNewNote(title = "Untitled Note", content = "") {
    const newNote = {
        id: Date.now(), 
        title: title,
        content: content
    };
    notesArray.unshift(newNote); 
    saveToDisk();
    renderSidebarList();
    openNote(newNote.id); 
}

function renderSidebarList() {
    noteListUI.innerHTML = ""; 
    notesArray.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.title || "Untitled Note";
        li.addEventListener("click", () => openNote(note.id));
        noteListUI.appendChild(li);
    });
}

function openNote(id) {
    currentNoteId = id;
    const activeNote = notesArray.find(note => note.id === id);
    if (activeNote) {
        noteTitleInput.value = activeNote.title;
        editor.value = activeNote.content;
        preview.innerHTML = renderTextToHTML(activeNote.content);
    }
}

function saveToDisk() {
    localStorage.setItem('ansh_multiple_notes', JSON.stringify(notesArray));
}

// 3. EVENT LISTENERS
editor.addEventListener("input", (event) => {
    const currentText = event.target.value;
    preview.innerHTML = renderTextToHTML(currentText);
    const activeNote = notesArray.find(note => note.id === currentNoteId);
    if (activeNote) {
        activeNote.content = currentText;
        saveToDisk();
    }
});

noteTitleInput.addEventListener("input", (event) => {
    const currentTitle = event.target.value;
    const activeNote = notesArray.find(note => note.id === currentNoteId);
    if (activeNote) {
        activeNote.title = currentTitle;
        saveToDisk();
        renderSidebarList(); 
    }
});

newNoteBtn.addEventListener("click", () => createNewNote());

clear.addEventListener('click', () => {
    if (currentNoteId === null) return;
    notesArray = notesArray.filter(note => note.id !== currentNoteId);
    saveToDisk();
    renderSidebarList();
    if (notesArray.length > 0) {
        openNote(notesArray[0].id); // FIXED: Added [0] index
    } else {
        currentNoteId = null;
        noteTitleInput.value = '';
        editor.value = '';
        preview.innerHTML = '';
    }
});

editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.target.value.substring(0, e.target.selectionStart).endsWith('!')) {
        e.preventDefault(); 
        const start = e.target.selectionStart;
        
        // Remove the '!' mark cleanly
        e.target.value = e.target.value.substring(0, start - 1) + e.target.value.substring(start);
        e.target.selectionStart = e.target.selectionEnd = start - 1;
        
        insertHtmlBoilerplate();
    }
});

// 4. BOOT UP SYSTEM
loadInitialData();
