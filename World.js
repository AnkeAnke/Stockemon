function nothing(world, keys) { return world; }//console.log("nothing! :)"); }

function walkable(world) { return world; }
function solid(world){return false;}


function OnGrasWalk(evo, world) {
    var ret = Math.random();
    if (ret >= 0.1)
        return world;

    var enemy;
    var types = ["w", "h", "t"];
    var type = types[Math.floor(Math.random() * 3)];
    var level = Math.max(Math.floor((evo*2 + 1) * (1+Math.random()*0.6)), 1);

    for (var stockKey in StockemonEnum) {
        var stock = StockemonEnum[stockKey];
        if ((stock.type == "0" || stock.type == type) && stock.entwicklung == evo) {

            enemy = new Stockemon(stock.type, evo, level);
        }
    }
    world.interpolation = -1;
    world.playerX += world.direction.x;
    world.playerY += world.direction.y;
    return new Fight(world.stockemon, enemy, world);
}

function OnHealClick(world, keys) {
    world.stockemon.heal();
    return world;
}

function OnPCClick(world, keys) {
    //world.stockemon.getInfo();
    world.stockemon.setInfo();
    //keys[13] = false;
    //keys[32] = false;
    for (var key in keys) {
        keys[key] = false;
    }
    return world;
}

function OnEnemyClick(world, keys) {

    var enemy = world.map[world.playerX + world.direction.x][world.playerY + world.direction.y];
    for (var key in keys) {
        keys[key] = false;
    }
    return new Fight(world.stockemon, enemy.weapons[0], world, enemy);
}
//function Enemy0(world) { OnEnemyClick(0, world); }
//function Enemy1(world) { OnEnemyClick(1, world); }
//function Enemy2(world) { OnEnemyClick(2, world); }
//function Enemy3(world) { OnEnemyClick(3, world); }
//function Enemy4(world) { OnEnemyClick(4, world); }
//function Enemy5(world) { OnEnemyClick(5, world); }

function Gras0(world) {return OnGrasWalk(0, world);}
function Gras1(world) {return OnGrasWalk(1, world);}
function Gras2(world) {return OnGrasWalk(2, world);}
function Gras3(world) {return OnGrasWalk(3, world);}
function Gras4(world) {return OnGrasWalk(4, world);}
function Gras5(world) {return OnGrasWalk(5, world);}

var TileType = {
    GRASS0: { height: 1.0, name: "gras",  value: 0, OnClick: nothing, OnWalk: Gras0,  r: 0, g: 50, b: 0 },
    GRASS1: { height: 1.0, name: "gras",  value: 1, OnClick: nothing, OnWalk: Gras1,  r: 0, g: 90, b: 0 },
    GRASS2: { height: 1.0, name: "gras",  value: 2, OnClick: nothing, OnWalk: Gras2,  r: 0, g: 130, b: 0 },
    GRASS3: { height: 1.0, name: "gras",  value: 3, OnClick: nothing, OnWalk: Gras3,  r: 0, g: 170, b: 0 },
    GRASS4: { height: 1.0, name: "gras",  value: 4, OnClick: nothing, OnWalk: Gras4,  r: 0, g: 210, b: 0 },
    GRASS5: { height: 1.0, name: "gras",  value: 5, OnClick: nothing, OnWalk: Gras5,  r: 0, g: 250, b: 0 },
    MUD:    { height: 1.0, name: "mud",   value: 6,  OnClick: nothing, OnWalk: walkable ,     r: 255, g:255, b:255},
    WATER:  { height: 1.0, name: "water", value: 7,  OnClick: nothing, OnWalk: solid    ,     r: 0, g: 0, b: 255},
    WALL:   { height: 1.5, name: "wall", value: 8,  OnClick: nothing, OnWalk: solid    ,     r: 0, g: 0, b: 0},
    HEAL:   { height: 1.5, name: "heal", value: 9,  OnClick: OnHealClick, OnWalk: solid,     r: 0, g: 255, b:255},
    PC:     { height: 1.5, name: "pc", value: 10, OnClick: OnPCClick, OnWalk: solid,     r: 128, g: 128, b: 128},
    ENEMY0: { height: 1.5, name: "enemy", value: 11, OnClick: OnEnemyClick, OnWalk: solid, r: 50, g: 0, b: 0, weapons: [new Stockemon("0", 0, 3)] },
    ENEMY1: { height: 1.5, name: "enemy", value: 12, OnClick: OnEnemyClick, OnWalk: solid, r: 90, g: 0, b: 0, weapons: [new Stockemon("t", 1, 4), new Stockemon("w", 1, 5), new Stockemon("h", 1, 6)] },
    ENEMY2: { height: 1.5, name: "enemy", value: 13, OnClick: OnEnemyClick, OnWalk: solid, r: 130, g: 0, b: 0, weapons: [new Stockemon("t", 2, 7), new Stockemon("w", 2, 8), new Stockemon("h", 2, 9)] },
    ENEMY3: { height: 1.5, name: "enemy", value: 14, OnClick: OnEnemyClick, OnWalk: solid, r: 170, g: 0, b: 0, weapons: [new Stockemon("t", 3, 10), new Stockemon("w", 3, 11), new Stockemon("h", 3, 12)] },
    ENEMY4: { height: 1.5, name: "enemy", value: 15, OnClick: OnEnemyClick, OnWalk: solid, r: 210, g: 0, b: 0, weapons: [new Stockemon("t", 4, 13), new Stockemon("w", 4, 14), new Stockemon("h", 4, 15)] },
    ENEMY5: { height: 1.5, name: "enemy", value: 16, OnClick: OnEnemyClick, OnWalk: solid, r: 250, g: 0, b: 0, weapons: [new Stockemon("0", 5, 17)] }
};

