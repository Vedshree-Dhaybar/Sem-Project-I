import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

const Editor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const { id } = useParams(); // Get document ID from URL if available
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load document if an ID is present
    if (id) {
      axios.get(`/api/document/${id}`).then((res) => {
        setEditorContent(res.data.content);
      }).catch(err => console.log(err));
    }

    // Listen for document changes from other users
    socket.on("document-change", (data) => {
      setEditorContent(data.content);
    });

    return () => {
      socket.off("document-change");
    };
  }, [id]);

  const handleEditorChange = (value) => {
    setEditorContent(value);
    socket.emit("document-change", { id, content: value });
  };

  const handleSave = async () => {
    try {
      let response;
      if (id) {
        // Update existing document
        response = await axios.put(`/api/document/${id}`, { content: editorContent });
      } else {
        // Create a new document
        response = await axios.post("/api/document", { title: "New Document", content: editorContent });
        setDocumentId(response.data.id);
      }
      alert('Document saved');
    } catch (err) {
      alert('Error saving document');
    }
  };

  const handleShare = () => {
    if (documentId) {
      navigate(`/document/${documentId}`);
    } else {
      alert('Save the document before sharing');
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Document' : 'Create New Document'}</h2>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={handleEditorChange}
        theme="snow"
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default Editor;
