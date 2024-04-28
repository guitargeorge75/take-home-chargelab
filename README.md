# Take Home - ChargeLab

[![ChargeLab Tests CI](https://github.com/guitargeorge75/take-home-chargelab/actions/workflows/node.js.yml/badge.svg)](https://github.com/guitargeorge75/take-home-chargelab/actions/workflows/node.js.yml)

This take home includes tests written for the V1 Chargers endpoint. The tests use the following libraries

- Nodejs
- Mocha as a test runner
- Mochawesome for test reports
- SuperTest as an api testing library

## Running the tests

### Prerequisites

Ensure you are on Node version 18.17.0. The easiest way to achieve this is by using nvm. For Mac, follow instructions [here](https://formulae.brew.sh/formula/nvm) to install nvm. For windows please follow instructions [here](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

Once nvm is installed, please run the following commands from a terminal.

```
nvm install 18.17.0
nvm use 18.17.0
```

Then ensure you are on the correct version of node running the following command

```
node --version
```

### Test Execution

To run the tests first open a terminal window in the root folder of the project. Then install the npm packages

```
npm install
```

Subsequently run the tests using the following command:

```
npm run test
```

The tests should run and the results displayed on the terminal window.

### Test Results

The mocha test results should be displayed on the terminal for the current execution after running the test command. For a more detailed execution
report please refer to the mochawesome html report located at `mochawesome-report/mochawesome.html`

### CI Implementation

The tests are also being executed on every pull request to this repository in github using github actions. They can also be executed manually from the github action tab. To do so, please follow the instruction [here](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow#running-a-workflow). Once a github actions run is completed, the artifacts for that run including the mochawesome html reports can be downloaded from the run history. Past executions are available [here](https://github.com/guitargeorge75/take-home-chargelab/actions).

Note - To execute the tests in github actions, I might need to give access to the repository. Please reach out at subhayumukherji@gmail.com for access.
## Test Approach

For this exercise I was provided with a GET endpoint for chargers on a UAT environment. The approach I adopted was the following:

Test Stack - For ease of time, I used the stack most familiar to me. However for a real application testing suite the tests must use a stack which is most
familiar to the majority of the team including developers and QE. For a Java application, Given that ChargeLab uses Java, if I had more time, I would use a library such as Rest Assured with JUnit as a test runner. I would have to explore reporting libraries, but I'm sure there are plenty available. This would enable the entire team to contribute to the testing suite without having to learn an entire new language and stack. Also I have not had the time to lint the code, so I would not be surprised if there are linting errors. Given time I would definitely clean up the code and remove any linting errors.

Test Cases - Based on the information provided in the documentation and my own exploration, I was able to retrieve multiple different charger details based on the filter by altering the name. (I did try retrieving different changes by filtering on `[type]` or `[model]` but without more details on the endpoint, I was not able to.) The 5 test cases I ran for this endpoint includes 3 positive and 2 negative scenarios. The first one is just validating the endpoint returns a full list of chargers. The second two scenarios cover two different chargers. The fourth scenario checks for a charger that does not exist and ensures that a success code with an empty response is sent. The fifth scenario is around an invalid request that returns an error code. API tests being in the middle of the pyramid should have sufficient coverage to test all points of integration of the system and also have at least one scenario for each possible usage type covered. Given more time and more context on how this endpoint is used, I would definitely add more scenarios to cover more filtering rules including other json components like type or price or status. However also to keep in mind that the most granular tests should be at a unit level, I would be hesitant to add multiple scenarios for each type of filtering at an API level. 

The test cases are also independent of each other and do not share state. This is a best practice that should be followed across the board to enable parallel execution of tests in CI and locally for large volume of tests.

A note on authentication - This endpoint is unauthenticated and as such not secured in anyway. In most cases GET endpoints would require a level of authentication and in some cases would have some user role login involved in determining what level of data is returned. Such scenarios are highly recommended to be included in API tests.

Test Data and Assertions - The test data for this test has been curated from the document that was provided to be which included examples of a few chargers available in UAT. The expected values were also extracted from the response observed from the UAT environment. As such this is not good practice at all. If chargers can be created dynamically, then the suite should create a charger in the `before` block (using another API call or preferably by using data models to directly interact with the database instance) and then assert on said created chargers. If chargers are static and pulled from a source of truth, then the charger names and their associated data should come from business requirements. Also I cherry-picked a few values from the json object to assert on for each test based on my own understanding of the importance. Given time and more context, I would design assertion functions that assert on either the entire object or offer a more robust assertion methodology.

## Risks and Limitations

The biggest risk associated with this test suite is that it is being executed in the UAT environment. Typically the UAT environment is final environment before production and has multiple components working together. All teams contribute to UAT and as a result the chances of UAT being broken at any given point of time is high. In such cases of failures, it would be difficult to pinpoint the source of failure and P2P might be blocked due to risks introduced by other unrelated code or other teams. Ideally tests should be run against an isolated environment with all external dependencies mocked so that failures are only caused by the code under test and not other external systems. 

Other risks to this tests include very clearly the risk of assertions failing if the response structure is changed without corresponding updates made to the test or if the values returned in the response body change. Because the test data is hard coded in the test library it is quite possible that the API might return different data if something changes. To mitigate this risk, as stated in the Test Data section, the data should be created by the test if it is possible to generate this data dynamically. If the data is static, then it should be coming from a single source of truth and all test suites need to be updated if the source of truth changes.




