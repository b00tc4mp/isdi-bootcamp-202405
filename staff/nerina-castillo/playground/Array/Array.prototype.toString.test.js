console.info("TEST Array.prototype.toString");

console.info("CASE toString in array");

var array = [1, 2, "a", "1a"];

var arrayString = array.toString();

console.assert(arrayString === "1,2,a,1a", "arrayString is 1,2,a,1a");
