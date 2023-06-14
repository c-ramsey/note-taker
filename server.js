const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// route to serve index.html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  // route to serve notes.html 

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });
  
  // route to get all saved notes from db.json 

  app.get('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve notes.' });
      }
      
      const notes = JSON.parse(data);
      return res.json(notes);
    });
  });
  
  // route to save a new note to db.json 

  app.post('/api/notes', (req, res) => {
    
    // read the db.json file

    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note.' });
      }
      
      const notes = JSON.parse(data);
      
      // generate a unique id for the new note (you can use a package like 'uuid' for this)

      const newNote = {
        id: generateUniqueId(), // Replace with the actual id generation logic
        title: req.body.title,
        text: req.body.text
      };
      
      notes.push(newNote);
      
      // write the updated notes to db.json 

      fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save note.' });
        }
        
        return res.json(newNote);
      });
    });
  });

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  