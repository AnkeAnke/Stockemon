
var typeEnum = {
    SWORD: "w",
    SHIELD: "h",
    STAFF: "t",
    WOOD: "0"
};

var StockemonEnum = {
    Stock: { type: "0", entwicklung: 0, name: "Stock", atk: 3, def: 1, luc: 1, hp_max: 10, g: "m" },
    
    //Schwerter
    Schwert: { type: "w", name: "Schwert", entwicklung: 1, g: "n" },
    Langschwert: { type: "w", name: "Langschwert", entwicklung: 2, g: "n" },
    Zweihaender: { type: "w", name: "Zweihaender", entwicklung: 3, g: "m" },
    GreatSword: { type: "w", name: "Aua Aua", entwicklung: 4, g: "n" },
    //Schilde
    Griff_mit_Brett: { type: "h", name: "Griff mit Brett", entwicklung: 1, g: "m" },
    Schild: { type: "h", name: "Schild", entwicklung: 2, g: "n" },
    Grossschild: { type: "h", name: "Grossschild", entwicklung: 3, g: "n" },
    Igelschild: { type: "h", name: "Pieks Pieks", entwicklung: 4, g: "n" },

    //Staebe
    Speer: { type: "t", name: "Speer", entwicklung: 1, g: "m" },
    Hellebarde: { type: "t", name: "Hellebarde", entwicklung: 2, g: "f" },
    Dreizack: { type: "t", name: "Dreizack", entwicklung: 3, g: "m" },
    Pikspikspiks: { type: "t", name: "Aua Pieks", entwicklung: 4, g: "n" },

    //Tannenbaum!!!
    Tannenbaum: { type: "0", name: "Tannenbaum", entwicklung: 5, g: "m" }
};



function Stockemon(type, entwicklung, level) {
    //Stockemon class
    //fixed attributes first
    var multiplicator = 1.05;
    this.type = type;
    this.lvl = level;
    this.evolution = entwicklung;
    this.loadValues = function (type, entwicklung, level) {
        for (var stockKey in StockemonEnum) {
            var stock = StockemonEnum[stockKey];
            if (stock.type == type && stock.entwicklung == entwicklung) {
                this.hp_max = (stock.hp_max * Math.pow(multiplicator, level)).toFixed(0);
                this.atk = (stock.atk * Math.pow(multiplicator, level)).toFixed(0);
                this.def = (stock.def* Math.pow(multiplicator, level)).toFixed(0);
                this.luc = (stock.luc * Math.pow(multiplicator, level)).toFixed(0);
                this.epTillLvlUp = Math.floor(10 * Math.pow(multiplicator, level));
                this.epOnDeath = Math.floor(2 * Math.pow(multiplicator, level));
                this.name = stock.name;
                this.gender = stock.g;
            }
        }
    }
    this.loadValues(type, entwicklung, level);

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
        this.hp_current -= amount / this.def;
        //TODO add Interface function (display damage taken)
        if (this.hp_current < 0) {
            this.onDeath();
        }
    }

    this.onDeath = function () {
        //TODO Interface function (player died action)
        this.hp_current = 0;
        this.onLostFight();
    }

    this.onLostFight = function () {
        //TODO Interface function
    }

    this.attackEnemy = function(action, enemy){
        var damage = action.dmg * this.atk * ((Math.random() * this.luc - 0.5) * 0.05 + 1);
        damage = damage.toFixed();
        enemy.onDamage(damage);

        return damage;
    }

    this.getEP = function (ep) {
        this.epTillLvlUp -= ep;

        while (this.epTillLvlUp <= 0) {
            var add = this.epTillLvlUp;
            this.loadValues(this.type, this.evolution, ++this.lvl);
            this.epTillLvlUp += add;
        }
    }

    this.getInfo = function () {
        // format:  atk def luc max_hp eptolvlup lvl 
        if (entwicklung == 5)
            this.code = this.atk + " " + this.def + " " + this.luc + " " + this.max_hp + " " + this.eptolvlup + " " + this.lvl + " " + "GerdLiebtKekse";
        else if (entwicklung == 4) {
            this.code = "KekseSindToll";
        } else if (entwicklung == 3) {
            this.code = "AlleDieKekseMoegenSindToll";
        } else if (entwicklung == 2) {
            this.code = "StockeMonKommSchlagSieAlle";
        } else if (entwicklung == 1) {
            this.code = "AdventAdventEinStockMonSchlaegt";
        }


        alert(this.code);
        return this.code; //this.type + '  LVL:' + this.lvl + 'Hungry:' + this.hungry + 'Sleepy:' + this.sleepy + 'Happy:' + this.happy + 'Dirty:' + this.dirty;
    };
    this.setInfo = function () {
        var n = prompt("Dein Stockemon-Code:", "Hier kommt der Code hin");

        var ss = n.split(" ");
        var satk = ss[0];
        var sdef = ss[1];
        var sluc = ss[2];
        var smax_hp = ss[3];
        var septolvlup = ss[4];
        var slvl = ss[5];
        var n = ss[6];

        this.atk = parseInt(satk);
        this.def = parseInt(sdef);
        this.luc = parseInt(sluc);
        this.max_hp = parseInt(smax_hp);
        this.eptolvlup = parseInt(septolvlup);
        this.lvl = slvl;
        if (n == "GerdLiebtKekse") {
            entwicklung = 5;
            this.lvl = 9001;
        }
        if (n == "KekseSindToll") {
            entwicklung = 4;
            this.setType();
            this.lvl = 50;
        }
        if (n == "AlleDieKekseMoegenSindToll") {
            entwicklung = 3;
            this.setType();
            this.lvl = 30;
        }
        if (n == "StockeMonKommSchlagSieAlle") {
            entwicklung = 2;
            this.setType();
            this.lvl = 20;
        }
        if (n == "AdventAdventEinStockMonSchlaegt") {
            entwicklung = 1;
            this.setType();
            this.lvl = 10;

        }
    };
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
