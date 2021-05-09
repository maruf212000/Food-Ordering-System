// const MongoClient = require('mongodb').MongoClient;

// const DATABASE_NAME = 'restaurant';
// const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
require("../src/db/conn");
const Item=require("../src/models/menu");
/*let db = null;
MongoClient.connect(MONGO_URL,(err,client) => {
    if(err)
        console.log(err);
    else
    {
        db = client.db('restaurant');
        console.log(db);
        const Items = db.collection('Items');
        var items = [
            {'name':'margherita',description:'Fresh tomatoes, fresh mozzarella, fresh basil','price':'250','category':'Pizza'},
            {'name':'Formaggio',description:'our cheeses (mozzarella, parmesan, pecorino, jarlsberg)','price':'350','category':'Pizza'},
            {'name':'Meat Town',description:'Fresh tomatoes, mozzarella, hot pepporoni, hot sausage, beef, chicken','price':'500','category':'Pizza'},
            {'name':'Lasagna',description:'Special sauce, mozzarella, parmesan, ground beef','price':'300','category':'Pasta'},
            {'name':'Ravioli',description:'Ravioli filled with cheese','price':'350','category':'Pasta'},
            {'name':'Spaghetti',description:'Fresh tomatoes, onions, ground beef','price':'200','category':'Pasta'},
            {'name':'Tomato Soup',description:'Fresh tomatoes','price':'100','category':'Starters'},
            {'name':'Bruschetta',description:'Bread with pesto, tomatoes, onion, garlic','price':'200','category':'Starters'},
            {'name':'Garlic bread',description:'Grilled ciabatta, garlic butter, onions','price':'250','category':'Starters'}
        ] 
        Items.insertMany(items, (err,result)=>{
        if(err)
            console.log(err);
            });
    }
});*/
//const Items = db.collection('Items');
const items = new Item(  {'name':'GarlicBread',description:'Grilled ciabatta, garlic butter, onions','price':'250','category':'Starters'}
);
const register=items.save();