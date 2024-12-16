document.addEventListener('DOMContentLoaded', function() {
    console.log('News expandable script loaded');
    
    const newsContainer = document.getElementById('news-container');
    const viewMoreBtn = document.getElementById('view-more-btn');
    
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    if (!viewMoreBtn) {
        console.error('View more button not found');
        return;
    }

    const newsItems = newsContainer.querySelectorAll('li');
    console.log(`Total news items: ${newsItems.length}`);
    
    const initialNewsItems = 5;
    
    // Hide excess items
    for (let i = initialNewsItems; i < newsItems.length; i++) {
        newsItems[i].style.display = 'none';
    }

    // Show view more button only if there are more items
    if (newsItems.length > initialNewsItems) {
        viewMoreBtn.style.display = 'block';
    }

    viewMoreBtn.addEventListener('click', function() {
        if (this.textContent === 'View More') {
            // Show all items
            for (let i = initialNewsItems; i < newsItems.length; i++) {
                newsItems[i].style.display = 'list-item';
            }
            this.textContent = 'View Less';
        } else {
            // Hide excess items
            for (let i = initialNewsItems; i < newsItems.length; i++) {
                newsItems[i].style.display = 'none';
            }
            this.textContent = 'View More';
        }
    });
});