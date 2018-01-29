/*
2. Написати функцію, яка обчислює вартість поїздки на автомобілі на дачу (туди і назад).
Вхідними даними є:
відстань до дачі (км);
кількість бензину, яку споживає автомобіль на 100 км пробігу;
ціна одного літру бензину.
Дані для розрахунків вводяться користувачем.
*/

var distance = Number(prompt('Введіть відстань до дачі в км:'));
var fuel = Number(prompt('Яку кількість бензину, яку споживає автомобіль на 100 км пробігу:'));
var price = Number(prompt('Ціна одного літру бензину:'));

var data = {
    'distance' : distance,
    'fuel' : fuel,
    'price' : price
};

function massage(txt) {
    document.write(txt + '<br>')
}

function calculate(data) {

    // Повний шлях туди і назад
    data.distance *= 2;
    massage ('Повний шлях туди і назад - ' + data.distance + ' км.')

    massage('Розхід палива на 100км - ' + data.fuel + ' л.');

    // Витрати палива на 1км
    data.fuel = data.fuel/100;
    massage('Вартість палива 1л - ' + data.price + ' грн.');

    // Вартість затраченого палива
    var cost = data.distance * data.fuel * data.price;
    massage('Вартість затраченого палива - ' + cost + ' грн.');

}

calculate(data);