document.addEventListener('DOMContentLoaded', function() {
    const challengeForm = document.getElementById('challengeForm');
    const challengesList = document.getElementById('challengesList');
    
    // Load challenges when page loads
    loadChallenges();
    
    // Form submission handler
    challengeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const month = document.getElementById('month').value;
        const description = document.getElementById('description').value;
        
        addChallenge(month, description);
        
        // Reset form
        challengeForm.reset();
    });
    
    // Function to load all challenges
    function loadChallenges() {
        fetch('http://localhost:8080/challenges')
            .then(response => response.json())
            .then(challenges => {
                displayChallenges(challenges);
            })
            .catch(error => console.error('Error loading challenges:', error));
    }
    
    // Function to add a new challenge
    function addChallenge(month, description) {
        const challenge = {
            month: month,
            description: description
        };
        
        fetch('http://localhost:8080/challenges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(challenge)
        })
        .then(response => {
            if (response.ok) {
                loadChallenges(); // Refresh the list
            } else {
                console.error('Failed to add challenge');
            }
        })
        .catch(error => console.error('Error adding challenge:', error));
    }
    
    // Function to delete a challenge
    function deleteChallenge(id) {
        fetch(`http://localhost:8080/challenges/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadChallenges(); // Refresh the list
            } else {
                console.error('Failed to delete challenge');
            }
        })
        .catch(error => console.error('Error deleting challenge:', error));
    }
    
    // Function to display challenges in the UI
    function displayChallenges(challenges) {
        challengesList.innerHTML = '';
        
        if (challenges.length === 0) {
            challengesList.innerHTML = '<p>No challenges yet. Add one above!</p>';
            return;
        }
        
        challenges.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = 'challenge-item';
            
            challengeElement.innerHTML = `
                <div class="challenge-info">
                    <div class="challenge-month">${challenge.month}</div>
                    <div class="challenge-description">${challenge.description}</div>
                </div>
                <button class="delete-btn" data-id="${challenge.id}">Delete</button>
            `;
            
            challengesList.appendChild(challengeElement);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteChallenge(id);
            });
        });
    }
});