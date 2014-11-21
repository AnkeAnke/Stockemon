
var typeEnum = {
    SWORD: "w",
    SHIELD: "h",
    STAFF: "t",
    WOOD: "0"
};

var StockemonEnum = {
    Stock: { type: "0", entwicklung: 0, atk: 3, def: 0, luc: 1, hp_max: 15 },

    //Schwerter
    Schwert: { type: "w", entwicklung: 1 },
    Langschwert: { type: "w", entwicklung: 2 },
    Zweihaender: { type: "w", entwicklung: 3 },

    //Schilde
    Griff_mit_Brett: { type: "h", entwicklung: 1 },
    Minischild: { type: "h", entwicklung: 2 },
    Schild: { type: "h", entwicklung: 3 },
    Grossschild: { type: "h", entwicklung: 4 },
    Igelschild: { type: "h", entwicklung: 5 },

    //Staebe
    Stab: { type: "t", entwicklung: 1 },
    Speer: { type: "t", entwicklung: 2 },
    Pike: { type: "t", entwicklung: 3 },
    Hellebarde: { type: "t", entwicklung: 4 },
    Dreizack: { type: "t", entwicklung: 5 },

    //Tannenbaum!!!
    Tannenbaum: { type: "0", entwicklung: 6 }
};



function Stockemon(type, entwicklung, level) {
    //Stockemon class
    //fixed attributes first

    this.loadValues = function(type, entwicklung, level) {
        for (var stock in StockemonEnum) {
            if (stock.type == type && stock.entwicklung == entwicklung) {
                this.hp_max = stock.hp_max;
                this.atk = stock.atk;
                this.def = stock.def;
                this.luc = stock.luc;
            }
        }
    }

    this.type = type;
    this.lvl = level;
    this.loadValues(type, level, entwicklung);
    //this.hp_max = getMaxHP(type, level);
    //this.atk = loadATK(type, level);
    //this.def = loadDEF(type, level);
    //this.luc = loadLUC(type, level);
    this.epTillLvlUp = 10;
    this.epOnDeath = 1000;
    this.actions = [4];
    this.hp_current = this.hp_max;
    this.poison = [];

    this.getInfo = function () {
        return this.type + ' LVL:' + this.level + ' HP:' + this.hp_current + ' / ' + this.hp_max;
    };

    this.getBattleInfo = function () {
        return this.type + ' LVL:' + this.level + ' HP:' + this.hp_current + ' / ' + this.hp_max + ' POISON:' + this.poison[0];
    };

    this.heal = function() {
        this.hp_current = this.hp_max;
    }

    this.attack = function (index) {
        return actions[index];
    }

    this.onTick = function () {

    }

    this.onDamage = function () {

    }

    this.onDeath = function () {

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
