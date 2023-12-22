const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/cinema", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const screen1Model = mongoose.model('screen1', {
  seatno: { type: Number },
  status: { type: String }
})

const screen2Model = mongoose.model('screen2', {
  seatno: { type: Number },
  status: { type: String }
})

const screen3Model = mongoose.model('screen3', {
  seatno: { type: Number },
  status: { type: String }
})

const moviesModel = mongoose.model('movies', {
  name: { type: String },
  rate: { type: Number },
  screenNo: { type: Number }
})

var screen1Res
screen1Model.find()
    .then((output) => {
        screen1Res = output
    })
    .catch((err) => {
        console.log(err)
    })

    var screen2Res
    screen2Model.find()
        .then((output) => {
            screen2Res = output
        })
        .catch((err) => {
            console.log(err)
        })
    
    var screen3Res
    screen3Model.find()
        .then((output) => {
            screen3Res = output
        })
        .catch((err) => {
            console.log(err)
        })
    
    
    var moviesRes
    moviesModel.find()
        .then((output) => {
            moviesRes = output
        })
        .catch((err) => {
            console.log(err)
        })
    


app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true  
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))

app.get("/", (req, res) => {
    res.render("login")
})
app.get('/cinema',(req,res) => {
  res.render('cinema',{
        movies: moviesRes,
        screen1: screen1Res,
        screen2: screen2Res,
        screen3: screen3Res
})

})


app.listen(3000, () => {
    console.log("Server is running")
})