from flask import Flask, request, jsonify, render_template
import tensorflow as tf
import numpy as np

app = Flask(__name__)

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
    
    features = [
        data['HighBP'], data['HighChol'], data['CholCheck'], data['BMI'],
        data['Smoker'], data['Stroke'], data['HeartDiseaseorAttack'],
        data['PhysActivity'], data['Fruits'], data['Veggies'],
        data['HvyAlcoholConsump'], data['AnyHealthcare'], data['NoDocbcCost'],
        data['GenHlth'], data['MentHlth'], data['PhysHlth'],
        data['DiffWalk'], data['Sex'], data['Age'],
        data['Education'], data['Income']
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

if __name__ == '__main__':
    app.run(debug=True)