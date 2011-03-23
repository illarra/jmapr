(function($){
  $.fn.jmapr = function(options) {
    // Default settings
    var settings = {
      'latitude' : 0,
      'longitude': 0,
      'height'   : 100,
      'width'    : 300,
      'zoom'     : [13,6,3],
      'maptype'  : 'terrain'
    };
    
    // Return this to mantain jQuery chainability
    return this.each(function() {
      var $this     = $(this),
          baseurl   = 'http://maps.google.com/maps/api/staticmap',
          maptypes  = ['roadmap', 'satellite', 'terrain', 'hybrid'],
          timestamp = + new Date();
         
      // If options exist, lets merge them
      // with our default settings
      if (options) {
        $.extend(settings, options);
      }
      
      // Check if maptype is allowed
      if (-1 == $.inArray(settings.maptype, maptypes)) {
        settings.maptype = 'terrain';
      }
      
      // Check number of zooms (max. 3)
      // TODO
      
      // Set map div as relative
      $this.css({
        position: 'relative'
      });
      
      // Create static images and append to map
      for (i in settings.zoom) {
        $('<img />')
          .attr('id', 'jmapr_' + i + '' + timestamp)
          .attr('src',
            baseurl
            + '?maptype=' + settings.maptype
            + '&center=' + settings.latitude + ',' + settings.longitude
            + '&zoom='+ settings.zoom[i]
            + '&size=' + settings.width + 'x' + settings.height
            + '&sensor=false'
          )
          .attr('height', settings.height)
          .attr('width', settings.width)
          .css({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: i + 100
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
