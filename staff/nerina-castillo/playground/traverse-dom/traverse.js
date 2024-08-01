function traverse(element) {
  var elementTree = "";

  function loop(element) {
    var parentCount = 0;
    var parent = element.parentElement;

    while (parent !== null) {
      parentCount++;

      parent = parent.parentElement;
    }

    elementTree += "\t".repeat(parentCount) + element.tagName + "\n";

    var children = element.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      loop(child);
    }
  }

  loop(element);

  return elementTree;
}
console.log(traverse(document));
