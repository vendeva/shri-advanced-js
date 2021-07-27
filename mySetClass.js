class MySet {
    constructor(value) {
        this.value = value;
        this.unique = [];
        for (let elem of this.value) {
            if (!this.unique.includes(elem)) {
                this.unique.push(elem);
            }
        }
        this[Symbol.iterator] = this.iterator()[Symbol.iterator];
        this.size = this.unique.length;
        this[Symbol.toStringTag] = "MySet";
    }

    values = () => this[Symbol.iterator]();

    keys = () => this[Symbol.iterator]();

    iterator = () => {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i < self.size; ++i) yield self.unique[i];
                return this;
            },
        };
    };

    entries = () => {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i < self.size; ++i) {
                    const value = self.unique[i];
                    yield [value, value];
                }
                return this;
            },
        };
    };

    clear = () => {
        this.size = 0;
        this.unique = [];
    };

    add = (elem) => {
        if (!this.has(elem)) {
            this.unique.push(elem);
            this.size = this.unique.length;
        }
    };

    delete = (elem) => {
        if (this.unique.indexOf(elem) != -1) {
            this.unique.splice(this.unique.indexOf(elem), 1);
            this.size = this.unique.length;
        }
    };

    has = (elem) => {
        return this.unique.includes(elem);
    };

    forEach = (fn, data) => {
        this.unique.forEach((elem) => {
            fn.call(data, elem);
        });
    };
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

for (const item of set.keys()) {
    console.log(item); // 4 8 15 16 23 42
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue() {
        return this.value;
    },
};

const data = {
    value: 42,
};

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()); // true
console.log(String(set)); // [object MySet]
console.log(Object.prototype.toString.call(set)); // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data);
