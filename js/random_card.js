document.addEventListener('DOMContentLoaded', () => {
    let allCards = [];
    let filteredCards = [];
    
    // DOM Elements
    const resultsGrid = document.getElementById('results-grid');
    const btnRoll1 = document.getElementById('btn-roll-1');
    const btnRoll4 = document.getElementById('btn-roll-4');
    const btnFilter = document.getElementById('btn-filter');
    const modal = document.getElementById('filter-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnApplyFilter = document.getElementById('btn-apply-filter');
    const btnSelectAll = document.getElementById('btn-select-all');
    const btnClearAll = document.getElementById('btn-clear-all');
    const filterTypeContainer = document.getElementById('filter-type');

    // Load Data
    fetch('data/card.json')
        .then(response => response.json())
        .then(data => {
            allCards = data;
            // initFilters() removed - using static HTML
            applyFilters(); // Initial filter application (all selected)
        })
        .catch(err => console.error('Error loading card data:', err));

    // Initialize Filters (Populate Types) - REMOVED
    // function initFilters() { ... }

    // Apply Filters
    function applyFilters() {
        const selectedRarities = Array.from(document.querySelectorAll('#filter-rarity input:checked')).map(cb => cb.value);
        const selectedColors = Array.from(document.querySelectorAll('#filter-color input:checked')).map(cb => cb.value);
        const selectedTypes = Array.from(document.querySelectorAll('#filter-type input:checked')).map(cb => cb.value);

        filteredCards = allCards.filter(card => {
            const rarityMatch = selectedRarities.includes(card.rarity);
            const colorMatch = selectedColors.includes(card.color);
            const typeMatch = selectedTypes.includes(card.type);
            return rarityMatch && colorMatch && typeMatch;
        });

        modal.classList.add('hidden');
        console.log(`Filtered: ${filteredCards.length} cards available.`);
    }

    // Render Card
    function renderCard(card) {
        const div = document.createElement('div');
        div.className = `card-item bg-${getColorClass(card.color)}`;
        
        // Construct image path
        const imgPath = `assets/images/cards/${card.rank}_${card.rarity}${card.img}.jpg`;

        div.innerHTML = `
            <img src="${imgPath}" class="card-img" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');">
            <div class="card-info hidden">
                <div class="card-name">${card.name}</div>
                <div class="card-rarity">${card.rarity.toUpperCase()}</div>
                <div class="card-type">${card.type}</div>
                <div class="card-ability">${card.ability || '-'}</div>
            </div>
        `;

        // Toggle click event
        div.addEventListener('click', () => {
            const img = div.querySelector('.card-img');
            const info = div.querySelector('.card-info');
            
            // Only toggle if image loaded successfully (not hidden by onerror)
            if (img.style.display !== 'none') {
                img.classList.toggle('hidden');
                info.classList.toggle('hidden');
            }
        });

        return div;
    }

    function getColorClass(color) {
        switch(color) {
            case '火': return 'fire';
            case '水': return 'water';
            case '木': return 'wood';
            default: return 'null';
        }
    }

    // Roll Logic
    function roll(count) {
        if (filteredCards.length === 0) {
            alert('没有符合条件的卡牌！');
            return;
        }

        resultsGrid.innerHTML = '';
        
        // Adjust grid layout class based on count
        if (count === 4) {
            resultsGrid.classList.add('grid-2x2');
        } else {
            resultsGrid.classList.remove('grid-2x2');
        }
        
        const pool = [...filteredCards];
        const result = [];
        
        for (let i = 0; i < count; i++) {
            if (pool.length === 0) break;
            const randomIndex = Math.floor(Math.random() * pool.length);
            result.push(pool[randomIndex]);
            pool.splice(randomIndex, 1); // Remove to ensure uniqueness
        }

        result.forEach(card => {
            resultsGrid.appendChild(renderCard(card));
        });
    }

    // Event Listeners
    btnRoll1.addEventListener('click', () => roll(1));
    btnRoll4.addEventListener('click', () => roll(4));
    
    btnFilter.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
    
    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    btnApplyFilter.addEventListener('click', applyFilters);
    
    // Select All / Clear All
    if (btnSelectAll) {
        btnSelectAll.addEventListener('click', () => {
            document.querySelectorAll('.modal-body input[type="checkbox"]').forEach(cb => cb.checked = true);
        });
    }
    
    if (btnClearAll) {
        btnClearAll.addEventListener('click', () => {
            document.querySelectorAll('.modal-body input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
