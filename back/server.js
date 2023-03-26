import mysql from "mysql";
import express from "express"
import cors from "cors"
import router from "./routes/routes.js";


//server
const app= express();
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server running on port 5000")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use("/api/",router)
//baza

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "languagechat",
  });
  
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database");
  });

  //CORS
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  // app.use(cors())


  app.get("/allUsers",function(req,res){
    con.query("select * from user_details", function(err,result,field){
        if(result.length>0){
            if(err) throw err;
            res.json({
               
                result: "ok",
                data: result  
            })
            
        }else{
            res.json({
                result:"No users"
            })
        }

    })
  })


  // const user = {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   city: 'New York',
  //   country: 'USA',
  //   email: 'johndoe@example.com',
  //   password: 'password',
  //   native_language: 'English',
  //   practicing_language: 'Spanish'
  // };
  
  // const sql = 'INSERT INTO user_details SET ?';
  
  // con.query(sql, user, (err, result) => {
  //   if (err) {
  //     console.error('Error inserting data:', err);
  //     return;
  //   }
  //   console.log('Data inserted successfully');
  // });
  