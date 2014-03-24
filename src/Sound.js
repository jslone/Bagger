import AudioManager;

exports.sound = null;

exports.getSound = function() {
  if(!exports.sound) {
    exports.sound = new AudioManager({
      path: 'resources/sounds',
      files: {
        levelmusic: {
          path: 'music',
          volume: 0.5,
          background: true,
          loop: true
        },
        bag: {
          path: 'effect',
          background: false
        },
        drop: {
          path: 'effect',
          background: false
        }
      }
    });
  }
  return exports.sound;
}
