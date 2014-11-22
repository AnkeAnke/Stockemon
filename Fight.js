var FightStatus = {
    MainMenu: {numTitles: 2},
    Actions: { numTitles: 4 },
    InFight: {numTitles: 1}
};

function Fight(stockemon, enemy) {
    this.stockemon = stockemon;
    this.enemy = enemy;
    
    this.selected = 1;
    this.countdownKeys = 0;

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
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.enemy.name), pic);

        // Draw the own stock's status
        partHP = this.stockemon.hp_current / this.stockemon.hp_max;
        var ep = this.stockemon.epTillLvlUp;

        bar.x = 1350;
        bar.y = 675;
        bar.w = 500 * partHP;
        bar.h = 30;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIbar"), bar);

        var ui = {};
        ui.x = 1300;
        ui.y = 600;
        ui.w = 600;
        ui.h = 200;
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIright"), ui);
        DrawScaledText(canvas, "" + this.stockemon.hp_current + "/" + this.stockemon.hp_max, 1850, 705, 15, "right");
        DrawScaledText(canvas, this.enemy.name, 1350, 610, 40, "left");
        DrawScaledText(canvas, "Lv: " + this.stockemon.lvl, 1850, 650, 20, "right");

        pic.x = 600;
        pic.y = 400;
        pic.w = 600;
        pic.h = 600;
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.stockemon.name), pic);

        // Draw left menu
        var titles = [];
        
        this.numTitles = this.fightStatus.numTitles;

        switch (this.fightStatus) {
            case FightStatus.Actions:
                for (var i = 0; i < 4; ++i)
                    titles[i] = this.stockemon.actions[i].name;
                break;
            case FightStatus.InFight:
                titles[0] = "Skip";
                break;
            case FightStatus.MainMenu:
                titles[0] = "Flee";
                titles[1] = "Fight";
                break;
        };

        for (var i = 0; i < this.numTitles; ++i) {
            var pos = new Object();
            pos.x = 0;
            pos.y = 1000 - ((i + 1) * 200);
            pos.w = 500;
            pos.h = 200;
            var img = this.selected == i ? globalImageHandler.GetImage("UIon") : globalImageHandler.GetImage("UIoff");
            if (this.selected == i) canvas.fillStyle = "#555555";
            DrawScaledPos(canvas, img, pos);
            DrawScaledText(canvas, titles[i], 50, pos.y + 50, 70, "left");
            canvas.fillStyle = "#ff9001";
        }
        canvas.fillStyle = "#ffffff";
    }

    this.Update = function (keys, timeSinceLastUpdate) {
        if (this.justSwitchedMenu && !keys[13] && !keys[32])
            this.justSwitchedMenu = false;

        if (this.countdownKeys > 0) {
            this.countdownKeys -= timeSinceLastUpdate;
            return;
        }
        if ((keys[13] || keys[32]) && !this.justSwitchedMenu) {
            this.justSwitchedMenu = true;
            switch (this.fightStatus) {
                case FightStatus.MainMenu:
                    if (this.selected == 0) this.OnFlee();
                    if (this.selected == 1) this.OnFight();
                    break;
                case FightStatus.Actions:
                    //TODO: use action
                    this.fightStatus = FightStatus.InFight;
                    this.selected = 0;
                    break;
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
            return;
    }
}