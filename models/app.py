from flask import Flask, request, jsonify
from flask_cors import CORS
import os
# import google.generativeai as genai
from dotenv import load_dotenv
# from functions import gemini_pro_response
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

app = Flask(__name__)
CORS(app)

load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')

llm = ChatGroq(groq_api_key=groq_api_key, model_name="gemma2-9b-it", temperature=0.4, max_tokens = 500, presence_penalty = 0.5 )
prompt = ChatPromptTemplate.from_template('''I have ADHD and struggle with focus. I need to complete the following task: <task>{task}<task>. 
                Break it into small, manageable subtasks that I can complete using the <technique>{technique}<technique>. 
                Each subtask should be clear, actionable, and time-bound. 
                Also, suggest a reward system to keep me motivated. 
                If the task is too complex, break it into multiple cycles with brief summaries after each cycle. 
                Keep the structure simple and ADHD-friendly.

                Example in Action:
                Task: Write a 1000-word essay on climate change.
                Technique: Pomodoro Technique

                AI Response (Divided into Pomodoro Cycles)

                Pomodoro 1 (25 mins) - Research & Planning
                Skim 2-3 reliable sources on climate change.
                Write down key points & references.
                Draft a rough outline (Introduction, Body, Conclusion).
                ⏸ 5-Minute Break - Stretch, grab a snack.

                Pomodoro 2 (25 mins) - Writing the Introduction
                4. Write an engaging hook and thesis statement.
                5. Briefly introduce key themes.
                ⏸ 5-Minute Break - Listen to your favorite song.

                Pomodoro 3 (25 mins) - Writing Body Paragraphs
                6. Write the first two body paragraphs (causes & effects).
                7. Keep sentences short and clear.
                ⏸ 5-Minute Break - Walk around, breathe deeply.

                Pomodoro 4 (25 mins) - Writing Conclusion & Proofreading
                8. Summarize key points and conclude.
                9. Proofread for clarity and grammar.

                Reward: After finishing, enjoy 15 minutes of gaming, YouTube, or a small treat! ''')
response = llm.invoke(prompt)
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