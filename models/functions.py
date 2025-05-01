import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Qdrant
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_huggingface import HuggingFaceEmbeddings
from qdrant_client import QdrantClient
# from qdrant_client.http.models import Distance, VectorParams
import os

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')
os.environ['HF_TOKEN']=os.getenv("HF_TOKEN")
qdrant_key = os.getenv('QDRANT_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')

embeddings=HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

qdrant_client = QdrantClient(
    url="https://3148a085-b487-4364-8314-0dd65f9e5d33.europe-west3-0.gcp.cloud.qdrant.io",
    api_key=qdrant_key
)


def generate_task_plan(task: str, technique: str) -> str:
    # Generates a structured plan for the given task using the specified technique.
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
    return chain.invoke({"task": task, "technique": technique})


#Do not remove the comments, the code is to be changed later when the database is ready
# def text_summariser_personalised_learning(task, interest, information):
#     llm = ChatGroq(groq_api_key=groq_api_key, model_name = "mixtral-8x7b-32768")
#     output_parser = StrOutputParser()
#     system_prompt = (
#                 "You are a Question-Answer assistant, given the information and the task - {task} to perform"
#                 "If the task is personalised learning then explain the information in terms of the user's interest and easy to understand language - {interest}"
#                 "If the task is summarization then be clear in your language, simple to understand and easy to grasp"
#                 "answer clearly and factually. Do not hallucinate."
#                 "\n\n"
#             )
#     qa_prompt = ChatPromptTemplate.from_messages(
#                 [
#                     ("system", system_prompt),
#                     ("human", "{input}"),
#                 ]
#             )


# def gather_information():
#     task="personalised_learning"
#     interest="cricket"
#     loader = PyPDFLoader("C:/Users/PRATHAM/OneDrive/Desktop/LangChain/research_papers/Attention.pdf")
#     documents = loader.load()
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
#     splits = text_splitter.split_documents(documents)





