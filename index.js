// const express = require('express');
// const fileUpload = require('express-fileupload');
// const csv = require('fast-csv');

// const app = express();
// app.use(fileUpload());

// // app.post('/upload', (req, res) => {
// //     if (!req.files) {
// //       return res.status(400).send('No files were uploaded.');
// //     }
// // let csvFile=req.files.csvFile;

// // csvFile.mv('./uploads',+csvFile.name,function(err){
// //     if(err){
// //         return res.status(500).send(err);
// //     }

// //     csv
// //     .fromPath('./uploads'+csvFile.name)
// //     .on('data',function(data){
// //         console.log(data)
// //     })
// //     .on('end',function(){
// //         res.send('File uploaded and processed succesfully')
// //     })
// // })
// // });

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + "/index.html")
// })

// app.post('/',(req,res)=>{
//     if(req.files){
//         console.log(req.files)
//         var file=req.files.file
//         var filename=file.name
//         console.log(filename)
//     }
// })
// app.listen(3000);
