
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Recuperacion de informacion enviada por el body.
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBoRan0cowXJjQJ42QsVzYQLwZ0xmicPtk",
    authDomain: "rest-firebase-e565b.firebaseapp.com",
    databaseURL: "https://rest-firebase-e565b.firebaseio.com",
    projectId: "rest-firebase-e565b",
    storageBucket: "rest-firebase-e565b.appspot.com",
    messagingSenderId: "1003299505589"
};
firebase.initializeApp(config);

//Consultar datos de firebase
app.get('/', function (req, res) {

  console.log("HTTP Get Request"); // Impresion de resultado en la consola
  // Referencia de la base de datos en el nodo Usuario
	var userReference = firebase.database().ref("/Users/"); 

	//Recuperar datos de firebase
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("La lectura de datos fallo: " + errorObject.code);
					res.send("La lectura de datos fallo: " + errorObject.code);
			 });
});

//Crear una nueva instacia o elemento en firebase
app.put('/', function (req, res) {

	console.log("HTTP Put Request");

  // 
	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

  var referencePath = '/Users/'+userName+'/';
  // Creacion de una referencia del nodo de firebase.
	var userReference = firebase.database().ref(referencePath);
	userReference.set({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Datos no guardados." + error);
					} 
					else {
						res.send("Datos guardados correctamente.");
					}
			});
});

//Update existing instance
app.post('/', function (req, res) {

	console.log("HTTP POST Request");

	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.update({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Datos no actualizados." + error);
					} 
					else {
						res.send("Datos actualizados correctamente.");
					}
			    });
});

//Delete an instance
app.delete('/', function (req, res) {

  var userName = req.body.UserName;
  var referencePath = '/Users/'+userName+'/';
  var userReference = firebase.database().ref(referencePath);
  userReference.remove( error =>{
    if (error) {
      res.send("Elemento no  eliminado." + error);
    } 
    else {
      res.send("Elemento eliminado correctamente.");
    }
  });

   console.log("HTTP DELETE Request");
   //todo
});

var server = app.listen(port, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});