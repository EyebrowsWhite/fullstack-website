import validator from 'validator';

export const isEmail = (email:string):boolean => {
    return validator.isEmail(email);
};