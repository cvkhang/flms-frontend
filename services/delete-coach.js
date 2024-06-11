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
      const coachID = document.getElementById("playerName3").value;
      const clubName = clubSelect.value; // Get selected club name from the dropdown
  

      // Send the player data to the API
      fetch(`http://localhost:3000/coaches/${coachID}`, { 
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
          updateCoachList(clubName);  // delete the player list after adding
      })
      .catch(error => {
          console.error('Error adding player:', error); 
      });
  });
});

function updateCoachList(clubName) {
  const coachList = document.querySelector(".players-table tbody"); 
  
  if (clubName) {
    fetch(`http://localhost:3000/coaches/${clubName}`) 
      .then(response => response.json())
      .then(coaches => {
        coachList.innerHTML = ""; 
        
        coaches.forEach(coach => {
          // 1. Create Table Row
                    const row = coachList.insertRow();
                  
                    // 2. Format and Insert Data
                    const dataToInsert = [
                      coach.coach_id, 
                      coach.coach_name, 
                      coach.nationality,
                      new Date(coach.date_of_birth).toLocaleDateString(),  // Format D.O.B.
                      new Date(coach.begin).toLocaleDateString(),
                      new Date(coach.end).toLocaleDateString()  
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
    coachList.innerHTML = ""; 
  }
  }
  
  // Initial call to populate the player list when the page loads
  updateCoachList(document.getElementById("club-select").value);