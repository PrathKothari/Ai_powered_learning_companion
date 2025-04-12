import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')

# Setup LLM chain
llm = ChatGroq(groq_api_key=groq_api_key, model_name="gemma2-9b-it", temperature=0.4, max_tokens=700)
prompt = ChatPromptTemplate.from_template('''
    I have ADHD and struggle with focus. I need to complete the following task: <task>{task}<task>. 
    Break it into small, manageable subtasks that I can complete using the <technique>{technique}<technique>. 
    Each subtask should be clear, actionable, and time-bound. 
    Also, suggest a reward system to keep me motivated. 
    If the task is too complex, break it into multiple cycles with brief summaries after each cycle. 
    Keep the structure simple and ADHD-friendly.
''')

output_parser = StrOutputParser()
chain = prompt | llm | output_parser

def generate_task_plan(task: str, technique: str) -> str:
    # Generates a structured plan for the given task using the specified technique.
    return chain.invoke({"task": task, "technique": technique})