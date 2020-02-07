[![Build Status](https://travis-ci.com/IBM/TDD-NodeJS-Containers.svg?branch=master)](https://travis-ci.com/IBM/TDD-NodeJS-Containers)

# Currency Exchange - Best Practices building a world class Node.js microservice

This code pattern shows you how to create a world class currency conversion microservice in Node.js. This code pattern is a microservice that is a part of the [Bee Travels project](https://github.com/bee-travels).

This pattern showcases modern Node.js development by using modern JavaScript, and best of breed, popular NPM libraries, which are listed in the [Anatomy of this Application](#anatomy-of-this-application) section at the bottom of this page. 

This application was created using Test Driven Development(TDD) methodologies, in particular the Red-Green-Refactor or test first approach. No code was written without ***first*** writing an associated unit-test.

 Read our article [5 steps of test-driven development](https://developer.ibm.com/articles/5-steps-of-test-driven-development/) to get the background information on the TDD approach we used create the currency exchange microservice in this code pattern.

For our unit tests we use [Jest](https://jestjs.io/), a JavaScript unit-test framework testing library that works well with TDD.

## After reading this code pattern, you will understand how to:

* Design and create a Node.js microservice with a REST interface that has a  swagger test harness where you can manually inspect, discover and run the various API endpoint.
* Use and run this simple microservice 
* Use the code base as a reference architecture and toolchain to create your own Node.js microservices 
* Deploy and run this microservice on Kubernetes


## Architecture

This flow is for the runtime of the currency conversion microservice.

![run time flow](doc/source/images/architecture.jpg)


***Figure 1. Production flow***

1. Consumer calls the microservice over the internet (http/s request).
1. ExpressJS `web server` accepts the REST request (e.g. GET /convertCurrency/ZAR/USD/600.66).
1. Code routing in Express passes the request to a service module which in turn calls the European Currency Exchange API.
1. An exchange rate for ZAR is retrieved and stored. The value of 600.66 South African Rands (ZAR) is converted to US Dollars(USD).
1. The ExpressJS `web server` sends a response to the calling consumer with the dollar amount (in this case, $40.59 ).

## Included components

* [IBM Cloud Container Service](https://console.bluemix.net/docs/containers/container_index.html):  IBM Bluemix Container Service manages highly available apps inside Docker containers and Kubernetes clusters on the IBM Cloud.
* [Swagger](https://swagger.io/): A framework of API developer tools for the OpenAPI Specification that enables development across the entire API lifecycle.


## Featured technologies

* [Container Orchestration](https://www.ibm.com/cloud-computing/bluemix/containers): Automating the deployment, scaling and management of containerized applications.
* [Microservices](https://www.ibm.com/developerworks/community/blogs/5things/entry/5_things_to_know_about_microservices?lang=en): Collection of fine-grained, loosely coupled services using a lightweight protocol to provide building blocks in modern application composition in the cloud.
* [Node.js](https://nodejs.org/): Node.js is a JavaScript framework which has an awesome package manager called `npm` that lets you build awesome applications with components built and supported by an active Open Source community.
* [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
* [Axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and Node.js
* [csvtojson](https://www.npmjs.com/package/csvtojson): A node module is a comprehensive nodejs csv parser to convert csv to json or column arrays
* [esm]https://www.npmjs.com/package/esm): The brilliantly simple, babel-less, bundle-less ECMAScript module loader.
<details><summary><strong>Why JavaScript Modules?</strong></summary>

> esm is the world’s most advanced ECMAScript module loader. This fast, production ready, zero dependency loader is all you need to support ECMAScript modules in Node 6+. 
See the release [post](https://medium.com/web-on-the-edge/tomorrows-es-modules-today-c53d29ac448c) for details!
</details>

# Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop)
* [IBM Cloud Kubernetes Service Provisioned](https://www.ibm.com/cloud/container-service)

For running these services locally without Docker containers, the following will be needed:

* [Node.js v10 or later](https://nodejs.org/en/download/)
<details><summary><strong>TIP: use Node Version Manager(nvm)</strong></summary>
> `nvm` is a "POSIX-compliant bash script to manage multiple active node.js versions"

> We recommend using `Node Version Manager(NVM)` to control the version of Node.js/NPM you use.
> Why? The system or Operating system installed Node.js version is fixed.  You may need different versions of Node for other projects.  
> NVM allows you to choose and switch which version of node and NPM that suits your needs 
> Install via command line:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```


NVM details and most up to date installation instructions [read here](https://github.com/nvm-sh/nvm)

</details>

* [Relevant Node.js packages](package.json): Use `npm install`




### This code pattern was built 100% TDD and has 100% test coverage.we 

We used Jest as our unit test framework. Jest uses the popular `describe`, `it`, and `expect` syntax, as seen here: [src/services/countryCurrencyCodeHandler.test.js](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/src/services/countryCurrencyCodeHandler.test.js#L17-L26).

 Remember to use mock data so that your tests don't fail because of changing data.

This pattern includes neat developer productivity tools:

1. linting and formatting NPM scripts

See [package.json](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/package.json#L13-L14) using the ESLint linter. You can call it by running `npm run lint`. You can use the `prettier` formatter which can be run with `npm run format`.

The unit tests we run in this pattern are run in the deployment pipeline as you can see [here](https://github.com/IBM/TDD-NodeJS-Containers/blob/master/.travis.yml).

# Steps 

Follow these steps to setup and run this code pattern locally and on the Cloud. The steps are described in detail below.

1. [Clone the repo](#1-clone-the-repo)
2. [Run the application locally](#2-run-the-application-locally)
3. [Build a docker image, then run it locally](#3-Build-a-docker-image-then-run-it-locally)
4. [Deploy to IBM Cloud](#4-deploy-to-ibm-cloud)



### 1. Clone the repo

Clone the `currencyexchange` repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/TDD-NodeJS-Containers.git

cd TDD-NodeJS-Containers
```

### 2. Run the application locally

1. Install packages with NPM by running `npm install`.
1. Start the app by running  `npm start`.
1. Browse the API from your browser `localhost:4001`.

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.

### 3. Build a docker image, then run it locally

1. Make sure you are at the root of this application.
1. Note your docker-hub username
<details><summary><strong>How to find your docker hub credentials</strong></summary>
> to download docker desktop you'll need to have created a docker hub account.

> to find the username, you can click on at your docker desktop icon (mac) toolbar 
![Docker Desktop Find your logged in Username](./doc/source/images/docker-desktop-get-username.png)
</details>

1. Build the docker image by running:

```bash
export DOCKERHUB_USERNAME=<your-dockerhub-username>
docker build -t $DOCKERHUB_USERNAME/currencyexchange:latest .
```

<details><summary><strong>expected output details</strong></summary>
![detailed output from docker build](./doc/source/images/docker-build-output.png)

</details>

>
> Wondering if your build is current or cached?

<details><summary><strong>How to clean up docker images that may be out of date</strong></summary>
> Docker provides a single command that will clean up any resources — images, containers, volumes, and networks — that are dangling (not associated with a container):

```bash
docker system prune -a
```

If you still see images for `currencyexchange` confirm this by running:

```bash
docker images -a |  grep "currencyexchange"
```
![docker images](./doc/source/images/docker-images-grep.png)

If in doubt that this was the latest build?  It looks like it's not as it was created 12 hours ago, you can delete that image by running:

```bash
docker images -a | grep "currencyexchange" | awk '{print $3}' | xargs docker rmi -f
```
Then re-run:

```bash
docker build -t $DOCKERHUB_USERNAME/currencyexchange:v0.0.1 .    
```

More details on Docker image management [read here](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)

</details>

Great!  So now lets run the image locally!

```bash
 docker run -p 4001:4001 grantsteinfeldibm/currencyexchange:v0.0.1
```

You should now see the currencyexchange microservice up and running

![success docker running microservice](./doc/source/images/docker-run-off-local-image.jpg)

Explore the microservice with the Open API Doc (Swagger) at
>  [http://localhost:4001](http://localhost:4001) for documentation about this API's endpoints and a `try-it-out` test harness to actually run the API calls.



### 4. Deploy to IBM Cloud

1. To allow changes to the this microservice create a repo on [Docker Cloud](https://cloud.docker.com/) where the new modified containers will be pushed to. 

> NOTE: If a new repo is used for the Docker containers, the container `image` will need to be modified to the name of the new repo used in [<<repo_root>>/deploy/xxx-webapp.yml](./deploy/deploy-svcxxxx.yml).

```bash
export DOCKERHUB_USERNAME=<your-dockerhub-username>

docker build -t $DOCKERHUB_USERNAME/currencyexchange:v0.0.1 .

docker login

docker push $DOCKERHUB_USERNAME/currencyexchange:v0.0.1

```

 Provision the [IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) and follow the set of instructions for creating a Container and Cluster based on your cluster type, `Standard` vs `Lite`.




## Anatomy of this application


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

* esm 
 * The brilliantly simple, babel-less, bundle-less ECMAScript module loader.

* [`rimraf`](https://www.npmjs.com/package/rimraf)
    * Cleanup previous builds and distributions
        * rimraf is The UNIX command `rm -rf` for ***node***

* **`swagger`**
    * Installing the npm package `swagger-ui-express` lets you create a REST API with a well-documented test harness with almost no effort at all, giving your microservice that professional and polished look as well as a useful way to manually test the API from a swagger html test harness.


# Resources

* [Using Test-Driven Development for Microservices](https://nordicapis.com/using-test-driven-development-for-microservices/),  by Bill Doerrfeld
* [Test-Driven Java Development, Second Edition: Invoke TDD principles for end-to-end application development](https://www.amazon.com/Test-Driven-Java-Development-Viktor-Farcic-ebook/dp/B00YSIM3SC), by Viktor Farcic
* [Blog on colocaton of unit-tests](https://kentcdodds.com/blog/colocation), by Ken Dodd

# License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
