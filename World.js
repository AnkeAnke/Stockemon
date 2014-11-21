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
    MUD:    { value: 6,  OnClick: nothing, OnWalk: solid },
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

function Tile(type){
    this.type = type;
}

const TileSize = 50;

function World(worldImage, stockemon) {
    this.worldImage = worldImage;

    this.MapSizeX = 100;
    this.MapSizeY = 100;

    this.playerX = 19;
    this.playerY = 10;

    this.stockemon = stockemon;

    this.map = [];
    for (var x = 0; x < this.MapSizeX; ++x) {
        this.map[x] = [];
        for (var y = 0; y < this.MapSizeY; ++y) {
            this.map[x][y] = new Tile(TileType.MUD);
        }
    }

    this.Draw = function(canvas) {
        for (var x = 0; x < this.MapSizeX; ++x) {
            for (var y = 0; y < this.MapSizeY; ++y) {
                var img = globalImageHandler.GetImage("Tile" + 6);//+ this.map[x][y].type.toString());
                DrawScaledPos(canvas, img, new Box(x * TileSize, y * TileSize, TileSize, TileSize));
            }
        }
    }
}