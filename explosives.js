const EXPLOSIVE_TYPES = Object.freeze({
    'gunpowder': {
        materials: {
            'Charcoal': 30,
            'Sulfur': 20
        },
        totalResources: {
            'Charcoal': 30,
            'Sulfur': 20
        },
        craftingSteps: [
            "1. Combine materials:",
            "   - 30 Charcoal",
            "   - 20 Sulfur",
            "2. Crafts 10 Gunpowder per craft"
        ],
        notes: "A main component in every explosive recipe",
        outputAmount: 10
    },
    'explosives': {
        materials: {
            'Gunpowder': 50,
            'Low Grade Fuel': 3,
            'Metal Fragments': 10,
            'Sulfur': 10
        },
        totalResources: {
            'Metal Fragments': 10,
            'Total Sulfur': 110,    // (50 Gunpowder ÷ 10) × 20 + 10 additional
            'Total Charcoal': 150,  // (50 Gunpowder ÷ 10) × 30
            'Low Grade Fuel': 3
        },
        craftingSteps: [
            "1. Craft Gunpowder first (50 needed):",
            "   - Each 10 Gunpowder needs: 30 Charcoal + 20 Sulfur",
            "2. Add additional materials:",
            "   - 10 Metal Fragments",
            "   - 10 Sulfur",
            "   - 3 Low Grade Fuel",
            "3. Use Level 1 Workbench",
            "4. Crafts 1 Explosive per craft"
        ],
        notes: "A main component in many boom recipes",
        workbench: "Level 1",
        outputAmount: 1
    },
    'timed-explosive-charge-c4': {
        materials: {
            'Explosives': 20,
            'Tech Trash': 2,
            'Cloth': 5
        },
        totalResources: {
            'Metal Fragments': 200,   // 20 explosives × 10
            'Total Sulfur': 2200,     // 20 explosives × 110
            'Total Charcoal': 3000,   // 20 explosives × 150
            'Low Grade Fuel': 60,     // 20 explosives × 3
            'Tech Trash': 2,
            'Cloth': 5
        },
        craftingSteps: [
            "1. Craft 20 Explosives first",
            "2. Add:",
            "   - 2 Tech Trash",
            "   - 5 Cloth",
            "3. Use Level 3 Workbench"
        ],
        notes: "Highest level of explosive",
        workbench: "Level 3"
    },
    'explosive-ammo': {
        materials: {
            'Gunpowder': 20,
            'Metal Fragments': 10,
            'Sulfur': 10
        },
        totalResources: {
            'Metal Fragments': 10,
            'Total Sulfur': 50,     // (20 Gunpowder ÷ 10) × 20 + 10 additional
            'Total Charcoal': 60,   // (20 Gunpowder ÷ 10) × 30
        },
        craftingSteps: [
            "1. Craft Gunpowder first (20 needed):",
            "   - Each 10 Gunpowder needs: 30 Charcoal + 20 Sulfur",
            "2. Add:",
            "   - 10 Metal Fragments",
            "   - 10 Sulfur"
        ],
        notes: "Bullets that deal a small amount of structural damage",
        workbench: "Level 2"
    },
    'satchel-charge': {
        materials: {
            'Bean Can Grenades': 4,
            'Rope': 1,
            'Satchel': 1
        },
        totalResources: {
            'Metal Fragments': 80,     // 4 Bean Cans × 20
            'Total Sulfur': 480,       // 4 Bean Cans × (60 Gunpowder ÷ 10) × 20
            'Total Charcoal': 720,     // 4 Bean Cans × (60 Gunpowder ÷ 10) × 30
            'Rope': 1,
            'Satchel': 1
        },
        craftingSteps: [
            "1. Craft 4 Bean Can Grenades first",
            "2. Add:",
            "   - 1 Rope",
            "   - 1 Satchel",
            "3. Use Level 1 Workbench"
        ],
        notes: "Early game raiding tool",
        workbench: "Level 1"
    },
    'rocket': {
        materials: {
            'Explosives': 10,
            'Gunpowder': 150,
            'Metal Pipes': 2
        },
        totalResources: {
            'Metal Pipes': 2,
            'Total Sulfur': 1450,    // (10 Explosives × 110) + (150 Gunpowder ÷ 10 × 20)
            'Total Charcoal': 1950,  // (10 Explosives × 150) + (150 Gunpowder ÷ 10 × 30)
            'Low Grade Fuel': 30,    // 10 Explosives × 3
            'Metal Fragments': 100   // 10 Explosives × 10
        },
        craftingSteps: [
            "1. Craft 10 Explosives first",
            "2. Craft 150 Gunpowder",
            "3. Add:",
            "   - 2 Metal Pipes",
            "4. Use Level 2 Workbench"
        ],
        notes: "Long range explosive",
        workbench: "Level 2"
    },
    'high-velocity-rocket': {
        materials: {
            'Gunpowder': 100,
            'Metal Pipes': 1,
            'Metal Fragments': 100
        },
        totalResources: {
            'Metal Pipes': 1,
            'Metal Fragments': 100,
            'Total Sulfur': 200,     // (100 Gunpowder ÷ 10) × 20
            'Total Charcoal': 300    // (100 Gunpowder ÷ 10) × 30
        },
        craftingSteps: [
            "1. Craft 100 Gunpowder first",
            "2. Add:",
            "   - 1 Metal Pipe",
            "   - 100 Metal Fragments",
            "3. Use Level 2 Workbench"
        ],
        notes: "Faster rocket with less damage",
        workbench: "Level 2"
    }
});

