/* Import modules. */
import BigNumber from 'bignumber.js'


/**
 * Format Units
 *
 * TBD
 */
export function formatUnits(_value, _unitName) {
    if (!_unitName) {
        return _value.toString()
    }

    return new BigNumber(_value).div(10 ** Number(_unitName)).toFixed()
}
