document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize elements
    const reviewForm = document.querySelector('.container');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const stars = document.querySelectorAll('.star');
    const reviewInput = reviewForm.querySelector('input[type="text"]');
    let currentRating = 0;

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
    stars.forEach(star => {
        star.style.fontSize = '40px';
        star.style.margin = '0 5px';

        star.addEventListener('click', function () {
            currentRating = parseInt(this.getAttribute('data-rating'));
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
        savedReviews.forEach(review => {
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
        });

        reviewsContainer.prepend(reviewElement);
    }

    function resetForm() {
        reviewInput.value = '';
        currentRating = 0;
        updateStarDisplay();
    }
});