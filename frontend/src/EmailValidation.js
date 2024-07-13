export function EmailValidation(fieldName, value) {
    let result;
    switch(fieldName) {
        case 'email':
            const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            result = emailValid ? "" : "Email is invalid";
            break;
        default:
            break;
    }
    return result;
}