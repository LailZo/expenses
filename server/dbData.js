const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expenses-practice', { useNewUrlParser: true })
const json = require('../data.json')
const Expense = require('../model/Expense')

const init = Expense.find({}, async function(err, expenses){
    if(expenses.length === 0){
        for( i=0; i< json.length; i++){
            new Expense(json[i]).save()
    }
}
}
)

exports.init = init 


