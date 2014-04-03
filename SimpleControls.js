// SimpleControls.js handles movement only. For other functions see Keys.js
// Adapted from THREE.FirstPersonControls

// TODO crosshairs, translucent

SimpleControls = function (object, domElement) {
  this.object = object;
  // FIXME dumb copy/paste from THREE
  this.domElement = (domElement !== undefined) ? domElement : document;

  // for affecting Player state
  this.movementSpeed = 1.0;
  this.turnSpeed = 0.005;

  // binary states of the controls
  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.turnLeft = false;
  this.turnRight = false;

  // config: does left/right rotate, or strafe?
  this.canStrafe = false;
  // config: is forward/back disabled?
  this.steeringOnly = false;

  // FIXME dumb copy/paste from THREE
  if (this.domElement !== document)
  {
    this.domElement.setAttribute('tabindex', -1)
  }

  function keyDown(event)
  {
    switch (event.keyCode)
    {
      case 38: // up
      case 87: // w
        this.moveForward = true;
        break;

      case 37: // left
      case 65: // a
        if (this.canStrafe)
        {
          this.moveLeft = true;
        }
        else
        {
          this.turnLeft = true;
        }
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        if (this.canStrafe)
        {
          this.moveRight = true;
        }
        else
        {
          this.turnRight = true;
        }
        break;
    }
  };

  function keyUp(event)
  {
    switch(event.keyCode)
    {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        break;

      case 37: // left
      case 65: // a
        this.moveLeft = false;
        this.turnLeft = false;
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        this.moveRight = false;
        this.turnRight = false;
        break;
    }
  };

  this.update = function(delta)
  {
    // move the player
    var actualMoveSpeed = delta * this.movementSpeed;

    if (this.moveForward) this.object.translateZ(- actualMoveSpeed);
    if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

    if (this.moveLeft) this.object.translateX(- actualMoveSpeed);
    if (this.moveRight) this.object.translateX(actualMoveSpeed);

    // rotate player
    if (!this.canStrafe)
    {
      var actualTurnSpeed = delta * this.turnSpeed;
      if (this.turnRight)
      {
        this.object.rotation.y -= actualTurnSpeed;
      }
      else if (this.turnLeft)
      {
        this.object.rotation.y += actualTurnSpeed;
      }
    }
  };

  document.addEventListener('keydown', keyDown.bind(this), false);
  document.addEventListener('keyup', keyUp.bind(this), false);
};
