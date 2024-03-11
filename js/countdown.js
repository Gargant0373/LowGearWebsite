const targetDate = new Date();
targetDate.setFullYear(2024);
targetDate.setMonth(8);
targetDate.setDate(11);

document.addEventListener('DOMContentLoaded', function () {
    // Update the countdown every second
    const countdownElement = document.getElementById('countdown');
    const timerInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            countdownElement.textContent = "Eu sunt ursul, sa inceapa concursul!";
        } else {
            const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            // Display the remaining time in the 'months:days:hours:minutes:seconds' format
            const formattedTime = `${String(months).padStart(2, '0')} Months, ${String(days).padStart(2, '0')} Days, ${String(hours).padStart(2, '0')} Hours, ${String(minutes).padStart(2, '0')} Minutes`;
            countdownElement.textContent = formattedTime;
        }
    }
});