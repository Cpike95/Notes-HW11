const path = require("path");
const fs = require("fs");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = (app) =>  {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    fs.readFile('db.json', 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data);
    });
  });

};