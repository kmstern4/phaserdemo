
export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {

    window.addEventListener('resize', resize);
    resize();
    
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;

    // background image
    this.add.image(x, y, 'forest');
    const zombie = this.add.sprite(400, 255, 'zombie', 'idle001.png');

    const swordboy = this.add.sprite(225, 250, 'swordboy', 'idle001.png');
    swordboy.setInteractive();

    this.anims.create({
      key: 'boy_idle',
      frames: this.anims.generateFrameNames('swordboy', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    this.anims.create({
      key: 'boy_attack',
      frames: this.anims.generateFrameNames('swordboy', {
        prefix: 'attack00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: 0
    });

    swordboy.on('animationcomplete', () => {
      if (swordboy.anims.currentAnim.key === 'boy_attack') {
        swordboy.play('boy_idle');
      }
    });

    this.anims.create({
      key: 'zombie_idle',
      frames: this.anims.generateFrameNames('zombie', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'zombie_hurt',
      frames: this.anims.generateFrameNames('zombie', {
        prefix: 'hurt00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    swordboy.play('boy_idle');
    zombie.play('zombie_idle');

    swordboy.on('pointerup', () => {
      swordboy.play('boy_attack');
      setTimeout(() => {
        zombie.play('zombie_hurt');
      }, 200);
    });

    zombie.on('animationcomplete', () => {
      if (zombie.anims.currentAnim.key === 'zombie_hurt') {
        zombie.play('zombie_idle');
      }
    });

  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
  }
}

function resize() {
  let canvas = document.querySelector('canvas'), width = window.innerWidth, height = window.innerHeight;
  let wratio = width / height, ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
    canvas.style.width = width + 'px';
    canvas.style.height = (width / ratio) + 'px';
  } else {
    canvas.style.width = (height * ratio) + 'px';
    canvas.style.height = height + 'px';
  }
}