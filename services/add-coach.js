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
      const coach_name = document.getElementById("playerName").value;
      const clubName = clubSelect.value; // Get selected club name from the dropdown
      const nationality = document.getElementById("nation").value;
      const dateOfBirth = document.getElementById("dateOfBirth").value;
      const beginDate = document.getElementById("beginDate").value;
      const endDate = document.getElementById("endDate").value;

      // Prepare data to send to the API
      const coachData = {
          coach_name: coach_name,
          club_name: clubName,
          nationality: nationality,
          date_of_birth: dateOfBirth, 
          begin_date: beginDate,
          end_date: endDate
      };

      // Send the player data to the API
      fetch('http://localhost:3000/coaches', { 
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

          addPlayerModal.style.display = "none"; 
          updateCoachList(clubName);  // Update the player list after adding
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