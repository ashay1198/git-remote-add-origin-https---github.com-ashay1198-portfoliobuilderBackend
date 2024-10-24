const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/addCategory',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let category = req.body;
    query = "insert into category (name) values (?)";
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Category added succesfully."});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getCategory',auth.authenticateToken,(req,res,next)=>{
    var query = "select * from category order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(500).json(results)
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateCategory',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let category = req.body;
    query = "update category set name=? where id=?";
    connection.query(query,[category.name,category.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Not found"});
            }
            return res.status(200).json({message:"Category updated succesfully."});
        }else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;