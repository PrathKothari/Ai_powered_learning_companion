import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from vector_database import ingest_user_docs

load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')

def generate_task_plan(task: str, technique: str) -> str:
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="gemma2-9b-it", temperature=0.4, max_tokens=700)
    prompt = ChatPromptTemplate.from_template(''' 
    I have ADHD and struggle with focus. I need to complete the following task: <task>{task}<task>. 
    Break it into small, manageable subtasks that I can complete using the <technique>{technique}<technique>. 
    Each subtask should be clear, actionable, and time-bound. 
    Also, suggest a reward system to keep me motivated. 
    If the task is too complex, break it into multiple cycles with brief summaries after each cycle. 
    Keep the structure simple and ADHD-friendly. ''')
    
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"task": task, "technique": technique})

def gather_information(filepath):
    loader = PyPDFLoader(filepath)
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    splits = text_splitter.split_documents(documents)

    return ingest_user_docs(split_docs=splits)

def text_summariser_personalised_learning(task, interest, filepath, question):
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama3-70b-8192")
    retriever = gather_information(filepath)

    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template=f"""
        You are a Question-Answer assistant, given the information and the task of {task}.
        If the task is personalised learning, explain the information in terms of the user's interest: {interest}, using easy-to-understand language.
        If the task is summarization generate long paragraphs, use the context (document) given and do onot summarize in the interest. 
        Do not hallucinate, use the document provided. Provide helpful answer.

        Context:
        {{context}}

        Question: {{question}}

        Answer:""")

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt_template}
    )

    return qa_chain.run(question)