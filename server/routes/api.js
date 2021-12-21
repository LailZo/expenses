const express = require('express')
const router = express.Router()
var Expense = require("../../model/Expense")
var request = require('request')
var mongoose = require('mongoose')
const moment = require('moment')
const { route } = require('express/lib/application')
const { update } = require('../../model/Expense')


 router.get('/expenses', async function(req, res){
    const expenses=await  Expense.find({}).sort({date: -1})
        console.log(expenses)
        res.send(expenses)
               })

 router.post('/expenses',async function(req, res){
    const Date=   req.body.date ? moment(req.body.date).format('LLLL'): moment(new Date).format('LLLL')
    const expense = new Expense({
        item: req.body.item,
        amount: req.body.amount,
        date:Date,
        group:req.body.group
    })
     let added= await expense.save()
     console.log(added.item)
     res.send({expense})

    //  expense.save().then(function (addedItem) {
    //     console.log(`You Spent ${addedItem.amount} On ${addedItem.item}`)
    //     res.send({expense})
})

router.put('/update', async function(req, res){
    const group1= req.body.group1
    const group2= req.body.group2

    const updated= await Expense.find({
        'group': group1
}).update({'group' : group2})
    res.send(`the name ${group1} was changes to ${group2} `)
    
})

router.get('/expenses/:group/:total', async function (req, res) {
    const groupName = req.params.group;
    console.log(groupName)
    const totalEX = req.params.total;

if(totalEX =='false'){
 await Expense.find({group : groupName}, async function(err ,data){
    await res.send(data)
 })
 
}else{
    let data = await Expense.aggregate(
        [
            { $match: { group: req.params.group } },
            {
                $group: { _id: "$group", total: { $sum: "$amount" } }
            }
        ]
    )
    res.send(data)
    // await Expense.aggregate([{ $match : {group: 'groupName'}}, total: {$sum:{ $amount}} ])
}})

//Extenxxion for first route 
// router.get('/expenses', function (req, res) {
//     let fromDate = req.query.d1;
//     let toDate = req.query.d2;

//     if(fromDate){
//         fromDate = moment(new Date(fromDate)).format('LLLL')
//         if(toDate){
//             toDate = moment(new Date(toDate)).format('LLLL')
//             Expense.find(
//                 {date:{
//                     $gt: fromDate,
//                     $lt : toDate
//                 }
//             }, function (err, expenses) {
//                     res.send(expenses)
//                 }).sort({
//                     date:-1
//                 })
//         }else{
//             Expense.find(
//                 {date:{
//                     $gt: fromDate,
//                 }
//                 }, function (err, expenses) {
//                     res.send(expenses)
//                 }).sort({
//                     date:-1
//                 })
//         }
//     }else{
//         Expense.find({}, function (err, expenses) {
//             res.send(expenses)
//         }).sort({
//             date:-1
//         })
//     }
// })

module.exports= router