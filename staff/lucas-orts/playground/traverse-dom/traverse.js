debugger

function traverse(element) {
    var elementTree = ''

    function loop(element) {
        var parentCount = 0
        var parent = element.parentElement

        while (parent !== null) {
            parentCount++

            parent = parent.parentElement
        }

        //if (element.tagName && element.tagName.includes('-'))
        //  alert('custom element detected: ' + element.tagName)

        //console.log('\t'.repeat(parentCount) + element.tagName)

        elementTree += '\t'.repeat(parentCount) + element.tagName + '\n'

        var children = element.children

        for (var i = 0; i < children.length; i++) {
            var child = children[i]

            loop(child)
        }
    }

    loop(element)

    return elementTree
}

console.log(traverse(document))
// VM7232:37 undefined
// HTML
// 	HEAD
// 		META
// 		META
// 		TITLE
// 	BODY
// 		SCRIPT
// 		HELLO-WORLD
// 		HELLO-WORLD
// 		COOL-CLOCK
// 		COOL-CLOCK
// 		SCRIPT