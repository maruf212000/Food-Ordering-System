const MongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'restaurant';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
MongoClient.connect(MONGO_URL,(err,client) => {
    if(err)
        console.log(err);
    else
    {
        db = client.db('restaurant');
        console.log(db);
        const Items = db.collection('customer');
        var items ={'firstname':'Asad','lastname':'Bastawala','email':'asad44135@gmail.com','mobileno':'9104221956','password':'asad12345','confirmpassword':'asad12345'};
            
        Items.insertOne(items, (err,result)=>{
        if(err)
            console.log(err);
            });
    }
});
//const Items = db.collection('Items');