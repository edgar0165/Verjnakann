var LivingCreature = require("./LivingCreature");

module.exports = class GrasseaterEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
    getnewDirections() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getnewDirections();
       return super.chooseCell(character);
   }
   // eat, mul, move, die

   ////

mult() {
    var choosecells = this.chooseCell(0);
    var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
    if (empty && this.energy > 20) {
        var newX = empty[0]
        var newY = empty[1]
        matrix[newY][newX] = 3
        var gish = new GrasseaterEater(newX, newY)
        gishatichArr.push(gish)
    }

}

move() {
    var choosecells = this.chooseCell(0);
    var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
    this.energy--
    if (empty) {
        var newX = empty[0]
        var newY = empty[1]
        matrix[newY][newX] = 3
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY

    }
}

eat() {
    var choosecells = this.chooseCell(2);
    var food =choosecells[Math.floor(Math.random() * choosecells.length)];
    if (food) {
        var newX = food[0]
        var newY = food[1]
        matrix[newY][newX] = 3
        matrix[this.y][this.x] = 0

        for (var i in xotakerArr) {
            if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                xotakerArr.splice(i, 1)//jnjum//
            }
        }

        this.x = newX
        this.y = newY
        this.energy += 1
    }
}

die() {
    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0
        for (var i in gishatichArr) {
            if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                gishatichArr.splice(i, 1)//jnjum//
            }
        }
    }
}

}
