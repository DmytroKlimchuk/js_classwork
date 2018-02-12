/*
Написати програму симулятор змаганб з боксу:
Створити функцію конструктор яка приймає наступні параметри:
1) Призвіще
2) Ім'я
3) Призвісько
4) Кількість боїв
5) Перемог
6) Перемог нокаутом
7) Порозок
8.) Нічиїх
9) ID
Реалізувати наступний функціонал:
1) Вивести інформацію про боксера
2) Реалізувати геттери і сеттери з перевірками
Боксерів має бути 8.
Реалізувати жеребкування (випадкове) з перевіркою (один боксер не може змагатись більше одного разу за тур)
Реалізувати турнірну таблицю
Після перщого туру переможці змпгаються далі до фіналу!
*/

function log(txt) {
    console.log(txt);
}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

var Boxer = function (id, surname, name, nick, count, victory, knockout, loss, draw) {
    var _id = id,
        _surname = surname,
        _name = name,
        _nick = nick,
        _count = count,
        _victory = victory,
        _knockout = knockout,
        _loss = loss,
        _draw = draw;
    
    this.displayInfo = function () {
        document.write("<b>" + _name + " " + _surname + "</b> ("+ _nick +") " + "<br>")
        document.write("Кількість боїв: " + _count +  "<br>")
        document.write("Перемоги: " + _victory +  "<br>")
        document.write("Перемоги нокаутом: " + _knockout +  "<br>")
        document.write("Нічиїх: " + _draw +  "<br>")
        document.write("Поразок: " + _loss +  "<br>")
        document.write("<br>")
    };

    this.getNick = function () {
        return _nick;
    };

    this.getName = function () {
        return _name;
    };

    this.getSurname = function () {
        return _surname;
    };

    this.getFullName = function () {
        return _name + " " + _surname + " ("+ _nick +") "
    };

    this.getCount = function () {
        return _count;
    };

    this.setCount = function () {
        _count++;
    };

    this.getLoss = function () {
        return _loss;
    };

    this.setLoss = function () {
        _loss++;
    };

    this.getVictory = function () {
        return _victory;
    };

    this.setVictory = function () {
        _victory++;
    };

    this.getKnockout = function () {
        return _knockout;
    };

    this.setKnockout = function () {
        _knockout++;
    };

    this.getDraw = function () {
        return _draw;
    };

    this.setDraw = function () {
        _draw++;
    };

};

