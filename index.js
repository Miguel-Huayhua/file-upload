const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const morgan = require('morgan')
const cors = require('cors')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(fileupload({ createParentPath: true }))
app.set("puerto", process.env.PORT || 5000)

app.get("/prueba",(req,res)=>{
    let data = {
        nombre:"Miguel",
        apellido:"Huayhua Condori"
    }
    res.json(data)
})

app.post('/file', (req, res) => {
    let file = req.files.myfile
    file.mv("./files/" + file.name, (err) => {
        if (err) {
            console.log(err)
            res.status(500)
        }
        else {
            console.log(file)
            res.send("hecho")
        }
    })
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(app.get("puerto"), () => console.log(`Listen to ${app.get("puerto")}`))