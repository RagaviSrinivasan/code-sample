//Load Express Framework
var express = require('express');

//Load Mustache Template Engine
var mustachex = require('mustachex');

//Load Oracle
var oracledb = require('oracledb');

//Call express
var app = express();

var bodyParser = require('body-parser');

var orawrap = require('orawrap');
var dbConfig = {
    user: '*********',
    password: '*********',
    connectString: 'csoracle.utdallas.edu/student.csoracle.utdallas.edu',
    poolMax: 20,
    poolMin: 2,
    poolIncrement: 2,
    poolTimeout: 10
};

//Set Global App Settings
app.engine('html', mustachex.express);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/majestic', function(req, res) {
  res.render('majestic.html');
});

app.post('/majestic/domain/no_idx', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC where Domain='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "Domain not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/domain/idx1', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX1 where Domain='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "Domain not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/domain/idx2', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX2 where Domain='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "Domain not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/domain/idx3', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX3 where Domain='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "Domain not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/tld/no_idx', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC where TLD='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "TLD not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/tld/idx1', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX1 where TLD='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "TLD not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/tld/idx2', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX2 where TLD='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "TLD not found"

               }
               );
             }
           }
        }
 );
});

app.post('/majestic/tld/idx3', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX3 where TLD='" + domain + "'";


 orawrap.execute(
         sql_statement,
         function(err, result)
         {
           if (err) {
              console.error(err);
              res.render('error',
                {
                  message: err.message
                }
              );

           }
           else {
             if (result.rows.length >0) {
               res.render('result',
               {
                 title: result.rows[0][0],
                 author: result.rows[0][1],
                 price: result.rows[0][2]
               }
               );
             }
             else {
               res.render('error',
               {
                  message: "TLD not found"

               }
               );
             }
           }
        }
 );
});


//Create Server
var port = Number(process.env.PORT || 5001);
orawrap.createPool(dbConfig, function(err, pool) {
   // The pool that was created is provided in the callback function,  
   // but it's rarely needed as it's stored within orawrap for use later 
   if (err) throw err;
   //Start the web server now that the pool is ready to handle incoming requests 
   app.listen(port, function() {
       console.log('Web server listening on localhost: 5001');
   });
});