const calculateBtn = document.getElementById('calculate-btn');
const materialList = document.getElementById('material-list');
const quantityInput = document.getElementById('quantity');
const explosiveTypeSelect = document.getElementById('explosive-type');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const quantity = parseInt(quantityInput.value);
    if (quantity < 1) {
        alert('Please enter a valid quantity');
        return;
    }

    calculateBtn.classList.add('loading');
    
    try {
        const selectedExplosive = explosiveTypeSelect.value;
        const explosiveData = EXPLOSIVE_TYPES[selectedExplosive];
        
        materialList.innerHTML = '';

        // Add workbench requirement
        const workbenchItem = document.createElement('li');
        workbenchItem.innerHTML = `<strong>Workbench Required:</strong> ${explosiveData.workbench}`;
        materialList.appendChild(workbenchItem);

        // Add total resources header
        const totalResourcesHeader = document.createElement('li');
        totalResourcesHeader.innerHTML = '<strong>Total Resources Needed:</strong>';
        totalResourcesHeader.style.backgroundColor = '#e3f2fd';
        materialList.appendChild(totalResourcesHeader);

        // Add total resources with quantity multiplication
        Object.entries(explosiveData.totalResources).forEach(([material, amount]) => {
            const requirement = amount * quantity;
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${material}</span>: ${requirement.toLocaleString()}`;
            if (material.includes('Total')) {
                listItem.style.backgroundColor = '#f8f9fa';
                listItem.style.fontWeight = 'bold';
            }
            materialList.appendChild(listItem);
        });

        // Add crafting steps header
        const stepsHeader = document.createElement('li');
        stepsHeader.innerHTML = `<strong>Crafting Steps (for ${quantity} ${quantity === 1 ? 'item' : 'items'}):</strong>`;
        stepsHeader.style.backgroundColor = '#f0f0f0';
        materialList.appendChild(stepsHeader);

        // Add crafting steps with quantity calculations
        explosiveData.craftingSteps.forEach(step => {
            const stepItem = document.createElement('li');
            let stepText = step;
            
            // If the step includes numbers, multiply them by quantity
            if (step.match(/\d+/) && !step.includes('Level') && !step.includes('Crafts')) {
                stepText = step.replace(/(\d+)/g, (match) => {
                    const num = parseInt(match);
                    return (num * quantity).toLocaleString();
                });
            }
            
            stepItem.innerHTML = stepText;
            stepItem.style.fontSize = '0.9em';
            materialList.appendChild(stepItem);
        });

        // Add notes
        const notesItem = document.createElement('li');
        notesItem.innerHTML = `<strong>Notes:</strong> ${explosiveData.notes}`;
        notesItem.style.backgroundColor = '#fff3cd';
        materialList.appendChild(notesItem);

    } catch (error) {
        console.error('Calculation error:', error);
        materialList.innerHTML = '<li class="error">An error occurred during calculation</li>';
    } finally {
        calculateBtn.classList.remove('loading');
    }
});

quantityInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value < 1) {
        e.target.setCustomValidity('Quantity must be at least 1');
    } else {
        e.target.setCustomValidity('');
    }
}); 