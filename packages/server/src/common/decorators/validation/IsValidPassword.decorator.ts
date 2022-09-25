import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export default function IsValidPassword(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: any, _: ValidationArguments) {
          if (typeof password !== 'string') {
            return false;
          }
            
          return !Object.values({
            count: password?.length >= 10,
            uppercase: /[A-Z]+/?.test(password),
            lowercase: /[a-z]+/?.test(password),
            numeric: /[0-9]+/?.test(password),
            symbol: /[~!@#$£%^&*]+/.test(password),
          }).some((v) => !v);
        },
        defaultMessage: ({ property }) => {
          /* 
            class-validator doesn't seem to support returning the validate() method output to
            then control the messages being returned. It also doesn't support string[].
          */
          const rules = {
            count: property?.length >= 10,
            uppercase: /[A-Z]+/?.test(property),
            lowercase: /[a-z]+/?.test(property),
            numeric: /[0-9]+/?.test(property),
            symbol: /[~!@#$£%^&*]+/.test(property),
          };

          if(!rules.count) {
            return 'Password must be at least 10 characters long'
          }

          if(!rules.uppercase) {
            return 'Password must contain at least 1 uppercase character'
          }

          if(!rules.lowercase) {
            return 'Password must contain at least 1 lowercase character'
          }

          if(!rules.numeric) {
            return 'Password must contain at least 1 number'
          }
 
          if(!rules.symbol) {
            return 'Password must contain at least 1 symbol (~ ! @ # $ £ % ^ & *)'
          }

          return 'Password is invalid'
        }
      },
    });
  };
}
