/*
 * Application.js - Entry point for game
 *
 * Initialize game states stack, and
 * give control to the main menu
 */

//devkit imports
import device;
import ui.StackView as StackView;
//ads
import plugins.appflood.appFlood as appFlood;
//game imports
import src.Sound as Sound;
import src.MenuScreen as MenuScreen;
import src.GameScreen as GameScreen;
import src.CreditScreen as CreditScreen;

//initialize application as GC.Application and export
exports = Class(GC.Application, function() {

  this.initUI = function() {
    var menuScreen = new MenuScreen(),
        gameScreen = new GameScreen(),
        creditScreen = new CreditScreen();

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

    this._adCount = 0;

    /************************
     * Setup event listeners
     ************************/

    /* when the start event is triggered (from the start button),
     * push the gameScreen view onto the view stack, and let the
     * gameScreen know it has been started
     */
    menuScreen.on('menuScreen:start',function() {
      if(!this._adCount) {
        this._adCount = 5;
        appFlood.showInterstitial(function() {
          Sound.getSound().play('levelmusic');
          rootView.push(gameScreen);
          gameScreen.emit('app:start');
        });
      }
      else {
        this._adCount--;
        Sound.getSound().play('levelmusic');
        rootView.push(gameScreen);
        gameScreen.emit('app:start');
      }
    });

    menuScreen.on('menuScreen:credits',function() {
      rootView.push(creditScreen);
    });

    //when the game has ended, switch back to the menu screen
    gameScreen.on('gameScreen:end', function() {
      Sound.getSound().stop('levelmusic');
      rootView.pop();
    });

    //when back signal sent, switch back to the menu screen
    creditScreen.on('creditScreen:end',function() {
      rootView.pop();
    });
  }

  this.launchUI = function () {};
});
