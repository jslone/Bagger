import device;
import ui.View;
import ui.TextView;

var credits = [
                "Art & Programming",
                "Jacob Slone",
                "Pulbic Domain Sounds From",
                "www.rutgermuller.nl",
                "www.freesound.org/people/B_Lamerichs/"
              ]


exports = Class(ui.View,function(supr) {
  this.init = function(opts) {
    opts = merge(opts, {
      x: 0,
      y: 0,
      backgroundColor: '#FFDA73',
    });

    supr(this,'init',[opts]);

    var offset = 30;
    for(var i = 0; i < credits.length; i++) {
      var junk = new ui.TextView({
        superview:this,
        text:credits[i],
        horizontalAlign:'center',
        size:30,
        y:offset,
        x:0,
        width:device.width,
        height:100,
      });
      offset += junk.style.height;
    }

    var backButton = new ui.TextView({
      superview: this,
      x: device.width / 2 - 100,
      y: device.height - 100,
      width: 200,
      height: 100,
      text: 'Back',
      backgroundColor: '#A68425'
    });

    backButton.on('InputSelect',bind(this,function() {
      this.emit('creditScreen:end');
    }));
  }
});
