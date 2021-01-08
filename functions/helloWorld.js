exports.handler = (event, context, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'I\'m a lampda!'})
    }
}