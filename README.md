[![Build Status](https://travis-ci.com/IBM/TDD-NodeJS-Containers.svg?branch=master)](https://travis-ci.com/IBM/TDD-NodeJS-Containers)

# Test Driven Development (TDD) in NodeJS

In this code pattern, we will show you how to create a world class currency conversion microservice using Test Driven Development (TDD) in NodeJS.  This code pattern is a microservice that is a part of the [Bee Travels project](https://github.com/bee-travels)

TDD is a style of programming that closely intertwines coding, testing, and designing. To illustrate, when designing the functionality of your application, you would write unit-tests first then implement the code afterwards.

We will attempt to use and showcase modern NodeJS development by using  [ECMA script](http://www.ecma-international.org/ecma-262/6.0/) (2015 ES6 or later) and best NPM libraries - listed in the [Anatomy of this Application](##anatomy-of-this-application) section at the bottom of this page.

The JavaScript unit-test framework testing library we will use for TDD in this code pattern is [Jest](https://jestjs.io/).


### When you have completed this code pattern, you will understand how to:

* Develop using the Test Driven Development (TDD) methodology 
* Incorporate tests throughout the development lifecycle - deploy lifecycle will make your life easier, coding fun and be confident that your application will run as best as possible even after code changes due to either new feature requests or bug fixes are requested or found in QA
* Write test first that break - philosophy
* Design and create a microservice with a REST interface that is documented with a test harness automatically provided by OpenAPI connect aka [Swagger](https://swagger.io/) definitions, by just adding a simple swagger.yaml file!  
* Use this simple microservice application as a basis to create awesome world class microservices using NodeJS and the latest version of ECMA Script


## Design time Flow

It is during coding ( aka Design time ) that TDD is practiced.

### The Red-Green-Refactor process

The Red-Green-Refactor process is the core part of TDD, without it no other aspect of TDD will function.

Figure 1 below showing the steps that typically occur when working in 
a test driven way (aka Red-Green-Refactoring)

![design time flow red green refactoring](doc/source/images/red-green-refactoring.jpg)


***figure 1: red-green-refactoring***


1. Pick a story ( e.g. feature request  or bug/issue )
1. Write a unit-test that represents the story
1. Run the test, it will fail (RED)
1. Implement business logic towards making this test to pass
1. Run the test until it passes (GREEN)
1. Refactor business logic to improve code (TEAL)

The name comes from the status of the tests within the cycle. When in the red state, code does not work.  When in the green state everything is working, but not necessary in the most optimal way.  When in the teal phase we are refactoring phase where we are confident our code is covered with tests and thereby gives us the confidence to change and improve our code.


# Watch the Video
### Test Driven Devlopment (TDD) in action

[![video using TDD to add a feature](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg)
***Video 1: add a feature***

[![video using TDD to fix a bug](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg)
***Video 2: fix a bug***



## Runtime Flow

This flow is for the runtime of the currency conversion microservice.

![run time flow](doc/source/images/architecture.jpg)


***figure 2: production flow***


1. Consumer calls our  microservice over the internet (http/s request)
1. ExpressJS `web server`   accepts the REST request (e.g. GET /convertCurrency/ZAR/USD/600.66)
1. Code routing in Express passes the request to a service module which in turn calls the European Currency Exchange API
1. An exchange rate for ZAR is retrieved and stored.  The value of 600.66 South African Rands (ZAR) is converted to US Dollars(USD)
1. The ExpressJS `web server` sends a response to the calling Consumer
with the dollar amount ( e.g. $40.59 )


# Steps to run this code pattern

## run locally

1. Clone the repo by running `git clone TDD-NodeJS-Containers`
1. Ensure [Node.js](https://nodejs.org/en/) 10.16.1 later installed
by running `node -v`

<details><summary><strong>Recommendation use NVM to run Node</strong></summary>
Use Node Version Manager(NVM) to control the version of node you use, as the system or installed node may need to change from project to project on your local development environment.

Node Version Manager ([NVM](https://github.com/nvm-sh/nvm))
allows you to choose and switch which version of node and NPM that suits your project 

If you want to use mulitple different versions of node which is often required these days, NVM will be your friend!

</details>

1. Install packages with NPM by running `npm install`
1. Start the app by running  `npm start`
1. Browse the API from your browser `localhost:4001`

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.


## CI/CD - e.g. Travis or Circle CI

The unit tests that come out of TDD are also an integral part of the CI/CD process.  The tests are run in the deployment pipeline. If all tests pass, integration and deployment will happen. On the other hand, if any tests fail, the process is halted, thus ensuring the `build is not broken`

## Anatomy of this Application

The currency exchange micro-service uses the following libraries that could constitute the fabric in creating a modern JavaScript application:


### Design / Development time:

* Jest for `Delightful` Unittesting 
    * use Jest `mocks` to run unit tests locally without side-effects
        <details><summary>examples of side effects</summary>
            * like calling external services that could have changes or be offline, like other web apis ( e.g. The World Bank currency exchange api our micro service wraps ) 
            * external databases that could be in-flux or even down as well
            * time stamps and random ID generation are non-determisitic, so not good for test data that may be generated on the fly ( mocks really shine here and provide expected reliable values that tests your business logic )
    </details>

    * Hot code reloading (aka On page save hooks) run tests automatically by running `Jest -watch`


* Code formatting
    * Prettier 

* JavaScript syntax checking
    * [ESLint](https://eslint.org/)
        * Find and fix problems in your JavaScript code

* JavaScript Build Compiler
    * [Babel JS](https://babeljs.io/)
        * Use next generation JavaScript, today
            * Put ***in*** next-gen(latest and greatest) JavaScript and get cross browser-compatible JavaScript ***out***

* [`rimraf`](https://www.npmjs.com/package/rimraf)
    * Cleanup previous builds and distributions
        * rimraf is The UNIX command `rm -rf` for ***node***

* `swagger` 
    * by installing the npm package `swagger-ui-express` you can create a REST api with a well documented test harness with almost no effort at all, giving your microservice that professional and polished look as well as a useful way to manually test the API from a swagger html test harness.


# Resources
https://nordicapis.com/using-test-driven-development-for-microservices/

# Sample output

![sample_output](doc/source/images/sample_output.png)

# Troubleshooting
<!-- keep this -->
sudo root node / npm

## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
