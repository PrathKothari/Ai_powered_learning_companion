import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
import os
from vector_database import ingest_user_docs

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')


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


from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq

def text_summariser_personalised_learning(task, interest):
    # Initialize LLM and output parser
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")
    output_parser = StrOutputParser()

    # Create retriever
    retriever = gather_information()  # This must return a retriever (e.g., VectorStoreRetriever)

    # Define the prompt template for the QA chain
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are a Question-Answer assistant, given the information and the task of {task}.
If the task is personalised learning, explain the information in terms of the user's interest: {interest}, using easy-to-understand language.
If the task is summarization, be clear, simple, and factual.
Do not hallucinate. Provide a helpful answer.

Context:
{context}

Question: {question}

Answer:""".strip().replace("{task}", task).replace("{interest}", interest)
    )

    # Create the QA chain with the prompt
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt_template}
    )

    # Example question
    question = "Explain Attention Mechanism"

    # Run the chain and return the result
    result = qa_chain.run(question)
    return result


def gather_information():
    # Example of gathering information from a PDF
    loader = PyPDFLoader("C:/Users/PRATHAM/OneDrive/Desktop/LangChain/research_papers/Attention.pdf")
    documents = loader.load()

    # Split the document into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    splits = text_splitter.split_documents(documents)

    # Use the ingest_user_docs function to return a retriever (you need to define this function separately)
    return ingest_user_docs(1, splits)

# Call the main function
result = text_summariser_personalised_learning(task="personalised learning", interest="cricket")
print(result)


