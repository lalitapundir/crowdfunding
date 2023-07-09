const Failures = ({ location, msg, parameter, value, nestedErrors }) => {
    return {
        param: parameter,
        message: msg,
        nestedErrors: nestedErrors
    }
};

module.exports ={
    Failures:Failures
}