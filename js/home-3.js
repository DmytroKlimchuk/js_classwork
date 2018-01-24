

function dark(text) {
    document.write("<span class='dark'>"+text+"</span>");
}
function light(text) {
    document.write("<span class='light'>"+text+"</span>");
}

function middle(n) {
    return Math.ceil(n/2)
}

var x = 40, // ширина основи
    y = 25, // Висота ялинки
    h = 5; // висота стовбура

for (var i=0; i<y; i++) {
    for (var j=0; j<x; j++) {

        if (i < (y - h)) {
            if ( j >= (middle(x) - i) && j <= (middle(x) + i) ) {
                dark("*");
            } else {
                light("*");
            }
        } else {
            if ( j >= (middle(x) - 1) && j <= (middle(x) + 1)) {
                dark("*");
            } else {
                light("*");
            }
        }



    }
    dark("<br>")
}