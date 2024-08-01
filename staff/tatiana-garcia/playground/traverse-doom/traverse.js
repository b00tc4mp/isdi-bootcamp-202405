debugger

function traverse(element) {

    var elementTree = ''
    function loop(element) {

        var parentCount = 0
        var parent = element.parentElement

        while (parent != null) {

            parentCount++

            parent = parent.parentElement
        }

        elementTree += '\t'.repeat(parentCount) + element.tagName + '\n'

        var children = element.children

        for (var i = 0; i < children.length; i++) {

            var child = children[i]

            loop(child)
        }
    }

    loop(element)
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

