const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/cancelRetailer',(req,res) => {
      
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                                
                         const data = {
                             
                                phone:req.body.phone
                          };

                          if(err){
                              console.log("Error",err);
                          }
                          else{

                            var myquery = {mobile: data.phone};
                            var newvalues = { $set: {status:"cancel"}};

                            const coll = client.db('Aamku_connect').collection('AllRetailers');
                            coll.updateOne(myquery,newvalues,function(err,resp){

                                if(err){
                                    console.log('Error',err);
                                }
                                else{

                                    res.send("Retailer cancelled");
                                    client.close();
                                }
                            })
                          }

    });

});

module.exports = router;