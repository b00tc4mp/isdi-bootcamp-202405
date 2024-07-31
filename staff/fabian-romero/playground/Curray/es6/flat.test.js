
let flatejemplo = (1, 2, 3, (1, 2, (3, 4)))

var newflat = callback(element, i = '', this = {}) {
    for (var i = 0; i < this.length; i++) {
    if (!callback(this[i]))

        return false




    if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
            flattenObject(obj[key], newKey, result);
        } else {
            result[newKey] = obj[key];
        }
    }
}
return result;
}


const flatObj = newflat(flatejemplo);
// console.log(flatObj);