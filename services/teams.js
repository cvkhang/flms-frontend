document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#team-table tbody');

  fetch(`http://localhost:3000/teams/info`) // Construct the API URL using the value
            .then(response => response.json())
            .then(players => {
                tableBody.innerHTML = ""; 

                players.forEach(player => {
                  // 1. Create Table Row
                  const row = tableBody.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    player.club_code, 
                    player.club_name, 
                    player.stadium_name, 
                    player.location,
                    player.capacity,
                  ];
                
                  dataToInsert.forEach(data => {
                    const cell = row.insertCell();
                    cell.textContent = data;
                  });
                });
                
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                tableBody.innerHTML = `<tr><td colspan="6">Error loading players</td></tr>`;
            });

  const addPlayerModal = document.getElementById("addPlayerModal");
  const addPlayerBtn = document.querySelector(".add-player");
  const closeBtn = document.querySelector(".close-button");
  const addPlayerForm = document.getElementById("addPlayerForm");

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
      const club_code = document.getElementById("playerID").value;
      const club_name = document.getElementById("event").value;
      const stadium_name = document.getElementById("eventHalf").value;
      const location = (document.getElementById("eventTime").value);
      const capacity = parseInt(document.getElementById("eventTime").value);


      // Prepare data to send to the API
      const playerData = {
          club_code: club_code,
          club_name: club_name,
          stadium_name: stadium_name,
          location: location,
          capacity: capacity
      };

      // Send the player data to the API
      fetch(`http://localhost:`, { 
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
          updatePlayerList();  // Update the player list after adding
      })
      .catch(error => {
          console.error('Error adding player:', error); 
      });
  });

  const deletePlayerModal = document.getElementById("deletePlayerModal");
  const deletePlayerBtn = document.querySelector(".delete-player");
  const closeBtn2 = document.querySelector(".close-button2");
  const deletePlayerForm = document.getElementById("deletePlayerForm");

  // Event listeners for opening and closing the modal
  deletePlayerBtn.addEventListener("click", () => {
      deletePlayerModal.style.display = "block";
  });

  closeBtn2.addEventListener("click", () => {
      deletePlayerModal.style.display = "none";
  });

  // Handle form submission
  deletePlayerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Gather form data 
      const clubName = document.getElementById("clubName2").value;

      // Send the player data to the API
      fetch(`http://localhost:300`, { 
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
          updatePlayerList();  // delete the player list after adding
      })
      .catch(error => {
          console.error('Error adding player:', error); 
      });
  });

});

function updatePlayerList() {
  const tableBody = document.querySelector('#team-table tbody');

  fetch(`http://localhost:3000/teams/info`) // Construct the API URL using the value
            .then(response => response.json())
            .then(players => {
                tableBody.innerHTML = ""; 

                players.forEach(player => {
                  // 1. Create Table Row
                  const row = tableBody.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    player.club_code, 
                    player.club_name, 
                    player.stadium_name, 
                    player.location,
                    player.capacity,
                  ];
                
                  dataToInsert.forEach(data => {
                    const cell = row.insertCell();
                    cell.textContent = data;
                  });
                });
                
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                tableBody.innerHTML = `<tr><td colspan="6">Error loading players</td></tr>`;
            });
}
