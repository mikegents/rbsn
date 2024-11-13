const EXPLOSIVE_TYPES = Object.freeze({
    'explosives': {
        materials: {
            'Metal Fragments': 10,
            'Gunpowder': 50,
            'Low Grade Fuel': 3,
            'Sulfur': 10
        },
        totalResources: {
            'Metal Fragments': 10,
            'Total Sulfur': 110,    // (50 Gunpowder ÷ 10) × 20 + 10 additional
            'Total Charcoal': 150,  // (50 Gunpowder ÷ 10) × 30
            'Low Grade Fuel': 3
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - 50 Gunpowder needs: 100 Sulfur + 150 Charcoal",
            "   - (10 Gunpowder = 20 Sulfur + 30 Charcoal)",
            "2. Add additional materials:",
            "   - 10 Metal Fragments",
            "   - 10 Sulfur",
            "   - 3 Low Grade Fuel",
            "3. Use Level 1 Workbench or higher",
            "4. Final Assembly: Combine all materials",
            "5. Craft time: 30 seconds",
            "6. CRAFTS 10 EXPLOSIVES PER CRAFT"
        ],
        notes: "Basic explosive component used in crafting C4 and Rockets. Crafts 10 at a time.",
        workbench: "Level 1",
        craftTime: "30 seconds",
        outputAmount: 10
    },
    'timed-explosive-charge-c4': {
        materials: {
            'Explosives': 20,
            'Tech Trash': 2,
            'Cloth': 60
        },
        totalResources: {
            'Metal Fragments': 200,   // 20 × 10
            'Total Sulfur': 2200,     // 20 × 110
            'Total Charcoal': 3000,   // 20 × 150
            'Low Grade Fuel': 60,     // 20 × 3
            'Tech Trash': 2,
            'Cloth': 60
        },
        craftingSteps: [
            "1. Craft 20 Explosives first:",
            "   - Each Explosive needs: 50 Gunpowder + 10 Metal Fragments + 3 Low Grade + 10 Sulfur",
            "   - Total Gunpowder needed: 1000 (needs 2000 Sulfur + 3000 Charcoal)",
            "   - Additional Sulfur needed: 200",
            "2. Acquire Tech Trash (2 needed)",
            "3. Gather 60 Cloth",
            "4. Use Level 3 Workbench",
            "5. Final Assembly: Combine all materials (20 Explosives + 2 Tech Trash + 60 Cloth)",
            "6. Craft time: 4 minutes"
        ],
        notes: "Most efficient raiding tool. 10-second timer after placement.",
        workbench: "Level 3",
        craftTime: "240 seconds"
    },
    'rocket': {
        materials: {
            'Metal Fragments': 500,
            'Gunpowder': 500,
            'Low Grade Fuel': 30,
            'Metal Pipe': 2
        },
        totalResources: {
            'Metal Fragments': 500,
            'Total Sulfur': 1000,     // (500 Gunpowder ÷ 10) × 20
            'Total Charcoal': 1500,   // (500 Gunpowder ÷ 10) × 30
            'Low Grade Fuel': 30,
            'Metal Pipe': 2
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - 500 Gunpowder needs: 1000 Sulfur + 1500 Charcoal",
            "   - (10 Gunpowder = 20 Sulfur + 30 Charcoal)",
            "2. Add other materials:",
            "   - 500 Metal Fragments",
            "   - 30 Low Grade Fuel",
            "   - 2 Metal Pipes",
            "3. Use Level 3 Workbench",
            "4. Final Assembly: Combine all materials",
            "5. Craft time: 3 minutes"
        ],
        notes: "High damage explosive projectile. Requires Rocket Launcher to use.",
        workbench: "Level 3",
        craftTime: "180 seconds"
    },
    'high-velocity-rocket': {
        materials: {
            'Metal Fragments': 100,
            'Gunpowder': 100,
            'Pipe': 1
        },
        totalResources: {
            'Metal Fragments': 100,
            'Total Sulfur': 200,     // (100 Gunpowder ÷ 10) × 20
            'Total Charcoal': 300,   // (100 Gunpowder ÷ 10) × 30
            'Pipe': 1
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - 100 Gunpowder needs: 200 Sulfur + 300 Charcoal",
            "   - (10 Gunpowder = 20 Sulfur + 30 Charcoal)",
            "2. Craft or acquire Pipe (1 needed)",
            "3. Use Level 2 Workbench",
            "4. Final Assembly: Combine all materials",
            "5. Craft time: 2 minutes"
        ],
        notes: "Faster velocity but less damage than regular rockets. Good for PvP.",
        workbench: "Level 2",
        craftTime: "120 seconds"
    },
    'satchel-charge': {
        materials: {
            'Rope': 1,
            'Bean Can Grenades': 4,
            'Small Stash': 1
        },
        totalResources: {
            'Metal Fragments': 120,    // 4 Bean Cans × 30 Metal Fragments
            'Total Sulfur': 480,       // (240 Gunpowder ÷ 10) × 20
            'Total Charcoal': 720,     // (240 Gunpowder ÷ 10) × 30
            'Rope': 1,
            'Cloth': 50,              // For Small Stash
            'Wood': 300               // For Small Stash
        },
        craftingSteps: [
            "1. Craft 4 Bean Can Grenades first:",
            "   - Each Bean Can needs: 30 Metal Fragments + 60 Gunpowder",
            "   - Total Gunpowder needed: 240 (needs 480 Sulfur + 720 Charcoal)",
            "2. Craft Small Stash (needs 50 Cloth + 300 Wood)",
            "3. Craft or acquire Rope (1 needed)",
            "4. Use Level 1 Workbench",
            "5. Final Assembly: Combine all materials (4 Bean Cans + 1 Small Stash + 1 Rope)",
            "6. Craft time: 1 minute"
        ],
        notes: "Early game raiding tool. Has random fuse timer. Requires Blueprint.",
        workbench: "Level 1",
        craftTime: "60 seconds"
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

        // Add craft time
        const craftTimeItem = document.createElement('li');
        craftTimeItem.innerHTML = `<strong>Craft Time:</strong> ${explosiveData.craftTime}`;
        materialList.appendChild(craftTimeItem);

        // Add total resources header
        const totalResourcesHeader = document.createElement('li');
        totalResourcesHeader.innerHTML = '<strong>Total Resources Needed:</strong>';
        totalResourcesHeader.style.backgroundColor = '#e3f2fd';
        materialList.appendChild(totalResourcesHeader);

        // Add total resources
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
        stepsHeader.innerHTML = '<strong>Crafting Steps:</strong>';
        stepsHeader.style.backgroundColor = '#f0f0f0';
        materialList.appendChild(stepsHeader);

        // Add crafting steps
        explosiveData.craftingSteps.forEach(step => {
            const stepItem = document.createElement('li');
            stepItem.innerHTML = step;
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