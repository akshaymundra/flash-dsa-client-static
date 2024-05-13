const xlsx = require('xlsx');
const fs = require('fs');

function convertXlsToJson() {
    const workbook = xlsx.readFile('./src/data/flash-dsa-data.xlsx')
    const sheet = workbook.Sheets['striver DSA']
    const data = xlsx.utils.sheet_to_json(sheet)

    const filteredData = data
        .filter(item => item.question && item.question != "question")
        .map((item) => {
            return {
                sign_no: item.sign_no,
                question: item.question,
                name: item.name,
                topic: item.topic.toLowerCase(),
                level: item.level.toLowerCase(),
                url: item.link ? item.link : '',
                approach: item.my_approach ? item.my_approach : '',
                pseudo_code: item.pseudo_code ? item.pseudo_code : '',
            }
        })

    console.log("Numebr of Questions: ", filteredData.length)

    // json file path 
    const jsonFilePath = './src/data/flash-dsa-data.json'

    fs.writeFileSync(jsonFilePath, JSON.stringify(filteredData, null, 2))
}

convertXlsToJson();