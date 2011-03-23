(function($){
  $.fn.jmapr = function(options) {
    // Default settings
    var settings = {
      'latitude'    : 0,
      'longitude'   : 0,
      'height'      : 100,
      'width'       : 300,
      'zoom'        : [3,6,13],
      'maptype'     : 'terrain',
      'sensor'      : 'false',
      'fadeDuration': 200
    };
    
    // Return this to mantain jQuery chainability
    return this.each(function() {
      var $this     = $(this),
          maptypes  = ['roadmap', 'satellite', 'terrain', 'hybrid'],
          idPrefix  = 'jmapr_',
          zoom;
         
      // If options exist, lets merge them
      // with our default settings
      if (options) {
        $.extend(settings, options);
      }
      
      // Check if maptype is allowed
      if (-1 == $.inArray(settings.maptype, maptypes)) {
        settings.maptype = 'terrain';
      }
      
      // Sort zooms and
      // check number of zooms (max. 3)
      zoom = settings.zoom.sort(function(a,b) { return a - b; });
      // TODO
      
      // Set map div as relative
      $this.css({
        position: 'relative'
      });
      
      // Create static images and append to map
      for (i in zoom) {
        $('<img />')
          .attr('id', idPrefix + i)
          .attr('src',
            'http://maps.google.com/maps/api/staticmap'
            + '?maptype=' + settings.maptype
            + '&center='  + settings.latitude + ',' + settings.longitude
            + '&zoom='    + zoom[i]
            + '&size='    + settings.width + 'x' + settings.height
            + '&sensor='  + settings.sensor
          )
          .attr('height', settings.height)
          .attr('width', settings.width)
          .css({
            'position': 'absolute',
            'top'     : 0,
            'left'    : 0,
            'zIndex'  : 999 - zoom[i]
          })
          .appendTo($this);
      }
      
      // Create dot and append to map
      // TODO: use a nice image or canvas
      $('<div />')
        .attr('id', idPrefix + 'dot')
        .css({
          'position'        : 'absolute',
          'top'             : (settings.height / 2) - 8,
          'left'            : (settings.width / 2) - 8,
          'zIndex'          : 999,
          'background-color': 'green',
          'height'          : 16,
          'width'           : 16
        })
        .appendTo($this);
      
      // UX
      // First zoom
      $this.mouseenter(function() {
        $('#' + idPrefix + 0).fadeOut(settings.fadeDuration);
      }).mouseleave(function() {
        $('#' + idPrefix + 0).fadeIn(settings.fadeDuration);
      });
      // Second zoom
      $('#' + idPrefix + 'dot').mouseenter(function() {
        $('#' + idPrefix + 1).fadeOut(settings.fadeDuration);
      }).mouseleave(function() {
        $('#' + idPrefix + 1).fadeIn(settings.fadeDuration);
      });
    });
  };
})(jQuery);
