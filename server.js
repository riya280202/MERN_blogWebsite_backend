const express = require("express")
const env = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes/route")


const app = express()

env.config();


// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
 
// Parses the text as json
app.use(bodyParser.json({extended: true}));

if(process.env.NODE_env === 'production'){
    app.use(express.static("MERN-bloggingWebsite/build"))
}

//connection to database
const connectDB = async () => {
    const url = process.env.MONGODB_URL || `mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(url, {useNewUrlParser: true}) 
        console.log('Database connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

connectDB();


app.use("/",routes)

port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})