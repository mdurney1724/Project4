# Project4
This Flask API allows users to predict the likelihood of diabetes based on specific health metrics. The API uses a pre-trained TensorFlow model to generate predictions.

# Files in This Project
- app.py: The main Flask application file.
- diabetes_prediction_model.h5: The pre-trained TensorFlow model used for making predictions.

# How It Works

Home Page: The root route (/) renders an index.html file. This can be customized to include an interface for users to input their health data.

Prediction Endpoint: The /predict route accepts POST requests with JSON-formatted health data. The application processes this data and uses the TensorFlow model to predict the likelihood of diabetes.

# Example Request
To make a prediction, send a POST request to /predict with a JSON payload like this:

      {
        "gender": 1,
        "age": 45,
        "hypertension": 0,
        "heart_disease": 0,
        "bmi": 28.5,
        "HbA1c_level": 6.1,
        "blood_glucose_level": 130
      }
      
# Example Response
The API will respond with a JSON object containing the probability of diabetes and a prediction message:

      {
        "probability": 0.75,
        "prediction": "At risk for diabetes"
      }
      
# Logging
The application includes logging to help monitor and debug requests and predictions. Logs are generated for each step, including data receipt, input processing, and prediction.

# Error Handling
If an error occurs during the prediction process, the API will return a JSON response with an error message and a 500 status code.
