console.log('Hello')
// máy tính không hiểu được console.log
// chỉ hiểu 0 1 0 1
// cần cơ chế để parse console.log => 1 0 1 0 => bộ thông dịch
// tích hợp sẵn trong các trình duyệt
// chrome, firefox, ie, edge
// JS chỉ chạy được trên trình duyệt thôi (2008)
var variable

console.log(typeof variable);
variable = function() {};

var array = [];
console.log(typeof variable);
console.log(typeof array);
// kiểm tra một biến có kiểu là function hay array 
// thì nên kiểm tra như nào
console.log(Boolean(''));

var a = 1;
if (a) {
  console.log('Chuỗi rỗng');
}

var person = {
  firstName: 'Linh',
  lastName: 'Hoang Thuy',
  18: 'Age', // Property có tên là số, không dùng dotNotation được
  showName: function() {
      console.log(this.firstName + ' ' + this.lastName);
  }
};
console.log(person.firstName); // Linh
var key = 'lastName';

console.log(person[key]); // Linh

for(var prop in person) {
  console.log(prop); // firstName, lastName, showName
}

Object.keys(person).forEach(key => console.log(key));

var tasks = [
  { content: 'Học JS', duration: 8 },
  { content: 'Học CSS', duration: 12 },
  { content: 'Học HTML', duration: 4 },
]
/*
var tasks = [
  { content: 'Học JS', duration: 8 * 60 },
  { content: 'Học CSS', duration: 12 * 60 },
  { content: 'Học HTML', duration: 4 * 60 },
]

*/
var mins = [];
for (var i = 0; i < tasks.length; i++) {
  var task = tasks[i];
  mins.push({
    content: task.content, 
    duration:task.duration * 60 
  })
}
console.log(mins);
// map => mảng ra mảng (giữ nguyên phần tủ);

const toMins = tasks.map(function (task) {
  return {
    content: task.content,
    duration:task.duration * 60 
  }
})
console.log(toMins);

const jsTask = tasks.find(function(task) {
  return task.content === 'Học JS';
})
console.log(jsTask);

const totalTimes = tasks.reduce(function (sum, task) {
  console.log(sum, task);
  return sum + task.duration;
}, 0);

console.log(totalTimes);

// function first() {
//   console.log('Một');
// }

// setTimeout(function() {
//   console.log('Một');
// }, 0);

console.log('Một');

function second() {
  console.log('Hai');
}

// Giải thích tại sao hiển thị Hai trước Một
// Gợi ý: event loop
// first();
second();

var titleEl = document.getElementById('title');

console.log(titleEl);
titleEl.innerHTML = 'Hello Web54';
titleEl.style.color = 'red';
// titleEl.remove();
// CRUD DOM

// var greeting = "hey hi";
// console.log(greeting);

// bye bye

// function scope
// function sayHi() {
//   var greeting = "hey hi";
//   var times = 4;

//   if (times > 3) {
//     var greeting = "say Hello instead"; 
//   }

//   console.log(greeting); //"say Hello instead"
// }

// global scope

// block scope
function sayHi() {
  let greeting = "hey hi";
  const times = 4;

  if (times > 3) {
    let greeting = "say Hello instead";
    console.log('1', greeting) 
  }

  console.log('2', greeting); //"say Hello instead"
}

sayHi();

var arrays = [];
for (var i = 0; i < 2; i+=1) {
  arrays[i] = function() {
    console.log(i)
  }
}
arrays[0]();
arrays[1]();

var arrays = [];
for (let i = 0; i < 2; i+=1) {
  arrays[i] = function() {
    console.log(i)
  }
}
arrays[0]();
arrays[1]();

var name = "Bob", time = "today";
// Cách cũ
console.log("Hello " + name + "\n" + "how are you " + time + " ?");

// Template string
console.log(
`Hello ${name}
how are you ${time}?`
);

// const longTasks = tasks.filter(function(task) {
//   return task.duration > 8;
// })


// const longTasks = tasks.filter((task) => task.duration > 8);
// console.log(longTasks);

const longTasks = tasks.map(task => ({
  ...task,
  duration: task.duration * 2
}));

console.log(longTasks);

var person = {
  firstName: 'Linh',
  lastName: 'Hoang Thuy',
  18: 'Age', // Property có tên là số, không dùng dotNotation được
  showName:()=> {
    // bind this theo ngữ cảnh => thằng gọi => function thường
    // bind this cố định theo thằng bọc function này => arrow function
      console.log(this);
      console.log(this.firstName + ' ' + this.lastName);
  }
};

let titleEl2 = document.getElementById('title');

// titleEl2.addEventListener('click', function() {
//   console.log('1', this);
// })

titleEl2.addEventListener('click', () => {
  console.log('2', this);
})

person.showName();

// Cách cũ
let sayHello = (message) => {
  // message = message||  'Hello JS';

  message = typeof message === 'undefined' ? 'Hello JS' : message;
  console.log(message);
}
sayHello();
// // Cách mới
// let sayHi = (message = 'Hello JS') => console.log(message);

// Array destructuring
const foo = ['one', 'two', 'three'];

// const red = foo[0];

// const yellow = foo[1];

// const green = foo[2];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"

const teacher = {
  fullName: 'A',
  age: 18
}

// const fullName = teacher.fullName;
// const age = teacher.age;

const {  age, fullName:surName } = teacher;

// const surName = teacher.fullName;
// console.log(surName, age);

const iphones = ['iphone11', 'iphone1', 'iphone13'];
const macbooks = ['macbook2015', {
  model: 'macbook2014',
}, 'macbook2017'];

// const appleProducts = iphones.concat(macbooks);

const appleProducts = 
['iphone11', 'iphone12', 'iphone13', 
'iTag', 
...macbooks, 
'apple watch'
]

// pass by value vs pass by ref
// nguyên thuỷ vs không nguyên thuỷ
appleProducts[5].model = 'mac m1';
console.log(appleProducts, macbooks);

// rest operator
function calculateGPA(math, literature, ...rest) {
  console.log(rest);
}
// spread tach array, rest gom lai thanh array
calculateGPA(8, 6, 5, 4, 3);

const courses = ['C4E', 'CI', 'Web', 'Mobile', 'Games'];
const [beginner, medium, ...advances] = courses
console.log(beginner, medium, advances)

let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };

// spread => Tách ra
let clonedObj = { ...obj1 };
// Object { foo: 'bar', x: 42 }

let mergedObj = { ...obj1, ...obj2 };
// Object { foo: 'baz', x: 42, y: 13 }

// rest => Gom lại
const { foo, ...position } = mergedObj
// foo = bar, position = { x: 43, y: 13 }