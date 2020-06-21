const db = require("../db.json");
const fs = require("fs");

module.exports = app => {

  app.get("/api/notes", (req, res) => {
    fs.readFile('db.json', (err, data) => {
      if (err) throw err; 
      let notes = JSON.parse(data);
      res.json(notes);      
    });
  });

  app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let noteUpdate = JSON.parse(fs.readFileSync("db.json"));
    const newNote = req.body;

    for (let i = 0; i < db.length; i++) {  
      newNote.id = i + 1 ;
  }

    console.log(newNote);

    db.push(newNote);
    noteUpdate.push(newNote);
   
    let json = JSON.stringify(noteUpdate);

    fs.writeFile('db.json', json, (err, data) => {
      if (err) throw err;       
        console.log('Note Succesfully Added to Json File');
    })
    
    res.json(db);
  });

  app.delete("/api/notes/:id", (req, res) => {

    fs.readFile('db.json', (err, data) => {
        if (err) throw err; 
          let arr = JSON.parse(data);
          let deletedArray = arr.filter((x) => x.id != parseInt(req.params.id));
          let json = JSON.stringify(deletedArray);
  
        fs.writeFile('db.json', json, (err) => {
        if (err) throw err;            
        console.log('Note Succesfully deleted from Json File');
        console.log(db);
      });
    });        

    res.end();
  });
  
};