import device;
import ui.View;
import ui.TextView;

exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      x: 0,
      y: 0,
      backgroundColor: '#FFDA73'
    });

    supr(this,'init',[opts])

    var startButton = new ui.TextView({
      superview: this,
      x: device.width / 2 - 100,
      y: device.height / 2,
      width: 200,
      height: 100,
      text: 'Start',
      backgroundColor: '#A68425'
    });

    startButton.on('InputSelect',bind(this,function() {
      this.emit('menuScreen:start');
    }));
  }
});
