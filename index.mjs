export function Pokemon(name, _attacks, _type) { // TODO: full up constructor args
    // TODO: fill up constructor
    this.name = name;
    this._attacks = _attacks; //attackname
    this._type = _type; //type fire ,water grass
}

export const TYPE_FIRE = 'fire'
export const TYPE_WATER = 'water'
export const TYPE_GRASS = 'grass'

Pokemon.TYPE_ADVANTAGE_MAPPING = {
    // strong : weak
    [TYPE_FIRE]: TYPE_GRASS,
    [TYPE_WATER]: TYPE_FIRE,
    [TYPE_GRASS]: TYPE_WATER
}

Pokemon.prototype._randomlyDetermineAttackStatus = function () {
    const chance = Math.random()
    return {
        miss: chance < 0.01,
        critical: chance > 0.99
    }
}

/**
 * @param {string} attackName
 * @param {Pokemon} receiverPokemon
 */
Pokemon.prototype.attack = function (attackName, receiverPokemon) {
    if (!this._attacks.includes(attackName)) {
        throw new Error(`${this._name} doesnt know how to do that.`)
    }
    const { critical, miss } = this._randomlyDetermineAttackStatus()
    if (miss) {
        return {
            damage: 0,
            miss,
            critical
        }
    } else {
        const baseDamage = this.getAttackDamageWrtType(receiverPokemon)
        return {
            damage: critical ? baseDamage * 2 : baseDamage,
            critical,
            miss
        }
    }
}

/**
 * @param {Pokemon} receiverPokemon
 */
Pokemon.prototype.getAttackDamageWrtType = function (receiverPokemon) {
    const attackerType = this._type
    const receiverType = receiverPokemon._type
    const attackerStrongAgainstType = Pokemon.TYPE_ADVANTAGE_MAPPING[attackerType]
    const receiverStrongAgainstType = Pokemon.TYPE_ADVANTAGE_MAPPING[receiverType]

    if (attackerType == receiverType) {
        return 190
    } else if (receiverStrongAgainstType === attackerType) {
        return 50
    } else {
        return 220
    }
}