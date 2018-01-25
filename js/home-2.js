//1. Гра у кості. Гравці(комп’ютер і людина) кидають по 2 кубики.
// У кого сума на кубиках більша, той заробляє 1 бал.
// Якщо на кубиках дубль(подвоєння, тобто дві четвірки і т.і.),
// то гравець додатково заробляє 2 бали.
// Гра закінчується при наборі одним із гравцем N балів.

function shake() {
    return Math.floor(Math.random() * 6);
}

function compare(n1, n2) {
    if (n1 == n2) {
        return 2;
    } else {
        return 0;
    }
}


function log(text) {
    document.write(text + "<br>");
}

var n = Number(prompt("Введіть максимальну кількість балів для завершення гри"));

var score_1 = 0,
    score_2 = 0,
    player1_n1 = 0,
    player1_n2 = 0,
    player2_n2 = 0,
    player2_n1 = 0,
    i = 1;

while (score_1 < n && score_2 < n) {

    // Кидає гравець 1
    log("<b>" + i + " спроба</b>");


    player1_n1 = shake();
    player1_n2 = shake();
    score_1 += compare(player1_n1, player1_n2);
    log("1-ий гравець: " + player1_n1 + " i " + player1_n2);

    player2_n1 = shake();
    player2_n2 = shake();
    score_2 += compare(player2_n1, player2_n2);
    log("2-ий гравець: " + player2_n1 + " i " + player2_n2);

    if ( (player1_n1 + player1_n2) > (player2_n1 + player2_n2)) {
        score_1 ++;
    } else if ( (player1_n1 + player1_n2) < (player2_n1 + player2_n2)) {
        score_2 ++;
    }


    log(" -------------------------------------------- ");
    log("1-ий гравець : 2-ий гравець");
    log(score_1 + " : " + score_2);
    log(" -------------------------------------------- ");

    log("");

    i++;
}

if (score_1 > score_2) {
    log("Переміг 1-ий гравець з рахунком " + score_1 + " : " + score_2);
} else {
    log("Переміг 2-ий гравець з рахунком " + score_2 + " : " + score_1);
}

