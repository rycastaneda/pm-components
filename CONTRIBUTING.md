# Guidelines to follow when committing to the repo

# Syntax

## Use ES6 syntax 
* `import`s, `export`s, arrow functions, `const / let`, spread operators and etc.
* DO NOT use `require`s or `var`s

## Constants are ALWAYS in CAPITALS_WITH_UNDERSCORES

## In templates, one attribute per line
* For example,

```
<input name="foo"
       value="bar"
/>
     
```

# File names

* KebabCase (FirstLetterIsUpperCase.js) for containers, components and constants
* kebabCase (firstLetterIsLowerCare.js) for all other files (reducers, actions, tests)
* Tests have the same file names with `*.spec.js` extension

# Modules and Dependencies
## Do not use lodash unless you really need to
Many `lodash` functions which are often abused (map, filter) are available in native ES6.
Please use ES6 over lodash. 
When you need to use it lodash, please add a particular method not the whole library.
For example,

```
import { cloneDeep } from 'lodash';

```

