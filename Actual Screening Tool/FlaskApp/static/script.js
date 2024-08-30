console.log('Main script loaded successfully');

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const form = document.getElementById('predictionForm');
    if (form) {
        console.log('Form found');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            const formData = {
                gender: parseInt(document.getElementById('gender').value),
                age: parseInt(document.getElementById('age').value),
                hypertension: parseInt(document.getElementById('hypertension').value),
                heart_disease: parseInt(document.getElementById('heart_disease').value),
                bmi: parseFloat(document.getElementById('bmi').value),
                HbA1c_level: parseFloat(document.getElementById('HbA1c_level').value),
                blood_glucose_level: parseInt(document.getElementById('blood_glucose_level').value)
            };

            console.log('Form data:', formData);

            fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Prediction data:', data);
                document.getElementById('result').innerHTML = `
                    Prediction: ${data.prediction}<br>
                    Probability of diabetes: ${(data.probability * 100).toFixed(2)}%
                `;
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('result').innerHTML = 'An error occurred. Please try again.';
            });
        });
    } else {
        console.error('Form not found');
    }
});