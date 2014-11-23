function Intro(world) {
    this.world = world;

    this.Draw = function (canvas) {
        DrawScaledPos(canvas, globalImageHandler.GetImage("Intro"), new Box(0,0,1900, 1000));
    }

    this.Update = function (keys, timeSinceLastUpdate) {
        if (keys[13] || keys[32]) {
            return this.world;
        }
        return this;
    }
}

function Win() {

    this.Draw = function (canvas) {
        DrawScaledPos(canvas, globalImageHandler.GetImage("Win"), new Box(0, 0, 1900, 1000));
    }

    this.Update = function (keys, timeSinceLastUpdate) {
        return this;
    }
}