document.addEventListener('DOMContentLoaded', () => {
    const updatePlayerModal = document.getElementById("updatePlayerModal");
    const updatePlayerBtn = document.querySelector(".update-player");
    const closeBtn = document.querySelector(".close-button2");
    const updatePlayerForm = document.getElementById("updatePlayerForm");
    const clubSelect = document.getElementById("club-select");  // Reference the club select element
  
    // Event listeners for opening and closing the modal
    updatePlayerBtn.addEventListener("click", () => {
        updatePlayerModal.style.display = "block";
    });
  
    closeBtn.addEventListener("click", () => {
        updatePlayerModal.style.display = "none";
    });
  
    // Handle form submission
    updatePlayerForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // Gather form data 
        const playerID = parseInt(document.getElementById("playerID").value);
        const playerName = document.getElementById("playerName2").value;
        const clubName = clubSelect.value; // Get selected club name from the dropdown
        const position = document.getElementById("position2").value;
        const dateOfBirth = document.getElementById("dateOfBirth2").value;
        const shirtNumber = parseInt(document.getElementById("shirtNumber2").value);
        const beginDate = document.getElementById("beginDate2").value;
        const endDate = document.getElementById("endDate2").value;

        // Prepare data to send to the API
        const playerData = {
            player_name: playerName,
            position: position,
            date_of_birth: dateOfBirth, 
            shirt_number: shirtNumber,
            begin_date: beginDate,
            end_date: endDate
        };
  
        // Send the player data to the API
        fetch(`http://localhost:3000/players/${clubName}/${playerID}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text(); 
        })
        .then(data => {
            console.log(data); 
  
            updatePlayerModal.style.display = "none"; 
            updatePlayerList(clubName);  // Update the player list after adding
        })
        .catch(error => {
            console.error('Error adding player:', error); 
        });
    });
  });
  
  function updatePlayerList(clubName) {
  const playerList = document.querySelector(".players-table tbody"); 
  
  if (clubName) {
    fetch(`http://localhost:3000/players/${clubName}`) 
      .then(response => response.json())
      .then(players => {
        playerList.innerHTML = ""; 
        
        players.forEach(player => {
          // 1. Create Table Row
                    const row = playerList.insertRow();
                  
                    // 2. Format and Insert Data
                    const dataToInsert = [
                      player.player_id, 
                      player.player_name, 
                      player.shirt_number, 
                      player.position,
                      new Date(player.date_of_birth).toLocaleDateString(),  // Format D.O.B.
                      new Date(player.begin).toLocaleDateString(),
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
updatePlayerList(document.getElementById("club-select").value);