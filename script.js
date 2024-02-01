
// JavaScript code for handling chores, drag-drop, edit, manage, and add new chore functionality

document.addEventListener('DOMContentLoaded', () => {
    let draggedItem = null;

    // Function to add a new chore card
    function addChoreCard(columnId, choreName, points, choreId, assignee = '', completedBy = '') {
        const column = document.getElementById(columnId);
        const card = document.createElement('div');
        card.id = choreId;
        card.classList.add('p-2', 'mb-2', 'rounded', 'shadow', 'bg-white');
        card.setAttribute('draggable', true);
        card.innerHTML = `
            <div class="flex justify-between">
                <h3 class="font-semibold">${choreName}</h3>
                <button onclick="editChore('${choreId}')" class="text-blue-500 hover:text-blue-700">Edit</button>
            </div>
            <p>Points: <span id="points-${choreId}">${points}</span></p>
            <p>Assigned to: <span id="assignee-${choreId}">${assignee}</span></p>
            <p>Completed by: <span id="completed-${choreId}">${completedBy}</span></p>
        `;
        column.appendChild(card);
        updateCardColor(card); // Update color based on column

        // Drag start event
        card.addEventListener('dragstart', (e) => {
            draggedItem = card;
            e.dataTransfer.setData('text/plain', choreId);
            setTimeout(() => { card.style.display = 'none'; }, 0);
        });

        // Drag end event
        card.addEventListener('dragend', (e) => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
                updateCardColor(card); // Update color after moving
            }, 0);
        });
    }

    // Function to update the color of cards based on their column
    function updateCardColor(card) {
        const columnId = card.parentElement.id;
        card.classList.remove('bg-red-200', 'bg-yellow-200', 'bg-green-200'); // Reset color classes
        if (columnId === 'todo-list') {
            card.classList.add('bg-red-200');
        } else if (columnId === 'inprogress-list') {
            card.classList.add('bg-yellow-200');
        } else if (columnId === 'done-list') {
            card.classList.add('bg-green-200');
        }
    }

    // Edit Chore Function
    function editChore(choreId) {
        const choreCard = document.getElementById(choreId);
        const currentName = choreCard.querySelector('h3').innerText;
        const currentPoints = choreCard.querySelector('#points-' + choreId).innerText;

        const newName = prompt('Enter new chore name:', currentName);
        const newPoints = prompt('Enter new points:', currentPoints);

        if (newName !== null && newName.trim() !== '') {
            choreCard.querySelector('h3').innerText = newName;
        }
        if (newPoints !== null && !isNaN(newPoints)) {
            choreCard.querySelector('#points-' + choreId).innerText = newPoints;
        }
    }
    window.editChore = editChore;

    // Add New Chore Function
    window.addNewChore = () => {
        const choreName = document.getElementById('new-chore-name').value;
        const chorePoints = document.getElementById('new-chore-points').value;
        if (choreName && chorePoints && !isNaN(chorePoints)) {
            const newChoreId = 'chore' + new Date().getTime(); // Unique ID
            addChoreCard('todo-list', choreName, chorePoints, newChoreId);
            document.getElementById('new-chore-name').value = '';
            document.getElementById('new-chore-points').value = '';
        } else {
            alert('Please enter a valid chore name and points.');
        }
    };

    // Pre-load common chores
    // ... existing functionality to load common chores ...
	
	// Columns for dropping items
    // ... existing functionality to manage drag and drop ...
	const columns = document.querySelectorAll('.bg-gray-100, .bg-red-100, .bg-yellow-100, .bg-green-100');
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem) {
                column.appendChild(draggedItem);
                updateCardColor(draggedItem);
                setTimeout(() => { draggedItem.style.display = 'block'; }, 0);
            }
        });
    });

    

    // Initial chores loading (for demonstration)
    // Initial chores loading (for demonstration)
    addChoreCard('todo-list', 'Clean Kitchen', 5, 'chore1');
    addChoreCard('inprogress-list', 'Vacuum Living Room', 3, 'chore2');
    addChoreCard('done-list', 'Laundry', 4, 'chore3');
});
