//import { isEqual } from "lodash";
//import { isEqual } from "lodash";
const tests = []

/**
 * @param {string} name
 *
 */


export function define_test(name, definition) {

    tests.push({ name, definition })
}

export function runTests() {
    tests.forEach(({ name, definition }) => {
        console.error(name)
        try {
            definition();
            console.error(`✔️ Passed\n`)
        } catch (e) {
            console.error(`❌ Failed: ${e.message}\n`)
        }
    })
}

// testing the  attacks
export function test_attacks(obtained_attack, expected_attack, message) {

    if (!(JSON.stringify(obtained_attack) === JSON.stringify(expected_attack))) {
        const errorMsg = [
            `Expected result is ${JSON.stringify(expected_attack)}, not ${JSON.stringify(obtained_attack)}`,
            message
        ].join(': ')
        throw new Error(errorMsg)

    }

}

// testing attack names 
export const verify_attackname = (attacks, attackName, name) => {

    if (!attackName.includes(attacks)) {
        throw new Error(`${name} does not know how to do that.`)
    }

}
