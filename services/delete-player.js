document.addEventListener('DOMContentLoaded', () => {
    const deletePlayerModal = document.getElementById("deletePlayerModal");
    const deletePlayerBtn = document.querySelector(".delete-player");
    const closeBtn = document.querySelector(".close-button3");
    const deletePlayerForm = document.getElementById("deletePlayerForm");
    const clubSelect = document.getElementById("club-select");  // Reference the club select element
  
    // Event listeners for opening and closing the modal
    deletePlayerBtn.addEventListener("click", () => {
        deletePlayerModal.style.display = "block";
    });
  
    closeBtn.addEventListener("click", () => {
        deletePlayerModal.style.display = "none";
    });
  
    // Handle form submission
    deletePlayerForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // Gather form data 
        const playerID = parseInt(document.getElementById("playerName3").value);
        const clubName = clubSelect.value; // Get selected club name from the dropdown
    
  
        // Send the player data to the API
        fetch(`http://localhost:3000/players/${playerID}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text(); 
        })
        .then(data => {
            console.log(data); 
  
            deletePlayerModal.style.display = "none"; 
            deletePlayerList(clubName);  // delete the player list after adding
        })
        .catch(error => {
            console.error('Error adding player:', error); 
        });
    });
  });
  
  function deletePlayerList(clubName) {
  const playerList = document.querySelector(".players-table tbody"); 
  
  if (clubName) {
    fetch(`http://localhost:3000/players/${clubName}`) 
      .then(response => response.json())
      .then(players => {
        playerList.innerHTML = ""; 
        
        players.forEach(player => {
          // 1. Create Table Row
                    const row = playerList.insertRow();
                  
                    // 3. Format and Insert Data
                    const dataToInsert = [
                      player.player_id, 
                      player.player_name, 
                      player.shirt_number, 
                      player.position,
                      new Date(player.date_of_birth).toLocaleDateString(),  // Format D.O.B.
                      new Date(player.begin).toLocaleDateString() ,
                      new Date(player.end).toLocaleDateString()  
                    ];
                  
                    dataToInsert.forEach(data => {
                      const cell = row.insertCell();
                      cell.textContent = data;
                    });
        });
      })
      .catch(error => {
        console.error("Error fetching players:", error);
        playerList.innerHTML = `<tr><td colspan="6">Error loading players</td></tr>`;
      });
  } else {
    playerList.innerHTML = ""; 
  }
  }
  
  // Initial call to populate the player list when the page loads
  deletePlayerList(document.getElementById("club-select").value);