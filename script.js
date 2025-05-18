document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize elements
    const reviewForm = document.querySelector('.container');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const stars = document.querySelectorAll('.star');
    const reviewInput = reviewForm.querySelector('input[type="text"]');
    let currentRating = 0;
    let submitted = false; // Moved inside the DOMContentLoaded scope

    // 2. Fix form positioning
    reviewForm.style.transform = 'none';
    reviewForm.style.position = 'fixed';
    reviewForm.style.bottom = '20px';
    reviewForm.style.left = '20px';
    reviewForm.style.right = '20px';
    reviewForm.style.background = 'white';
    reviewForm.style.padding = '20px';
    reviewForm.style.borderRadius = '20px';
    reviewForm.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';

    // 3. Load saved reviews on page load
    loadReviews();

    // 4. Star rating functionality
    stars.forEach((star, index) => {
        star.style.margin = '0 5px';

        // Handle click
        star.addEventListener('click', function () {
            if (submitted) return;
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStarDisplay();
        });

        // Handle hover
        star.addEventListener('mouseenter', function () {
            if (submitted) return;
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, i) => {
                s.classList.toggle('hover', i < hoverRating);
            });
        });

        // Handle mouse leave
        star.addEventListener('mouseleave', function () {
            if (submitted) return;
            stars.forEach(s => s.classList.remove('hover'));
            updateStarDisplay();
        });
    });

    // 5. Form submission handler
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const reviewText = reviewInput.value.trim();

        if (!validateReview(reviewText)) return;

        const reviewerName = getReviewerName();
        if (reviewerName === null) return;

        const review = {
            name: reviewerName,
            text: reviewText,
            rating: currentRating,
            date: new Date().toISOString()
        };

        submitted = true;
        saveReview(review);
        displayReview(review);
        resetForm();

        alert(`Thank you for your review, ${reviewerName}!`);
    });

    // Helper functions
    function updateStarDisplay() {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < currentRating);
        });
    }

    function validateReview(text) {
        if (!text) {
            alert('Please write your review before submitting!');
            return false;
        }
        if (currentRating === 0) {
            alert('Please select a rating by clicking the stars!');
            return false;
        }
        return true;
    }

    function getReviewerName() {
        const name = prompt("Please enter your name (or leave blank to remain anonymous):");
        if (name === null) return null;
        return name.trim() || "Anonymous";
    }

    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.unshift(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadReviews() {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.reverse().forEach(review => {
            displayReview(review);
        });
    }

    function displayReview(review) {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <div class="review-rating">
                    ${'<span class="star active">★</span>'.repeat(review.rating)}
                    ${'<span class="star">★</span>'.repeat(5 - review.rating)}
                </div>
                <small class="review-date">${new Date(review.date).toLocaleString()}</small>
            </div>
            <div class="review-text">${review.text}</div>
        `;

        // Style the review stars to be large
        reviewElement.querySelectorAll('.review-rating .star').forEach(star => {
            star.style.fontSize = '30px';
            star.style.margin = '0 3px';
            // Disable any hover effects on displayed reviews
            star.style.pointerEvents = 'none';
        });

        reviewsContainer.prepend(reviewElement);
    }

    function resetForm() {
        reviewInput.value = '';
        currentRating = 0;
        submitted = false; // Reset the submitted flag
        updateStarDisplay();
    }
});

// Moved this inside the DOMContentLoaded function or remove if not needed
// submitted = true;

const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

function showGenre(genre) {
    const wrappers = document.querySelectorAll('.big-wrapper');
    wrappers.forEach(wrapper => {
        const genreType = wrapper.getAttribute('data-genre');
        if (genre === 'all' || genreType === genre) {
            wrapper.style.display = "grid";
            wrapper.classList.remove('show');
            void wrapper.offsetWidth;
            wrapper.classList.add('show');
        } else {
            wrapper.classList.remove('show');
            wrapper.style.display = 'none';
        }
    });
}
const books = [
    { id: 1, title: "The Subtle Art of Not Giving A F", genre: "self-help", image: "./Pictures/book1.png", url: "book1.html" },
    { id: 2, title: "Atomic Habits", genre: "self-help", image: "./Pictures/book2.png", url: "atomic-habits.html" },
    { id: 3, title: "48 Laws of Power", genre: "self-help", image: "./Pictures/book33.png", url: "48-laws-of-power.html" },
    { id: 4, title: "Mastery", genre: "self-help", image: "./Pictures/book4.png", url: "mastery.html" },
    { id: 5, title: "The Maid", genre: "mystery", image: "./Pictures/book5.png", url: "the-maid.html" },
    { id: 6, title: "رفقاء الليل", genre: "mystery", image: "./Pictures/book6.png", url: "night.html" },
    { id: 7, title: "حالات نادرة", genre: "mystery", image: "./Pictures/book7.png", url: "cases.html" },
    { id: 8, title: "يوتوبيا", genre: "mystery", image: "./Pictures/book8.png", url: "utopia.html" },
    { id: 9, title: "This Could Be Us", genre: "romance", image: "./Pictures/book9.png", url: "this-could-be-us-1.html" },
    { id: 10, title: "For You I'd Break", genre: "romance", image: "./Pictures/book10.png", url: "for-you-id-break.html" },
    { id: 11, title: "Until Love Sets Us Apart", genre: "romance", image: "./Pictures/book11.png", url: "until-love-sets-us-apart.html" },
    { id: 12, title: "Only Love Can Hurt Like This", genre: "romance", image: "./Pictures/book12.png", url: "only-love-can-hurt-like-this.html" },
    { id: 13, title: "Steve Jobs", genre: "Biography", image: "./Pictures/stevejobs.png", url: "stevejobs.html" },
    { id: 14, title: "American Prometheus", genre: "Biography", image: "./Pictures/americanprom.png", url: "americanpromethus.html" },
    { id: 15, title: "Alex Ferguson: My Autobiography", genre: "Biography", image: "./Pictures/AlexFerg.png", url: "siralex.html" }
];

// Get DOM elements
const searchInput = document.querySelector('.search-input');
const searchDropdown = document.getElementById('search-dropdown');
const searchIcon = document.querySelector('.search-icon');

// Add event listeners
searchInput.addEventListener('input', handleSearch);
searchIcon.addEventListener('click', () => {
    searchInput.focus();
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.search-container')) {
        searchDropdown.classList.remove('show');
    }
});

// Search function
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Only show dropdown if at least one character is typed
    if (searchTerm.length > 0) {
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );

        renderSearchResults(filteredBooks);
        searchDropdown.classList.add('show');
    } else {
        searchDropdown.classList.remove('show');
    }
}

// Render search results
function renderSearchResults(books) {
    searchDropdown.innerHTML = '';

    if (books.length === 0) {
        searchDropdown.innerHTML = '<div class="book-item"><div class="book-info"><div class="book-title">No books found</div></div></div>';
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <div class="book-info">
            <div class="book-title">${book.title}</div>
            <div class="book-genre">${book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}</div>
          </div>
        `;

        // Add click event to navigate to book page
        bookElement.addEventListener('click', () => {
            window.location.href = book.url;
        });

        searchDropdown.appendChild(bookElement);
    });
}