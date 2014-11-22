function nothing() { }

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
}

var TileType = {
    GRASS0: { value: 0,  OnClick: nothing, OnWalk: OnGrasWalk(0) },
    GRASS1: { value: 1,  OnClick: nothing, OnWalk: OnGrasWalk(1) },
    GRASS2: { value: 2,  OnClick: nothing, OnWalk: OnGrasWalk(2) },
    GRASS3: { value: 3,  OnClick: nothing, OnWalk: OnGrasWalk(3) },
    GRASS4: { value: 4,  OnClick: nothing, OnWalk: OnGrasWalk(4) },
    GRASS5: { value: 5,  OnClick: nothing, OnWalk: OnGrasWalk(5) },
    MUD:    { value: 6,  OnClick: nothing, OnWalk: walkable },
    WATER:  { value: 7,  OnClick: nothing, OnWalk: solid },
    WALL:   { value: 8,  OnClick: nothing, OnWalk: solid },
    HEAL:   { value: 9,  OnClick: OnHealClick, OnWalk: solid },
    PC:     { value: 10, OnClick: OnHealClick, OnWalk: solid },
    ENEMY0: { value: 11, OnClick: OnEnemyClick(0), OnWalk: solid },
    ENEMY1: { value: 12, OnClick: OnEnemyClick(1), OnWalk: solid },
    ENEMY2: { value: 13, OnClick: OnEnemyClick(2), OnWalk: solid },
    ENEMY3: { value: 14, OnClick: OnEnemyClick(3), OnWalk: solid },
    ENEMY4: { value: 15, OnClick: OnEnemyClick(4), OnWalk: solid },
    ENEMY5: { value: 16, OnClick: OnEnemyClick(5), OnWalk: solid }
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

function World(worldImage, stockemon) {
    this.worldImage = worldImage;

    this.MapSizeX = 100;
    this.MapSizeY = 100;

    this.playerX = 5;
    this.playerY = 5;
    this.direction = Dir.UP;
    this.interpolation = -1;

    this.stockemon = stockemon;

    this.map = [];
    for (var x = 0; x < this.MapSizeX; ++x) {
        this.map[x] = [];
        for (var y = 0; y < this.MapSizeY; ++y) {
            this.map[x][y] = new Tile(TileType.MUD);
        }
    }

    this.Draw = function (canvas) {
        var upperLeftPos = new Object();
        var playerCoord = new Object();
        playerCoord.x = (this.playerX + this.direction.x * Math.max(this.interpolation, 0)) * TileSize;
        playerCoord.y = (this.playerY + this.direction.y * Math.max(this.interpolation, 0)) * TileSize;

        upperLeftPos.x = playerCoord.x - 0.5 * (DefaultWidth - TileSize);
        upperLeftPos.y = playerCoord.y - 0.5 * (DefaultHeight - TileSize);

        for (var x = 0; x < this.MapSizeX; ++x) {
            for (var y = 0; y < this.MapSizeY; ++y) {
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
        }
            


    }
}