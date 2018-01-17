//1. Розробити програму, яка організовує діалог з користувачем і дозволяє обчислити по вказаній сумі
// і курсу євро, долара та російського рубля суму в гривнях.
// Примітка! З використанням констант


// КУРСИ ВАЛЮТ
const EXCHANGE_USD = 28.5005;
const EXCHANGE_EUR = 34.6283;
const EXCHANGE_RUB = 0.4404;

// Наявна сума у обміннику
const aviable_USD = 500;
const aviable_EUR = 1000;
const aviable_RUB = 2000;

var money_USD = 0;
var money_EUR = 0;
var money_RUB = 0;

//Оновлення курсів валют
document.querySelector('.exchange_usd').innerHTML = " " + EXCHANGE_USD + " ";
document.querySelector('.exchange_eur').innerHTML = " " + EXCHANGE_EUR + " ";
document.querySelector('.exchange_rub').innerHTML = " " + EXCHANGE_RUB + " ";

// Оновлення доступних сумм
document.querySelector('.aviable_usd').innerHTML = " " + aviable_USD + " ";
document.querySelector('.aviable_eur').innerHTML = " " + aviable_EUR + " ";
document.querySelector('.aviable_rub').innerHTML = " " + aviable_RUB + " ";

//Обробник кліку
document.querySelector('.send').addEventListener( "click" , function(event) {
    event.preventDefault();

    var price = document.querySelector('.price').value;
    var info = document.querySelector('.info');
    var result = document.querySelector('.result');

    info.innerHTML = "";
    result.innerHTML = "";

    //Перевірка введеної суми
    if (price <= 0) {

        info.innerHTML += "Введіть суму для обміну";

    }else {

        if (price > aviable_USD) {
            info.innerHTML += "В обміннику не достатньо USD для обміну<br>";
        }else {
            money_USD = Math.round(price * EXCHANGE_USD *100)/100;
            result.innerHTML += price + " USD = " + money_USD + " грн.<br>"
        }

        if (price > aviable_EUR) {
            info.innerHTML += "В обміннику не достатньо EUR для обміну<br>";
        }else {
            money_EUR = Math.round(price * EXCHANGE_EUR *100)/100;
            result.innerHTML += price + " EUR = " + money_EUR + " грн.<br>"
        }

        if (price > aviable_RUB) {
            info.innerHTML += "В обміннику не достатньо RUB для обміну<br>";
        }else {
            money_RUB = Math.round(price * EXCHANGE_RUB * 100)/100;
            result.innerHTML += price + " RUB = " + money_RUB + " грн.<br>"
        }

    }

});