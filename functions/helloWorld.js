exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'I\'m a lampda!'})
    }
}