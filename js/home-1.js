// Режим відладки
const debug = true;

// Дані для входу
const user_name = 'admin';
const user_passwd = '1234';

//Доступні валюти для обміну
var valuta = ["usd", "eur", "rub"];

// КУРСИ ВАЛЮТ
var buyCurrency = {
    "usd": 28.650,
    "eur": 34.850,
    "rub": 0.471
};

var sellCurrency = {
    "usd": 28.900,
    "eur": 35.500,
    "rub": 0.514
};

// Наявність в обміннику
var aviableCurrency = {
        "usd": 500,
        "eur": 1000,
        "rub": 1000,
        "uah": 20000
    };

function showLog(value) {
    if(debug == true) console.log(value);
}

function error(text) {
    var info = document.querySelector('.info');

    if (info.classList.contains("success"))
        info.classList.remove("success");

    if (!info.classList.contains("error"))
        info.classList.add("error");

    info.innerHTML = text;
}

function success(text) {
    var info = document.querySelector('.info');

    if (info.classList.contains("error"))
        info.classList.remove("error");

    if (!info.classList.contains("success"))
        info.classList.add("success");

    info.innerHTML = text;
}

function money(amount) {
    return Math.round(amount * 100)/100;
}

function init_currency() {

    for( var i = 0; i< valuta.length; i++) {
        // Для користувача
        document.querySelector('.' + valuta[i] + '_buy').innerHTML = buyCurrency[valuta[i]];
        document.querySelector('.' + valuta[i] + '_sell').innerHTML = sellCurrency[valuta[i]];

        // Для адмінки
        document.querySelector('.config_' + valuta[i] + '_buy').value = buyCurrency[valuta[i]];
        document.querySelector('.config_' + valuta[i] + '_sell').value = sellCurrency[valuta[i]];
    }
    showLog("init currency");
}
function init_aviable() {
    // наявність
    for( var i = 0; i< valuta.length; i++) {
        document.querySelector('.' + valuta[i] + '_aviable').innerHTML = money(aviableCurrency[valuta[i]]);
        document.querySelector('.config_' + valuta[i] + '_aviable').value = money(aviableCurrency[valuta[i]]);
    }
    document.querySelector('.uah_aviable').innerHTML = money(aviableCurrency['uah']);
    showLog("init aviability");
}

function checkAviability(amount, currency) {
    if(amount > aviableCurrency[currency]) {
        showLog('Not aviable ' + currency);
        error("В обміннику недостатньо " + currency);
        return false;
    } else {
        showLog('OK. Aviable ' + currency);
        return true;
    }
}

function getOperation() {
    var operation = document.querySelectorAll('.operation');
    var res;
    for(var i = 0; i< operation.length; i++) {
        if (operation[i].checked) {
            res = operation[i].value;
            break;
        }
    }
    showLog(res);
    return res;
}

function getCurrency() {
    var select = document.querySelector('#currency');
    var currency = select.options[select.selectedIndex].value;
    showLog(currency);
    return currency;
}

function buy(amount, currency) {

    // перевіряєм чи вистачить для обміну коштів
    if (checkAviability(amount, currency)) {

        var amountBuy  = money(amount);
        var amountSell  = money(amount * sellCurrency[currency]);
        showLog("buy: " + amountBuy + currency + " => " + amountSell + "грн.");

        //обновляємо баланс
        aviableCurrency[currency] -= amountBuy;
        aviableCurrency['uah'] += amountSell;

        //оновлюємо інформацію про наявність
        init_aviable();

        return true;
    }

    return false;
}
function sell(amount, currency) {

    var amountSell  = money(amount);
    var amountBuy  = money(amount * buyCurrency[currency]);

    // перевіряєм чи вистачить для обміну коштів
    if (checkAviability(amountBuy, 'uah')) {

        showLog("sell: " + amountBuy + "грн." + " => " + amountSell + currency);

        //обновляємо баланс
        aviableCurrency[currency] += amountSell;
        aviableCurrency['uah'] -= amountBuy;

        //оновлюємо інформацію про наявність
        init_aviable();
        return true;
    }
    return false;
}


function userLogin() {
    var user = document.querySelector('.user').value;
    var passwd = document.querySelector('.passwd').value;

    if( (user == user_name) && (passwd == user_passwd)) {
        return true;
    } else {
        var massage = document.querySelector('.massage');
        massage.innerHTML = 'Помилка входу. Перевірте логін та пароль!';
        return false;
    }

}

// Загрузка курсів валют
    init_currency();

// Наявність доступних сум
    init_aviable();

//Обробник кліку
    document.querySelector('.send').addEventListener( "click" , function(event) {
        event.preventDefault();
    
        var price = document.querySelector('.price').value;
        var result = document.querySelector('.result');
    
        //Перевірка введеної суми
        if (price <= 0) {

            error("Введіть суму для обміну");
    
        } else {
            // Сума введена, визначаємо тип операції
            var operation = getOperation();

            // Визначамо з якою валютою буде операція
            var currency = getCurrency();

            switch (operation) {
                case "buy" :
                    buy(price, currency);
                    break;
                case "sell" :
                    sell(price, currency);
                    break;
            }
        }
    
    });

    // Зміна налаштувань
    document.querySelector('.settings').addEventListener("click", function (event) {
        event.preventDefault();

        var login = document.querySelector('.login');
        var board = document.querySelector('.board');

        if (!login.classList.contains("show")) {
            login.classList.add("show");
            board.classList.add("hide");
        } else {
            login.classList.remove("show");
            board.classList.remove("hide");
        }
    });

    // Авторизація
    document.querySelector('.login-btn').addEventListener("click", function (event) {
        event.preventDefault();

        if (userLogin()) {
            var massage = document.querySelector('.massage');
            massage.innerHTML = '';
            showLog("login success");

            var setting = document.querySelector('.setting');
            var login = document.querySelector('.login');

            if (!setting.classList.contains("show")) {
                setting.classList.add("show");
                login.classList.remove("show");
            } else {
                setting.classList.remove("show");
                login.classList.add("show");
            }

        } else {
            showLog("login failed");
        }

    });

// Оновлення курсів валют
    document.querySelector(".update").addEventListener("click", function (event) {
        event.preventDefault();

        if (userLogin()) {

            for (var i=0; i < valuta.length; i++) {
                buyCurrency[valuta[i]] = document.querySelector('.config_' + valuta[i] + '_buy').value;
                sellCurrency[valuta[i]] = document.querySelector('.config_' + valuta[i] + '_sell').value;
                aviableCurrency[valuta[i]] = document.querySelector('.config_' + valuta[i] + '_aviable').value;
            }

            showLog("Currency updated success!");

            // Загрузка курсів валют
            init_currency();

            // Наявність доступних сум
            init_aviable();

            var setting = document.querySelector('.setting');
            var board = document.querySelector('.board');

            setting.classList.remove("show");
            board.classList.remove("hide");


        } else {
            document.querySelector(".error").innerHTML = "Помилка! Доступно тільки для авторизованого користувача!";
            showLog("warning! attempt update currency");
        }

    });