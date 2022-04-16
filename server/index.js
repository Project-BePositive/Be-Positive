let express=require("express");
let bodyParser=require("body-parser");
let cors=require("cors");
let mongoose=require("mongoose");
import donor from './route.js';

const app=express();
const port=5002;

app.use(bodyParser.json({limit:'20mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));
app.use(cors());
app.use('/bepositive',donor);

mongoose.connect('mongodb://localhost:27017/bepositive',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> app.listen(port,()=>console.log(`Server Running on port: http://localhost:${port}`))).catch((error)=>
console.log(`${error} did not connect`));

mongoose.set('useFindAndModify',false);