(function(window){
  var constants = {
      START: 'Start',
      STOP: 'Stop',
      DRAWING_STARTED: 'started',
      DRAWING_STOPPED: 'stopped',
      DRAWING: 'drawing',
  };
  if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
      module.exports = constants;
  } else {
      window.constants = constants;
  }
})( this );