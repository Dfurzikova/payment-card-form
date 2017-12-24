document.addEventListener('DOMContentLoaded', function () {

    form.init();

});
var form = {
    init: function () {
        this.formElem = document.querySelector('#form-card');

        this._bindEvents();
    },

    _bindEvents: function () {
        this.formElem.addEventListener('input', this._onInput.bind(this));
    },

    _onInput: function (e) {
        var input = e.target;

        input.value = input.value
            .replace(/[^\d]+/g, '')   // убирает не цифры
            .replace(/(\d{4})/g, '$1 ') // разбивает по 4 символа
            .replace(/ $/, ''); //

        var value = input.value;
        var name = input.name;

        validator.validate(name, value);
    }
};


var validator = {
    CARDS: [
        { num: 2, type: 'mir' },
        { num: 3, type: 'maestro' },
        { num: 21, type: 'maestro' },
        { num: 4, type: 'visa' },
        { num: 5, type: 'mastercard' }
    ],

    validate: function (name, value) {
        this.value = value;
        this._prepareCards();

        return this['_' + name](value);
    },

    _prepareCards: function () {
        if (this.CARDS_TYPES && this.CARDS_NUMS) {
            return;
        }

        this.CARDS_TYPES = [];
        this.CARDS_NUMS = {};

        this.CARDS.forEach(function (card) {
            if (this.CARDS_TYPES.indexOf(card.type) === -1) {
                this.CARDS_TYPES.push(card.type);
            }

            this.CARDS_NUMS[card.num] = card.type;
        }.bind(this));
    },

    _cardnumber: function (value) {
        var cardType;

        this.CARDS_TYPES.forEach(function (card) {
            document.querySelector('.' + card).style.opacity = 0.5;
        });

        for (var i = value.length; i > 0; i--) {
            cardType = this.CARDS_NUMS[value.slice(0, i)];

            if (cardType) {
                document.querySelector('.' + cardType).style.opacity = 1;
                break
            }
        }
    },

    _month: function (value) {
        console.log("вызов month");
        if (value > 12) {
            console.log("Ошибка!Значение больше 12!");
            /// вызов метода с ошибкой
        }
    },

    _year: function (value) {
        console.log("вызов year");

        var date = new Date();
        var currentYear = date.getFullYear(); //текущий год
        currentYear = currentYear.toString().slice(-2); //  текущий год из числа в строку

        var currentYear = parseInt(currentYear); // из строки в число


        if (value >= (currentYear + 5)) {
            console.log("Ошибка! Значение больше или меньше!");

        }


    },

    _cvc: function (value) {
        console.log("вызов cvc", value);

    }


};

