function nothing() { }//console.log("nothing! :)"); }

function walkable() { return true; }
function solid(){return false;}
function error(){throw message || "World error";}

function OnGrasWalk(level){
    //TODO: randomly spawn Stockemon
    return true;
}

function OnHealClick() {
    //TODO: heal
}

function OnPCClick() {
    //TODO: load and save
}

function OnEnemyClick(level) {
    //TODO: FIGHT!
    //alert("Enemy!");
}

var TileType = {
    GRASS0: { value: 0, OnClick: nothing, OnWalk: OnGrasWalk(0),  r: 0, g: 50, b: 0 },
    GRASS1: { value: 1, OnClick: nothing, OnWalk: OnGrasWalk(1),  r: 0, g: 90, b: 0 },
    GRASS2: { value: 2, OnClick: nothing, OnWalk: OnGrasWalk(2),  r: 0, g: 130, b: 0 },
    GRASS3: { value: 3, OnClick: nothing, OnWalk: OnGrasWalk(3),  r: 0, g: 170, b: 0 },
    GRASS4: { value: 4, OnClick: nothing, OnWalk: OnGrasWalk(4),  r: 0, g: 210, b: 0 },
    GRASS5: { value: 5, OnClick: nothing, OnWalk: OnGrasWalk(5),  r: 0, g: 250, b: 0 },
    MUD:    { value: 6,  OnClick: nothing, OnWalk: walkable ,     r: 255, g:255, b:255},
    WATER:  { value: 7,  OnClick: nothing, OnWalk: solid    ,     r: 0, g: 0, b: 255},
    WALL:   { value: 8,  OnClick: nothing, OnWalk: solid    ,     r: 0, g: 0, b: 0},
    HEAL:   { value: 9,  OnClick: OnHealClick, OnWalk: solid,     r: 0, g: 255, b:255},
    PC:     { value: 10, OnClick: OnHealClick, OnWalk: solid,     r: 188, g: 128, b: 128},
    ENEMY0: { value: 11, OnClick: OnEnemyClick(0), OnWalk: solid, r: 50, g: 0, b: 0 },
    ENEMY1: { value: 12, OnClick: OnEnemyClick(1), OnWalk: solid, r: 90, g: 0, b: 0 },
    ENEMY2: { value: 13, OnClick: OnEnemyClick(2), OnWalk: solid, r: 130, g: 0, b: 0 },
    ENEMY3: { value: 14, OnClick: OnEnemyClick(3), OnWalk: solid, r: 170, g: 0, b: 0 },
    ENEMY4: { value: 15, OnClick: OnEnemyClick(4), OnWalk: solid, r: 210, g: 0, b: 0 },
    ENEMY5: { value: 16, OnClick: OnEnemyClick(5), OnWalk: solid, r: 250, g: 0, b: 0 }
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
const speed = 3;

function World(worldImage, stockemon, document) {
    this.worldImage = worldImage;

    this.MapSizeX = 50;//worldImage.width;;
    this.MapSizeY = 300;//worldImage.height;
    console.log("" + worldImage.width);

    this.playerX = 5;
    this.playerY = 5;
    this.direction = Dir.UP;
    this.interpolation = -1;

    this.stockemon = stockemon;

    // Load map from bmp
    // Create a canvas
    var canvas = document.createElement("canvas");
    canvas.width = this.MapSizeX;
    canvas.height = this.MapSizeY;
    //alert("" + canvas.width + ", " + canvas.height);
    canvas.getContext('2d').drawImage(worldImage, 0, 0, this.MapSizeX, this.MapSizeY);


    this.map = [];
    for (var x = 0; x < this.MapSizeX; ++x) {
        this.map[x] = [];
        for (var y = 0; y < this.MapSizeY; ++y) {
            var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
            this.map[x][y] = new Tile(TileType.MUD);
            if (pixelData[0] > 10) {
                this.map[x][y] = new Tile(TileType.ENEMY0);
                //alert("ENEMY0");
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
            for (var y = Math.max(this.playerY - diffY, 0); y < Math.min(this.playerY + diffY, this.MapSizeY); ++y) {
                var img = globalImageHandler.GetImage("Tile" + this.map[x][y].type.value);
                DrawScaledPos(canvas, img, new Box(x * TileSize - upperLeftPos.x, y * TileSize - upperLeftPos.y, TileSize, TileSize));
            }
        }
        // Compute the players position - interpolate linearly.
        DrawScaledPos(canvas, globalImageHandler.GetImage("Stock"), new Box(playerCoord.x - upperLeftPos.x, playerCoord.y - upperLeftPos.y, TileSize, TileSize));
        DrawScaledPos(canvas, globalImageHandler.GetImage(this.direction.dir), new Box(playerCoord.x - 0.5 * TileSize - upperLeftPos.x, playerCoord.y - 0.5 * TileSize - upperLeftPos.y, TileSize * 2, TileSize * 2));

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
            return;
        }
        
        //left = 37
        //up = 38
        //right = 39
        //down = 40
        if (keys[13] || keys[32]) {
            if (this.playerX + this.direction.x >= 0 && this.playerX + this.direction.x < this.MapSizeX &&
            this.playerY + this.direction.y >= 0 && this.playerY + this.direction.y < this.MapSizeY){
                this.map[this.playerX + this.direction.x][this.playerY + this.direction.y].type.OnClick();   
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
                        return;
        // Is the next tile existing and walkable?
        if (this.playerX + this.direction.x >= 0 && this.playerX + this.direction.x < this.MapSizeX &&
            this.playerY + this.direction.y >= 0 && this.playerY + this.direction.y < this.MapSizeY &&
            this.map[this.playerX + this.direction.x][this.playerY + this.direction.y].type.OnWalk()) {
            this.interpolation = 0;
            console.log("" + (this.playerX + this.direction.x) + ", " + (this.playerY + this.direction.y));
        }
            


    }
}