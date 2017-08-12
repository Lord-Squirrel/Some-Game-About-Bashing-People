const PLAYER_SPEED = 6.5
const PLAYER_SCALE = 1

function Basher() {
  this.x = 300
  this.y = 300
  this.nextX = 0
  this.nextY = 0
  this.velX = 0
  this.velY = 0

  this.img

  this.goingUp = false
  this.goingRight = false
  this.goingDown = false
  this.goingLeft = false

  this.goingUpKey
  this.goingRightKey
  this.goingDownKey
  this.goingLeftKey

  this.init = function (img) {
    this.img = img
  }

  this.setupInput = function (upKey, downKey, rightKey, leftKey) {
    this.goingUpKey = upKey
    this.goingRightKey = rightKey
    this.goingDownKey = downKey
    this.goingLeftKey = leftKey
  }

  this.getBundingBox = function (face) {
    // 0 Top 1 Bottom 2 Left 3 Right
    //  + (this.img.height * PLAYER_SCALE)  + (this.img.width * PLAYER_SCALE)

    if (face == 0) {
      return [this.nextX+ (this.img.width * PLAYER_SCALE) / 2,this.nextY]

    } else if (face == 1) {
      return [this.nextX + (this.img.width * PLAYER_SCALE) / 2,this.nextY + (this.img.height * PLAYER_SCALE)]

    } else if (face == 2) {
      return [this.nextX,this.nextY + (this.img.height * PLAYER_SCALE)/2]

    } else if (face == 3) {
      return [this.nextX + (this.img.width * PLAYER_SCALE),this.nextY + (this.img.height * PLAYER_SCALE)/2]
    }
  }

  this.move = function () {

    this.nextX = this.x
    this.nextY = this.y

    if (this.goingUp) {
      this.nextY -= PLAYER_SPEED
    }
    if (this.goingRight) {
      this.nextX += PLAYER_SPEED
    }
    if (this.goingDown) {
      this.nextY += PLAYER_SPEED
    }
    if (this.goingLeft) {
      this.nextX -= PLAYER_SPEED
    }

    this.handleCollision()

    }

    this.handleCollision = function () {
      var walkingIntoTileIndex = mapHandler.getTileAtPixelCoord(this.nextX,this.nextY)
      var walkingIntoTileType = MAP_WALL
      if (walkingIntoTileIndex != undefined) {
        walkingIntoTileType = mapGrid[walkingIntoTileIndex]
      }

      switch (walkingIntoTileType) {
        case MAP_FLOOR:
          this.x = this.nextX
          this.y = this.nextY
          break;

      }
      //Faces = 3
      /*
      var hitPoints = []
      for (var i = 0; i < 3; i++) {
        var face = this.getBundingBox(i)
        //console.log(face);

        var walkingIntoTileIndex = mapHandler.getTileAtPixelCoord(face[0],face[1])
        var walkingIntoTileType = MAP_WALL
        if (walkingIntoTileIndex != undefined) {
          walkingIntoTileType = mapGrid[walkingIntoTileIndex]
        }
        if (mapHandler.isTileSoild(walkingIntoTileType)) {
          hitPoints.push(i)
        }
    }
    this.checkIfCollidedWithTile(hitPoints)
    */
  }
  /*
  this.checkIfCollidedWithTile = function (hitPoints) {
    if (!hitPoints.length == 0) {
      for (var i = 0; i < hitPoints.length; i++) {
        switch (hitPoints[i]) {
          case 0:
            this.x = this.nextX
            break;
          case 1:
            this.x = this.nextX
            break;
          case 2:
            this.y = this.nextY
            break;
          case 3:
            this.y = this.nextY
        }
      }
    } else {
      this.x = this.nextX
      this.y = this.nextY
    }
  }*/

  this.draw = function () {
    //ctx.drawImage(this.img, this.x,this.y, this.img.width*PLAYER_SCALE,this.img.height*PLAYER_SCALE)
    drawBitMapCenteredWithScale(this.img, this.x, this.y, PLAYER_SCALE)
  }
}
