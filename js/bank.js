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
    menu : function () {
        var action = Number(prompt("Виберіть, яку операцію ви хочете здійснити? 1 - створити рахунок, 2 - поповнити рахунок, 3 - зняти кошти, 4 - завершити роботу"));

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
            default:
                log('сеанс завершено.');
                alert('Раді були Вас бачити. Чекаємо Вас наступного разу!');
                break;
        }

    }
};

Account.menu();