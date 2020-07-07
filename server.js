// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// Gestion Files System
let fs = require('fs'),
    path = require('path');


// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// - Gestion des vues
let helpers     = require('view-helpers'),
    consolidate = require('consolidate');

app.engine('html', consolidate['mustache']);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

// ------------------------
// RESOURCE PATIENT
// ------------------------
// --- Base de donnees
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/demo",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});

// --- Definition du models
//--- Module dependencies
const Schema        = mongoose.Schema;

//------------------------------------------- Resources Schema
let RecetteSchema = new Schema({
    id      : String,
    nom     : String,
    ssn     : String
});

mongoose.model('Recette',RecetteSchema );

app.get('/recettes',(req, res)=>{
    let Patient = mongoose.model('Recette')
    Patient.find({}).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})

app.post('/recettes',(req, res)=>{
    let Patient = mongoose.model('Recette');
    let myPatient = new Patient(req.body);
        myPatient.save().then((result)=>{
            res.status(200).json(myPatient)
        },(err)=>{
            res.status(400).json(err)
        })
})
// --- TO DO ...
app.get('/recettes/:idrecette',(req, res)=>{
    res.status(200).json(temp.pop())
})

app.put('/recettes/:idrecette',(req, res)=>{
    res.status(204).json()
})

app.delete('/recettes/:idrecette',(req, res)=>{
    res.status(204).json()
})

// ------------------------
// ROUTES VUES
// ------------------------
app.get('/',(req,res)=>{
    res.render('Recette',{message : req.query.message})
});


// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});