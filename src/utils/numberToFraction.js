/**
 * from code: https://gist.github.com/danielbachhuber/ed56cde1eabd6677e34e23cb56f591b6
 * 
 * Converts numbers to fractions:
 * - 1.25 to 1 1/4
 * - 2 to 2
 */
const numberToFraction = function( amount ) {
    // This is a whole number and doesn't need modification.
    if ( parseFloat( amount ) === parseInt( amount ) ) {
        return amount;
    }
    // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
    var gcd = function(a, b) {
        if (b < 0.0000001) {
            return a;
        }
        return gcd(b, Math.floor(a % b));
    };
    var len = amount.toString().length - 2;
    var denominator = Math.pow(10, len);
    var numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    var base = 0;
    // In a scenario like 3/2, convert to 1 1/2
    // by pulling out the base number and reducing the numerator.
    if ( numerator > denominator ) {
        base = Math.floor( numerator / denominator );
        numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + '/' + Math.floor(denominator);
    if ( base ) {
        amount = base + ' ' + amount;
    }
    return amount;
}

export default numberToFraction