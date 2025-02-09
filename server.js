//Form submission needed from Home Page: Newsletter?, FAQ Page: Leave a comment and Create a recipe page.
//Also for registration/login


// Created a new JS file to handle the Backend API with Express.js
// This script will handle API requests and store comments in a database.


// Below refrences the FAQ page for leave a comment/question
//still need to setup the database in MongoDB

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Comment Schema
const CommentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  notify: Boolean,
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

// API Route to handle form submission
app.post('/api/comments', async (req, res) => {
  try {
    const { name, email, comment, notify } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({ name, email, comment, notify });
    await newComment.save();
    
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API Route to get all comments
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