var Dir = {
    LEFT:   { dir: "LEFT", x: -1, y: 0 },
    UP:     { dir: "UP", x: 0, y: -1 },
    RIGHT:  { dir: "RIGHT", x: 1, y: 0 },
    DOWN:   { dir: "DOWN", x: 0, y: 1}
};
function Tile(type){
    this.type = type;
}

const TileSize = 50;
// Steps per second.
const speed = 4;

function World(stockemon, document) {
    this.worldImage = globalImageHandler.GetImage("Map");

    this.MapSizeX = 50;//worldImage.width;;
    this.MapSizeY = 300;//worldImage.height;
    //console.log(this.worldImage.width);

    this.playerX = 25;
    this.playerY = 295;
    this.direction = Dir.UP;
    this.interpolation = -1;

    this.stockemon = stockemon;

    // Load map from bmp
    // Create a canvas
    var canvas = document.createElement("canvas");
    canvas.width = this.MapSizeX;
    canvas.height = this.MapSizeY;
    //alert("" + canvas.width + ", " + canvas.height);
    canvas.getContext('2d').drawImage(this.worldImage, 0, 0, this.MapSizeX, this.MapSizeY);


    this.map = [];
    for (var x = 0; x < this.MapSizeX; ++x) {
        this.map[x] = [];
        for (var y = 0; y < this.MapSizeY; ++y) {
            this.map[x][y] = new Tile(TileType.MUD);
            var pix = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
            for (var typeKey in TileType) {
                var type = TileType[typeKey];
                if (pix[0] == type.r&& pix[1]==type.g && pix[2] == type.b){
                    this.map[x][y] = new Tile(type);
                    if (type.name == "enemy") {
                        this.map[x][y].weapons = type.weapons;
                    }
                    break;
                }
            }
        }
    }

    this.Draw = function (canvas) {
        var upperLeftPos = new Object();
        var playerCoord = new Object();
        playerCoord.x = (this.playerX + this.direction.x * Math.max(this.interpolation, 0)) * TileSize;
        playerCoord.y = (this.playerY + this.direction.y * Math.max(this.interpolation, 0)) * TileSize;

        upperLeftPos.x = playerCoord.x - 0.5 * (DefaultWidth - TileSize);
        upperLeftPos.y = playerCoord.y - 0.5 * (DefaultHeight - TileSize);

        var tileCoord = GetCoords(TileSize, TileSize);
        var diffX = Math.ceil(window.innerWidth / tileCoord.x + 1);
        var diffY = Math.ceil(window.innerHeight / tileCoord.y + 1);

        for (var x = Math.max(this.playerX - diffX, 0); x < Math.min(this.playerX + diffX, this.MapSizeX); ++x) {
            for (var y = Math.max(this.playerY - diffY, 0) ; y < Math.min(this.playerY + diffY, this.MapSizeY) ; ++y) {
                if (this.map[x][y].type.height > 1)
                    continue;
                var img = globalImageHandler.GetImage(this.map[x][y].type.name);
                DrawScaledPos(canvas, img, new Box(x * TileSize - upperLeftPos.x, y * TileSize - upperLeftPos.y, TileSize, TileSize));
            }
        }
        // Compute the players position - interpolate linearly.
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.stockemon.name), new Box(playerCoord.x - upperLeftPos.x, playerCoord.y - upperLeftPos.y, TileSize, TileSize));
        
        // Drawing heigher objects
        for (var x = Math.max(this.playerX - diffX, 0) ; x < Math.min(this.playerX + diffX, this.MapSizeX) ; ++x) {
            for (var y = Math.max(this.playerY - diffY, 0) ; y < Math.min(this.playerY + diffY, this.MapSizeY) ; ++y) {
                if (this.map[x][y].type.height <= 1)
                    continue;
                var img = globalImageHandler.GetImage(this.map[x][y].type.name);
                DrawScaledPos(canvas, img, new Box(x * TileSize - upperLeftPos.x, y * TileSize - upperLeftPos.y - (this.map[x][y].type.height - 1) * TileSize, TileSize, TileSize * this.map[x][y].type.height));
                if (this.map[x][y].type.name == "enemy") {
                    DrawScaledPos(canvas, globalImageHandler.GetImage(this.map[x][y].weapons[0].name), new Box(x * TileSize - upperLeftPos.x - TileSize * 0.5, y * TileSize - upperLeftPos.y - (this.map[x][y].type.height - 1) * TileSize, TileSize, TileSize));
                }
            }
        }
        // Arrow
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.direction.dir), new Box(playerCoord.x - 0.5 * TileSize - upperLeftPos.x, playerCoord.y - 0.5 * TileSize - upperLeftPos.y, TileSize * 2, TileSize * 2));


        // Draw UI
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIworldBG"), new Box(1500, 0, 400, 600));
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIbar"), new Box(1515, 420, 360*this.stockemon.hp_current/this.stockemon.hp_max, 60));
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.stockemon.name), new Box(1530, 60, 340, 340));
        DrawScaledPos(canvas, globalImageHandler.GetImage("UIworld"), new Box(1500, 0, 400, 600));
        DrawScaledText(canvas, this.stockemon.name, 1870, 20, 40, "right");

        canvas.fillStyle = "#ff9001";
        DrawScaledText(canvas, "" + this.stockemon.hp_current + "/" + this.stockemon.hp_max, 1875, 455, 20, "right");
        DrawScaledText(canvas, "ATK\nDEF\nLUC\n", 1820, 500, 24, "left");
        DrawScaledText(canvas, this.stockemon.atk + "\n" + this.stockemon.def + "\n" + this.stockemon.luc, 1800, 500, 24, "right");
        DrawScaledText(canvas, this.stockemon.epTillLvlUp + " EP zum nächsten Level", 1540, 560, 16, "left");
        canvas.fillStyle = "#ffffff";
        DrawScaledText(canvas, "Level " + this.stockemon.lvl, 1540, 480, 60, "left");
    }

    this.Update = function (keys, timeSinceLastUpdate) {
        if (this.interpolation >= 0) {
            this.interpolation += timeSinceLastUpdate * speed;
        }

        if (this.interpolation >= 1) {
            this.interpolation = -1;
            this.playerX += this.direction.x;
            this.playerY += this.direction.y;
        }

        if (this.interpolation >= 0) {
            return this;
        }
        
        //left = 37
        //up = 38
        //right = 39
        //down = 40
        if (keys[13] || keys[32]) {
            if (this.playerX + this.direction.x >= 0 && this.playerX + this.direction.x < this.MapSizeX &&
            this.playerY + this.direction.y >= 0 && this.playerY + this.direction.y < this.MapSizeY) {
                return this.map[this.playerX + this.direction.x][this.playerY + this.direction.y].type.OnClick(this, keys);
            }
        }
        if (keys[37] || keys["A".charCodeAt(0)]) {
            this.direction = Dir.LEFT;
        } else
            if (keys[38] || keys["W".charCodeAt(0)]) {
                this.direction = Dir.UP;
            } else
                if (keys[39] || keys["D".charCodeAt(0)]) {
                    this.direction = Dir.RIGHT;
                } else
                    if (keys[40] || keys["S".charCodeAt(0)]) {
                        this.direction = Dir.DOWN;
                    } else
                        return this;
        // Is the next tile existing and walkable?
        var ret = this.map[this.playerX + this.direction.x][this.playerY + this.direction.y].type.OnWalk(this);
        if (this.playerX + this.direction.x >= 0 && this.playerX + this.direction.x < this.MapSizeX &&
            this.playerY + this.direction.y >= 0 && this.playerY + this.direction.y < this.MapSizeY &&
            ret) {
            this.interpolation = 0;
            return ret;
        } 
        return this;
    }
}