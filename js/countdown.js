// Define the target date for the countdown
const targetDate = new Date(2024, 7, 11);

document.addEventListener('DOMContentLoaded', function () {
    // Get the countdown element
    const countdownElement = document.getElementById('countdown');

    // Update the countdown every second
    const timerInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            countdownElement.textContent = "Eu sunt ursul, sa inceapa concursul!";
            return;
        }
        
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Format the remaining time
        const formattedTime = formatTime(months, days, hours, minutes);
        countdownElement.textContent = formattedTime;
    }

    // Function to format the remaining time
    function formatTime(months, days, hours, minutes) {
        return `${String(months).padStart(2, '0')} Months, ${String(days).padStart(2, '0')} Days, ${String(hours).padStart(2, '0')} Hours, ${String(minutes).padStart(2, '0')} Minutes`;
    }
});
