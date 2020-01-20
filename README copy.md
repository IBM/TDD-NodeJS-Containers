The README for a code pattern is very prescriptive, use the following template to get you started.

<!-- Put badges at the very top -->
<!-- Change the repo -->
[![Build Status](https://travis-ci.org/IBM/watson-banking-chatbot.svg?branch=master)](https://travis-ci.org/IBM/watson-banking-chatbot)

<!-- Add a new Title and fill in the blanks -->
# Code patterns showing TDD in Node.js and containers

<!-- TDD stands for? -->

In this code pattern, we will show you how to create a world class   microservice using NodeJS and Containers. <add this is a currency conversion app>  i.e. a representation of a business need (Convert Currency value from one currency, say South African Rands [ZAR] to Pounds Sterling [GBP] using the most current daily exchange rate from ext API ...)  



We will use the latest and best npm libs ( as of writing this pattern 2020 jan) technologies used in NodeJS development:
#### 1) Version of JavaScript
[ECMA script](http://www.ecma-international.org/ecma-262/6.0/) (2015 ES6 or later)

#### 2) Testing Framework for Test Driven Development (TDD)
[Jest](https://jestjs.io/) `delightful unittest framework`

#### 3) Best Practice (?? of breed tooling)

*  Use Virtual environments [add explanation why digital ocean python venvs idea ] - Node Version Manager ([NVM](https://github.com/nvm-sh/nvm))
    * choose and switch which version of node and NPM that suits your project 
        * don't use the system version ever! It may and probably will change and could affect you program.
        * don't change the system version, it could affect other programs, or even worse your operating system and cause your computer or Virtual Server to crash!
        * If you want to use mulitple different versions of node which is often required these days, NVM will be your friend!

        * no -g no sudo def not su /

* Testing frameworks

    * Jest for `Delightful` Unittesting 
        * use Jest `mocks` to run unit tests locally 
            * avoid side-effects
                * like calling external services that could have changes or be offline, like other web apis ( e.g. The World Bank currency exchange api our micro service wraps ) 
                * external databases that could be in-flux or even down as well
                * time stamps and random ID generation are non-determisitic, so not good for test data that may be generated on the fly ( mocks really shine here and provide expected reliable values that tests your business logic )
        * working documentation

* Code formatting
    * Prettier 
    * git precommit hooks???

* JavaScript syntax checking
    * [ESLint](https://eslint.org/)
        * Find and fix problems in your JavaScript code
* JavaScript Build Compiler
    * [Babel JS](https://babeljs.io/)
        * Use next generation JavaScript, today
            * Put ***in*** next-gen(latest and greatest) JavaScript and get cross browser-compatible JavaScript ***out***
* On page save hooks
    * run tests automatically using `Jest -watch`
* On commit pre-hooks
    * << tbd need to check - maybe python only? >>
* [`rimraf`](https://www.npmjs.com/package/rimraf)
    * Cleanup previous builds and distributions
        * rimraf is The UNIX command `rm -rf` for ***node***
* `swagger` 
    * by installing the npm package `swagger-ui-express` you can
    create a REST api with a well documented test harness with almost no effort at all, giving your microservice that professional and polished look as well as a useful way to manually test the API from a swagger html test harness.


When you have completed this code pattern, you will understand how to:

* How to use this simple microservice application as a basis to create awesome world class microservices using NodeJS and the latest version of ECMA Script
* The importance of Test Driven Development (TDD) and how by incorporating tests throughout the development - deploy lifecycle will make your life easier, coding fun and be confident that your application will run as best as possilbe even after code changes due to either new feature requests or bug fixes are requeseted or found in QA
* write test first that break - philiosophy
* design and create a microservice with a REST interface that is documented with a test harness automatically provided by OpenAPI connect aka [Swagger](https://swagger.io/) definitons, by just adding a simple swagger.yaml file!  


<!--add an image in this path-->

figure 1: design time TDD process flow

## design time TDD Flow
<!-- main point move up top -->
1. View and understand the TDD method for unit tests for each feature you might adding

    4.1 Expect tests to break ( this is good at this point )

    4.2 Write business logic towards making the intial test to pass

    4.3 Continue and iterate until all test pass!

    4.4 rinse lather and repeat!



<!--Optionally, add flow steps based on the architecture diagram-->

# Watch the Video
### Test Driven Devlopment (TDD) in action
<< here we can illustrate how a bug, was fixed using a best practice methodology that uses TDD as it's underpinning >>

## Runtime Flow
![architecture](doc/source/images/architecture.jpg)
***figure 2: prodction flow***

1. Consumer calls our  microservice over the internet (http/s request)
2. ExpressJS `web server`   accepts the REST request (e.g. GET /convertCurrency/ZAR/USD/600.66)
3. Code routing in Express passes the request to a service module which in turn calls the European Currency Exchange API
4. An exchange rate for ZAR is retrieved and stored.  The value of 600.66 South African Rands (ZAR) is converted to US Dollars(USD)
5. The ExpressJS `web server` sends a response to the calling Consumer
with the dollar amount ( e.g. $40.59 )




<!--Optionally, update this section when the video is created-->
#### to learn more/next possible steps
video 1: add feature request
Video 2: show bug 
[![video](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg) << TDB host? where youtube -->>

# Steps to run pattern
1. Setup NVM
<< squiggly deets here on how to use NVM >>
1. NB use node version 10.16.1 later
1. git clone which will setup <<scaffolding>> directories, and files

   
1. Install packages with NPM





1. Travis setup in repo <<tbd ? who in team can help here? >>
1. Dockerize 
<squilly >
1. Prepare microservice for deployment to Kubernetes or Openshift

    8.1. Dockerfile prep

    8.2 Create docker image and push to DockerHub or IKS

1. Deploy to IBM Cloud

    9.1 OpenShift v4

    ### next steps for the advance interested user

1. Functional - Smoke testing
1. QA testing
1. User acceptence testing
1. rinse lather and repeat! ( refine app goto step 4 )


Use the **Deploy to IBM Cloud** button **OR** create the services and run locally.

<!--Optionally, add a deploy to ibm cloud button-->

```sh



end of Grant's rough draft




what follows below is just the template for README and I'll look at that tomorrow

```









## Deploy to IBM Cloud

[![Deploy to IBM Cloud](https://cloud.ibm.com/deploy/button.png)](https://cloud.ibm.com/deploy?repository=https://github.com/IBM/watson-banking-chatbot.git)

1. Press **Deploy to IBM Cloud**, and then click **Deploy**.

<!--optional step-->
2. In Toolchains, click **Delivery Pipeline** to watch while the app is deployed. After it's deployed, the app can be viewed by clicking **View app**.
![toolchain pipeline](doc/source/images/toolchain-pipeline.png)

<!--update with service names from manifest.yml-->

3. To see the app and services created and configured for this code pattern, use the IBM Cloud dashboard. The app is named `watson-banking-chatbot` with a unique suffix. The following services are created and easily identified by the `wbc-` prefix:
    * `wbc-conversation-service`
    * `wbc-discovery-service`
    * `wbc-natural-language-understanding-service`
    * `wbc-tone-analyzer-service`

## Run locally

> NOTE: These steps are only needed when running locally instead of using the **Deploy to IBM Cloud** button.

<!-- there are MANY updates necessary here, just screenshots where appropriate -->

1. [Clone the repo](#1-clone-the-repo).
2. [Create Watson services](#2-create-watson-services).
3. [Import the Watson Assistant workspace](#3-import-the-watson-assistant-workspace).
4. [Load the Watson Discovery documents](#4-load-the-watson-discovery-documents).
5. [Configure credentials](#5-configure-credentials).
5. [Run the application](#6-run-the-application).

### 1. Clone the repo

Clone the `watson-banking-chatbot` repo locally. In a terminal, run:

```bash
git clone https://github.com/IBM/watson-banking-chatbot
```

We’ll be using the file [`data/assistant/workspaces/banking.json`](data/assistant/workspaces/banking.json) and the folder
[`data/assistant/workspaces/`](data/assistant/workspaces/)

### 2. Create Watson services

Create the following services:

* [**Watson Assistant**](https://cloud.ibm.com/catalog/services/assistant)
* [**Watson Discovery**](https://cloud.ibm.com/catalog/services/discovery)
* [**Watson Tone Analyzer**](https://cloud.ibm.com/catalog/services/tone-analyzer)
* [**Watson Natural Language Understanding**](https://cloud.ibm.com/catalog/services/natural-language-understanding)

### 3. Import the Watson Assistant workspace

* Find the Watson Assistant service in your IBM Cloud Dashboard.
* Select the service, and then click **Launch tool**.
* Go to the **Skills** tab.
* Click **Create skill**.
* Click the **Import skill** tab.
* Click **Choose JSON file**, go to your cloned repo dir, and `Open` the workspace.json file in `data/conversation/workspaces/banking.json` (or the old full version in `full_banking.json`).
* Select **Everything**, and click **Import**.

To find the `WORKSPACE_ID` for Watson Assistant:

* Go back to the **Skills** tab.
* Click the three dots in the upper-right corner of the **watson-banking-chatbot** card, and select **View API Details**.
* Copy the `Workspace ID` GUID.
  ![view_api_details](doc/source/images/view_api_details.png)

*Optionally*, to view the assistant dialog, select the workspace and choose the
**Dialog** tab. Here's a snippet of the dialog:

![dialog](doc/source/images/dialog.PNG)

### 4. Load the Watson Discovery documents

Launch the **Watson Discovery** tool. Create a **new data collection**,
and give the data collection a unique name.

> Save the **environment_id** and **collection_id** for your `.env` file in the next step.

Under **Add data to this collection**, use **Drag and drop your documents here or browse from computer** to seed the content with the five documents in `data/discovery/docs`.

### 5. Configure credentials

The credentials for IBM Cloud services (Watson Assistant, Watson Discovery, 
Watson Tone Analyzer and Watson Natural Language Understanding) can be found in the **Services** menu in IBM Cloud
by selecting the **Service Credentials** option for each service.

The other settings for Watson Assistant and Watson Discovery were collected during the
earlier setup steps (``DISCOVERY_COLLECTION_ID``, ``DISCOVERY_ENVIRONMENT_ID``, and
``WORKSPACE_ID``).

Copy the [`env.sample`](env.sample) to `.env`.

```bash
cp env.sample .env
```
Edit the `.env` file with the necessary settings.

#### `env.sample:`

```bash
# Copy this file to .env and replace the credentials with
# your own before starting the app.

# Note: If you are using older services, you may need _USERNAME and _PASSWORD
# instead of _IAM_APIKEY.

# Watson Assistant
WORKSPACE_ID=<add_assistant_workspace>
ASSISTANT_URL=<add_assistant_url>
ASSISTANT_IAM_APIKEY=<add_assistant_iam_apikey>

# Watson Discovery
DISCOVERY_URL=<add_discovery_url>
DISCOVERY_ENVIRONMENT_ID=<add_discovery_environment_id>
DISCOVERY_COLLECTION_ID=<add_discovery_collection_id>
DISCOVERY_IAM_APIKEY=<add_discovery_iam_apikey>

# Watson Natural Language Understanding
NATURAL_LANGUAGE_UNDERSTANDING_URL=<add_nlu_url>
NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY=<add_nlu_iam_apikey>

# Watson Tone Analyzer
TONE_ANALYZER_URL=<add_tone_analyzer_url>
TONE_ANALYZER_IAM_APIKEY=<add_tone_analyzer_iam_apikey>

# Run locally on a non-default port (default is 3000)
# PORT=3000
```

### 6. Run the application

1. Install [Node.js](https://nodejs.org/en/) runtime or NPM.
1. Start the app by running `npm install`, followed by `npm start`.
1. Use the chatbot at `localhost:3000`.

> Note: The server host can be changed as required in the server.js file, and `PORT` can be set in the `.env` file.

<!--Add a section that explains to the reader what typical output looks like, include screenshots -->

# Sample output

![sample_output](doc/source/images/sample_output.png)

<!--Optionally, include any troubleshooting tips (driver issues, etc)-->

# Troubleshooting

* Error: Environment {GUID} is still not active, retry once status is active

  > This is common during the first run. The app tries to start before the Watson Discovery
environment is fully created. Allow a minute or two to pass. The environment should
be usable on restart. If you used **Deploy to IBM Cloud** the restart should be automatic.

* Error: Only one free environment is allowed per organization

  > To work with a free trial, a small free Watson Discovery environment is created. If you already have
a Watson Discovery environment, this will fail. If you are not using Watson Discovery, check for an old
service thay you might want to delete. Otherwise, use the `.env DISCOVERY_ENVIRONMENT_ID` to tell
the app which environment you want it to use. A collection will be created in this environment
using the default configuration.

<!-- keep this -->
## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
