
var typeEnum = {
    SWORD: "w",
    SHIELD: "h",
    STAFF: "t",
    WOOD: "0"
};

var StockemonEnum = {
    Stock: { type: "0", entwicklung: 0, name: "Stock", atk: 3, def: 0, luc: 1, hp_max: 10 },
    
    //TODO Restliche Stufen einfuegen und vervollstaendigen
    //Schwerter
    Schwert: { type: "w", name: "Schwert", entwicklung: 1 },
    Langschwert: { type: "w", name: "Langschwert", entwicklung: 2 },
    Zweihaender: { type: "w", name: "Zweihaender", entwicklung: 3 },
    GreatSword :{type:"w",name: "Zweihaender",entwicklung: 4},
    //Schilde
    Griff_mit_Brett: { type: "h", name: "Griff mit Brett", entwicklung: 1 },
    Schild: { type: "h", name: "Schild", entwicklung: 2 },
    Grossschild: { type: "h", name: "Grossschild", entwicklung: 3 },
    Igelschild: { type: "h", name: "Igelschild", entwicklung: 4 },

    //Staebe
    Speer: { type: "t", name: "Speer", entwicklung: 1 },
    Hellebarde: { type: "t", name: "Hellebarde", entwicklung: 2 },
    Dreizack: { type: "t", name: "Dreizack", entwicklung: 3 },
    Pikspikspiks: { type: "t", name: "Pikspikspiks", entwicklung: 4 },

    //Tannenbaum!!!
    Tannenbaum: { type: "0", name: "Tannenbaum", entwicklung: 5 }
};



function Stockemon(type, entwicklung, level) {
    //Stockemon class
    //fixed attributes first
    var multiplicator = 1.05;
    this.type = type;
    this.lvl = level;
    this.loadValues = function (type, entwicklung, level) {
        for (var stockKey in StockemonEnum) {
            var stock = StockemonEnum[stockKey];
            if (stock.type == type && stock.entwicklung == entwicklung) {
                this.hp_max = (stock.hp_max * Math.pow(multiplicator, level)).toFixed(0);
                this.atk = (stock.atk * Math.pow(multiplicator, level)).toFixed(0);
                this.def = (stock.def* Math.pow(multiplicator, level)).toFixed(0);
                this.luc = (stock.luc * Math.pow(multiplicator, level)).toFixed(0);
                this.name = stock.name;
            }
        }
    }
    this.loadValues(type, entwicklung, level);
    this.epTillLvlUp = 10;
    this.epOnDeath = 1000;

    this.actions = [4];
    for (var i = 0; i < 4; ++i) this.actions[i] = new Action();

    this.hp_current = this.hp_max;
    this.poison = [];

    this.getInfo = function () {
        return ''+this.name + ' LVL:' + this.lvl + ' HP:' + this.hp_current + ' / ' + this.hp_max;
    };

    this.getBattleInfo = function () {
        return this.name + ' LVL:' + this.lvl + ' HP:' + this.hp_current + ' / ' + this.hp_max + ' POISON:' + this.poison[0];
    };

    this.heal = function() {
        this.hp_current = this.hp_max;
        //TODO Interface function: Just healed
    }

    this.attack = function(index) {
        return actions[index];
    }

    this.setAction = function (action, index) {
        actions[index] = action;
    }

    this.onTick = function () {
        if (this.poison == []) return;
        var damage = this.poison[0];
        this.onDamage(damage);
        this.poison.shift();
    }

    this.onDamage = function (amount) {
        this.hp_current -= amount;
        //TODO add Interface function (display damage taken)
        if (this.hp_current < 0) {
            this.onDeath();
        }
    }

    this.onDeath = function () {
        //TODO Interface function (player died action)
        this.onLostFight();
    }

    this.onLostFight = function () {
        //TODO Interface function
    }

};

/*
function Stockemon(codenumber) {
    var typelevel = getTypeLevel(codenumber);
    if (typelevel == []) {
        return 0; //or throw exception or whatever
    }
    else {
        return Stockemon(typelevel[0],typelevel[1]);
    }
}
*/
