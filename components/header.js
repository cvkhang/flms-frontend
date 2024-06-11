  
document.addEventListener('DOMContentLoaded', function () {
  fetch('../header.html')  // Fetch the header.html file
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data; // Insert the header into the container
    })
    .catch(error => {
      console.error('Error loading header:', error); // Handle errors
    });
});
  