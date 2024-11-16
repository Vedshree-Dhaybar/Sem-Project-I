import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config.js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch all documents from the server when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents');
        setDocuments(response.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };
    
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/document/${id}`);
      // Remove the deleted document from the state list
      setDocuments(documents.filter((doc) => doc._id !== id));
      alert('Document deleted');
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Error deleting document');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <h3>{doc.title}</h3>
            <button onClick={() => navigate(`/document/${doc._id}`)}>Edit</button>  {/* Redirect to editor */}
            <button onClick={() => handleDelete(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/editor")}>Create New Document</button>
    </div>
  );
};

export default HomePage;
