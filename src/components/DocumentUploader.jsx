import React, { useState } from "react";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2"; // Optional icon

const DocumentUploader = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Summary error:", err);
      setSummary("Error processing document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-dashed border-indigo-400 rounded-xl p-6 bg-indigo-50 flex flex-col items-center text-center">
        <HiOutlineDocumentArrowUp className="text-indigo-600 text-5xl mb-3" />
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Upload a document to get a quick summary
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="mt-2 w-full max-w-xs text-sm text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-indigo-600 file:text-white
          hover:file:bg-indigo-700"
        />
        <p className="text-xs text-gray-500 mt-2">Accepted: .pdf, .docx, .txt</p>
      </div>

      {loading && (
        <p className="text-indigo-600 text-sm italic text-center">Summarizing your document...</p>
      )}

      {summary && (
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
          <h4 className="text-lg font-bold text-indigo-700 mb-2">Summary:</h4>
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
