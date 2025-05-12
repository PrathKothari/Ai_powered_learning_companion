import requests

# Define the endpoint URL
url = 'http://127.0.0.1:5000/summarize'

# Define the file path and form data
file_path = 'C:/Users/Hp/Desktop/College Study Material/FCV/Module-5.pdf'
task = 'personalised learning'
interest = 'basketball'
question = 'Explain key stages of digital image processing'

# Prepare the file and the form data
files = {
    'file': open(file_path, 'rb'), 
}
data = {
    'task': task,
    'interest': interest,
    'question': question
}

try:
    # Send the POST request with file and form data
    response = requests.post(url, files=files, data=data)

    # Check the response status and output
    if response.status_code == 200:
        print("Response:", response.json()) 
    else:
        print(f"Failed to send request. Status code: {response.status_code}")
        print("Response:", response.text)
except Exception as e:
    print(f"Error: {e}")
finally:
    # Close the file after sending the request
    files['file'].close()
