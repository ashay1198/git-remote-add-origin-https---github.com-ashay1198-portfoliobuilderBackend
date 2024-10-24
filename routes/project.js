const express = require('express');
const connection = require('../connection');
const { error } = require('console');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// Get all projects
router.get('/getAllProjects', (req, res) => {
  const query = 'SELECT * FROM projects';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//Get project by id
router.get('/getProjectByID/:id', (req, res) => {
  const query = 'SELECT * FROM projects WHERE id = ?';
  connection.query(query, [req.params.id], (err, results) => {  // Ensure 'results' is captured here
    if (err) {
      return res.status(500).json(err);
    }
    if (results.length === 0) {  // Check if the project exists
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(results[0]);  // Send the first result back as a response
  });
});

// Create a new project
router.post('/addProjects', (req, res) => {
  const { title, description, technologies, github_link, demo_link, category, image } = req.body;
  const query = `INSERT INTO projects (title, description, technologies, github_link, demo_link, category, image) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [title, description, technologies, github_link, demo_link, category, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Project added successfully' });
  });
});

// Update a project
router.put('/updateProjects/:id', (req, res) => {
  const { title, description, technologies, github_link, demo_link, category, image } = req.body;
  const query = `UPDATE projects SET title = ?, description = ?, technologies = ?, github_link = ?, 
                   demo_link = ?, category = ?, image = ? WHERE id = ?`;

  connection.query(query, [title, description, technologies, github_link, demo_link, category, image, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Project updated successfully' });
    });
});

// Delete a project
router.delete('/deleteProjects/:id', (req, res) => {
  const query = 'DELETE FROM projects WHERE id = ?';
  connection.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Project deleted successfully' });
  });
});
module.exports = router;