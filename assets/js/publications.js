// Get all the BibTeX buttons
const bibtexButtons = document.querySelectorAll('.bibtex-btn');

// Add click event handlers
bibtexButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const bibtexDivId = event.target.getAttribute('href').slice(1); // Get the ID from the href
    const bibtexDiv = document.getElementById(bibtexDivId);
    bibtexDiv.style.display = bibtexDiv.style.display === 'none' ? 'block' : 'none';
  });
});