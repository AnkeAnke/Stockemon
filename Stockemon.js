
var typeEnum = {
    SWORD: "w",
    SHIELD: "h",
    STAFF: "t",
    WOOD: "0"
};

var StockemonEnum = {
    Stock: { type: "0", entwicklung: 0, name: "Stock", atk: 3, def: 1, luc: 1, hp_max: 10, g: "m" , action: "Stupsen"},
    
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
    Tannenbaum: { type: "0", name: "Tannenbaum", entwicklung: 5, g: "m", atk: 42, des: 42, luc: 42, hp_max: 4242, action: "Ho!Ho!Ho!"}
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
                this.epTillLvlUp = Math.floor(10 * Math.pow(multiplicator, level));
                this.epOnDeath = Math.floor(2 * Math.pow(multiplicator, level));
                this.name = stock.name;
                this.gender = stock.g;
                this.actions = [4];
                for (var i = 0; i < 4; ++i) this.actions[i] = new Action(actionEnum.Stupsen); //First set all to default
                var actionsindex = 1;
                for (var actionKey in Action.ActionEnum) {
                    var action = ActionEnum[actionKey];
                    if ((type == action[type] || action[type] == "0") && entwicklung >= action[neededEvo] && level >= action[neededLvl]) {
                        this.actions[actionindex] = new Action(action);
                    }
                }
            }
        }
    }
    this.loadValues(type, entwicklung, level);

    

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
        var damage = amount / this.def
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

    this.attackEnemy = function(action, enemy){
        var damage = action.dmg * this.atk * ((Math.random() * this.luc - 0.5) * 0.05 + 1);
        damage = damage.toFixed();
        damage = enemy.onDamage(damage);

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
    };
};

