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
                HighBP: parseInt(document.getElementById('HighBP').value),
                HighChol: parseInt(document.getElementById('HighChol').value),
                CholCheck: parseInt(document.getElementById('CholCheck').value),
                BMI: parseFloat(document.getElementById('BMI').value),
                Smoker: parseInt(document.getElementById('Smoker').value),
                Stroke: parseInt(document.getElementById('Stroke').value),
                HeartDiseaseorAttack: parseInt(document.getElementById('HeartDiseaseorAttack').value),
                PhysActivity: parseInt(document.getElementById('PhysActivity').value),
                Fruits: parseInt(document.getElementById('Fruits').value),
                Veggies: parseInt(document.getElementById('Veggies').value),
                HvyAlcoholConsump: parseInt(document.getElementById('HvyAlcoholConsump').value),
                AnyHealthcare: parseInt(document.getElementById('AnyHealthcare').value),
                NoDocbcCost: parseInt(document.getElementById('NoDocbcCost').value),
                GenHlth: parseInt(document.getElementById('GenHlth').value),
                MentHlth: parseInt(document.getElementById('MentHlth').value),
                PhysHlth: parseInt(document.getElementById('PhysHlth').value),
                DiffWalk: parseInt(document.getElementById('DiffWalk').value),
                Sex: parseInt(document.getElementById('Sex').value),
                Age: parseInt(document.getElementById('Age').value),
                Education: parseInt(document.getElementById('Education').value),
                Income: parseInt(document.getElementById('Income').value)
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