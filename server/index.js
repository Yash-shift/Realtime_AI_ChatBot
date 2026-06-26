let express = require("express");
let cors = require("cors");
require("dotenv").config();
let { GoogleGenerativeAI } = require("@google/generative-ai");

let App = express();
App.use(cors());
App.use(express.json());

App.get("/",(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

let genAI= new GoogleGenerativeAI(process.env.KEY)
let model=genAI.getGenerativeModel({model:"gemini-2.5-flash"})

App.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("Question:", question);

    const result = await model.generateContent(question);
    const finaldata = result.response.text();

    res.json({
      _status: true,
      finaldata,
    });
  } catch (err) {
    console.error("Gemini Error:", err);

    res.status(500).json({
      _status: false,
      error: err.message,
    });
  }
});
// App.post('/ask', async(req,res)=>{

//     let {question}=req.body

//     console.log(req.body)
//     let data =await model.generateContent(question)
//     let finaldata=data.response.text()

//     res.send({
//         _status:true,
//         _message:"Content Found .. ",
//         finaldata
//     })
// })

App.listen(process.env.PORT, () => {
  console.log("Server Start");
});
