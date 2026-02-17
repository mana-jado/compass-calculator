# UI Optimization Plan

This plan addresses the user's request to optimize the Navbar for mobile devices and improve the display of "Random 4 Cards" on both mobile and PC.

## Objectives
1.  **Navbar Optimization (Mobile)**: Prevent the navbar from occupying excessive vertical space by implementing a collapsible "Hamburger" menu.
2.  **Random Deck Display (Mobile)**: Fix horizontal scrolling issues by resizing cards to fit within the screen width (using a 2x2 fluid grid).
3.  **Random Deck Display (PC)**: Ensure "Random 4 Cards" results display in a single row instead of a 2x2 grid.

## Proposed Changes

### 1. Navbar Optimization
**Files:** `js/navbar.js`, `css/navbar.css`

*   **`js/navbar.js`**:
    *   Inject a "Hamburger" toggle button (`<button class="navbar-toggle">`) into the generated HTML.
    *   Add an event listener to toggle a `show` class on the `.navbar-menu` when the button is clicked.
*   **`css/navbar.css`**:
    *   Default (PC): Hide the toggle button.
    *   Mobile (`@media (max-width: 768px)`):
        *   Show the toggle button.
        *   Hide `.navbar-menu` by default.
        *   Style `.navbar-menu.show` to appear as a dropdown or stacked list.
        *   Adjust `.navbar-container` to keep the Logo and Toggle button in a single row.

### 2. Random Deck Optimization
**File:** `random_card.html` (Internal `<style>` block)

*   **CSS Refactoring**:
    *   Modify `.card-item`: Remove fixed `width: 200px` and `height: 271px`. Replace with `width: 100%` and `aspect-ratio: 200/271` to allow fluid resizing.
    *   Modify `.cards-grid.grid-2x2`:
        *   **Desktop**: Set `grid-template-columns: repeat(4, 1fr)` to display 4 cards in one row.
        *   **Mobile**: Set `grid-template-columns: repeat(2, 1fr)` inside the media query to fit 4 cards in a 2x2 grid within the screen width.
    *   Adjust font sizes for mobile card details if necessary to fit the smaller card size.

## Verification
*   **Mobile View**: Check if the navbar is collapsed and expandable. Check if 4 generated cards fit on the screen without horizontal scrolling.
*   **PC View**: Check if the navbar remains standard. Check if 4 generated cards appear in a single row.
