const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL; 

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/getPendingOrderForRetailer',(req,res) => {
     
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        const data = {
                  phone:req.body.id,
                  status:req.body.status
              };
             
             if(err){
                 console.log('Error',err);
             }
             else{

                 const coll = client.db('Aamku_connect').collection('Orders');
                 coll.findOne({$and:[{phone:data.phone},{order_status:data.status}]},function(err,doc){

                     if(err){
                         console.group("Error",err);
                     }
                     if(doc){

                         const coll = client.db('Aamku_connect').collection('Orders');
                         coll.find({$and:[{phone:data.phone},{order_status:data.status}]}).toArray((err,result) => {
                                  
                             if(err){
                                 console.group("Error",err);
                             }
                             else{
                                 const output = result.map(r => ({'order_id':r._id,'name':r.name,'phone':r.phone,'address':r.address,
                                                  'cost':r.price,'date':r.order_date,'prodname':r.product_name,
                                                  'order_type':r.order_type,'quantity':r.quantity,'single_line':r.single_rule_quantity,
                                                   'square_line':r.square_line_quantity,'four_line':r.fourline_quantity,
                                                   'interleaf':r.oneside_inter_leaf,'status':r.order_status}));
                                 res.send(output);   
                             }
                                  
                         });
                     }
                     else{
                         res.send("No order found");
                     }
                 });
             }

       });

});

module.exports = router;