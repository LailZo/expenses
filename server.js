var bodyParser = require('body-parser')
var express = require('express')
var app = express()
// const init = require('./server/dbData')
const api = require('./server/routes/api')

var Expense = require("./model/Expense")


var request = require('request')
var mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)


mongoose.connect('mongodb://localhost/expenses-practice', { useNewUrlParser: true })

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})


const c1= new Expense({item: "Apple", amount: 3,date:null, group: "FirstGroup"})
c1.save()
