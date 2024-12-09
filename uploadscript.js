// JavaScript for File Validation
const form = document.getElementById('diagnoseForm');
const fileInput = document.getElementById('fileUpload');
const loadingIndicator = document.getElementById('loading');
const diseaseResult = document.getElementById('diseaseResult');
const errorMessage = document.getElementById('errorMessage'); // Add this element for error messages

// Event listener for form submission
form.addEventListener('submit', (e) => {
    const file = fileInput.files[0];

    // Clear any previous error message
    errorMessage.textContent = '';

    // Validate file type
    if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
        errorMessage.textContent = 'Please upload a valid image (JPG/PNG).';
        e.preventDefault();
        return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) { // 5MB size limit
        errorMessage.textContent = 'File size exceeds 5MB. Please upload a smaller file.';
        e.preventDefault();
        return;
    }

    // Show loading indicator and clear previous results
    loadingIndicator.style.display = 'block';
    diseaseResult.textContent = 'Processing your image... Please wait.';
});

// JavaScript for Diagnose Button (Optional Custom Behavior)
function diagnoseImage() {
    // Add custom functionality here if needed
    console.log('Diagnosing image...');
}

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1200, // Animation duration
    easing: 'ease-in-out', // Animation easing
    once: true, // Only animate once
});

// JavaScript for Bootstrap Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
});

// Example: Mocking result update (Optional, Simulate Backend Response)
function mockResultUpdate() {
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        diseaseResult.textContent = 'Your plant seems healthy! No diseases detected.';
    }, 5000); // Mock a delay of 5 seconds
}

// Trigger mock result update for demonstration
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Remove for actual backend implementation
    mockResultUpdate(); // Simulate result update
});
