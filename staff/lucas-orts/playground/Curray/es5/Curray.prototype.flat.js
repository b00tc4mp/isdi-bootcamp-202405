const Curray = require('./Curray');

Curray.prototype.flat = function (depth = 1) {
    if (typeof depth !== 'number' || depth < 0) {
        throw new TypeError('Depth must be a non-negative number');
    }

    const flatten = (arr, depth) => {
        let result = new Curray();

        for (let i = 0; i < arr.length; i++) {
            let value = arr[i];

            if (depth > 0 && value instanceof Curray) {
                let flatValue = flatten(value, depth - 1);
                for (let j = 0; j < flatValue.length; j++) {
                    result[result.length] = flatValue[j];
                    result.length++;
                }
            } else {
                result[result.length] = value;
                result.length++;
            }
        }

        return result;
    };

    return flatten(this, depth);
};
