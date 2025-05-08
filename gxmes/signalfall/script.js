window.addEventListener('DOMContentLoaded', () => {
    const buttons = Array.from(document.querySelectorAll('.battle-btn'));
    let selectedIndex = 0;
    let currentState = 'menu'; // other possible state: 'submenu', 'enemyTargeting'

    // Initialize selection
    updateButtonSelection();

    document.addEventListener('keydown', (event) => {
        if (currentState !== 'menu') return;

        switch (event.key) {
            case 'ArrowLeft':
                selectedIndex = (selectedIndex + buttons.length - 1) % buttons.length;
                updateButtonSelection();
                break;
            case 'ArrowRight':
                selectedIndex = (selectedIndex + 1) % buttons.length;
                updateButtonSelection();
                break;
            case 'z':
            case 'Z':
                activateSelectedButton();
                break;
            case 'x':
            case 'X':
                unselectButton();
                break;
        }
    });

    function updateButtonSelection() {
        buttons.forEach((btn, i) => {
            btn.classList.toggle('selected', i === selectedIndex);
        });
    }

    function activateSelectedButton() {
        const selected = buttons[selectedIndex];
        switch (selected.id) {
            case 'fight-btn':
                console.log('Fight selected');
                // TODO: enter enemy targeting state
                break;
            case 'mind-btn':
                console.log('Mind selected');
                // TODO: enter enemy targeting or submenu
                break;
            case 'item-btn':
                console.log('Item selected');
                // TODO: open inventory UI
                break;
            case 'mercy-btn':
                console.log('Mercy selected');
                // TODO: open mercy options
                break;
        }
    }

    function unselectButton() {
        console.log('Unselected / canceled');
        // Future: close submenus, deselect enemy, etc.
    }
});