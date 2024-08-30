from flask import Flask, request, jsonify, render_template
import tensorflow as tf
import numpy as np
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load the pre-trained model
model = tf.keras.models.load_model('diabetes_prediction_model.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    app.logger.info('Received prediction request')
    data = request.json
    app.logger.info(f'Request data: {data}')

    try:
        features = [
            data['gender'],
            data['age'],
            data['hypertension'],
            data['heart_disease'],
            data['bmi'],
            data['HbA1c_level'],
            data['blood_glucose_level']
        ]

        user_inputs = np.array(features).reshape(1, -1)
        app.logger.info(f'Processed inputs: {user_inputs}')

        prediction = model.predict(user_inputs)
        app.logger.info(f'Raw prediction: {prediction}')

        threshold = 0.3
        predicted_class = int((prediction > threshold)[0][0])

        result = {
            'probability': float(prediction[0][0]),
            'prediction': 'At risk for diabetes' if predicted_class == 1 else 'Likely not diabetic'
        }

        app.logger.info(f'Prediction result: {result}')
        return jsonify(result)
    except Exception as e:
        app.logger.error(f'Error during prediction: {str(e)}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)