import streamlit as st
from tempfile import NamedTemporaryFile
from features import generate_task_plan, text_summariser_personalised_learning

st.set_page_config(page_title="ADHD Learning Assistant", layout="wide")
st.title("🧠 ADHD Learning & Task Assistant")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
mode = st.selectbox(
    "Choose a feature",
    ["-- Select --", "Task Plan Generator", "Document-Based Learning / Summarization"]
)

if mode == "Task Plan Generator":
    st.header("📝 Generate ADHD-Friendly Task Plan")
    task_input = st.text_area("Describe your task:")
    technique = st.text_input("Enter the technique you want to use (e.g., Pomodoro, Time Blocking):")

    if st.button("Generate Plan"):
        if task_input and technique:
            with st.spinner("Generating ADHD-friendly plan..."):
                response = generate_task_plan(task_input, technique)
                st.success("Here’s your plan:")
                st.markdown(response)
        else:
            st.warning("Please fill in both the task and the technique.")
elif mode == "Document-Based Learning / Summarization":
    st.header("📚 Document Chatbot")

    # Step 2: Choose sub-task
    sub_task = st.radio("Select your goal:", ["Personalised Learning", "Text Summariser"], horizontal=True)

    uploaded_file = st.file_uploader("Upload a PDF document", type="pdf")
    interest = st.text_input("Your interest (for explanations):")

    if uploaded_file:
        if "temp_file_path" not in st.session_state:
            with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(uploaded_file.read())
                st.session_state.temp_file_path = tmp_file.name

        question = st.chat_input("Ask a question about your document:")

        if question:
            with st.spinner("Thinking..."):
                answer = text_summariser_personalised_learning(
                    task=sub_task,
                    interest=interest,
                    filepath=st.session_state.temp_file_path,
                    question=question

                )
                # Append to chat history
                st.session_state.chat_history.append(("user", question))
                st.session_state.chat_history.append(("assistant", answer))

        # Display chat history
        for sender, msg in st.session_state.chat_history:
            with st.chat_message(sender):
                st.markdown(msg)