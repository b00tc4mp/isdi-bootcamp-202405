flatted(depth = 1) {

    const flatted = new Curray();

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (!(element instanceof Curray)) {
            flatted[flatted.length++] = element;
        } else {
            const flattenedElement = this.flatted(depth - 1, element);

            for (let j = 0; j < flattenedElement.length; j++) {
                flatted[flatted.length++] = flattenedElement[j];
            }
        }
    }

    return flatted;
}




