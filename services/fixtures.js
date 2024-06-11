document.addEventListener('DOMContentLoaded', () => {
const clubSelect = document.getElementById("club-select");
const fixtureList = document.querySelector(".fixtures-table tbody");
const fixtureTable = document.querySelector(".fixtures-table");
const matchMenu = document.querySelector(".match-menu");

clubSelect.addEventListener("change", () => {
    const selectedClubValue = clubSelect.value; // Get the selected club value (ars, avl, etc.)

    
    if (selectedClubValue) {
      fixtureTable.style.display = 'table';
      console.log(selectedClubValue)
        fetch(`http://localhost:3000/fixtures/${selectedClubValue}`) // Construct the API URL using the value
            .then(response => response.json())
            .then(fixtures => {
                fixtureList.innerHTML = ""; 

                fixtures.forEach(fixture => {
                  // 1. Create Table Row
                  const row = fixtureList.insertRow();
                
                  // 2. Format and Insert Data
                  const dataToInsert = [
                    fixture.matchweek, 
                    fixture.match_id, 
                    fixture.opponent, 
                    fixture.home_away,
                    new Date(fixture.match_time).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'Asia/Ho_Chi_Minh', // Or 'ICT' for Indochina Time
                    }),
                    fixture.ticket
                  ];
                
                  dataToInsert.forEach(data => {
                    const cell = row.insertCell();
                    cell.textContent = data;
                  });
                });
                
            })
            .catch(error => {
                console.error("Error fetching fixtures:", error);
                fixtureList.innerHTML = `<tr><td colspan="6">Error loading fixtures</td></tr>`;
            });
    } else {
        fixtureList.innerHTML = ""; // Clear the table if no club is selected
    }
});
})
