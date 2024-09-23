const express =require('express');
const mongoose= require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
const {FoodItems} = require("./model");
const jwt =require('jsonwebtoken');
const middleware = require('./middleware');
// const User = require("./model");
app.use(express.json());
const port = process.env.PORT || 5000
app.use(cors());
mongoose.connect('mongodb+srv://pavan147:pavan123@cluster0.xaedvyt.mongodb.net/',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>
    console.log("DB connected")
).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.post('/upload', async (req, res) => {
    const {name,price,image,quantity} = req.body; // Extract image and imgid from req.body
    try {
        // Assuming 'image' and 'imgid' are properties of req.body
        const newData = new FoodItems({ name:name,price:price,image:image,quantity:quantity});
        await newData.save();
        
        // Return the saved data in the response
        return res.json(newData.da);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/food', async(req,res)=>{
    console.log('Inside /donation route')
    try{
        const da = await FoodItems.find();
        return res.json(da);
       

    }
    catch(err){
        console.log(err);
    }

})
app.delete("/food/:id", async (req, res) => {
    try {
      const deletedItem = await FoodItems.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
      console.error("Error removing item:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.listen(port,()=>
console.log("server running..")
)



// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1478",
//   database: "sample"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   //Insert a record in the "customers" table:
//   var sql = "INSERT INTO Persons (PersonID, LastName, FirstName, Address, City) VALUES ('2', 'Tom B. Erichsen', 'Skagen 21', 'Pavan', 'Norway')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//     if (err) throw err;
//         con.query("SELECT * FROM persons where PersonID = 2", function (err, result, fields) {
//           if (err) throw err;
//           console.log(result);
//         });
//   });
// });



 

// const express = require('express');
// const mysql = require('mysql');

// const app = express();

// MySQL Connection
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1478",
//   database: "cantino"
// });

// con.connect(err => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Express routes
// app.get('/persons', (req, res) => {
//   const sql = "SELECT * FROM results";
//   con.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Failed to retrieve data' });
//       return;
//     }``
//     res.json(result);
//     console.log(result[0].maths_score);
//   });
// });
// // app.post('/food', (req, res) => {
// //   const student_id = req.body;
// //   console.log(student_id);
// //   con.query(sql, (err, result) => {
// //     if (err) {
// //       console.error('Error executing query:', err);
// //       res.status(500).json({ error: 'Failed to retrieve data' });
// //       return;
// //     }``
// //     res.json(result);
// //     console.log(result[0].maths_score);
// //   });
// // });

// app.post('/food', (req, res) => {
//   const food = req.body;
//   console.log(food.foodname);
//   const sql = `INSERT INTO fooditems (foodname, price, image, quantity) VALUES (?, ?, ?, ?)`;

//   const values = [food.foodname, food.price, food.image, food.quantity];

//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Failed to insert data' });
//       return;
//     }
//     res.json({ message: 'Food item added successfully', id: result.insertId });
//   });
// });

// app.post('/result', (req, res) => {
//   // const student_id = req.query.student_id;
//   const student_id = req.body.student_id;
//   console.log(student_id);
//   const sql = `SELECT s.student_id, s.student_name, s.date_of_birth, r.exam_name, r.maths_score, r.english_score, r.physics_score, r.chemistry_score, r.python_score FROM students s JOIN results r ON s.student_id = r.student_id WHERE s.student_id = ${student_id};
// `;
// // const sql = `SELECT * FROM results WHERE student_id = ${student_id}`;


//   con.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Failed to retrieve data' });
//       return;
//     }
//     res.json(result[0]);
//     console.log(result[0]);
//     // console.log(result[0].maths_score);
//   });
// });
// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



