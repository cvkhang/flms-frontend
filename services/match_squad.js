const clubSelect = document.getElementById("club-select");
const matchSelect = document.getElementById("match-select");
const matchMenu = document.querySelector(".match-menu"); 
const playersTable = document.querySelector(".players-list-table");
const coachesTable = document.querySelector(".coaches-list-table");
const playersHeader = document.querySelector(".hp:first-child");
const coachesHeader = document.querySelector(".hp:last-child");
const playersTbody = playersTable.querySelector("tbody");
const coachesTbody = coachesTable.querySelector("tbody");
const fixturesHeader = document.querySelector(".random");

document.addEventListener("DOMContentLoaded", () => {

    clubSelect.addEventListener("change", async (event) => {
      const selectedClub = event.target.value;
      if (selectedClub) {
        console.log("Club selected:", selectedClub); // Debugging log 1
        
        // Check if matchMenu is null before setting display
        if(matchMenu) { 
          matchMenu.style.display = "flex";
          fixturesHeader.style.display = "flex";
        }else {
          console.error("matchMenu element not found!");
        }

        try {
          const response = await fetch(`http://localhost:3000/fixtures/${selectedClub}`);
          if (!response.ok) { // Check if the API request was successful
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("API data:", data); // Debugging log 2

          matchSelect.innerHTML = '<option value="">--Select--</option>';
          data.forEach((match) => {
            const option = document.createElement("option");
            option.value = match.match_id;
            option.text = `Match ${match.match_id} vs ${match.opponent}`;
            matchSelect.add(option);
          });
        } catch (error) {
          console.error("Error fetching match data:", error);
          // Display the error message to the user
          alert("Error fetching match data. Please try again later."); 
        }
      } else {
        matchMenu.style.display = "none";
        clearAndHideTable(playersTable, playersTbody, playersHeader);
        clearAndHideTable(coachesTable, coachesTbody, coachesHeader);
      }
    });

    //////
    const matchSelect = document.getElementById("match-select");
    const playersTable = document.querySelector('.players-list-table');
    const coachesTable = document.querySelector('.coaches-list-table');

    matchSelect.addEventListener('change', () => {
    const selectedMatchId = matchSelect.value;
    const selectedClubName = document.getElementById("club-select").value; 

    if (selectedMatchId) {
        // Show the tables
        playersTable.style.display = 'table';
        coachesTable.style.display = 'table';

        // Fetch Players Data
        fetch(`http://localhost:3000/fixtures/players/${selectedClubName}/${selectedMatchId}`)
            .then(response => response.json())
            .then(players => {
                const playerTableBody = document.getElementById("player-table-body");
                playerTableBody.innerHTML = ""; // Clear existing rows
                let subFound = false; // Flag to track if we've found the "start" event

                players.forEach(player => {
                    const row = playerTableBody.insertRow();
                    row.insertCell().textContent = player.match_id;
                    row.insertCell().textContent = player.player_id !== null ? player.player_id : "N/A";
                    row.insertCell().textContent = player.player_name !== null ? player.player_name : "N/A";
                    row.insertCell().textContent = player.position !== null ? player.position : "N/A";
                    row.insertCell().textContent = player.event;
                    // Add more cells for other player attributes if needed
                    if (!subFound && player.event === "sub") {
                        row.classList.add("two-half-row");
                        subFound = true; 
                    }
                });            
            });

        // Fetch Coaches Data
        fetch(`http://localhost:3000/fixtures/coaches/${selectedClubName}/${selectedMatchId}`)
            .then(response => response.json())
            .then(coaches => {
                const coachTableBody = document.getElementById("coach-table-body");
                coachTableBody.innerHTML = ""; // Clear existing rows
        
                coaches.forEach(coach => {
                    const row = coachTableBody.insertRow();
                    row.insertCell().textContent = coach.match_id;
                    row.insertCell().textContent = coach.coach_id !== null ? coach.coach_id : "N/A";
                    row.insertCell().textContent = coach.coach_name !== null ? coach.coach_name : "N/A";
                    row.insertCell().textContent = coach.event;
                    // Add more cells for other coach attributes if needed
                });
            });

    } else {
        // Hide the tables if no match is selected
        playersTable.style.display = 'none';
        coachesTable.style.display = 'none';
        }
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
        const playerID = parseInt(document.getElementById("playerID").value);
        const clubName = clubSelect.value; // Get selected club name from the dropdown
        const _event = document.getElementById("event").value;

        // Prepare data to send to the API
        const playerData = {
            match_id: matchSelect.value,
            player_id: playerID,
            club_name: clubName,
            _event: _event
        };

        // Send the player data to the API
        fetch(`http://localhost:3000/fixtures/players`, { 
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
            updatePlayerList(matchSelect);  // Update the player list after adding
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
        const playerID = parseInt(document.getElementById("playerName3").value);
        const matchID = matchSelect.value; // Get selected club name from the dropdown
    
  
        // Send the player data to the API
        fetch(`http://localhost:3000/fixtures/players/${matchID}/${playerID}`, { 
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
            updatePlayerList(matchSelect);  // delete the player list after adding
        })
        .catch(error => {
            console.error('Error adding player:', error); 
        });
    });

    const addCoachModal = document.getElementById("addCoachModal");
    const addCoachBtn = document.querySelector(".add-coach");
    const closeBtn3 = document.querySelector(".close-button3");
    const addCoachForm = document.getElementById("addCoachForm");

    // Event listeners for opening and closing the modal
    addCoachBtn.addEventListener("click", () => {
        addCoachModal.style.display = "block";
    });

    closeBtn3.addEventListener("click", () => {
        addCoachModal.style.display = "none";
    });

    // Handle form submission
    addCoachForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Gather form data 
        const coachID = parseInt(document.getElementById("coachID").value);
        const clubName = clubSelect.value; // Get selected club name from the dropdown

        // Prepare data to send to the API
        const coachData = {
            match_id: matchSelect.value,
            coach_id: coachID,
            club_name: clubName,
        };

        // Send the coach data to the API
        fetch(`http://localhost:3000/fixtures/coach`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coachData)
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text(); 
        })

        .then(data => {
            console.log(data); 

            addCoachModal.style.display = "none"; 
            updateCoachList(matchSelect);  // Update the coach list after adding
        })
        .catch(error => {
            console.error('Error adding coach:', error); 
        });
    });

    const deleteCoachModal = document.getElementById("deleteCoachModal");
    const deleteCoachBtn = document.querySelector(".delete-coach");
    const closeBtn4 = document.querySelector(".close-button4");
    const deleteCoachForm = document.getElementById("deleteCoachForm");
  
    // Event listeners for opening and closing the modal
    deleteCoachBtn.addEventListener("click", () => {
        deleteCoachModal.style.display = "block";
    });
  
    closeBtn4.addEventListener("click", () => {
        deleteCoachModal.style.display = "none";
    });
  
    // Handle form submission
    deleteCoachForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // Gather form data 
        const coachID = parseInt(document.getElementById("coachID2").value);
        const matchID = matchSelect.value; // Get selected club name from the dropdown
    
  
        // Send the coach data to the API
        fetch(`http://localhost:3000/fixtures/coach/${matchID}/${coachID}`, { 
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
  
            deleteCoachModal.style.display = "none"; 
            updateCoachList(matchSelect);  // delete the coach list after adding
        })
        .catch(error => {
            console.error('Error adding coach:', error); 
        });
    });
});
    

