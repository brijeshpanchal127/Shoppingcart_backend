var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function (req, res, next) {

  MongoClient.connect(url, { useUnifiedTopology: true },
    function (err, db) {
      if (err) {
        throw err;
      }
      else {
        var dbo = db.db("HABSTORES");
        dbo.collection("Products").find().toArray(function (err, result) {
          if (err) {
            throw err;
          }
          else {
            res.json({ data: result });
            res.end();
            // db.close();
          }
        });
      }
    });

});


router.patch("/placeorder", function (req, res, next) {
  console.log(req.body.items[0].name);

  req.body.items.map(item => {
    MongoClient.connect(url, { useUnifiedTopology: true },
      function (err, db) {
        if (err) {
          throw err;
        }
        else {
          var dbo = db.db("HABSTORES");
          dbo.collection("Products").updateOne({ name: item.name },
            {
              $inc: { "stock": -1 }
            });

        }

      });

  });
  res.status(200).send("success");
});
module.exports = router;
