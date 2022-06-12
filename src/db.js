
const fs = require("fs");

const query = { "RELEASED":"2021", "TITLE_NAME": "Here and There" };

const query2 = { "TITLE_NAME": "Here and There" };
 

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abcdefgh:abcdefgh@cluster0.tciwr.mongodb.net/?retryWrites=true&w=majority";

module.exports=() =>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("NETFLIX");
        dbo.collection("BDD").find(query).toArray(function(err, result) {
          if (err) throw err;
          const JSONConsulta  = JSON.stringify(result);
          fs.writeFileSync("./datos/JSON/Consulta.json", JSONConsulta, "utf-8");
          console.log(result);
          db.close();
        });
      })}