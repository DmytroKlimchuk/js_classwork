/*
1. Написати функцію, яка отримує дату (день, місяць) і виводить назву свята,
що випадає на цей день (наприклад, 7.01 – Різдво, 9.05 – День Перемоги).
Запрограмувати реакцію програми на 4 – 5 свят.
 */

var holidays = {
  '31.12' : 'Новий рік',
  '07.01' : 'Різдво',
  '24.08' : 'День незалежності',
  '28.06' : 'День конституції',
  '08.03' : '8 Березня',
  '09.05' : 'День перемоги',
  '14.09' : 'День захисника України',
  '08.04' : 'Великдень'
};

function checkDay(day) {

    if (day < 1 || day > 31) return false;
    return true;

}
function checkMonth(month) {

    if (month < 1 || month > 12) return false;
    return true;

}

function checkHoliday(day, month) {
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    var date = day + '.' + month;

    if ( !holidays[date]) {
        alert (date + ' - вихідного нема, йдемо на роботу :)');
    } else {
        alert (date + ' - ' + holidays[date]);
    }

}


var day = Number(prompt('Введіть день (від 1 до 31):'));
var month = Number(prompt('Введіть місяць (від 1 до 12):'));

if (!checkDay(day))
    day = Number(prompt('Введіть коректне значення дня (від 1 до 31):'));

if (!checkMonth(month))
    day = Number(prompt('Введіть коректне значення місяця (від 1 до 12):'));

checkHoliday(day, month);

