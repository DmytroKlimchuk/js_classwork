//Оголосити одновимірний масив з 10 елементів.
// Заповнити його значеннями з клавіатури,
// вивести на екран та підрахувати добуток елементів масиву

var array = [];
var count = 10;
var result = 1;

for(var i=0; i<count;i++) {
    array[i] = Number(prompt('Введіть елемент масиву № '+ i));
}

document.write('Елементи масиву - ' + array + "<br>");

for(item in array) {
    result *= array[item];
}

document.write('Добуток всіх елементів масиву = ' + result + "<br>");

// 2. Дано одновимірний масив. Знайти найбільший та
// найменший елементи масиву та поміняти їх у масиві місцями.

var data = {};

var minElement = function (array) {
    var min = 999999;
    var min_position = 0;

    for(item in array) {
        if(array[item] <= min ) {
            min = array[item];
            min_position = item;
        }
    }

    return data = {
        'position': min_position,
        'value': min
    };

};

var maxElement = function (array) {
    var max = -999999;
    var max_position = 0;

    for(item in array) {
        if(array[item] >= max ) {
            max = array[item];
            max_position = item;
        }
    }


    return data = {
        'position': max_position,
        'value': max
    };

};


document.write('<br><br>Елементи масиву - ' + array + "<br>");

var minimum = minElement(array);
var maximum = maxElement(array);

console.log(minimum);
console.log(maximum);

array[maximum.position] = minimum.value;
array[minimum.position] = maximum.value;

document.write('Мінімальний елемент - ' + minimum.value + "<br>");
document.write('Максимальний елемент - ' + maximum.value + "<br>");
document.write('Оновлені елементи масиву - ' + array + "<br>");

//3. Дано одновимірний масив. Знайти суму елементів з непарними індексами.

function suma(array) {
    var sum = 0;

    for(item in array) {
        if( item%2 != 0 ) {
            sum += array[item];
        }
    }

    return sum;
}

var sum = suma(array);
document.write('<br>Cумa елементів з непарними індексами - ' + sum + "<br>");