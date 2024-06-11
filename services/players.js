document.addEventListener('DOMContentLoaded', () => {
const clubSelect = document.getElementById("club-select");
const playerList = document.querySelector(".players-table tbody");
const playerTable = document.querySelector(".players-table");


clubSelect.addEventListener("change", () => {
    const selectedClubValue = clubSelect.value; // Get the selected club value (ars, avl, etc.)

    if (selectedClubValue) {
      playerTable.style.display = "table";
      console.log(selectedClubValue)
        fetch(`http://localhost:3000/players/${selectedClubValue}`) // Construct the API URL using the value
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
        playerList.innerHTML = ""; // Clear the table if no club is selected
    }
});
})
