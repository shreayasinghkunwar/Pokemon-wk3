import { define_test, runTests, AssertEqual, verify_attackname, createStub } from "./test-utils.mjs";
import { Pokemon, TYPE_FIRE, TYPE_WATER, TYPE_GRASS } from "./index.mjs";
import { assertThrowsError } from "./test-utils.mjs";

//
var pokemon_fire = new Pokemon('Charmander', ['firebolt', 'paralyzed'], 'fire');
var pokemon_water = new Pokemon('Squirtle', ['Aqua Jet', 'Aqua Tail', 'Water Pulse'], 'water');
var pokemon_grass = new Pokemon('Bulbasaur', ['Vine Whip', 'Tackle'], 'grass');

define_test(
    'Test normal moves', () => {
        AssertEqual(pokemon_fire.getAttackDamageWrtType(pokemon_fire),
            100, 'fire attacks fire damage should be 100');
        AssertEqual(pokemon_water.getAttackDamageWrtType(pokemon_water),
            100, 'water attacks water damage should be 100');
        AssertEqual(pokemon_grass.getAttackDamageWrtType(pokemon_grass),
            100, 'pokemon_grass attacks grass damage should be 100');
    }
)


/*
define_test(
    'Test Supper effective moves', () => {
        AssertEqual(pokemon_fire.getAttackDamageWrtType(pokemon_grass),
            150, 'fire attacks grass damage should be 150');
        AssertEqual(pokemon_water.getAttackDamageWrtType(pokemon_fire),
            150, 'water attacks fire damage should be 150');
        AssertEqual(pokemon_grass.getAttackDamageWrtType(pokemon_water),
            150, 'grass attacks water damage should be 150');
    }
)
*/

/*
define_test(
    'Test Non effective  moves', () => {
        AssertEqual(pokemon_fire.getAttackDamageWrtType(pokemon_water),
            50, 'fire attacks water damage should be 50');
        AssertEqual(pokemon_water.getAttackDamageWrtType(pokemon_grass),
            50, 'water attacks grass damage should be 50');
        AssertEqual(pokemon_grass.getAttackDamageWrtType(pokemon_fire),
            50, 'grass attacks fire damage should be 50');
    }
)
*/


/*
define_test('Testing Attack name of Pokemon', () => {
    assertThrowsError(() => pokemon_fire.attack('Tackle', pokemon_water), `${pokemon_fire.name} doesnot know how to do`
        , 'Must throw error')
})
*/

define_test('Testing Attack name of Pokemon', () => {
    var pokemon_ice = new Pokemon('Squirtles', ['Aqua Jet', 'Aqua Tail', 'Water Pulse'], 'ice');
    assertThrowsError(() => pokemon_ice.attack('Tackle', pokemon_water), `Invalid Pokemon type `
        , 'Must throw error')
})

/*
//Test for missed attacks
define_test('Testing Missed Function', () => {
    const { restore: restoreFn } = createStub(pokemon_fire, '_randomlyDetermineAttackStatus',
        () => ({ miss: true, critical: false }))
    const attackResult = pokemon_fire.attack('firebolt', pokemon_water)

    restoreFn();
    const { critical, damage, miss } = attackResult;
    AssertEqual(critical, false, "Should not be critial attack")
    AssertEqual(damage, 0, 'Damage should be 0')
    AssertEqual(miss, true, 'Should be  missed attack')

})
*/

//Test for Critical Attacks
define_test('Testing Critical Function', () => {
    const { restore: restoreFn } = createStub(pokemon_fire, '_randomlyDetermineAttackStatus',
        () => ({ miss: false, critical: true }))

    //not effective attacks for critical attacks
    const attackResult = pokemon_fire.attack('firebolt', pokemon_water);
    //const attackResult = pokemon_water.attack('Aqua Jet', pokemon_grass)
    // const attackResult = pokemon_grass.attack('Tackel', pokemon_fire);
    const { critical, damage, miss } = attackResult;
    AssertEqual(critical, true, "Should not be critial attack");
    AssertEqual(damage, 50 * 2, 'Damage should be 100');
    AssertEqual(miss, false, 'Should be  missed attack');


    /*
    //normal  attacks for critical attacks

    const attackResult = pokemon_fire.attack('firebolt', pokemon_fire)

    //const attackResult = pokemon_water.attack('Aqua Jet', pokemon_water)

    // const attackResult = pokemon_grass.attack('Tackel', pokemon_grass)
    const { critical, damage, miss } = attackResult;
    AssertEqual(critical, true, "Should not be critial attack")
    AssertEqual(damage, 100 * 2, 'Damage should be 200')
    AssertEqual(miss, false, 'Should be  missed attack')
*/
    /*
        //super effective  attacks for critical attacks
        const attackResult = pokemon_fire.attack('firebolt', pokemon_grass)
        //const attackResult = pokemon_water.attack('Aqua Jet', pokemon_fire)
        // const attackResult = pokemon_grass.attack('Tackel', pokemon_water)
        const { critical, damage, miss } = attackResult;
        AssertEqual(critical, true, "Should not be critial attack")
        AssertEqual(damage, 150 * 2, 'Damage should be 300')
        AssertEqual(miss, false, 'Should be  missed attack')
    */

    restoreFn();




})
runTests();