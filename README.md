# Take Home - ChargeLab

This takehome includes tests written for the V1 Chargers endpoint. The tests use the following libraries

- Nodejs
- Mocha as a test runner
- MochaAwesome for test reports
- SuperTest as an api testing library

## Running the tests

## Prerequisites

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

## Test Execution

To run the tests first open a terminal window in the root folder of the project. Then install the npm packages

```
npm install
```

Subsequently run the tests using the following command:

```
npm run test
```

The tests should run and the results displayed on the terminal window.

## Test Results

The mocha test results should be displayed on the terminal for the current execution after running the test command. For a more detailed execution
report please refer to the mochaAwesome html report located at `mochawesome-report/mochawesome.html`
