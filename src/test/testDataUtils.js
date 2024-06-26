'use strict'

// Name of Chargers Used in Test Files
const CSFFREEPLUGEV = 'csf-free-plugev';
const CSFPAID= 'csf-paid'
const CSFDOESNOTEXIST= 'csf-does-not-exist'

/**
     * This method is used to return an object of expectedValues provided a charger name.
     * 
     * @param chargerName - The name of the charger for which to retrieve the expected values
     * 
     * @returns - An Object which contains all the expected values to be asserted on.
*/

const ChargersV1 = (chargerName) => {
    switch (chargerName) {
        case CSFFREEPLUGEV: 
            return {
                name: 'CSF-FREE-PLUGEV',
                type: 'Level 3',
                model: 'Phihong DW30',
                pricingType: "FREE",
                description: 'Private station for testing',
            };
        case CSFPAID: 
            return {
                name: 'CSF-PAID',
                type: 'Level 3',
                pricingType: "BILLED_BY_EFFECTIVE_CHARGING_TIME"
            };
        case 'invalid':
            return 'Validation failed';
    }
}

module.exports = {
    CSFFREEPLUGEV,
    CSFPAID,
    CSFDOESNOTEXIST,
    ChargersV1
}