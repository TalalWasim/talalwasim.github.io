document.addEventListener('DOMContentLoaded', function() {
    // Check if the news container and button exist
    const newsContainer = document.getElementById('news-container');
    const viewMoreBtn = document.getElementById('view-more-btn');
    
    if (newsContainer && viewMoreBtn) {
        const initialNewsItems = 5; // Number of news items to show initially
        const newsItems = newsContainer.getElementsByTagName('li');

        // Initially hide items beyond the first 5
        for (let i = initialNewsItems; i < newsItems.length; i++) {
            newsItems[i].classList.add('news-item-hidden');
        }

        // Only show the button if there are more items
        if (newsItems.length > initialNewsItems) {
            viewMoreBtn.style.display = 'block';
        }

        // Add click event listener to the button
        viewMoreBtn.addEventListener('click', function() {
            const hiddenItems = newsContainer.getElementsByClassName('news-item-hidden');
            
            if (this.textContent === 'View More') {
                // Show all hidden items
                while (hiddenItems.length > 0) {
                    hiddenItems[0].classList.remove('news-item-hidden');
                }
                this.textContent = 'View Less';
            } else {
                // Hide items beyond the initial number
                for (let i = initialNewsItems; i < newsItems.length; i++) {
                    newsItems[i].classList.add('news-item-hidden');
                }
                this.textContent = 'View More';
            }
        });
    }
});