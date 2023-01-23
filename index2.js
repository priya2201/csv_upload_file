const csvtojson=require('csvtojson');
const jsontocsv=require('json2csv').parse;
const FileSystem=require('fs');

csvtojson().fromFile('./airtravel.csv').then(source=>{
    console.log(source);
    source.push({
        "Month":"JAN",
        "1958":"332",
        "1959":"882",
        "1960":"992"
    });
    const csv=jsontocsv(source,{fields:[
        "Month",'1958','1959','1960'
    ]});
    FileSystem.writeFileSync('./destination.csv',csv)
})