function updatePlayerList(matchSelect) {
    const selectedMatchId = matchSelect.value;
    const selectedClubName = document.getElementById("club-select").value; 

    if (selectedMatchId) {
        // Show the tables
        playersTable.style.display = 'table';
        coachesTable.style.display = 'table';

        // Fetch Players Data
        fetch(`http://localhost:3000/fixtures/players/${selectedClubName}/${selectedMatchId}`)
            .then(response => response.json())
            .then(players => {
                const playerTableBody = document.getElementById("player-table-body");
                playerTableBody.innerHTML = ""; // Clear existing rows
                let subFound = false; // Flag to track if we've found the "start" event

                players.forEach(player => {
                    const row = playerTableBody.insertRow();
                    row.insertCell().textContent = player.match_id;
                    row.insertCell().textContent = player.player_id !== null ? player.player_id : "N/A";
                    row.insertCell().textContent = player.player_name !== null ? player.player_name : "N/A";
                    row.insertCell().textContent = player.position !== null ? player.position : "N/A";
                    row.insertCell().textContent = player.event;
                    // Add more cells for other player attributes if needed
                    if (!subFound && player.event === "sub") {
                        row.classList.add("two-half-row");
                        subFound = true; 
                    }
                });            
            });
    }
}

function updateCoachList(matchSelect) {
    const selectedMatchId = matchSelect.value;
    const selectedClubName = document.getElementById("club-select").value; 

    if (selectedMatchId) {
        // Show the tables
        playersTable.style.display = 'table';
        coachesTable.style.display = 'table';


        // Fetch Coaches Data
        fetch(`http://localhost:3000/fixtures/coaches/${selectedClubName}/${selectedMatchId}`)
            .then(response => response.json())
            .then(coaches => {
                const coachTableBody = document.getElementById("coach-table-body");
                coachTableBody.innerHTML = ""; // Clear existing rows
        
                coaches.forEach(coach => {
                    const row = coachTableBody.insertRow();
                    row.insertCell().textContent = coach.match_id;
                    row.insertCell().textContent = coach.coach_id !== null ? coach.coach_id : "N/A";
                    row.insertCell().textContent = coach.coach_name !== null ? coach.coach_name : "N/A";
                    row.insertCell().textContent = coach.event;
                    // Add more cells for other coach attributes if needed
                });
            });
    }
}







  

