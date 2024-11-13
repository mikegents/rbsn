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
            'Total Sulfur': 300,      // From crafting requirements
            'Total Charcoal': 450,    // From crafting requirements
            'Low Grade Fuel': 3
        },
        craftingSteps: [
            "1. Collect materials",
            "2. Craft Gunpowder (50 Gunpowder needs: 100 Sulfur + 150 Charcoal)",
            "3. Add additional 10 Sulfur and 3 Low Grade Fuel",
            "4. Use Level 1 Workbench or higher",
            "5. Final Assembly: Combine all materials (10 Metal Fragments + 50 Gunpowder + 3 Low Grade + 10 Sulfur)",
            "6. Craft time: 30 seconds"
        ],
        notes: "Basic explosive component used in crafting C4 and Rockets.",
        workbench: "Level 1",
        craftTime: "30 seconds"
    },
    'timed-explosive-charge-c4': {
        materials: {
            'Explosives': 20,
            'Tech Trash': 2,
            'Cloth': 60
        },
        totalResources: {
            'Metal Fragments': 200,   // 20 × 10
            'Total Sulfur': 2200,     // From crafting requirements
            'Total Charcoal': 3000,   // From crafting requirements
            'Low Grade Fuel': 60,     // 20 × 3
            'Tech Trash': 2,
            'Cloth': 60
        },
        craftingSteps: [
            "1. Craft 20 Explosives first:",
            "   - Each Explosive needs: 50 Gunpowder + 10 Metal Fragments + 3 Low Grade + 10 Sulfur",
            "   - Total materials for Explosives: 200 Metal Fragments + 60 Low Grade",
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
            'Sulfur': 1000,
            'Charcoal': 1500,
            'Additional Metal Fragments': 100,
            'Additional Sulfur': 100,
            'Low Grade Fuel': 30,
            'Metal Pipe': 2
        },
        totalResources: {
            'Metal Fragments': 600,    // 500 + 100
            'Total Sulfur': 1400,      // From crafting requirements
            'Total Charcoal': 1950,    // From crafting requirements
            'Low Grade Fuel': 30,
            'Metal Pipe': 2
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - Requires: 1000 Sulfur + 1500 Charcoal",
            "2. Add additional materials:",
            "   - 100 Metal Fragments",
            "   - 100 Sulfur",
            "   - 30 Low Grade Fuel",
            "3. Craft or acquire 2 Metal Pipes",
            "4. Use Level 3 Workbench",
            "5. Final Assembly: Combine all materials",
            "6. Craft time: 3 minutes"
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
            'Total Sulfur': 300,     // From crafting requirements
            'Total Charcoal': 450,   // From crafting requirements
            'Pipe': 1
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - 100 Gunpowder needs: 300 Sulfur + 450 Charcoal",
            "2. Craft or acquire Pipe (1 needed)",
            "3. Use Level 2 Workbench",
            "4. Final Assembly: Combine all materials (100 Metal Fragments + 100 Gunpowder + 1 Pipe)",
            "5. Craft time: 2 minutes"
        ],
        notes: "Faster velocity but less damage than regular rockets. Good for PvP.",
        workbench: "Level 2",
        craftTime: "120 seconds"
    },
    'satchel-charge': {
        materials: {
            'Metal Fragments': 80,
            'Gunpowder': 240,
            'Rope': 1,
            'Cloth': 10
        },
        totalResources: {
            'Metal Fragments': 80,
            'Total Sulfur': 750,     // From crafting requirements
            'Total Charcoal': 900,   // From crafting requirements
            'Rope': 1,
            'Cloth': 10
        },
        craftingSteps: [
            "1. Craft Gunpowder first:",
            "   - 240 Gunpowder needs: 750 Sulfur + 900 Charcoal",
            "2. Craft Rope (Recipe: 1 Rope = 10 Cloth)",
            "3. Use Level 1 Workbench",
            "4. Final Assembly: Combine all materials (80 Metal Fragments + 240 Gunpowder + 1 Rope)",
            "5. Craft time: 1 minute"
        ],
        notes: "Early game raiding tool. Has random fuse timer.",
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
