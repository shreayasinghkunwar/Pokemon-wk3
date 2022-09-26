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
export function AssertEqual(obtained_attack, expected_attack, message) {

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


/**
 * @param {() => void} fn
 * @param {string=} matchErrorMessage
 * @param {string=} message
 */
export function assertThrowsError(fn, matchErrorMessage, message) {
    let thrownError = null
    try {
        fn()
    } catch (e) {
        thrownError = e
    }
    if (!thrownError) {
        const errorMsg = [
            `Expected function to throw error but it did not`,
            message
        ].filter(v => v)
            .join(': ')
        throw new Error(errorMsg)
    }
    if (matchErrorMessage && matchErrorMessage === thrownError.message) return
    const errorMsg = [
        ` Error message : "${matchErrorMessage}" `,
        message
    ].filter(v => v)
        .join(': ')
    throw new Error(errorMsg)
}

export function createStub(pokemon, stubMethod, implementation) {
    const actualValue = pokemon[stubMethod]
    pokemon[stubMethod] = implementation
    return {
        restore: () => {
            pokemon[stubMethod] = actualValue;

        }
    }
}