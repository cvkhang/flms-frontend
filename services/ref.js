const weekSelect = document.getElementById("week-select");
const playersTable = document.querySelector(".players-list-table");
const refBody = document.querySelector('.players-list-table tbody')

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector('#ref-table tbody');

  fetch(`https://flms-backend.onrender.com/referee`) // Construct the API URL using the value
            .then(response => response.json())
            .then(players => {
                tableBody.innerHTML = ""; 

                players.forEach(player => {
                  // 1. Create Table Row
                  const row = tableBody.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    player.ref_id, 
                    player.ref_name
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
      const ref_id = document.getElementById("playerID").value;
      const ref_name = document.getElementById("event").value;
      


      // Prepare data to send to the API
      const playerData = {
        ref_id: ref_id,
        ref_name: ref_name
      };

      // Send the player data to the API
      fetch(`https://flms-backend.onrender.com/referee`, { 
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
          updateRefMatchList();  // Update the player list after adding
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
      const ref_id = document.getElementById("clubName2").value;

      // Send the player data to the API
      fetch(`https://flms-backend.onrender.com/referee/${ref_id}`, { 
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
          updateRefMatchList();  // delete the player list after adding
      })
      .catch(error => {
          console.error('Error adding player:', error); 
      });
  });

    weekSelect.addEventListener("change", async (event) => {
        const random = document.querySelector(".random");
      const selectedWeek = event.target.value;
      if (selectedWeek) {
        playersTable.style.display = "table";
        random.style.display = "flex";

        fetch(`https://flms-backend.onrender.com/referee/schedule/${selectedWeek}`) // Construct the API URL using the value
            .then(response => response.json())
            .then(players => {
                refBody.innerHTML = ""; 

                players.forEach(player => {
                  // 1. Create Table Row
                  const row = refBody.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    player.ref_id, 
                    player.ref_name, 
                    player.match_id,
                    new Date(player.match_time,).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Ho_Chi_Minh', // Or 'ICT' for Indochina Time
                      }), 
                    player.stadium_name,
                  ];
                
                  dataToInsert.forEach(data => {
                    const cell = row.insertCell();
                    cell.textContent = data;
                  });
                });
                
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                refBody.innerHTML = `<tr><td colspan="6">Error loading players</td></tr>`;
            });
      } else {
        matchMenu.style.display = "none";
        clearAndHideTable(playersTable, playersTbody, playersHeader);
        clearAndHideTable(coachesTable, coachesTbody, coachesHeader);
      }
    });


    const addPlayerModal1 = document.getElementById("addPlayerModal1");
    const addPlayerBtn1 = document.querySelector(".add-player1");
    const closeBtn3 = document.querySelector(".close-button3");
    const addPlayerForm1 = document.getElementById("addPlayerForm1");

    // Event listeners for opening and closing the modal
    addPlayerBtn1.addEventListener("click", () => {
        addPlayerModal.style.display = "block";
    });

    closeBtn3.addEventListener("click", () => {
        addPlayerModal.style.display = "none";
    });

    // Handle form submission
    addPlayerForm1.addEventListener("submit", (event) => {
        event.preventDefault();

        // Gather form data 
        const ref_id = (document.getElementById("playerID1").value);
        const match_id = document.getElementById("event1").value;
        


        // Prepare data to send to the API
        const playerData = {
            ref_id: ref_id,
            match_id: match_id
        };

        // Send the player data to the API
        fetch(`https://flms-backend.onrender.com/referee/schedule`, { 
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

            addPlayerModal1.style.display = "none"; 
            updatePlayerList(weekSelect.value);  // Update the player list after adding
        })
        .catch(error => {
            console.error('Error adding player:', error); 
        });
    });

    const deletePlayerModal1 = document.getElementById("deletePlayerModal1");
    const deletePlayerBtn1 = document.querySelector(".delete-player1");
    const closeBtn4 = document.querySelector(".close-button4");
    const deletePlayerForm1 = document.getElementById("deletePlayerForm1");
  
    // Event listeners for opening and closing the modal
    deletePlayerBtn1.addEventListener("click", () => {
        deletePlayerModal1.style.display = "block";
    });
  
    closeBtn4.addEventListener("click", () => {
        deletePlayerModal1.style.display = "none";
    });
  
    // Handle form submission
    deletePlayerForm1.addEventListener("submit", (event) => {
        event.preventDefault();
    // Gather form data 
        const ref_id = (document.getElementById("playerID2").value);
        const match_id = document.getElementById("event2").value;
  
        // Send the player data to the API
        fetch(`https://flms-backend.onrender.com/fixtures/event/${match_id}/${ref_id}`, { 
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
  
            deletePlayerModal1.style.display = "none"; 
            updatePlayerList(weekSelect.value);  // delete the player list after adding
        })
        .catch(error => {
            console.error('Error adding player:', error); 
        });
    });
});
    

function updateRefMatchList() {
    const tableBody = document.querySelector('#ref-table tbody');

    fetch(`https://flms-backend.onrender.com/referee`) // Construct the API URL using the value
              .then(response => response.json())
              .then(players => {
                  tableBody.innerHTML = ""; 
  
                  players.forEach(player => {
                    // 1. Create Table Row
                    const row = tableBody.insertRow();
                  
                    // 2. Format and Insert Data
                    const dataToInsert = [
                      player.ref_id, 
                      player.ref_name
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

function updatePlayerList(selectedWeek) {
    const random = document.querySelector(".random");
      if (selectedWeek) {
        playersTable.style.display = "table";
        random.style.display = "flex";

        fetch(`https://flms-backend.onrender.com/referee/schedule/${selectedWeek}`) // Construct the API URL using the value
            .then(response => response.json())
            .then(players => {
                refBody.innerHTML = ""; 

                players.forEach(player => {
                  // 1. Create Table Row
                  const row = refBody.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    player.ref_id, 
                    player.ref_name, 
                    player.match_id,
                    new Date(player.match_time,).toLocaleString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Ho_Chi_Minh', // Or 'ICT' for Indochina Time
                      }), 
                    player.stadium_name,
                  ];
                
                  dataToInsert.forEach(data => {
                    const cell = row.insertCell();
                    cell.textContent = data;
                  });
                });
                
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                refBody.innerHTML = `<tr><td colspan="6">Error loading players</td></tr>`;
            });
      } 
}









  

