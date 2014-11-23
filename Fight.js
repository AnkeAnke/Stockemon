var FightStatus = {
    MainMenu: {numTitles: 2},
    Actions: { numTitles: 4 },
    InFightAtk: { numTitles: 1 },
    InFightDef: { numTitles: 1 },
    OnWin: { numTitles: 1 },
    OnLoose: { numTitles: 1 },
    OnReturn: { numTitles: 1 }
};

function Fight(stockemon, enemy, world, enemyTile) {
    this.stockemon = stockemon;
    this.enemy = enemy;
    this.world = world;
    this.tile = enemyTile;
    
    this.selected = 1;
    this.countdownKeys = 0;
    this.text = "Oh, ein" + (enemy.gender == "f"? "e " : " ") + enemy.name + "!\nZeit für eine Tracht Prügel!";

    this.fightStatus = FightStatus.MainMenu;
    this.numTitles = 0;

    this.justSwitchedMenu = false;

    this.OnFight = function() {
        this.fightStatus = FightStatus.Actions;
        this.selected = 3;
    }

    this.OnFlee = function() {
        //TODO: try to run *muhaha*
    }

    this.Draw = function (canvas) {
        canvas.fillStyle = "#ff9001";
        // Draw the enemies status
        var partHP = this.enemy.hp_current / this.enemy.hp_max;

        var bar = {};
        bar.x = 50 + 500;
        bar.y = 175;
        bar.w = 500 * partHP;
        bar.h = 30;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIbar"), bar);

        var ui = {};
        ui.x = 0;
        ui.y = 100;
        ui.w = 1100;
        ui.h = 200;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIleft"), ui);
        DrawScaledText(canvas, "" + this.enemy.hp_current + "/" + this.enemy.hp_max, 1050, 205, 15, "right");
        DrawScaledText(canvas, this.enemy.name, 550, 110, 40, "left");
        DrawScaledText(canvas, "Lv: " + this.enemy.lvl, 1050, 150, 20, "right");

        var pic = {};
        pic.x = 1400;
        pic.y = 100;
        pic.w = 400;
        pic.h = 400;
        if(this.enemy.hp_current > 0)
            DrawScaledPos(canvas, globalImageHandler.GetImage(this.enemy.name), pic);

        // Draw the own stock's status
        partHP = this.stockemon.hp_current / this.stockemon.hp_max;
        var ep = this.stockemon.epTillLvlUp;

        bar.x = 1350;
        bar.y = 675;
        bar.w = 500 * partHP;
        bar.h = 30;
        if(this.fightStatus != FightStatus.OnLoose)
            DrawScaledPos(canvas, globalImageHandler.GetImage("UIbar"), bar);

        var ui = {};
        ui.x = 1300;
        ui.y = 600;
        ui.w = 600;
        ui.h = 200;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIright"), ui);
        DrawScaledText(canvas, "" + this.stockemon.hp_current + "/" + this.stockemon.hp_max, 1850, 705, 15, "right");
        DrawScaledText(canvas, this.stockemon.name, 1350, 610, 40, "left");
        DrawScaledText(canvas, "Lv: " + this.stockemon.lvl, 1850, 650, 20, "right");
        DrawScaledText(canvas, "" + ep + " EP zum nächsten Level", 1840, 760, 20, "right");

        pic.x = 600;
        pic.y = 400;
        pic.w = 600;
        pic.h = 600;
        if (this.stockemon.hp_current > 0)
            DrawScaledPos(canvas, globalImageHandler.GetImage(this.stockemon.name), pic);

        // Draw left menu
        var titles = [];
        
        this.numTitles = this.fightStatus.numTitles;

        switch (this.fightStatus) {
            case FightStatus.Actions:
                for (var i = 0; i < 4; ++i)
                    titles[i] = this.stockemon.actions[i].name;
                break;
            case FightStatus.MainMenu:
                titles[0] = "Fliehen";
                titles[1] = "Kämpfen";
                break;
            default:
                titles[0] = "Weiter";
                break;
        };

        for (var i = 0; i < this.numTitles; ++i) {
            var pos = new Object();
            pos.x = 0;
            pos.y = 1000 - ((i + 2) * 200);
            pos.w = 500;
            pos.h = 200;
            var img = this.selected == i ? globalImageHandler.GetImage("UIon") : globalImageHandler.GetImage("UIoff");
            if (this.selected == i) canvas.fillStyle = "#555555";
            DrawScaledPos(canvas, img, pos);
            DrawScaledText(canvas, titles[i], 50, pos.y + 50, 70, "left");
            canvas.fillStyle = "#ff9001";
        }
        // Draw text box
        ui.x = 0;
        ui.y = 800;
        ui.w = 1200;
        ui.h = 200;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UItext"), ui);
        DrawScaledText(canvas, this.text, 30, 830, 50, "left");

        canvas.fillStyle = "#ffffff";
    }

    this.Update = function (keys, timeSinceLastUpdate) {
        if (this.justSwitchedMenu && !keys[13] && !keys[32])
            this.justSwitchedMenu = false;

        if (this.countdownKeys > 0) {
            this.countdownKeys -= timeSinceLastUpdate;
            return this;
        }
        if ((keys[13] || keys[32]) && !this.justSwitchedMenu) {
            this.justSwitchedMenu = true;
            var article;
            switch (this.enemy.gender) {
                case "f": article = "Die "; break;
                case "m": article = "Der "; break;
                case "n": article = "Das "; break;
            }
            switch (this.fightStatus) {
                case FightStatus.MainMenu:
                    if (this.selected == 0) this.OnFlee();
                    if (this.selected == 1) this.OnFight();
                    break;
                case FightStatus.Actions:
                    var dmg = this.stockemon.attackEnemy(this.stockemon.actions[this.selected], this.enemy);
                    this.text = "Du setzt " + this.stockemon.actions[this.selected].name + " ein.\nDer Gegner verliert " + dmg + " Lebenspunkte.";
                    this.fightStatus = FightStatus.InFightAtk;
                    if (this.enemy.hp_current == 0)
                        this.fightStatus = FightStatus.OnWin;
                    this.selected = 0;
                    break;
                case FightStatus.InFightDef:
                    this.fightStatus = FightStatus.MainMenu;
                    this.selected = 1;
                    this.text = "";
                    break;
                case FightStatus.InFightAtk:
                    var enemyAttack = this.enemy.actions[Math.floor(Math.random() * 4)]
                    var dmg = this.enemy.attackEnemy(enemyAttack, this.stockemon);
                    this.text = article + this.enemy.name + " setzt " + enemyAttack.name + " ein.\nDu verlierst " + dmg + " Lebenspunkte.";
                    this.fightStatus = FightStatus.InFightDef;
                    if (this.stockemon.hp_current == 0)
                        this.fightStatus = FightStatus.OnLoose;
                    break;
                case FightStatus.OnWin:
                    this.text = article + this.enemy.name + " ist zerbrochen. \nDu bekommst " + this.enemy.epOnDeath + " EP.";
                    this.fightStatus = FightStatus.OnReturn;
                    this.stockemon.getEP(this.enemy.epOnDeath);
                    break;
                case FightStatus.OnLoose:
                    this.text = "Du wurdest besiegt!\n" + article + this.enemy.name + " zieht lachend davon.";
                    this.fightStatus = FightStatus.OnReturn;
                    this.stockemon.epTillLvlUp *= 10;
                    this.world.stockemon.heal();
                    this.world.playerX = 25;
                    this.world.playerY = 295;
                    break;
                case FightStatus.OnReturn:
                    var enemy = this.tile;
                    if (enemy) {
                        for (var i = 0; i < enemy.weapons.length - 1; ++i)
                            enemy.weapons[i] = enemy.weapons[i + 1];
                        enemy.weapons.length--;

                        if (enemy.weapons.length == 0)
                            this.world.map[world.playerX + world.direction.x][world.playerY + world.direction.y] = new Tile(TileType.MUD);
                    }
                    return this.world;
            };
        }

        if (keys[37] || keys["A".charCodeAt(0)] || keys[38] || keys["W".charCodeAt(0)]) {
            this.selected = (this.selected + 1) % this.numTitles;
            this.countdownKeys = 0.1;
        } else
        if (keys[39] || keys["D".charCodeAt(0)] || keys[40] || keys["S".charCodeAt(0)]) {
            this.selected = (this.selected - 1 + this.numTitles) % this.numTitles;
            this.countdownKeys = 0.1;
        } else
            return this;
        return this;
    }
}