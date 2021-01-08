const AirTable = require('airtable');

const API_KEY = 'keycnIUzpC6gWcSNz'

AirTable.configure({
    apiKey: API_KEY
})

const base = AirTable.base('appKIQDbpL9lLNT0P');

const table = base.table('Table1');

exports.handler = async (event) => {

    try {

        const records = await table.select().firstPage();
        const formattedRecords = records.map(record=> ({
            id: record.id,
            fields: record.fields
        }))
    
    
        return  {
            statusCode: 200,
            body: JSON.stringify(formattedRecords)
        }
    } catch(err){
        return {
            statusCode:500,
            body: JSON.stringify({message: "Failed to query records in Airtable"})
        }
    }
}