const express = require('express')
const multer = require('multer')
const mysql = require('mysql2')
const fs = require('fs')
const bodyparser = require('body-parser')
const path = require('path')
const csv = require('fast-csv')

const app = express()
app.use(express.static('./public'))
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyStrongPassword1234$',
    database: 'testing',
  })
  db.connect(function (err) {
    if (err) {
      return console.error('error: ' + err.message)
    }
    console.log('Database connected.')
  })
  var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname),
      )
    },
  })
  var upload = multer({
    storage: storage,
  })
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  app.post('/api/uploadcsv', upload.single('uploadcsv'), (req, res) => {
    csvToDb(__dirname + '/uploads/' + req.file.filename)
    res.json({
      msg: 'File successfully inserted!',
      file: req.file,
    })
  })
  function csvToDb(csvUrl) {
    let stream = fs.createReadStream(csvUrl)
    let collectionCsv = []
    let csvFileStream = csv
      .parse()
      .on('data', function (data) {
        collectionCsv.push(data)
      })
      .on('end', function () {
        collectionCsv.shift()
        db.connect((error) => {
          if (error) {
            console.error(error)
          } else {
            let query = 'INSERT INTO users (id, name, email) VALUES ?'
            db.query(query, [collectionCsv], (error, res) => {
              console.log(error || res)
            })
          }
        })
        fs.unlinkSync(csvUrl)
      })
    stream.pipe(csvFileStream)
  }
  const PORT = process.env.PORT || 5555
  app.listen(PORT, () => 
  console.log(`Node app serving on port: ${PORT}`))