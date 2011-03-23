(function($){
  $.fn.jmapr = function(options) {
    // Default settings
    var settings = {
      'latitude' : 0,
      'longitude': 0,
      'height'   : 100,
      'width'    : 300,
      'zoom'     : [3,6,13],
      'maptype'  : 'terrain'
    };
    
    // Return this to mantain jQuery chainability
    return this.each(function() {
      var $this     = $(this),
          maptypes  = ['roadmap', 'satellite', 'terrain', 'hybrid'],
          timestamp = + new Date(),
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
      
      // Arrange zooms and
      // Check number of zooms (max. 3)
      zoom = settings.zoom.sort(function(a,b) { return a - b; } );
      // TODO
      
      // Set map div as relative
      $this.css({
        position: 'relative'
      });
      
      // Create static images and append to map
      for (i in zoom) {
        $('<img />')
          .attr('id', 'jmapr_' + i + '' + timestamp)
          .attr('src',
            'http://maps.google.com/maps/api/staticmap'
            + '?maptype=' + settings.maptype
            + '&center=' + settings.latitude + ',' + settings.longitude
            + '&zoom='+ zoom[i]
            + '&size=' + settings.width + 'x' + settings.height
            + '&sensor=false'
          )
          .attr('height', settings.height)
          .attr('width', settings.width)
          .css({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999 - zoom[i]
          })
          .appendTo($this);
      }
      
      /*
      $('#2' + timestamp)
        .mouseenter(function() { $(this).hide(); });
      $('#1' + timestamp)
        .mouseleave(function() { $('#2' + timestamp).show(); });
      */
    });
  };
})(jQuery);
