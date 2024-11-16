const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./models/Document");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb+srv://vedupatil0710:Vedu%401024@cluster0.6qhlg.mongodb.net/collaborative-editor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(cors());
app.use(express.json());

// API to save the document
app.post("/api/document", async (req, res) => {
    const { title, content } = req.body;
    try {
      const document = new Document({ title, content });
      await document.save();
      res.status(200).json({ message: "Document saved", id: document._id });
    } catch (err) {
      res.status(500).json({ message: "Error saving document", error: err });
    }
  });
  
  // API to retrieve a document by ID
  app.get("/api/document/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const document = await Document.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json(document);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving document", error: err });
    }
  });
  
  // Route to get all documents
app.get("/api/documents", async (req, res) => {
    try {
      const documents = await Document.find(); // Fetch all documents
      res.status(200).json(documents);
    } catch (err) {
      res.status(500).json({ message: "Error fetching documents", error: err });
    }
  });
  
  // Route to delete a document by its ID
  app.delete("/api/document/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const document = await Document.findByIdAndDelete(id); // Delete the document
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json({ message: "Document deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting document", error: err });
    }
  });
  
  // Socket.IO for real-time collaboration
  io.on("connection", (socket) => {
    console.log("New user connected");
  
    // Listen for changes to the document
    socket.on("document-change", (data) => {
      // Emit the change to all other clients except the sender
      socket.broadcast.emit("document-change", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
