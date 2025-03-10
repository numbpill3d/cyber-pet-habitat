const pets = [];
let eggsCollected = 0;

function collectEgg() {
    eggsCollected++;
    updateEggCount();
}

function hatchPet() {
    if (eggsCollected > 0) {
        const newPet = {
            id: pets.length + 1,
            growth: 0,
            views: 0,
        };
        pets.push(newPet);
        eggsCollected--;
        updatePetList();
        updateEggCount();
    } else {
        alert("No eggs to hatch!");
    }
}

function updatePetGrowth(petId) {
    const pet = pets.find(p => p.id === petId);
    if (pet) {
        pet.growth++;
        pet.views++;
        updatePetList();
    }
}

function updateEggCount() {
    const eggCountElement = document.getElementById("egg-count");
    eggCountElement.textContent = `Eggs Collected: ${eggsCollected}`;
}

function updatePetList() {
    const petListElement = document.getElementById("pet-list");
    petListElement.innerHTML = '';
    pets.forEach(pet => {
        const petElement = document.createElement("div");
        petElement.textContent = `Pet ID: ${pet.id}, Growth: ${pet.growth}, Views: ${pet.views}`;
        petElement.onclick = () => updatePetGrowth(pet.id);
        petListElement.appendChild(petElement);
    });
}

document.getElementById("collect-egg").onclick = collectEgg;
document.getElementById("hatch-pet").onclick = hatchPet;