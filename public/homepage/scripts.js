// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.5 // Adjust based on when you want the animation to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const viewAllButton = document.getElementById('view-all-button');

    // Sample news articles data
    const newsArticles = [
        {
            title: 'Website Launch',
            date: 'September 29 2024',
            content: 'Today we launched our new website totally redesigned and faster then before!'
        }
    ];

    // Function to create and add news articles to the container
    function addNewsArticles(articles) {
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('news-article');
            
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p class="news-date">${article.date}</p>
                <p class="news-content">${article.content.substring(0, 100)}<span class="more-text">${article.content.substring(100)}</span></p>
            `;
            
            newsContainer.appendChild(articleElement);
        });
        
    }

    // Add the news articles to the container
    addNewsArticles(newsArticles);
});


async function test() {
    const response = await fetch('/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          email: localStorage.getItem('email') ,
          session: localStorage.getItem('session')
        },
        body: JSON.stringify({
            email: localStorage.getItem('email') ,
            session: localStorage.getItem('session')
        })
    });
    console.log(await response.json())
}
