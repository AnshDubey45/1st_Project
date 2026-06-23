# VS-Code Style Note Editor

This is my first ever web development project! It is a fully responsive, IDE-inspired web application styled precisely like the **Visual Studio Code (VS Code)** editor. It combines the utility of a multi-note Markdown diary with a frontend sandbox engine.

## Live Features Built From Scratch

- **Multi-Note Architecture:** Create, rename, delete, and switch between separate notes seamlessly using an explorer-styled sidebar.
- **Persistent Data Tracking:** Built-in integration with browser `localStorage` ensuring your typed documents remain securely saved on disk even after refreshing your page.
- **Interactive Markdown Processing:** Features dynamic client-side text rendering that turns system markup variables (like custom `**bold syntax**` formats) directly into styled elements on the fly.
- **Built-in Emmet Code Acceleration:** Type `!` followed immediately by the `Tab` key inside the workspace panel to trigger an automated inject routine. It instantly prints out an entire standard HTML5 base framework (`htmlBoilerplate`) while automatically refocusing your cursor.

## Integrated Tech Stack

- **HTML5 Elements:** Structured DOM tree containing dynamic title tabs, file listings, and sandbox split panes.
- **CSS3 Layout Engineering:** Powered by `:root` layout variables matching authentic VS Code visual hex color tokens, flexible UI view handling (`calc`), and specialized target classes.
- **Vanilla JavaScript Logic (ES6+):** Utilizes system event architecture tracking hooks (`input`, `keydown`, `click`), runtime structural generation loops, and custom array mutations.

## Project Workspace Map

```text
├── images/          # Visual asset folders and graphics
├── app.js           # Main JS engine managing editor modules, parsing, and storage
├── index.html       # Structural DOM framework layout
└── style.css        # The complete customized dark mode IDE theme pipeline
```

## Running Locally

1. Clone this repository down to your computer terminal folder:
   ```bash
   git clone https://github.com
   ```
2. Navigate directly inside the directory root:
   ```bash
   cd 1st_Project
   ```
3. Open `index.html` inside any desktop internet browser (or run via the VS Code **Live Server** extension) to interact with the environment immediately.

## Future Features I Want to Add
- Support for syntax highlighting (like coloring HTML tags blue and green).
- Full Markdown support for headers (`#`, `##`) and bulleted lists.
- An export button to download notes directly to your computer as `.html` files.
