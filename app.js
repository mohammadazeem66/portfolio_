
function display() {
  const projectsContainer = document.getElementById('projects-container');

  // Check if the container exists
  if (!projectsContainer) {
    console.error('Projects container not found!');
    return;
  }

  // Fetch the project data from the API (replace with your actual URL if needed)
  fetch('http://localhost:3000/posts')
    .then(response => {
      if (!response.ok) {
        // Handle fetch errors (e.g., 404, 500, etc.)
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Debug: Check the data to ensure it's coming through correctly
      console.log('Fetched data:', data);

      // Check if the data is an array
      if (Array.isArray(data)) {
        // Create a variable to store all the HTML for projects
        let projectsHTML = '';

        // Loop through the posts and create a card for each one using template literals
        data.forEach(post => {
          // Use backticks to create the HTML structure for each project
          projectsHTML += `
            <div class="project-card">
              <img src="${post.image || './Images/Project.jfif'}" alt="${post.title}" class="project-image" />
              <div class="project-info">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.link || '#'}" target="_blank" class="project-link">View Project</a>
              </div>
            </div>
          `;
        });

        // Set the generated HTML all at once
        projectsContainer.innerHTML = projectsHTML;
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch(error => {
      // Log any errors that occur during the fetch or rendering
      console.error('Error fetching projects:', error);
    });
}
display();

