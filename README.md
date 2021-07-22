### allKeysAndSymbols

Написать функцию, которая принимает объект и возвращает все свойства и символы как в самом объекте, так и во всей его цепочке прототипов

function allKeysAndSymbols (object) {
// реализация
}

allKeysAndSymbols({}) // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]

### in, который игнорирует свойства прототипа

Написать прокси-объект, для которого оператор in вернет истину только в том случает, когда свойство находится в самом объекте, но не в его прототипе

const proto = { value: 42 };
const object = Object.create(proto);

Object.defineProperty(object, 'year', {
value: 2020,
writable: true,
configurable: true,
enumerable: false,
});

const symbol = Symbol('bazzinga');
object[symbol] = 42;

// без proxy
console.log('value' in object);
// true
console.log('year' in object);
// true
console.log(symbol in object);
// true

const proxy = // реализация

// с proxy
console.log('value' in proxy)
// false
console.log('year' in proxy);
// true
console.log(symbol in proxy);
// true

### Велосипедная реализация Set

Написать свой класс, который будет очень похож на ES6 множество

class MySet {
// реализация
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

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
getValue () { return this.value }
}

const data = {
value: 42
}

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({}));
// false
console.log(set.has(object));
// true
console.log(set.has(data));
// false

// и кое-что еще
console.log(set === set.valueOf())
// true
console.log(String(set))
// [object MySet]
console.log(Object.prototype.toString.call(set))
// [object MySet]

// задание со звездочкой \*
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
console.log(item.getValue.call(this)); // 42
}, data)
