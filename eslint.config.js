/* eslint-disable max-len */
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ['dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {

      /* OS */
      'linebreak-style': [ 'error', 'unix' ], // disallow mixed 'LF' and 'CRLF' as linebreaks

      /*  TypeScript  */
      '@typescript-eslint/no-unused-vars': [ 'warn', { vars: 'local', args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }], // disallow declaration of variables that are not used in the code (recommended)
      '@typescript-eslint/no-explicit-any': 'off', // disallow usage of the any type
      '@typescript-eslint/no-empty-object-type': 'off', // disallow the use of empty interfaces
      'func-call-spacing': 'off',
      'semi': ['error'], // require or disallow use of semicolons instead of ASI (fixable)
      'indent': [ 'error', 2 ],

      /* Possible Errors */
      'comma-dangle': [ 'error', 'always-multiline' ], // disallow or enforce trailing commas (recommended)
      'no-cond-assign': [ 'warn', 'except-parens' ], // disallow assignment in conditional expressions (recommended)
      'no-console': 'off', // disallow use of console in the node environment (recommended)
      'no-constant-condition': 'warn', // disallow use of constant expressions in conditions (recommended)
      'no-control-regex': 'warn', // disallow control characters in regular expressions (recommended)
      'no-debugger': 'warn', // disallow use of debugger (recommended)
      'no-dupe-args': 'warn', // disallow duplicate arguments in functions (recommended)
      'no-dupe-keys': 'warn', // disallow duplicate keys when creating object literals (recommended)
      'no-duplicate-case': 'warn', // disallow a duplicate case label. (recommended)
      'no-empty-character-class': 'warn', // disallow the use of empty character classes in regular expressions (recommended)
      'no-empty': 'warn', // disallow empty statements (recommended)
      'no-ex-assign': 'warn', // disallow assigning to the exception in a catch block (recommended)
      'no-extra-boolean-cast': 'warn', // disallow double-negation boolean casts in a boolean context (recommended)
      'no-extra-parens': 'off', // disallow unnecessary parentheses
      'no-func-assign': 'warn', // disallow overwriting functions written as function declarations (recommended)
      'no-inner-declarations': [ 'warn', 'functions' ], // disallow function or variable declarations in nested blocks (recommended)
      'no-invalid-regexp': 'warn', // disallow invalid regular expression strings in the RegExp constructor (recommended)
      'no-irregular-whitespace': 'warn', // disallow irregular whitespace outside of strings and comments (recommended)
      'no-negated-in-lhs': 'warn', // disallow negation of the left operand of an in expression (recommended)
      'no-obj-calls': 'warn', // disallow the use of object properties of the global object (Math and JSON) as functions (recommended)
      'no-regex-spaces': 'warn', // disallow multiple spaces in a regular expression literal (recommended)
      'no-sparse-arrays': 'warn', // disallow sparse arrays (recommended)
      'no-unexpected-multiline': 'warn', // Avoid code that looks like two expressions but is actually one
      'no-unreachable': 'warn', // disallow unreachable statements after a return, throw, continue, or break statement (recommended)
      'use-isnan': 'warn', // disallow comparisons with the value NaN (recommended)
      'valid-typeof': 'warn', // Ensure that the results of typeof are compared against a valid string (recommended)

      /* Best Practices */
      'accessor-pairs': 'off', // Enforces getter/setter pairs in objects
      'block-scoped-var': 'warn', // treat var statements as if they were block scoped
      'complexity': 'off', // specify the maximum cyclomatic complexity allowed in a program
      'consistent-return': 'off', // require return statements to either always or never specify values
      'curly': [ 'warn', 'multi' ], // specify curly brace conventions for all control statements
      'default-case': 'off', // require default case in switch statements
      'dot-location': [ 'warn', 'property' ], // enforces consistent newlines before or after dots
      'dot-notation': [ 'warn', { allowKeywords: true, allowPattern: '' }], // encourages use of dot notation whenever possible
      'eqeqeq': 'warn', // require the use of === and !== (fixable)
      'guard-for-in': 'off', // make sure for-in loops have an if statement
      'no-alert': 'warn', // disallow the use of alert, confirm, and prompt
      'no-caller': 'warn', // disallow use of arguments.caller or arguments.callee
      'no-case-declarations': 'off', // disallow lexical declarations in case clauses
      'no-div-regex': 'warn', // disallow division operators explicitly at beginning of regular expression
      'no-else-return': 'warn', // disallow else after a return in an if
      'no-empty-pattern': 'warn', // disallow use of empty destructuring patterns
      'no-eq-null': 'warn', // disallow comparisons to null without a type-checking operator
      'no-eval': 'warn', // disallow use of eval()
      'no-extend-native': 'warn', // disallow adding to native types
      'no-extra-bind': 'warn', // disallow unnecessary function binding
      'no-fallthrough': 'warn', // disallow fallthrough of case statements (recommended)
      'no-floating-decimal': 'warn', // disallow the use of leading or trailing decimal points in numeric literals
      'no-implicit-coercion': 'warn', // disallow the type conversions with shorter notations
      'no-implied-eval': 'warn', // disallow use of eval()-like methods
      'no-invalid-this': 'off', // disallow this keywords outside of classes or class-like objects
      'no-iterator': 'warn', // disallow usage of __iterator__ property
      'no-labels': 'warn', // disallow use of labeled statements
      'no-lone-blocks': 'warn', // disallow unnecessary nested blocks
      'no-loop-func': 'warn', // disallow creation of functions within loops
      'no-magic-numbers': 'off', // disallow the use of magic numbers
      'no-multi-spaces': 'warn', // disallow use of multiple spaces (fixable)
      'no-multi-str': 'warn', // disallow use of multiline strings
      'no-native-reassign': 'warn', // disallow reassignments of native objects
      'no-new-func': 'warn', // disallow use of new operator for Function object
      'no-new-wrappers': 'warn', // disallows creating new instances of String,Number, and Boolean
      'no-new': 'warn', // disallow use of the new operator when not part of an assignment or comparison
      'no-octal-escape': 'warn', // disallow use of octal escape sequences in string literals, such as var foo = 'Copyright \251';
      'no-octal': 'warn', // disallow use of octal literals (recommended)
      'no-param-reassign': [ 'warn', { props: false }], // disallow reassignment of function parameters
      'no-process-env': 'off', // disallow use of process.env
      'no-proto': 'warn', // disallow usage of __proto__ property
      'no-redeclare': 'warn', // disallow declaring the same variable more than once (recommended)
      'no-return-assign': 'warn', // disallow use of assignment in return statement
      'no-script-url': 'warn', // disallow use of javascript: urls.
      'no-self-compare': 'warn', // disallow comparisons where both sides are exactly the same
      'no-sequences': 'warn', // disallow use of the comma operator
      'no-throw-literal': 'warn', // restrict what can be thrown as an exception
      'no-unused-expressions': [ 'warn', { allowShortCircuit: true, allowTernary: true }], // disallow usage of expressions in statement position
      'no-useless-call': 'warn', // disallow unnecessary .call() and .apply()
      'no-useless-concat': 'warn', // disallow unnecessary concatenation of literals or template literals
      'no-void': 'off', // disallow use of the void operator
      'no-warning-comments': 'off', // disallow usage of configurable warning terms in comments e.g. TODO or FIXME
      'no-with': 'warn', // disallow use of the with statement
      'radix': 'off', // require use of the second argument for parseInt()
      'vars-on-top': 'warn', // require declaration of all vars at the top of their containing scope
      'wrap-iife': [ 'warn', 'inside' ], // require immediate function invocation to be wrapped in parentheses
      'yoda': [ 'warn', 'never' ], // require or disallow Yoda conditions

      /* Strict Mode */
      'strict': [ 'warn', 'never' ], // controls location of Use Strict Directives

      /* Variables */
      'init-declarations': 'off', // enforce or disallow variable initializations at definition
      'no-catch-shadow': 'warn', // disallow the catch clause parameter name being the same as a variable in the outer scope
      'no-delete-var': 'warn', // disallow deletion of variables (recommended)
      'no-label-var': 'warn', // disallow labels that share a name with a variable
      'no-shadow-restricted-names': 'off', // disallow shadowing of names such as arguments
      'no-shadow': 'off', // disallow declaration of variables already declared in the outer scope
      'no-undef-init': 'warn', // disallow use of undefined when initializing variables
      'no-undef': 'off', // disallow use of undeclared variables unless mentioned in a /*global */ block (recommended)
      'no-undefined': 'off', // disallow use of undefined variable
      'no-use-before-define': 'off', // disallow use of variables before they are defined

      /* Node.js */
      'callback-return': [ 'warn', [ 'done', 'callback' ]], // enforce return after a callback
      'global-require': 'off', // enforce require() on top-level module scope
      'handle-callback-err': 'warn', // enforce error handling in callbacks
      'no-mixed-requires': 'warn', // disallow mixing regular variable and require declarations
      'no-new-require': 'warn', // disallow use of new operator with the require function
      'no-path-concat': 'warn', // disallow string concatenation with __dirname and __filename
      'no-process-exit': 'warn', // disallow process.exit()
      'no-restricted-modules': [ 'warn', '' ], // restrict usage of specified node modules
      'no-sync': [ 'error', { allowAtRootLevel: true }], // disallow use of synchronous methods

      /* Stylistic Issues */
      'array-bracket-spacing': [ 'warn', 'always', { singleValue: false, objectsInArrays: false, arraysInArrays: false }], // enforce spacing inside array brackets (fixable)
      'block-spacing': [ 'warn', 'always' ], // disallow or enforce spaces inside of single line blocks (fixable)
      'brace-style': [ 'warn', 'stroustrup', { allowSingleLine: true }], // enforce one true brace style
      'camelcase': [ 'warn', { properties: 'always' }], // require camel case names
      'comma-spacing': [ 'warn', { before: false, after: true }], // enforce spacing before and after comma
      'comma-style': [ 'warn', 'last' ], // enforce one true comma style
      'computed-property-spacing': 'off', // require or disallow padding inside computed properties (fixable)
      'consistent-this': 'off', // enforce consistent naming when capturing the current execution context
      'eol-last': 'warn', // enforce newline at the end of file, with no multiple empty lines (fixable)
      'func-names': 'off', // require function expressions to have a name
      'func-style': 'off', // enforce use of function declarations or expressions
      'id-length': 'off', // this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
      'id-match': [ 'off', '^[a-z]+([A-Z][a-z]*)*$', { properties: true }], // require identifiers to match the provided regular expression
      'jsx-quotes': [ 'warn', 'prefer-single' ], // specify whether double or single quotes should be used in JSX attributes
      'key-spacing': [ 'warn', { beforeColon: false, afterColon: true }], // enforce spacing between keys and values in object literal properties
      'lines-around-comment': 'off', // enforce empty lines around comments
      'max-nested-callbacks': [ 'off', 3 ], // specify the maximum depth callbacks can be nested
      'new-cap': [ 'warn', { capIsNewExceptions: [ 'NaN', 'T.Promise' ]}], // require a capital letter for constructors
      'new-parens': 'warn', // disallow the omission of parentheses when invoking a constructor with no arguments
      'newline-after-var': 'off', // require or disallow an empty newline after variable declarations
      'no-array-constructor': 'warn', // disallow use of the Array constructor
      'no-continue': 'warn', // disallow use of the continue statement
      'no-inline-comments': 'off', // disallow comments inline after code
      'no-lonely-if': 'warn', // disallow if as the only statement in an else block
      'no-mixed-spaces-and-tabs': 'warn', // disallow mixed spaces and tabs for indentation (recommended)
      'no-multiple-empty-lines': [ 'warn', { max: 2 }], // disallow multiple empty lines
      'no-negated-condition': 'warn', // disallow negated conditions
      'no-nested-ternary': 'off', // disallow nested ternary expressions
      'no-new-object': 'warn', // disallow the use of the Object constructor
      'no-restricted-syntax': [
        'warn',
        'BreakStatement',
        'ContinueStatement',
        'DoWhileStatement',
        'DebuggerStatement',
        'LabeledStatement',
        'WithStatement',
        'ExportAllDeclaration',
      ], // disallow use of certain syntax in code
      'no-spaced-func': 'off', // disallow space between function identifier and application (fixable)
      'no-ternary': 'off', // disallow the use of ternary operators
      'no-trailing-spaces': 'warn', // disallow trailing whitespace at the end of lines (fixable)
      'no-underscore-dangle': 'off', // disallow dangling underscores in identifiers
      'no-unneeded-ternary': 'warn', // disallow the use of ternary operators when a simpler alternative exists
      'object-curly-spacing': [ 'warn', 'always', {
        arraysInObjects: false,
        objectsInObjects: false,
      }], // require or disallow padding inside curly braces (fixable)
      'one-var': [ 'off', 'never' ], // require or disallow one variable declaration per function
      'operator-assignment': 'off', // require assignment operator shorthand where possible or prohibit it entirely
      'operator-linebreak': [ 'warn', 'after' ], // enforce operators to be placed before or after line breaks
      'padded-blocks': [ 'off', 'never' ], // enforce padding within blocks
      'quote-props': [ 'off', 'as-needed' ], // require quotes around object literal property names
      'quotes': [ 'warn', 'single' ], // specify whether backticks, double or single quotes should be used (fixable)
      'require-jsdoc': 'off', // Require JSDoc comment
      'semi-spacing': [ 'warn', { before: false, after: true }], // enforce spacing before and after semicolons
      'sort-vars': 'off', // sort variables within the same declaration block
      'space-after-keywords': 'off', // require a space after certain keywords (fixable)
      'space-before-blocks': [ 'warn', 'always' ], // require or disallow a space before blocks (fixable)
      'space-before-function-paren': [ 'warn', { named: 'never', asyncArrow: 'always' }], // require or disallow a space before function opening parenthesis (fixable)
      'space-before-keywords': [ 'off', 'never' ], // require a space before certain keywords (fixable)
      'space-in-parens': 'error', // require or disallow spaces inside parentheses
      'space-infix-ops': 'warn', // require spaces around operators (fixable)
      'keyword-spacing': 'warn', // require a space after return, throw, and case (fixable)
      'space-unary-ops': 'off', // require or disallow spaces before/after unary operators (fixable)
      'spaced-comment': [ 'warn', 'always' ], // require or disallow a space immediately following the // or /* in a comment
      'wrap-regex': 'warn', // require regex literals to be wrapped in parentheses

      /* ECMAScript 6 */
      'arrow-body-style': [ 'warn', 'as-needed' ], // require braces in arrow function body
      'arrow-parens': [ 'off', 'always' ], // require parens in arrow function arguments
      'arrow-spacing': [ 'warn', { before: true, after: true }], // require space before/after arrow function's arrow (fixable)
      'constructor-super': 'warn', // verify calls of super() in constructors
      'no-confusing-arrow': 'warn', // disallow arrow functions where a condition is expected
      'generator-star-spacing': [ 'warn', 'after' ], // enforce spacing around the * in generator functions (fixable)
      'no-class-assign': 'warn', // disallow modifying variables of class declarations
      'no-const-assign': 'warn', // disallow modifying variables that are declared using const
      'no-dupe-class-members': 'warn', // disallow duplicate name in class members
      'no-this-before-super': 'warn', // disallow use of this/super before calling super() in constructors.
      'no-var': 'warn', // require let or const instead of var
      'object-shorthand': 'off', // (see Babel section) require method and property shorthand syntax for object literals
      'prefer-arrow-callback': 'warn', // suggest using arrow functions as callbacks
      'prefer-const': 'warn', // suggest using const declaration for variables that are never modified after declared
      'prefer-reflect': 'off', // suggest using Reflect methods where applicable
      'prefer-spread': 'warn', // suggest using the spread operator instead of .apply().
      'prefer-template': 'warn', // suggest using template literals instead of strings concatenation
      'require-yield': 'warn', // disallow generator functions that do not have yield

      /* Legacy */
      'max-depth': [ 'off', 3 ], // specify the maximum depth that blocks can be nested
      'max-len': [ 'warn', 169, 2 ], // specify the maximum length of a line in your program
      'max-params': 'off', // limits the number of parameters that can be used in the function declaration.
      'max-statements': 'off', // specify the maximum number of statement allowed in a function
      'no-bitwise': 'off', // disallow use of bitwise operators
      'no-plusplus': 'off', // disallow use of unary operators, ++ and --
    },
  },
];
