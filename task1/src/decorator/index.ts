type Constructor<T = {}> = new (...args: any[]) => T;
const validatorsMap = new Map<string, Function[]>();

function registerValidator(
  target: any,
  propertyKey: string,
  validator: Function
) {
  const className = target.constructor.name;
  const key = `${className}_${propertyKey}`;
  const validators = validatorsMap.get(key) || [];
  validators.push(validator);
  validatorsMap.set(key, validators);
}

function Min(length: number) {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) =>
      value.length >= length
        ? null
        : `${propertyKey} must be at least ${length} characters`
    );
  };
}

function Max(length: number) {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) =>
      value.length <= length
        ? null
        : `${propertyKey} must be at most ${length} characters`
    );
  };
}

function Email() {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? null
        : `${propertyKey} must be a valid email`
    );
  };
}

function LettersOnly() {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) =>
      /^[a-zA-Z]+$/.test(value)
        ? null
        : `${propertyKey} must contain only letters`
    );
  };
}
class User {
  @LettersOnly()
  @Min(3)
  @Max(20)
  username: string;

  @Min(3)
  @Max(20)
  password: string;

  @Email()
  email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
//
function validate(obj: any): string[] {
  const errors: string[] = [];
  const className = obj.constructor.name;

  for (const key in obj) {
    const validatorKey = `${className}_${key}`;
    const validators = validatorsMap.get(validatorKey);
    if (validators) {
      for (const validateFn of validators) {
        const error = validateFn(obj[key]);
        if (error) errors.push(error);
      }
    }
  }

  return errors;
}
const user = new User("eman", "pass123", "eman@example.com");

const errors = validate(user);
if (errors.length === 0) {
  console.log("user is valid", user);
} else {
  console.error("Errors:", errors);
}
