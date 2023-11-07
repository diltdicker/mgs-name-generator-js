# MGS Style Name Generator

CLI and node package for generating name in the style of MGS: e.g. `blue-heron`, `vaperous-kiwi-8904`

## Node Package

install package
```bash
npm i mgs-name-generator
```

use package in code
```js

const MGSNameGenerator = require('mgs-name-generator')
const generator = new MGSNameGenerator();

console.log(generator.generate())
console.log(generator.generate({number_suffix: 123456}))

```


## CLI

install as global package
```bash
npm i -g mgs-name-generator
```

use package on terminal
```bash
mgs-name-generator

> golden-koala

mgs-name-generator -n 789

> cruel-panda-789
```