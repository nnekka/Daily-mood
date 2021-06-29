
module.exports.error500Handler = (response, error) => {
    response.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}

module.exports.error404Message = (response, message) => {
    response.status(404).json({
        errors: [{ msg: message}]
    })
}

module.exports.error400Message = (response, message) => {
    response.status(400).json({
        errors: [{ msg: message}]
    })
}

module.exports.error401Message = (response, message) => {
    response.status(401).json({
        errors: [{ msg: message}]
    })
}
