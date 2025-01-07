document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('compatibility-form');
    const resultDiv = document.getElementById('result');
    const loadingScreen = document.getElementById('loading-screen');

    // Deva's predefined data
    const devaProfile = {
        name: "Deva",
        age: 25,
        favFood: "biriyani",
        favPlace: "beach",
        hobby: "gaming",
        favMovie: "comedy",
        petPreference: "dog",
        favIndianArtist: "arrahman",
        favInternationalArtist: "coldplay",
        favFestival: "diwali",
        morningPerson: "morning"
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Show loading screen
        loadingScreen.style.display = 'flex';

        // Collect user input
        const userName = document.getElementById('name').value.trim();
        const userAge = parseInt(document.getElementById('age').value.trim());
        const userFavFood = document.getElementById('favFood').value.toLowerCase();
        const userFavPlace = document.getElementById('favPlace').value.toLowerCase();
        const userHobby = document.getElementById('hobby').value.toLowerCase();
        const userFavMovie = document.getElementById('favMovie').value.toLowerCase();
        const userPetPreference = document.getElementById('petPreference').value.toLowerCase();
        const userFavIndianArtist = document.getElementById('favIndianArtist').value.toLowerCase();
        const userFavInternationalArtist = document.getElementById('favInternationalArtist').value.toLowerCase();
        const userFavFestival = document.getElementById('favFestival').value.toLowerCase();
        const userMorningPerson = document.getElementById('morningPerson').value.toLowerCase();

        // Simulate processing time with setTimeout (e.g., 2 seconds)
        setTimeout(() => {
            // Calculate compatibility score
            let score = 0;
            const totalFactors = 11; // Updated to match the number of factors

            // Compare each factor
            if (userName.toLowerCase() === devaProfile.name.toLowerCase()) score += 1;
            if (userAge === devaProfile.age) score += 1;
            if (userFavFood === devaProfile.favFood) score += 1;
            if (userFavPlace === devaProfile.favPlace) score += 1;
            if (userHobby === devaProfile.hobby) score += 1;
            if (userFavMovie === devaProfile.favMovie) score += 1;
            if (userPetPreference === devaProfile.petPreference) score += 1;
            if (userFavIndianArtist === devaProfile.favIndianArtist) score += 1;
            if (userFavInternationalArtist === devaProfile.favInternationalArtist) score += 1;
            if (userFavFestival === devaProfile.favFestival) score += 1;
            if (userMorningPerson === devaProfile.morningPerson) score += 1;

            // Add some randomness
            score += Math.floor(Math.random() * 3); // Add 0,1,2

            // Normalize score to 100
            const maxScore = totalFactors + 2; // Maximum possible score with randomness
            let compatibility = Math.min((score / maxScore) * 100, 100);
            compatibility = Math.round(compatibility);

            // Set the score in the hidden input for FormSubmit
            document.getElementById('score').value = compatibility;

            // Determine result message and styling based on multiple thresholds
            let message = "";
            let cssClass = "";
            let icon = "";

            if (compatibility >= 95) {
                // Perfect Match
                message = `🌟 Perfect Match! ${userName}, you and Deva are *absolutely compatible* with a score of ${compatibility}%. You might be *destined* for each other! 💖💖`;
                cssClass = "perfectMatch";
                icon = "💖";
            } else if (compatibility >= 85) {
                // Great Match
                message = `✨ Great Match! ${userName}, you and Deva have a *fantastic compatibility* score of ${compatibility}%. Keep the spark alive! 🌟`;
                cssClass = "greatMatch";
                icon = "🌟";
            } else if (compatibility >= 70) {
                // Good Match
                message = `😊 Good Match! ${userName}, you and Deva have a *solid compatibility* score of ${compatibility}%. There's potential for a great relationship! 💕`;
                cssClass = "goodMatch";
                icon = "💕";
            } else if (compatibility >= 50) {
                // Average Match
                message = `😐 Average Match. ${userName}, your compatibility with Deva is ${compatibility}%. It could work with some effort! 🤔`;
                cssClass = "averageMatch";
                icon = "🤔";
            } else if (compatibility >= 30) {
                // No Match
                message = `😕 No Match. ${userName}, your compatibility with Deva is only ${compatibility}%. It might be challenging to connect! 😞`;
                cssClass = "noMatch";
                icon = "😞";
            } else {
                // Get Out
                message = `💔 Get Out! ${userName}, your compatibility with Deva is just ${compatibility}%. It might be best to part ways! 🚶‍♀️🚶‍♂️`;
                cssClass = "getOut";
                icon = "🚶‍♀️🚶‍♂️";
            }

            // Display the result with icon
            resultDiv.innerHTML = `<span class="icon">${icon}</span>${message}`;
            resultDiv.className = `result ${cssClass}`;
            resultDiv.style.display = 'flex';

            // Hide loading screen
            loadingScreen.style.display = 'none';

            // Prepare form data for submission
            const formData = new FormData(form);

            // Send form data to FormSubmit using fetch
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });

            // Trigger confetti for positive matches
            if (compatibility >= 70) {
                triggerConfetti();
            }
        }, 2000); // 2-second delay to simulate loading
    });

    // Function to trigger confetti animation for positive matches
    function triggerConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
});