var Tournament = {

    init : function (boxer) {
        var _boxer = boxer;

        this.showInfo(_boxer);
        this.fights(_boxer);

    },

    showInfo : function (boxer) {

        log('Інформація про боксерів виведена');
        document.write("<p><b>Турнір з боксу.</b></p>");
        document.write("<p>Учасники турніру ("+ boxer.length +" боксерів): </p>");
        document.write("<table><tr><th>Учасник</th><th>Нік</th><th>Кількість боїв</th><th>Перемоги</th><th>Нокаути</th><th>Нічиї</th><th>Поразки</th></tr>");

        for (item in boxer) {
            document.write("<tr>");
            document.write("<td>"+boxer[item].getName()+' '+boxer[item].getSurname()+"</td>");
            document.write("<td>"+boxer[item].getNick()+"</td>");
            document.write("<td>"+boxer[item].getCount()+"</td>");
            document.write("<td>"+boxer[item].getVictory()+"</td>");
            document.write("<td>"+boxer[item].getKnockout()+"</td>");
            document.write("<td>"+boxer[item].getDraw()+"</td>");
            document.write("<td>"+boxer[item].getLoss()+"</td>");
            document.write("</tr>");
        }

        document.write("</table>");
    },

    shuffle : function (boxer) {
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }
        log('Жеребкування відбулося');
        return boxer.sort(compareRandom);
    },

    getCountRound : function (boxer) {
        function isInteger(num) {
            return (num ^ 0) === num;
        }
        var count = Math.log2(boxer.length);
        if(isInteger(count) === true) {
            log('Кількість учасників підходить для турніру.');
            return count;
        } else {
            log('Для турніру по олімпійській системі потрібне число учасників з степенню двійки: 2, 4, 8, 16, 32, 64 ...');
            alert("Для турніру по олімпійській системі потрібне число учасників з степенню двійки: 2, 4, 8, 16, 32, 64 ...");
            return false;
        }
    },

    fights : function (boxer) {

        countRound = this.getCountRound(boxer);

        if (countRound) {
            for (i=1; i<=countRound; i++) {

                log('Раунд №' + i);
                log('Учасників - ' + boxer.length);
                log('Боїв - ' + boxer.length/2);
                document.write('<h1>Раунд №' + i + '</h1>');

                this.shuffle(boxer);
                boxer = this.round(boxer);

            }
        }

    },

    round : function (boxer) {
        var winners = [];
        var counter = 0;
        for (n=0;n<boxer.length;n++) {
            if (n%2 == 0) {
                winners[counter] = this.fight(boxer[n],boxer[n+1]);
                counter++;
            }
        }
        if (winners.length > 1) {
            document.write('<h3>В наступний раунд переходять:</h3>');
            for(item in winners) {
                document.write(winners[item].getFullName() + '<br>');
            }
        } else {
            document.write('<h1>Переможець турніру:</h1>');
            document.write('<h2>'+winners[0].getFullName() + '</h2><br>');
            winners[0].displayInfo();
        }
        return winners;
    },
    
    fight : function (boxer1, boxer2) {
        // Визначаємо верхню межу рандому індивідуальною в залежності від зіграних/виграних/нокаутів/нічиїх/програшів
        var max1 = boxer1.getVictory() + boxer1.getDraw() - boxer1.getLoss();
        var max2 = boxer2.getVictory() + boxer2.getDraw() - boxer2.getLoss();
        var score1 = random(25, max1);
        var score2 = random(25, max2);

        boxer1.setCount();
        boxer2.setCount();

        document.write(boxer1.getFullName() + ' : ' + boxer2.getFullName() + '<br>');
        document.write(score1 + ' : ' + score2 + '<br>');

        if (score1 == score2) {

            boxer1.setDraw();
            boxer2.setDraw();

            log('НІЧИЯ!!! Для визначення переможця провидимо додаткову гру.');
            document.write('<b>НІЧИЯ!!!</b> Для визначення переможця провидимо додаткову гру.<br>');
            return this.fight(boxer1, boxer2);
        } else {
            if (score1 > score2) {
                document.write('Перемагає - <b>' + boxer1.getFullName() + '</b><br><br>');

                boxer1.setVictory();
                if(score1 == max1) boxer1.setKnockout();

                boxer2.setLoss();
                return boxer1;

            } else {
                document.write('Перемагає - <b>' + boxer2.getFullName() + '</b><br><br>');
                boxer2.setVictory();

                if(score2 == max2) boxer2.setKnockout();

                boxer1.setLoss();
                return boxer2;
            }
        }

    }

};

var boxer = [];
boxer[0] = new Boxer(0, "Кличко",  "Володимир",  "Вован", 65, 45, 5, 3, 8);
boxer[2] = new Boxer(1, "Алі",  "Мухамед",  "муха", 65, 51, 4, 5, 8);
boxer[3] = new Boxer(2, "Леннокс",  "Льюіс",  "король", 77, 65, 10, 3, 3);
boxer[4] = new Boxer(3, "Тайсон",  "Майк",  "залізний Майк", 55, 51, 6, 4, 6);
boxer[5] = new Boxer(4, "Форман",  "Джордж",  "торпеда", 57, 47, 7, 8, 2);
boxer[1] = new Boxer(5, "Кличко",  "Віталій",  "Вєталь", 55, 51, 5, 4, 4);
boxer[6] = new Boxer(6, "Марчіано",  "Роккі",  "молот", 44, 38, 11, 4, 7);
boxer[7] = new Boxer(7, "Луїс",  "Джо",  "кувалда", 65, 55, 8, 9, 3);


Tournament.init(boxer);
Tournament.showInfo(boxer);

