//Load Express Framework
var express = require('express');

//Load Mustache Template Engine
var mustachex = require('mustachex');

//Load Oracle
var oracledb = require('oracledb');

//Call express
var app = express();

var bodyParser = require('body-parser');

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
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find domain"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/domain/idx1', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX1 where Domain='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find domain"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/domain/idx2', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX2 where Domain='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find domain"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/domain/idx3', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX3 where Domain='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find domain"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/tld/no_idx', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC where TLD='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find TLD"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/tld/idx1', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX1 where TLD='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find TLD"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/tld/idx2', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX2 where TLD='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find TLD"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

app.post('/majestic/tld/idx3', function(req, res) {

 var domain = req.body.domain;
 var sql_statement =  "SELECT Domain, GlobalRank, TldRank FROM MAJESTIC_INDEX3 where TLD='" + domain + "'";
 oracledb.getConnection(
    {  user          : "rxs147930",
       password      : "Yamini1991",
       connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
    },
    function(err, connection)
    {
      if (err) { 
         console.error(err); return;
       }
      connection.execute(
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
                 domain: result.rows[0][0],
                 globalrank: result.rows[0][1],
                 tldrank: result.rows[0][2]
               }
               );
             }
	     else {
               res.render('error',
               {
                  message: "Cannot find TLD"

               }
               );
             }  
	   }
        }
      );
    }
  );
});

//Create Server
var port = Number(process.env.PORT || 5000);
 app.listen(port, function() {
     console.log("Listening on " + port);
});

