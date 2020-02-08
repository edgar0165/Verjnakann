var LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
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

   //////////
   mult() {
    var choosecells = this.chooseCell(0);
    var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
    if (empty && this.energy > 10) {
        var newX = empty[0]
        var newY = empty[1]
        matrix[newY][newX] = 2
        var xt = new GrassEater(newX, newY)
        xotakerArr.push(xt)
    }
}

move() {
    var choosecells = this.chooseCell(0);
    var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
    this.energy--;
    if (empty) {
        var newX = empty[0]
        var newY = empty[1]
        matrix[newY][newX] = 2
        matrix[this.y][this.x] = 0

        this.x = newX
        this.y = newY
    }

}

eat() {
    var choosecells = this.chooseCell(1);
    var food =choosecells[Math.floor(Math.random() * choosecells.length)];
    if (food) {
        var newX = food[0]
        var newY = food[1]
        matrix[newY][newX] = 2
        matrix[this.y][this.x] = 0

        for (var i in grassArr) {
            if (grassArr[i].x == newX && grassArr[i].y == newY) {
                grassArr.splice(i, 1)
            }
        }

        this.x = newX
        this.y = newY
        this.energy += 2
    }
}

die() {
    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0
        for (var i in xotakerArr) {
            if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                xotakerArr.splice(i, 1)
            }
        }
    }
}
}

