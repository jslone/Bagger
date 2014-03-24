import device;
import ui.View;
import ui.TextView;

var dpi=Math.max(device.width,device.height)/8;

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

    var offset = dpi/2;
    for(var i = 0; i < credits.length; i++) {
      var junk = new ui.TextView({
        superview:this,
        text:credits[i],
        horizontalAlign:'center',
        size:dpi/4,
        y:offset,
        x:0,
        width:device.width,
        height:dpi/2,
      });
      offset += junk.style.height;
    }

    var backButton = new ui.TextView({
      superview: this,
      x: device.width / 2 - dpi/2,
      y: device.height - dpi/2,
      width: dpi,
      height: dpi/2,
      text: 'Back'
    });

    backButton.on('InputSelect',bind(this,function() {
      this.emit('creditScreen:end');
    }));
  }
});
