function allKeysAndSymbols(object) {
    let prototype = Object.getPrototypeOf(object);
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols(object);
    const allCurrentProperties = [...properties, ...symbols];
    while (prototype) {
        allCurrentProperties.push(...Object.getOwnPropertyNames(prototype));
        allCurrentProperties.push(...Object.getOwnPropertySymbols(prototype));
        prototype = Object.getPrototypeOf(prototype);
    }
    return allCurrentProperties;
}

const object = Object.create(Object.prototype);

Object.defineProperty(object, "property", {
    value: "🍎",
    writable: true,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(object, "method", {
    value: function () {},
    writable: true,
    enumerable: true,
    configurable: true,
});

Object.defineProperty(object, "propertyAccessor", {
    get: function () {
        return this.data;
    },
    set: function (data) {
        this.data = data;
    },
    enumerable: true,
    configurable: true,
});

const s1 = Symbol("apple");
object[s1] = "🍏";
const s2 = Symbol.for("lib.apple");
object[s2] = "🍋";

const prototype = { question: 42 };
prototype["pear"] = "🍐";
const prototypeChild = { orange: "🍊" };
Object.setPrototypeOf(prototype, prototypeChild);
Object.setPrototypeOf(object, prototype);

console.log(allKeysAndSymbols(object));
