import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import Qdrant

load_dotenv()
qdrant_key = os.getenv('QDRANT_KEY')
os.environ['HF_TOKEN'] = os.getenv("HF_TOKEN")

def ingest_user_docs(user_id, split_docs, model_name="all-MiniLM-L6-v2"):
    embeddings = HuggingFaceEmbeddings(model_name=model_name)

    qdrant_client = QdrantClient(
        url="https://3148a085-b487-4364-8314-0dd65f9e5d33.europe-west3-0.gcp.cloud.qdrant.io",
        api_key=qdrant_key
    )

    collection_name = "user_embeddings"
    existing_collections = [c.name for c in qdrant_client.get_collections().collections]

    if collection_name not in existing_collections:
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE)
        )

    docs = [
        Document(page_content=doc.page_content, metadata={**doc.metadata, "user_id": user_id})
        for doc in split_docs
    ]

    qdrant_vectorstore = Qdrant(
        client=qdrant_client,
        collection_name=collection_name,
        embeddings=embeddings,
    )

    qdrant_vectorstore.add_documents(docs)

    retriever = qdrant_vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3, "filter": {"user_id": user_id}}
    )

    return retriever