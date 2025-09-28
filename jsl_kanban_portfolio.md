# JSL Portfolio Piece: Kanban App Deployment & Features Implementation

## Overview

This project is a **Kanban task management application** built with JavaScript, HTML, and CSS, following modular code principles. The app allows users to **create, edit, delete, and organize tasks** across three status columns: To Do, Doing, and Done. The project emphasizes **data persistence** through local storage, **dynamic task fetching** from an API, responsive design, and user-friendly interactions such as modals, dropdowns, and a toggleable sidebar. The goal was to implement a fully functional, deployable Kanban app that matches the provided Figma design and meets the project user stories.

## GitHub Repository

[Project Repository Link](https://github.com/LukhaC2tsh/LUKTSH25485_FTO2506_A_Lukhanyiso-Tshangela_Portfolio_Piece.git)

## Loom Demo

[View Project Demo](https://www.loom.com/share/your-looms-link)

## Features Implemented

### Task Management

- **Dynamic Task Creation:** Users can add new tasks using a modal form. Each task has a title, description, and status.
- **Task Editing:** Tasks can be clicked to open a modal for editing. Changes update both the UI and local storage.
- **Task Deletion:** Users can delete tasks from within the modal, with updates reflected immediately.
- **Persistent Storage:** Tasks are stored in local storage to persist across page reloads.
- **API Fetching:** Tasks are initially fetched from `https://jsl-kanban-api.vercel.app/` and saved to local storage.

### Task Rendering

- Tasks are rendered dynamically in columns according to their status (To Do, Doing, Done).
- Task counters show the total number of tasks in each column.
- Modular functions such as `createTaskCard` and `renderTasks` handle UI updates efficiently.

### Modals and Dropdowns

- **Task Modals:** Separate modals for editing existing tasks and adding new tasks.
- **Dropdowns:** Status selection is implemented through styled dropdown lists with outside click handling.
- **Reusable Functions:** Functions like `setupToggle`, `setupOutsideClick`, and `styleOptions` make the dropdowns modular and maintainable.

### Sidebar and Mobile Menu

- **Toggleable Sidebar:** Users can show or hide the sidebar on desktop.
- **Mobile Menu:** The sidebar is accessible as a menu on mobile, including the theme toggle.
- **Responsive Design:** Ensures a consistent experience across devices.

### Theme Toggle

- **Dark/Light Mode:** Users can switch themes via the sidebar or mobile menu.
- **Consistent Styling:** All elements adjust dynamically to match the selected theme.

### Code Quality

- **Modular Structure:** Code is divided into modules for rendering tasks, managing modals, handling local storage, and dropdown interactions.
- **JSDoc Documentation:** Major functions and modules are documented for maintainability.
- **Descriptive Naming:** Clear and meaningful variable and function names improve readability.

### Stretch Goal (Optional)

- Prepared structure for implementing task priority (High, Medium, Low) to allow sorting within each column. 

## Deployment

- The app is deployable via **Netlify** with a clean URL.
- Fully functional features have been tested on the deployed version to ensure data persistence and responsiveness.

## Expected Outcome

A fully functional Kanban app that allows:

- Dynamic fetching and display of tasks.
- Editing, deletion, and persistent storage through local storage.
- Responsive sidebar with theme toggle for both desktop and mobile.
- Modular, maintainable, and well-documented code that can be scaled or extended in future iterations.

