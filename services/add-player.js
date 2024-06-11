document.addEventListener('DOMContentLoaded', () => {
  const addPlayerModal = document.getElementById("addPlayerModal");
  const addPlayerBtn = document.querySelector(".add-player");
  const closeBtn = document.querySelector(".close-button");
  const addPlayerForm = document.getElementById("addPlayerForm");
  const clubSelect = document.getElementById("club-select");  // Reference the club select element

  // Event listeners for opening and closing the modal
  addPlayerBtn.addEventListener("click", () => {
      addPlayerModal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
      addPlayerModal.style.display = "none";
  });

  // Handle form submission
  addPlayerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Gather form data 
      const playerName = document.getElementById("playerName").value;
      const clubName = clubSelect.value; // Get selected club name from the dropdown
      const position = document.getElementById("position").value;
      const dateOfBirth = document.getElementById("dateOfBirth").value;
      const shirtNumber = parseInt(document.getElementById("shirtNumber").value);
      const beginDate = document.getElementById("beginDate").value;
      const endDate = document.getElementById("endDate").value;

      // Prepare data to send to the API
      const playerData = {
          player_name: playerName,
          club_name: clubName,
          position: position,
          date_of_birth: dateOfBirth, 
          shirt_number: shirtNumber,
          begin_date: beginDate,
          end_date: endDate
      };

      // Send the player data to the API
      fetch('http://localhost:3000/players', { 
          method: 'POST',
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

          addPlayerModal.style.display = "none"; 
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