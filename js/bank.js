// Написати об'єкт  "Банківський рахунок" (Account), який містить:
// Призвіще
// Ім'я
// Номер рахунку
// Розмір коштів на рахунку
// Назва валюти рахунку (рублі, гривні, евро тощо), (наприклад вложений об'єкт)
// Забезпечити можливість:
// Відкривати рахунок та первинно вносити гроші на рахунок
// Знімати гроші з рахунку
// Докладати гроші на рахунок (edited)

function log(txt) {
    console.log(txt);
}

var aviableCurrency = {
    "USD": 1000,
    "EUR": 1000,
    "RUR": 1000,
    "UAH": 20000
};

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

var Account = {
    //Властивості
    surname : '',
    name : '',
    number  : 0,
    amount : 0,
    currency : ['UAH', 'USD', 'EUR', 'PLN', 'BTC'],
    currentCurrency : '',

    // Методи
    check : function (condition) {
        return confirm(condition);
    },
    validate : function (txt, callBack) {
        var value = callBack(txt);

        if(value == '' || value == undefined) {
            log('помилка вводу');
            Account.validate(txt, Account.getInfo);
        } else {
            log(value);
            return value;
        }
    },
    validateCurrency : function (txt, callBack) {
        var value = callBack(txt);

        if(value < 0 || value >= Account.currency.length) {
            log('помилка вибору валюти');
            Account.validateCurrency(txt, Account.getCurrency);
        } else {
            log(value + ' - ' + Account.currency[value]);
            return value;
        }
    },
    getInfo : function (txt) {
        var result = prompt(txt);
        return result;
    },
    getCurrency : function (txt) {
        for(var i=0; i<Account.currency.length; i++) {
            txt += i + " - " + Account.currency[i] + ', ';
        }
        return prompt(txt);
    },
    newAccount : function () {

        Account.surname = Account.validate("Ввведіть ваше прізвище:", Account.getInfo);
        Account.name = Account.validate("Ввведіть ваше ім'я:", Account.getInfo);
        var num_currency = Account.validateCurrency("Вкажіть номер валюти, в якій ви хочете відкрити рахунок: ", Account.getCurrency);
        Account.currentCurrency = Account.currency[num_currency];
        Account.number = random(111111111111, 999999999999);
        log('Рахунок № '+Account.number);
        alert('Ваш рахунок успішно створений. № ' + Account.number);

    },
    checkAccount : function () {
        if(Account.number == '') {
            alert('Для початку потрібно створити рахунок для проведення операцій з ним.');
            Account.newAccount();
        } else {
            return true;
        }
    },
    checkAmount : function (sum) {
        if(Account.amount < sum) {
            return false
        } else {
            return true;
        }
    },
    cashIn : function () {

        if (Account.checkAccount()) {

            var sum = Number(prompt("Ввведіть суму:"));
            log('cashIn ' + sum + ' ' + Account.currentCurrency);
            Account.amount += sum;
            log('Total ' + Account.amount + ' ' + Account.currentCurrency);
        }

    },
    cashOut : function () {

        if (Account.checkAccount()) {

            var sum = Number(prompt("Ввведіть суму, яку ви хочете зняти з вашого рахунку:"));
            if (Account.checkAmount(sum)) {
                log('cashOut ' + sum + ' ' + Account.currentCurrency);
                Account.amount -= sum;
                log('Total ' + Account.amount + ' ' + Account.currentCurrency);
            }else {
                log('На рахунку недостатньо коштів!');
                alert('На рахунку недостатньо коштів! Доступно: ' +Account.amount+''+Account.currentCurrency+ '. Введіть іншу суму.');
                Account.cashOut();
            }
        }

    },
    initCurrency : function () {

        var xhr = new XMLHttpRequest();
        var path = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
        xhr.open('GET', path, false);
        xhr.send();
        if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
        } else {
            //document.write( xhr.responseText + "<br>");
            return JSON.parse(xhr.responseText);
        }

    },
    exchange : function () {

        var currency = this.initCurrency();
        var action = Number(prompt("Виберіть, яку операцію ви хочете здійснити? 1 - купити валюту, 2 - продати валюту"));

        switch (action) {
            case 1:
                log('Купуємо валюту');
                this.buyCurrency(currency);
                break;
            case 2:
                log('Продаємо валюту');
                this.saleCurrency(currency);
                break;
            default :
                log('Операція недоступна.');
                alert('Операція недоступна!');
                break;
        }

    },
    buyCurrency : function (currency) {
      //покупка
        var str = '';
        for(key in currency) {
            str += key + ' - ' + currency[key].ccy + ', ';
        }
        var action = Number(prompt("Виберіть яку валюту ви бажаєте купити: " + str));
        var money = Number(prompt("Введіть суму"));

        if (this.checkAviability(currency[action].ccy, money)) {

            var money2 = money * currency[action].sale;

            aviableCurrency[currency[action].ccy] -= money;
            aviableCurrency[currency[action].base_ccy] += money2;

            log('Операція здійснена успішно: ' + money+currency[action].ccy + " => " + money2+currency[action].base_ccy);
            log('Курс обміну: ' + currency[action].sale +currency[action].base_ccy);
            log('Залишок в обміннику: ' + aviableCurrency[currency[action].ccy]+currency[action].ccy);
            log('Залишок в обміннику: ' + aviableCurrency[currency[action].base_ccy]+currency[action].base_ccy);

            alert('Операція здійснена успішно: ' + money+currency[action].ccy + " => " + money2+currency[action].base_ccy);
        }
    },
    saleCurrency : function (currency) {
        //продажа
        var str = '';
        for(key in currency) {
            str += key + ' - ' + currency[key].ccy + ', ';
        }
        var action = Number(prompt("Виберіть яку валюту ви бажаєте продати: " + str));
        var money = Number(prompt("Введіть суму"));
        var money2 = money * currency[action].buy;

        if (this.checkAviability(currency[action].base_ccy, money2)) {

            aviableCurrency[currency[action].ccy] += money;
            aviableCurrency[currency[action].base_ccy] -= money2;

            log('Операція здійснена успішно: ' + money+currency[action].base_ccy + " => " + money2+currency[action].ccy);
            log('Курс обміну: ' + currency[action].buy +currency[action].base_ccy);
            log('Залишок в обміннику: ' + aviableCurrency[currency[action].ccy]+currency[action].ccy);
            log('Залишок в обміннику: ' + aviableCurrency[currency[action].base_ccy]+currency[action].base_ccy);

            alert('Операція здійснена успішно: ' + money2+currency[action].base_ccy + " => " + money+currency[action].ccy);
        }
    },
    checkAviability : function (value, money) {
        if (aviableCurrency[value] >= money) {
            log(value + ' - в обміннику достатня кількість для обміну');
            return true;
        } else {
            log(value + ' - в обміннику недостатня кількість для обміну');
            alert(value + ' - в обміннику недостатня кількість для обміну. Спробуйте ще, вказавши меншу суму.');
            return false;
        }
    },
    menu : function() {
        var action = Number(prompt("Виберіть, яку операцію ви хочете здійснити? 1 - створити рахунок, 2 - поповнити рахунок, 3 - зняти кошти, 4 - обміняти валюту, 5 - завершити роботу"));

        switch (action) {
            case 1:
                Account.newAccount();
                Account.menu();
                break;
            case 2:
                Account.cashIn();
                Account.menu();
                break;
            case 3:
                Account.cashOut();
                Account.menu();
                break;
            case 4:
                Account.exchange();
                Account.menu();
                break;
            default:
                log('сеанс завершено.');
                alert('Раді були Вас бачити. Чекаємо Вас наступного разу!');
                break;
        }

    }
};

log(aviableCurrency);


// document.addEventListener("DOMContentLoaded", function(event) {
//
//     var xhr = new XMLHttpRequest();
//     var path = "https://bittrex.com/api/v1.1/public/getmarketsummaries";
//     xhr.open('GET', path, false);
//     xhr.send();
//     if (xhr.status != 200) {
//         alert( xhr.status + ': ' + xhr.statusText );
//     } else {
//         document.write( xhr.responseText + "<br>");
//         // document.write(JSON.parse(xhr.responseText));
//     }
//
// });

Account.menu();