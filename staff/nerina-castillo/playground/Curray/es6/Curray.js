class Curray {
  constructor() {
    if (arguments.length === 1 && typeof arguments[0] === "number")
      this.length = arguments[0];
    else {
      for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i];

        this[i] = argument;
      }
      this.length = arguments.length;
    }
  }

  at(index) {
    if (index > -1) return this[index];
    else return this[this.length + index];
  }

  concat() {
    let newObject = { length: 0 };

    for (let i = 0; i < this.length; i++) {
      const elem = this[i];

      newObject[newObject.length++] = elem;
    }

    for (let i = 0; i < arguments.length; i++) {
      const argument = arguments[i];

      for (let j = 0; j < argument.length; j++) {
        const elem = argument[j];

        newObject[newObject.length++] = elem;
      }
    }

    return newObject;
  }

  copyWithin(target, start, end = 0) {
    const item = target;

    if (end === undefined) end = this.length;
    else if (end < 0) end = this.length + end;

    if (start === undefined) start = 0;
    else if (start < 0) start = this.length + start;

    if (end <= start) return this;

    if (target === undefined) target = 0;
    else if (target < 0) target = this.length + target;
    else if (target > start) return this;
    for (let i = start; i < end; i++) {
      this[item] = this[i];
      target++;
    }
    return this;
  }

  every(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i])) return false;
    }
    return true;
  }

  fill(value, start, end) {
    if (start === undefined || start < -this.length) {
      start = 0;
    } else if (start > this.length - 1) {
      return this;
    } else if (start < 0) {
      start = this.length + start;
    }

    if (end < 0) {
      end = this.length + end;
    } else if (end === undefined || end > this.length) {
      end = this.length;
    } else if (end <= start) {
      return this;
    }
    for (let i = start; i < end; i++) {
      this[i] = value;
    }
    return this;
  }

  filter(callbackFunction) {
    var newObject = { length: 0 };

    for (let i = 0; i < this.length; i++) {
      if (callbackFunction(this[i], i, this)) {
        newObject[newObject.length++] = this[i];
      }
    }
    return newObject;
  }

  find(callbackFunction) {
    for (let i = 0; i < this.length; i++) {
      if (callbackFunction(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  }

  findIndex(callbackFunction) {
    for (let i = 0; i < this.length; i++) {
      if (callbackFunction(this[i], i, this)) return i;
    }

    return -1;
  }

  findLast(callback) {
    for (let i = this.length - 1; i > 0; i--) {
      if (callback(this[i], i, this)) return this[i];
    }

    return undefined;
  }

  findLastIndex(callback) {
    for (let i = this.length - 1; i > 0; i--) {
      if (callback(this[i], i, this)) return i;
    }

    return -1;
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];

      callback(elem, i, this);
    }
  }

  includes(element, index) {
    if (index === 0) index = 0;
    else if (index < 0) index = this.length + index;

    for (let i = index; i < this.length; i++) {
      if (this[i] === element) {
        return true;
      }
    }
    return false;
  }

  indexOf(cat) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === cat) {
        var index = i;

        return index;
      }
    }
    return -1;
  }

  join(separator) {
    if (separator === undefined) {
      separator = ",";
    }
    let joined = "";
    for (let i = 0; i < this.length; i++) {
      let count = this[i];
      joined += count;
      if (i === this.length - 1) {
        count += separator;
      }
    }
    return joined;
  }

  keys() {
    let i = 0;

    const self = this;

    return {
      next: function () {
        return {
          value: i < self.length ? i : undefined,
          done: ++i > self.length,
        };
      },
    };
  }

  lastIndexOf(element, fromIndex) {
    if (fromIndex === undefined) fromIndex = this.length;
    else if (fromIndex < 0) fromIndex = this.length + fromIndex;

    for (let i = fromIndex; i > -1; i--) {
      if (this[i] === element) {
        var index = i;

        return index;
      }
    }
    return -1;
  }

  map(callback) {
    const mapped = new Curray();

    for (let i = 0; i < this.length; i++) {
      const element = this[i];

      const mappedElement = callback(element, i, this);

      mapped[i] = mappedElement;
      mapped.length++;
    }
    return mapped;
  }

  pop() {
    if (this.length > 0) {
      const element = this[this.length - 1];
      delete this[--this.length];

      return element;
    }
    return undefined;
  }

  push() {
    for (let index = 0; index < arguments.length; index++) {
      const argument = arguments[index];

      this[this.length++] = argument;
    }
    return this.length;
  }

  reduce(callback, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
      const currentValue = this[i];

      accumulator = accumulator + currentValue;

      callback(accumulator, initialValue, i, this);
    }
    return accumulator;
  }

  reverse() {
    let tmp;
    for (let i = 0; i < this.length - i; i++) {
      tmp = this[i];
      this[i] = this[this.length - i - 1];
      this[this.length - i - 1] = tmp;
    }

    return this;
  }

  shift() {
    const element = this[0];
    for (let i = 0; i < this.length; i++) {
      this[i] = this[i + 1];
    }

    delete this[this.length - 1];
    this.length--;
    return element;
  }

  slice(begining, end) {
    if (begining === undefined) begining = this.length - 1;
    else if (end < 0) end = this.length + end;
    else if (begining === undefined || begining < 0)
      begining = this.length + begining;

    let newNames = new Curray();
    for (let i = begining; i < end; i++) {
      newNames[newNames.length++] = this[i];
    }
    return newNames;
  }

  some(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i])) return true;
    }
    return false;
  }

  splice(fromIndex, removeCount, element) {
    if (removeCount === 0) {
      for (let i = this.length; i > fromIndex; i--) {
        this[i] = this[i - 1];
      }
      this.length++;

      this[fromIndex] = element;

      return new Curray();
    } else if (removeCount === 1) {
      var removed = new Curray();

      removed[removed.length++] = this[fromIndex];
      this[fromIndex] = element;
      return removed;
    } else if (removeCount === 2) {
      var removed = new Curray();

      for (let i = fromIndex; i < fromIndex + removeCount; i++) {
        removed[i - fromIndex] = this[i];
      }
      removed.length = removeCount;

      for (let i = fromIndex + removeCount; i < this.length; i++) {
        this[i - 1] = this[i];
      }
      delete this[this.length - 1];
      this.length -= removeCount - 1;

      this[fromIndex] = element;
      return removed;
    } else if (removeCount === 3) {
      var removed = new Curray();

      for (let i = fromIndex; i < fromIndex + removeCount; i++) {
        removed[i - fromIndex] = this[i];
      }

      removed.length = removeCount;

      for (let i = fromIndex + removeCount; i < this.length; i++) {
        this[i - (removeCount - 1)] = this[i];
      }
      this[fromIndex] = element;

      this.length = this.length - (removeCount - 1);
      return removed;
    }
  }

  toString() {
    let res = "";

    for (let i = 0; i < this.length; i++) {
      var elem = this[i];

      res += elem;

      if (i < this.length - 1) res += ",";
    }

    return res;
  }

  values() {
    let i = 0;

    const self = this;

    return {
      next: function () {
        return {
          value: i < self.length ? self[i] : undefined,
          done: ++i > self.length,
        };
      },
    };
  }
}

module.exports = Curray;
