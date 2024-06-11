document.addEventListener('DOMContentLoaded', () => {
    const clubSelect = document.getElementById("club-select");
    const coachList = document.querySelector(".players-table tbody");
    const coachTable = document.querySelector(".players-table");
    
    clubSelect.addEventListener("change", () => {
        const selectedClubValue = clubSelect.value; // Get the selected club value (ars, avl, etc.)
    
        if (selectedClubValue) {
          coachTable.style.display = "table";
          console.log(selectedClubValue)
            fetch(`http://localhost:3000/coaches/${selectedClubValue}`) // Construct the API URL using the value
                .then(response => response.json())
                .then(coachs => {
                    coachList.innerHTML = ""; 
    
                    coachs.forEach(coach => {
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
                    console.error("Error fetching coachs:", error);
                    coachList.innerHTML = `<tr><td colspan="6">Error loading coachs</td></tr>`;
                });
        } else {
            coachList.innerHTML = ""; // Clear the table if no club is selected
        }
    });
    })
    