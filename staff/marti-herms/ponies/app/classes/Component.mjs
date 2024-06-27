class Component {
    constructor(container) {
        this.container = container;
    }

    setClassName(className) {
        if (!(className.length > 0)) {
            throw new TypeError('className is not a String');
        }
        this.container.className = className;
    }

    setId(id) {
        this.container.id = id;
    }

    setType(type) {
        if (!(type.length > 0)) {
            throw new TypeError('type is not a String');
        }
        this.container.type = type;
    }

    add(child) {
        if (!(child instanceof Component)) {
            throw new TypeError('child is not a Component');
        }
        this.container.appendChild(child.container);
    }

    remove(child) {
        if (!(child instanceof Component)) {
            throw new TypeError('child is not a Component');
        }
        this.container.removeChild(child.container);
    }

    setText(text) {
        this.container.innerText = text;
    }

    getChildren() {
        return this.container.children;
    }
}

export default Component;