document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#league-table tbody');

  // Fetch both sets of data simultaneously
  Promise.all([
    fetch('http://localhost:3000/teams').then(response => response.json()),
    fetch('http://localhost:3000/teams/matchplayedbyteam').then(response => response.json())
  ])
  .then(([teamData, matchData]) => {
    teamData.forEach(team => {
      const row = tableBody.insertRow();

      // Find the corresponding match data for this team
      const teamMatchData = matchData.find(m => m.club_name === team.club_name); // Assuming your data has team_id

      // Populate cells
      row.insertCell().textContent = team.position;
      row.insertCell().textContent = team.club_name;
      row.insertCell().textContent = team.point;
      row.insertCell().textContent = team.goal_difference;
      row.insertCell().textContent = teamMatchData ? teamMatchData.played : '-';
      row.insertCell().textContent = teamMatchData ? teamMatchData.won : '-';
      row.insertCell().textContent = teamMatchData ? teamMatchData.drawn : '-';
      row.insertCell().textContent = teamMatchData ? teamMatchData.lost : '-';
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Display an error message to the user (optional)
  });
});
