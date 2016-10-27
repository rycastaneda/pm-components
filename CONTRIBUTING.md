# Guidelines to follow when committing to the repo

## Syntax
* Use ES6 (`import`s, `export`s, arrow functions, `const / let`, spread operators and etc)
* Never use `require`s or `var`s
* Constants are in CAPITALS_WITH_UNDERSCORES
* In templates use one attribute per line, for example

```
<input name="foo"
       value="bar"
/>
     
```

## File names

* KebabCase (FirstLetterIsUpperCase.js) for containers, components and constants
* kebabCase (firstLetterIsLowerCare.js) for all other files (reducers, actions, tests)
* Tests have the same file names with `*.spec.js` extension