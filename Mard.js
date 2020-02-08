var LivingCreature = require("./LivingCreature");

module.exports = class Mard extends LivingCreature {
        constructor(x, y, index){
            super(x, y, index);
            this.energy = 10;
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

       mult() {
        var choosecells = this.chooseCell(0);
        var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
        if (empty && this.energy > 30) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var md = new Mard(newX, newY)
            mardArr.push(md)
        }

    }


    move() {
        var choosecells = this.chooseCell(0);
        var empty = choosecells[Math.floor(Math.random() * choosecells.length)];
        this.energy--
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }

    }

    eat1() {
        var choosecells = this.chooseCell(1);
        var food1 =choosecells[Math.floor(Math.random() * choosecells.length)];
        if (food1) {
            var newX = food1[0]
            var newY = food1[1]
            matrix[newY][newX] = 4
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
    eat2() {
        var choosecells = this.chooseCell(3);
        var food2 =choosecells[Math.floor(Math.random() * choosecells.length)];
        if (food2) {
            var newX = food2[0]
            var newY = food2[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)//jnjum//
                }
            }
            this.x = newX
            this.y = newY
            this.energy += 2
        }

    }
    if(food2) {
        var newX = food2[0]
        var newY = food2[1]
        matrix[newY][newX] = 4
        matrix[this.y][this.x] = 0

        for (var i in gishatichArr) {
            if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                gishatichArr.splice(i, 1)//jnjum//
            }
        }
        this.x = newX
        this.y = newY
        this.energy += 2
    }


    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in mardArr) {
                if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                    mardArr.splice(i, 1)//jnjum//
                }
            }
        }
    }

}