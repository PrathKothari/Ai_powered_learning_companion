from flask import Flask, request, jsonify
from flask_cors import CORS
import os
# import google.generativeai as genai
from dotenv import load_dotenv
# from functions import gemini_pro_response
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain
app = Flask(__name__)
CORS(app)

load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')

llm = ChatGroq(groq_api_key=groq_api_key, model_name="gemma2-9b-it", temperature=0.4, max_tokens = 700)
prompt = ChatPromptTemplate.from_template('''I have ADHD and struggle with focus. I need to complete the following task: <task>{task}<task>. 
                Break it into small, manageable subtasks that I can complete using the <technique>{technique}<technique>. 
                Each subtask should be clear, actionable, and time-bound. 
                Also, suggest a reward system to keep me motivated. 
                If the task is too complex, break it into multiple cycles with brief summaries after each cycle. 
                Keep the structure simple and ADHD-friendly.

            ''')
output_parser=StrOutputParser()
chain=prompt|llm|output_parser

# Define the task and technique
task = "Write a research paper on AI applications in healthcare."
technique = "Pomodoro Technique"

# Pass the task and technique to the chain and get the response
response = chain.invoke({"task": task, "technique": technique})
print(response)
# @app.route('/task', methods=['GET','POST'])
# def generate_guidance():
#     task = request.get_json()
#     technique = request.get_json()

#     if ((not task) or (not technique)):
#         return jsonify({"error": "No data provided"}), 400
    
#     
#     return task_division

# if __name__ == '__main__':
#     app.run(debug=True)