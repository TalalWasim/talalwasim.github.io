document.addEventListener('DOMContentLoaded', function() {
    console.log('News expandable script loaded');
    
    const newsContainer = document.getElementById('news-container');
    const viewMoreBtn = document.getElementById('view-more-btn');
    
    // Verify elements exist
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    if (!viewMoreBtn) {
        console.error('View more button not found');
        return;
    }

    const initialNewsItems = 5; // Number of news items to show initially

    // Hide news items beyond the initial number
    const newsItems = newsContainer.getElementsByTagName('li');
    console.log(`Total news items: ${newsItems.length}`);
    
    for (let i = initialNewsItems; i < newsItems.length; i++) {
        newsItems[i].style.display = 'none';
    }

    // If there are more news items than initial display
    if (newsItems.length > initialNewsItems) {
        viewMoreBtn.style.display = 'block';
    }

    viewMoreBtn.addEventListener('click', function() {
        if (this.textContent === 'View More') {
            // Expand all news items
            for (let i = initialNewsItems; i < newsItems.length; i++) {
                newsItems[i].style.display = 'list-item';
            }
            this.textContent = 'View Less';
        } else {
            // Collapse to initial news items
            for (let i = initialNewsItems; i < newsItems.length; i++) {
                newsItems[i].style.display = 'none';
            }
            this.textContent = 'View More';
        }
    });
});