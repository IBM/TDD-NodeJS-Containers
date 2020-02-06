[![Build Status](https://travis-ci.com/IBM/TDD-NodeJS-Containers.svg?branch=master)](https://travis-ci.com/IBM/TDD-NodeJS-Containers)

# Test-driven development (TDD) in Node.js

This code pattern shows you how to create a world class currency conversion microservice using test-driven development (TDD) in Node.js. This code pattern is a microservice that is a part of the [Bee Travels project](https://github.com/bee-travels).

Test-driven development is a style of programming that closely intertwines coding, testing, and designing. So, when designing the functionality of your application, you first write unit tests and then implement the code afterwards.

This pattern showcases modern Node.js development by using modern JavaScript [ECMA script](http://www.ecma-international.org/ecma-262/) and popular NPM libraries, which are listed in the [Anatomy of this Application](#anatomy-of-this-application) section at the bottom of this page. For our unit tests we use [Jest](https://jestjs.io/), a JavaScript unit-test framework testing library that works well with TDD.

## After completing this code pattern, you will understand how to:

* Develop applications using the test-driven development (TDD) methodology.
* Design and create a microservice with a REST interface that is documented with a test harness included in a swagger.yaml file.
* Use this simple microservice application as a basis to create microservices using Node.js and ECMA Script.

## Prerequisites

To implement this code pattern fully, you need to understand the basics of test-driven development, including unit tests, how it relates to contintuous integration/continuous delivery, red-green-refactoring, and more. 

Read our article [5 steps of test-driven development](https://developer.ibm.com/articles/5-steps-of-test-driven-development/) to get the background information you need to successfully implement this code pattern.

After reviewing that asset, a few things to know about this code pattern as it relates to those concepts: 

* This code pattern we use Jest unit tests. Jest uses the popular `describe`, `it`, and `expect` syntax, as seen here: [src/services/countryCurrencyCodeHandler.test.js](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/src/services/countryCurrencyCodeHandler.test.js#L17-L26). Remember to use mock data so that your tests don't fail because of changing data.
* This pattern shows linting and formatting NPM scripts in [package.json](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/package.json#L13-L14) using the ESLint linter. You can call it by running `npm run lint`. You can use the `prettier` formatter which can be run with `npm run format`.
* The unit tests we run in this pattern are run in the deployment pipeline as you can see [here](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/.travis.yml).
* This pattern uses [red-green-refactoring](https://developer.ibm.com/articles/5-steps-of-test-driven-development/#five-steps-of-test-driven-development) as described in the previous article.

## Test Driven Development (TDD) in action

> In the first video see how to set up and run this code pattern.

[Set up this code pattern and run it](https://youtu.be/r13OYhwYGa0)

***Video 1: From Git repo to production***

> Look at the tooling that enables TDD using Jest unit tests. See how to implement a new feature using Red-Green-Refactoring and test-first development.

[Development tooling and how to use TDD to add a new feature](https://www.youtube.com/watch?v=eDDMFPdh_Ek)

***Video 2: Adding a new feature with TDD***

> See how we fixed a bug that surfaced during the actual production of this code base.

[Using TDD to fix a bug](https://www.youtube.com/watch?v=pzLJ1cMhnc8)

***Video 3. Fixing a bug with TDD***


## Runtime flow

This flow is for the runtime of the currency conversion microservice.

![run time flow](doc/source/images/architecture.jpg)


***Figure 2. Production flow***

1. Consumer calls the microservice over the internet (http/s request).
1. ExpressJS `web server` accepts the REST request (e.g. GET /convertCurrency/ZAR/USD/600.66).
1. Code routing in Express passes the request to a service module which in turn calls the European Currency Exchange API.
1. An exchange rate for ZAR is retrieved and stored. The value of 600.66 South African Rands (ZAR) is converted to US Dollars(USD).
1. The ExpressJS `web server` sends a response to the calling consumer with the dollar amount (in this case, $40.59 ).

## Anatomy of this application

The currency exchange microservice uses the following libraries that can help you create a modern JavaScript application:

* **Jest for `Delightful` unit testing** 

    * Use Jest `mocks` to run unit tests locally without side effects. Examples of side effects include:
          * Calling external services (like other Web APIs) that are changed or offline; for example, the World Bank currency exchange API that our microservice wraps.
          * Calling external databases that are in-flux or down
          * Using time stamps and random ID generation that are non-deterministic, so they're not good for test data that may be generated on the fly (Mocks really shine here and provide expected reliable values that tests your business logic).
    * Hot code reloading (aka On page save hooks) run tests automatically on save by running `Jest -watch`.

* **Pino for logging**

    * A best practice is to have a logging framework to extract good errors from your application, as console.log is not always sufficient. See the [code](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/src/lib/logger.js) to see what it looks like to use a callback. 
    * [Pino](https://github.com/pinojs/pino) is a great simple tool to use logging framework.

* **Code formatting**

    * [Prettier](https://prettier.io/) for code formatting.

* **JavaScript syntax checking**
    
    * [ESLint](https://eslint.org/) helps you find and fix problems in your JavaScript code.

* **Git pre-commit hooks**
    
    Every time you run `git commit ...` both the linter and formatter will run. If, for example, you have extra spaces in your code like `const planet = " Saturn      ";`, the formatter automatically cleans up the code and formats it correctly to be `const planet = "Saturn";`. This newly formatted code is then committed and can be pushed. However, say you have a syntax error, for example `cnst planet = "Saturn";`, the commit will fail as the symbol `cnst` is invalid. You will see informative output in your console as Figure 3 shows. Once you have manually corrected the syntax error, you can recommit it until the syntax is correct and the linter passes.

![Git pre-commit hooks](./doc/source/images/pre-commit-hook-syntax-error-csnt-const.jpg)

***Figure 3. Syntax error caught by Git pre-commit hooks with both linter 1 (eslint) and formatter 2 (prettier)***


   This is achieved with the two `npm` libraries `lint-staged` and `husky`, which are installed by running `npx` as such:

    ``` sh
        npx mrm lint-staged
    ```
    
   You will see the following automatically appended to the `package.json` file:
    
    ``` json
        "husky": {
            "hooks": {
            "pre-commit": "lint-staged"
            }
        },
        "lint-staged": {
            "*.js": "eslint --cache --fix",
            "*.+(js|json)": "prettier --write"
        }
    ```

* **JavaScript Transpiler**  

    * Use [Babel JS](https://babeljs.io/)
          * You need a transpiler so you can use the latest JavaScript now (for example, Modules, `import` `export`, and support of [Optional Chaining](https://v8.dev/features/optional-chaining)).
          * Native support for modern JavaScript is expected in Node.js v13.2 or later, and transpilation will no longer be needed.

* [`rimraf`](https://www.npmjs.com/package/rimraf)
    * Cleanup previous builds and distributions
        * rimraf is The UNIX command `rm -rf` for ***node***

* **`swagger`**
    * Installing the npm package `swagger-ui-express` lets you create a REST API with a well-documented test harness with almost no effort at all, giving your microservice that professional and polished look as well as a useful way to manually test the API from a swagger html test harness.

# Steps to run this code pattern

## Run the code locally

1. Clone the repo by running `git clone TDD-NodeJS-Containers`.
1. Ensure [Node.js](https://nodejs.org/en/) 10.16.1 or later is installed by running `node -v`. We recommend using [Node Version Manager(NVM)](https://github.com/nvm-sh/nvm) to control the version of Node you use, as the system or installed Node.js version may need to change from project to project on your local development environment. NVM allows you to choose and switch which version of node and NPM that suits your project 
1. Install packages with NPM by running `npm install`.
1. Start the app by running  `npm start`.
1. Browse the API from your browser `localhost:4001`.

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.

# Resources

* [Using Test-Driven Development for Microservices](https://nordicapis.com/using-test-driven-development-for-microservices/),  by Bill Doerrfeld
* [Test-Driven Java Development, Second Edition: Invoke TDD principles for end-to-end application development](https://www.amazon.com/Test-Driven-Java-Development-Viktor-Farcic-ebook/dp/B00YSIM3SC), by Viktor Farcic
* [Blog on colocaton of unit-tests](https://kentcdodds.com/blog/colocation), by Ken Dodd

# License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
