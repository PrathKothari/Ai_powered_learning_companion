import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore

load_dotenv()
qdrant_key = os.getenv("QDRANT_KEY")
os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")

def ingest_user_docs(split_docs, model_name="all-MiniLM-L6-v2"):
    embeddings = HuggingFaceEmbeddings(model_name=model_name)
    collection_name = "user_embeddings"
    qdrant_url = "https://3148a085-b487-4364-8314-0dd65f9e5d33.europe-west3-0.gcp.cloud.qdrant.io"

    qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_key)

    # Create collection if not exists
    if collection_name not in [c.name for c in qdrant_client.get_collections().collections]:
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )

    qdrant_vectorstore = QdrantVectorStore.from_existing_collection(
        embedding=embeddings,
        collection_name=collection_name,
        url=qdrant_url,
        api_key=qdrant_key,
    )

    qdrant_vectorstore.add_documents(split_docs)

    return qdrant_vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})