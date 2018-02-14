// Головний батіківський обєкт
var Transport = {
    constructor : function (country, producer, model, year) {
        this.country = country;
        this.producer = producer;
        this.model = model;
        this.year = year;

        return this;
    },

    info : function () {
        document.write(this.country + ' ' + this.producer + ' ' + this.model + ' ' + this.year + '<br>');
    },

    move : function () {
        document.write('Транспорт - завдяки ньому можна швидко пересуватися.<br>');
    }
};

// Дочірні обєкти 1-го рівня
var GroundTransport = Object.create(Transport);
GroundTransport.constructor = function (country, producer, model, year){
    Transport.constructor.apply(this, arguments);
    this.ride = function () {
        document.write('Наземний транспорт - дозволяє пересуватися по землі/під землею.<br>')
    };
    return this;
};

var AirTransport = Object.create(Transport);
AirTransport.constructor = function (country, producer, model, year) {
    Transport.constructor.apply(this, arguments);
    this.fly = function () {
        document.write('Повітряний транспорт - можна літати на великі відстані.<br>')
    };
    return this;
};

var WaterTransport = Object.create(Transport);
WaterTransport.constructor = function (country, producer, model, year) {
    Transport.constructor.apply(this, arguments);
    this.swim = function () {
        document.write('Водний транспорт - дозволяє пересуватися по воді / під водою.<br>');
    };
    return this;
};

// Дочірні обєкти 2-го рівня
var AutoTransport = Object.create(GroundTransport);
AutoTransport.constructor = function (country, producer, model, year, transmission, engine, kilometrage){
    GroundTransport.constructor.apply(this, arguments);
    this.transmission = transmission;
    this.engine = engine;
    this.kilometrage = kilometrage;

    this.showAutoInfo = function () {
        document.write(this.transmission + ' ' + this.engine + ' ' + this.kilometrage + '<br>');
    };
    return this;
};

var Plane = Object.create(AirTransport);
Plane.constructor = function (country, producer, model, year, height, wingspan, length){
    AirTransport.constructor.apply(this, arguments);
    this.height = height;
    this.wingspan = wingspan;
    this.length = length;

    this.showPlaneInfo = function () {
        document.write(this.height + ' ' + this.wingspan + ' ' + this.length + '<br>');
    };

    return this;
};

var Ship = Object.create(WaterTransport);
Ship.constructor = function (country, producer, model, year, height, width, length){
    WaterTransport.constructor.apply(this, arguments);
    this.height = height;
    this.width = width;
    this.length = length;

    this.showShipInfo = function () {
        document.write(this.height + ' ' + this.width + ' ' + this.length + '<br>');
    };

    return this;
};

// Ексемпляри
var Volvo = Object.create(AutoTransport).constructor("Sweden", "Volvo", "v60", 2010, "auto", "gasoline", "100 000 km");
Volvo.info();
Volvo.move();
Volvo.ride();
Volvo.showAutoInfo();
document.write(Transport.isPrototypeOf(Volvo));
document.write("<br><br>");

var Titanik = Object.create(Ship).constructor("England", "Titanik", "t123", 2010, 116, 85, 346);
Titanik.info();
Titanik.move();
Titanik.swim();
Titanik.showShipInfo();
document.write(Transport.isPrototypeOf(Titanik));
document.write("<br><br>");

var AN124 = Object.create(Plane).constructor("Ukraine", "AH-124", "Ruslan", 2010, 310, 70, 149);
AN124.info();
AN124.move();
AN124.fly();
AN124.showPlaneInfo();
document.write(Transport.isPrototypeOf(AN124));
document.write("<br><br>");