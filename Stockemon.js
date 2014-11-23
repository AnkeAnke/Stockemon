
var typeEnum = {
    SWORD: "w",
    SHIELD: "h",
    STAFF: "t",
    WOOD: "0"
};

var StockemonEnum = {
    Stock: { type: "0", entwicklung: 0, name: "Stock", atk: 3, def: 1, luc: 1, hp_max: 10, g: "m"},
    
    //Schwerter
    Schwert: { type: "w", name: "Schwert", entwicklung: 1, g: "n", atk: 3, def: 1, luc: 1, hp_max: 13 },
    Langschwert: { type: "w", name: "Langschwert", entwicklung: 2, g: "n", atk: 5, def: 3, luc: 3, hp_max: 25 },
    Zweihaender: { type: "w", name: "Zweihaender", entwicklung: 3, g: "m", atk: 11, def: 2, luc: 3, hp_max: 38 },
    GreatSword: { type: "w", name: "Aua Aua", entwicklung: 4, g: "n", atk: 17, def: 4, luc: 5, hp_max: 50 },
    //Schilde
    Griff_mit_Brett: { type: "h", name: "Griff mit Brett", entwicklung: 1, g: "m", atk: 2, def: 2, luc: 1, hp_max: 19 },
    Schild: { type: "h", name: "Schild", entwicklung: 2, g: "n", atk: 3, def: 5, luc: 14, hp_max: 35 },
    Grossschild: { type: "h", name: "Grossschild", entwicklung: 3, g: "n", atk: 7, def: 9, luc: 17, hp_max: 60 },
    Igelschild: { type: "h", name: "Pieks Pieks", entwicklung: 4, g: "n", atk: 11, def: 13, luc: 20, hp_max: 100 },

    //Staebe
    Speer: { type: "t", name: "Speer", entwicklung: 1, g: "m", atk: 2, def: 2, luc: 2, hp_max: 15 },
    Hellebarde: { type: "t", name: "Hellebarde", entwicklung: 2, g: "f", atk: 4, def: 4, luc: 8, hp_max: 30 },
    Dreizack: { type: "t", name: "Dreizack", entwicklung: 3, g: "m", atk: 9, def: 11, luc: 9, hp_max: 49 },
    Pikspikspiks: { type: "t", name: "Aua Pieks", entwicklung: 4, g: "n", atk: 14, def: 8, luc: 12, hp_max: 75 },

    //Tannenbaum!!!
    Tannenbaum: { type: "0", name: "Tannenbaum", entwicklung: 5, g: "m", atk: 20, def: 20, luc: 20, hp_max: 200}
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
                this.def = (stock.def * Math.pow(multiplicator, level)).toFixed(0);
                this.luc = (stock.luc * Math.pow(multiplicator, level)).toFixed(0);
                this.epTillLvlUp = Math.floor(15 * Math.pow(multiplicator, level));
                this.epOnDeath = Math.floor(2 * Math.pow(multiplicator, level*2));
                this.name = stock.name;
                this.gender = stock.g;
                this.actions = [4];
                for (var i = 0; i < 4; ++i) this.actions[i] = new Action(actionEnum.Stupsen); //First set all to default
                var actionsindex = 0;
                for (var actionKey in actionEnum) {
                    var action = actionEnum[actionKey];
                    if ((type == action.type || type == "0") && entwicklung >= action.neededEvo && level >= action.neededLvl) {
                        this.actions[actionsindex] = new Action(action);
                        actionsindex++;
                        actionsindex %= 4;
                    }
                }
                break;
            }
        }
    }
    this.loadValues(type, entwicklung, level);

    

    this.hp_current = this.hp_max;
    this.poison = [];
    this.blocked_dmg = 0;

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
        return damage;
    }

    this.onDamage = function (amount) {
        var damage = amount / this.def;
        damage = Math.floor(Math.max(0, damage - this.blocked_dmg));
        this.blocked_dmg = 0;
        this.hp_current -= damage;
        //TODO add Interface function (display damage taken)
        if (this.hp_current < 0) {
            this.onDeath();
        }
        return damage;
    }

    this.onDeath = function () {
        //TODO Interface function (player died action)
        this.hp_current = 0;
        this.onLostFight();
    }

    this.onLostFight = function () {
        //TODO Interface function
    }

    this.attackEnemy = function (action, enemy) {
        var damage = action.dmg * this.atk * ((Math.random() * this.luc - 0.5) * 0.05 + 1);
        damage = damage.toFixed();
        damage = enemy.onDamage(damage);
        this.blocked_dmg = action.dmg_reduce * this.def * ((Math.random() * this.luc - 0.5) * 0.05 + 1);
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
        var code = this.atk + " " + this.def + " " + this.luc + " " + this.hp_max + " " + this.epTillLvlUp + " " + this.lvl + " " + this.type + " ";
        if (entwicklung == 5)
            code += "GerdLiebtKekse";
        else if (entwicklung == 4) {
            code += "KekseSindToll";
        } else if (entwicklung == 3) {
            code += "AlleDieKekseMoegenSindToll";
        } else if (entwicklung == 2) {
            code += "StockeMonKommSchlagSieAlle";
        } else if (entwicklung == 1) {
            code += "AdventAdventEinStockMonSchlaegt";
        } else if (entwicklung == 0) {
            code += "StockStockWerIstDa";
        }
        return code; //this.type + '  LVL:' + this.lvl + 'Hungry:' + this.hungry + 'Sleepy:' + this.sleepy + 'Happy:' + this.happy + 'Dirty:' + this.dirty;
    };
    this.setInfo = function () {
        var current = this.getInfo();
        var n = prompt("Dein Stockemon-Code:", current);
        if (n != n || n == null || n == undefined)
            return;
        var ss = n.split(" ");
        if (n.length < 8)
            return;
        var satk = ss[0];
        var sdef = ss[1];
        var sluc = ss[2];
        var smax_hp = ss[3];
        var septolvlup = ss[4];
        var slvl = ss[5];
        var stype = ss[6];
        var n = ss[7];

        this.atk = parseInt(satk);
        this.def = parseInt(sdef);
        this.luc = parseInt(sluc);
        this.hp_max = parseInt(smax_hp);
        this.heal();
        this.epTillLvlUp = parseInt(septolvlup);
        this.lvl = slvl;
        this.type = stype;

        

        if (n == "GerdLiebtKekse") {
            this.evolution = 5;
        }
        if (n == "KekseSindToll") {
            this.evolution = 4;
        }
        if (n == "AlleDieKekseMoegenSindToll") {
            this.evolution = 3;
        }
        if (n == "StockeMonKommSchlagSieAlle") {
            this.evolution = 2;
        }
        if (n == "AdventAdventEinStockMonSchlaegt") {
            this.evolution = 1;
        }
        if (n == "StockStockWerIstDa") {
            this.evolution = 0;
        }

        for (var stockKey in StockemonEnum) {
            var stock = StockemonEnum[stockKey];
            if (stock.type == this.type && stock.entwicklung == this.evolution) {
                this.name = stock.name;
            }
        }
    };
};

