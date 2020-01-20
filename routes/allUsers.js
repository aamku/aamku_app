const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/allUsers',(req,res) => {

   MongoClient.connect("dburl",{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

           /*     const data = {
                            role:req.body.role
                        };   */
              if(err){
                  console.log("Error",err);
              }
              else{

                  const coll = client.db("Aamku_connect").collection("AllUsers");

                  coll.find({}).toArray((err,result) => {
                             
                           if(err){
                               console.log("Error",err);
                           }
                           else{

                            let output = result.map(r => ({'name':r.name,'role':r.role,
                                  'mobile':r.mobile,'email':r.email,'emp_id':r.employee_id}));

                               res.send(output);
                               client.close();
                           }

                  });
                  
              }
   });

});

module.exports = router;