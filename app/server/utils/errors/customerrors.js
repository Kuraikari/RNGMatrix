class JsonError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.name = JsonError.name;
        this.statusCode = statusCode;
    }
}

class JsonDataError extends JsonError {
    constructor(msg, statusCode, reqType) {
        super(msg, statusCode);
        this.name = JsonDataError.name;
        this.requestType = reqType;
    }
}

class ValidationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = ValidationError.name;
    }
}

class MissingPropertyError extends ValidationError {
    constructor(msg, property) {
        super(`Missing property: ${property} --- \n` + msg);
        this.name = MissingPropertyError.name;
        this.property = property;
    }
}

class WrongPropertyTypeError extends ValidationError {
    constructor(msg, property, type) {
        super (`Wrong property type: ${property} is of type ${typeof(property)} but needs to be of type ${type} \n` + msg);
        this.name = WrongPropertyTypeError.name;
        this.type = type;
    }
}

export {
    JsonError,
    JsonDataError,
    ValidationError,
    MissingPropertyError,
    WrongPropertyTypeError
}