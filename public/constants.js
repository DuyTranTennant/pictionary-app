(function(window){
  var constants = {
      START: 'Start',
      STOP: 'Stop',
      SHOW_PREVIEW: 'started',
      DRAWING_STOPPED: 'stopped',
      DRAWING: 'drawing',
      SHOW_CANVAS: 'show canvas',
      INITIALISE: 'initialise',
  };
  if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
      module.exports = constants;
  } else {
      window.constants = constants;
  }
})( this );
