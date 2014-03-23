/*
 * Application.js - Entry point for game
 *
 * Initialize game states stack, and
 * give control to the main menu
 */

//devkit imports
import device;
import ui.StackView as StackView;
//game imports
import src.MenuScreen as MenuScreen;
import src.GameScreen as GameScreen;

//initialize application as GC.Application and export
exports = Class(GC.Application, function() {

  this.initUI = function() {
    var menuScreen = new MenuScreen();
        gameScreen = new GameScreen();

    this.view.backgroundColor = '#FFDA73'

    //Create the root StackView
    var rootView = new StackView({
      superview: this,
      x: 0,
      y: 0,
      width: device.width,
      height: device.height,
      clip: true,
      backgroundColor: '#A68425'
    });

    //Add the menu screen to the stack view
    rootView.push(menuScreen);

    /************************
     * Setup event listeners
     ************************/

    /* when the start event is triggered (from the start button),
     * push the gameScreen view onto the view stack, and let the
     * gameScreen know it has been started
     */
    menuScreen.on('menuScreen:start',function() {
      rootView.push(gameScreen);
      gameScreen.emit('app:start');
    });

    //when the game has ended, switch back to the menu screen
    function gameOver () {
      rootView.pop();
      gameScreen = new GameScreen();
      gameScreen.on('gameScreen:end',gameOver);
    }
    gameScreen.on('gameScreen:end', gameOver);
  }

  this.launchUI = function () {};
});
