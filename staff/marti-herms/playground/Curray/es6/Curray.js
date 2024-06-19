class Curray {
    constructor() {
        if (arguments.length === 1 && typeof arguments[0] === 'number')
            this.length = arguments[0]
        else {
            for (let i = 0; i < arguments.length; i++) {
                const argument = arguments[i]

                this[i] = argument
            }

            this.length = arguments.length
        }
    }

    at(index) {
        if (index > -1) {
            return this[index];
        } else {
            return this[this.length + index]
        }
    }

    concat() {
        const newCurray = new Curray();
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]
            newCurray[newCurray.length++] = elem
        }
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i].length; j++) {
                const elem = arguments[i][j]
                newCurray[newCurray.length++] = elem;
            }
        }
        return newCurray;
    }

    copyWithin(target, start, end = this.length) {
        if (target >= -this.length && target < 0) {
            target = target + this.length;
        } else if (target < -this.length) {
            target = 0;
        }

        if (start >= -this.length && start < 0) {
            start = start + this.length;
        } else if (start < -this.length) {
            start = 0;
        }

        if (end >= -this.length && end < 0) {
            end = end + this.length;
        } else if (end < -this.length) {
            end = 0;
        } else if (end > this.length) {
            end = this.length;
        }

        if (end <= start || start >= this.length || target >= this.length) {
            return this;
        }
        const auxArray = [];
        for (let i = 0; i < end - start; i++) {
            auxArray[i] = this[start + i];
        }
        for (let i = 0; i < auxArray.length; i++) {
            this[target + i] = auxArray[i];
        }
        return this;
    }

    some(callbackFn) {
        for (let i = 0; i < this.length; i++) {
            if (!callbackFn(this[i])) {
                return false;
            }
        }
        return true;
    }

    fill(value, start, end) {

        if (start === undefined || start < -this.length) {
            start = 0;
        } else if (start < 0) {
            start += this.length;
        } else if (start >= this.length) {
            return this;
        }

        if (end === undefined || end >= this.length) {
            end = this.length;
        } else if (end < 0) {
            end += this.length;
        } else if (end < -this.length) {
            end = 0;
        } else {

            return this;
        }

        for (let i = start; i < end; i++) {

            this[i] = value
        }

        return this

    }

    filter(callbackFn) {
        const newCurray = Curray();
        for (let i = 0; i < this.length; i++) {
            if (callbackFn(this[i], i, this)) {
                newCurray[newCurray.length++] = this[i];
            }
        }
        return newCurray;
    }

    find(callbackFn) {
        for (let i = 0; i < this.length; i++) {
            if (callbackFn(this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    }

    findIndex(callbackFunction) {
        for (let i = 0; i < this.length; i++) {
            if (callbackFunction(this[i], i, this)) return i
        }

        return -1
    }

    findLast(callback) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (callback(this[i], i, this)) return this[i]
        }

        return undefined
    }

    findLastIndex(callback) {
        for (let i = this.length - 1; i > 0; i--) {
            if (callback(this[i], i, this)) return i
        }

        return -1
    }

    forEach(callbackFn) {
        for (let i = 0; i < this.length; i++) {
            callbackFn(this[i], i, this);
        }
    }

    includes(searchElement, fromIndex = 0) {
        if (fromIndex >= this.length) {
            return false;
        } else if (fromIndex >= -this.length && fromIndex < 0) {
            fromIndex = fromIndex + this.length;
        } else if (fromIndex < -this.length) {
            fromIndex = 0;
        }

        for (let i = fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return true
            }
        }
        return false;
    }

    indexOf(searchElement, fromIndex = 0) {

        if (fromIndex >= this.length) {
            return -1;
        } else if (fromIndex >= -this.length && fromIndex < 0) {
            fromIndex = fromIndex + this.length;
        } else if (fromIndex < -this.length) {
            fromIndex = 0;
        }

        for (let i = fromIndex; i < this.length; i++) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }

    join(separator = ',') {
        let finalString = '';
        for (let i = 0; i < this.length; i++) {
            finalString += this[i];
            if (i < this.length - 1) {
                finalString += separator;
            }
        }
        return finalString;
    }

    lastIndexOf(searchElement, fromIndex = this.length - 1) {
        if (fromIndex < -this.length) {
            return -1;
        } else if (fromIndex < 0 && fromIndex >= -this.length) {
            fromIndex = this.length + fromIndex;
        } else if (fromIndex >= this.length) {
            fromIndex = this.length - 1;
        }

        for (let i = fromIndex; i > -1; i--) {
            if (searchElement === this[i]) {
                return i;
            }
        }
        return -1;
    }

    map(callbackFn) {
        const newCurray = new Curray;
        for (let i = 0; i < this.length; i++) {
            newCurray[newCurray.length++] = callbackFn(this[i], i, this);
        }
        return newCurray;
    }

    pop() {
        const lastElement = this[this.length - 1];
        delete this[--this.length];
        return lastElement;
    }

    push() {
        for (let i = 0; i < arguments.length; i++) {
            const argument = arguments[i];

            this[this.length++] = argument;
        }

        return this.length;
    }

    reduce(callbackFn, initialValue = undefined) {
        if (initialValue === undefined) {
            let aux;
            for (let i = 0; i < this.length; i++) {
                if (i === 0) {
                    aux = callbackFn(this[i], this[++i]);
                } else {
                    aux = callbackFn(aux, this[i])
                }
            }
            return aux;
        }
        let aux;
        for (let i = 0; i < this.length; i++) {
            if (i === 0) {
                aux = callbackFn(initialValue, this[i]);
            } else {
                aux = callbackFn(aux, this[i])
            }
        }
        return aux;
    }

    reverse() {
        let aux;
        for (let i = 0; i < this.length - i; i++) {
            aux = this[i];
            this[i] = this[this.length - i - 1];
            this[this.length - i - 1] = aux;
        }
        return this;
    }

    shift() {
        if (this.length === 0) {
            return undefined;
        } else {
            const removedElement = this[0];
            this.length--;
            for (let i = 0; i < this.length; i++) {
                this[i] = this[i + 1];
            }
            delete this[this.length];
            return removedElement;
        }
    }

    slice(start = 0, end = this.length) {
        const newCurray = new Curray();
        if (start < -this.length) {
            start = 0;
        } else if (start >= -this.length && start < 0) {
            start = start + this.length;
        }

        if (end < -this.length) {
            end = 0;
        } else if (end > this.length) {
            end = this.length;
        } else if (end >= -this.length && end < 0) {
            end = end + this.length;
        }

        if (end <= start || start >= this.length) {
            return newCurray;
        }

        for (let i = 0; i < end - start; i++) {
            newCurray[i] = this[start + i];
            newCurray.length++;
        }
        return newCurray;
    }

    some(callbackFn) {
        for (let i = 0; i < this.length; i++) {
            if (callbackFn(this[i])) {
                return true;
            }
        }
        return false;
    }

    splice(start, deleteCount = this.length, ...item) {
        const newCurray = new Curray();

        if (start < 0 && start >= -this.length) {
            start = start + this.length;
        } else if (start < -this.length) {
            start = 0;
        } else if (start >= this.length) {
            start = this.length;
        } else if (start === undefined) {
            return newCurray;
        }

        if (deleteCount < 0 || deleteCount === undefined) {
            deleteCount = 0;
        }

        for (let i = start; i < start + deleteCount; i++) {
            newCurray[newCurray.length++] = this[i];
            for (let j = start; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            delete this[--this.length];
        }
        for (let i = 0; i < item.length; i++) {
            for (let j = this.length; j > start; j--) {
                this[j] = this[j - 1];
            }
            this[start + i] = item[i];
            this.length++;
        }

        return newCurray;
    }

    toString() {
        let res = ""

        for (let i = 0; i < this.length; i++) {
            const elem = this[i]

            res += elem

            if (i < this.length - 1) res += ","
        }

        return res
    }

    unshift(...elements) {
        const numElements = elements.length
        const newLength = this.length + numElements

        for (let i = this.length - 1; i >= 0; i--) {

            this[i + numElements] = this[i]
        }

        for (let j = 0; j < numElements; j++) {

            this[j] = elements[j]
        }

        this.length = newLength


        return this.length
    }

    values = function () {

        let i = 0;

        const self = this;

        return {

            next: function () {

                return {
                    value: i < self.length ? self[i] : undefined,
                    done: ++i > self.length
                }
            }


        }
    }

    keys() {
        let i = 0

        const self = this

        return {
            next: function () {
                return {
                    value: i < self.length ? i : undefined,
                    done: ++i > self.length
                }
            }
        }
    }
}

module.exports = Curray