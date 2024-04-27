const request = require('supertest');
const { config } = require('../config');
const { ChargersV1, CSFFREEPLUGEV, CSFPAID, CSFDOESNOTEXIST } = require('../testDataUtils');
const { expect } = require('chai');
describe('GET V1 Chargers', () => {
    let clAgent;
    let baseURL;
    before(() => {
        baseURL = config.baseURL;
        clAgent = request.agent(baseURL);
    });
    it('tests the GET endpoint with a no filter applied', async() => {
        const response = await clAgent.get(
            `core/v1/chargers`
        );
        expect(response.status).to.equal(200);
        expect(response.body.totalCount).to.equal(7261);
    });
    it('tests the GET endpoint with a valid filter expression for csf-free-plugev', async() => {
        const expectedValues = ChargersV1(CSFFREEPLUGEV)
        const response = await clAgent.get(
            `core/v1/chargers?filter_eq[name]=${CSFFREEPLUGEV}&role=DRIVER`
        );
        expect(response.status).to.equal(200);
        expect(response.body.entities).to.have.lengthOf(1);
        expect(response.body.entities[0].name).to.equal(expectedValues.name);
        expect(response.body.entities[0].type).to.equal(expectedValues.type);
        expect(response.body.entities[0].model).to.equal(expectedValues.model);
        expect(response.body.entities[0].currentPrice.pricingType).to.equal(expectedValues.pricingType);
        expect(response.body.entities[0].description).to.equal(expectedValues.description);
    });
    it('tests the GET endpoint with a valid filter expression for csf-paid', async() => {
        const expectedValues = ChargersV1(CSFPAID)
        const response = await clAgent.get(
            `core/v1/chargers?filter_eq[name]=${CSFPAID}&role=DRIVER`
        );
        expect(response.status).to.equal(200);
        expect(response.body.entities).to.have.lengthOf(1);
        expect(response.body.entities[0].name).to.equal(expectedValues.name);
        expect(response.body.entities[0].type).to.equal(expectedValues.type);
        expect(response.body.entities[0].currentPrice.pricingType).to.equal(expectedValues.pricingType);
    });
    it('tests the GET endpoint with a valid filter expression for csf-does-not-exist', async() => {
        const response = await clAgent.get(
            `core/v1/chargers?filter_eq[name]=${CSFDOESNOTEXIST}&role=DRIVER`
        );
        expect(response.status).to.equal(200);
        expect(response.body.entities).to.have.lengthOf(0);
    });
    it('tests the GET endpoint with an invalid filter expression', async() => {
        const expectedResponse = ChargersV1('invalid');
        const response = await clAgent.get(
            `core/v1/chargers?filter_eq[role]=DRIVER`
        );
        expect(response.status).to.equal(400);
        expect(response.body.message).to.contain(expectedResponse);
    });
});

