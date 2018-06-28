# node-sanitizer
Node Object Sanitizer


## Installation

Clone the repo and make it yours:

```bash
yarn add node-sanitizer
```

## Use

```
const sanitizer = require('node-sanitizer');

const obj = {
  username: 'some@email.com',
  password: 'veryverysecret',
  fullname: 'Awesome guy',
};

const sanitizedObject = sanitizer(obj, ['password']);

console.log(sanitizedObject);

```

## License

[MIT License](LICENSE) - [Suhendra Ahmad](https://github.com/azanium)