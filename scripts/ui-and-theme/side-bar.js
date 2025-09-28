/**
 * Initializes the sidebar toggle functionality.
 *
 * This function sets up event listeners for two sidebar toggle buttons:
 * - `.sidebar-toggle`: toggles the visibility of the sidebar.
 * - `.sidebar-toggle-2`: shows the sidebar if hidden.
 *
 * It also manages the display of the secondary toggle button based on the
 * sidebar's visibility state.
 *
 * @function
 * @returns {void} Does not return a value.
 */
export function initSideBar() {
    const sidebar = document.getElementById('side-bar-div');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarToggle2 = document.querySelector('.sidebar-toggle-2');

    if (!sidebar || !sidebarToggle || !sidebarToggle2) return;
    
    sidebarToggle2.style.display = "none";

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        sidebarToggle2.style.display = sidebar.classList.contains("hidden") ? "block" : "none";
    });
    
    sidebarToggle2.addEventListener("click", () => {
        sidebar.classList.remove('hidden');
        sidebarToggle2.style.display = "none";
    });
}
