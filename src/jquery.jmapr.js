/*!
 * jMapr jQuery plugin
 * Flickr style maps for jQuery
 * 
 * http://illarra.com
 * Released under the MIT, BSD, and GPL Licenses.
 * This Code shall be used for Good, not Evil.
 */
(function($) {
  $.fn.jmapr = function(options) {
    // Default settings
    var settings = {
          'latitude'    : 0,
          'longitude'   : 0,
          'height'      : '100px',
          'width'       : this.parent().width(),
          'zoom'        : [3,6,13],
          'maptype'     : 'terrain',
          'sensor'      : 'false',
          'fadeDuration': 200,
          'dotCss'      : {
            'background-color': '#fe40a3',
            'height'          : '8px',
            'width'           : '8px',
            'border'          : '2px solid #fff',
            'border-radius'   : '8px',
            'box-shadow'      : '1px 1px 3px rgba(0, 0, 0, .9)'
          }
        };
    
    // Return this to mantain jQuery chainability
    return this.each(function() {
      var $this    = $(this),
          maptypes = ['roadmap', 'satellite', 'terrain', 'hybrid'],
          idPrefix = $(this).attr('id') + '_jmapr_',
          protectedCssAttrs = ['position', 'top', 'left', 'zIndex'],
          prefixedCssAttrs  = ['border-radius', 'box-shadow'],
          dotPositionCss, i, zoom;
         
      // If options exist, lets merge them
      // with our default settings
      if (options) {
        // Manage dotCss object first
        if (options.dotCss) {
          for (i = 0; i < protectedCssAttrs.length; i++) {
            delete options.dotCss[protectedCssAttrs[i]];
          }
          
          $.extend(settings.dotCss, options.dotCss);
          
          delete options['dotCss'];
        }
        
        $.extend(settings, options);
      }
      
      // Generate vendor prefixes for Css
      for (i = 0; i < prefixedCssAttrs.length; i++) {
        if (settings.dotCss[prefixedCssAttrs[i]]) {
          settings.dotCss['-webkit-' + prefixedCssAttrs[i]] = settings.dotCss['-moz-' + prefixedCssAttrs[i]] = settings.dotCss[prefixedCssAttrs[i]];
        }
      }
      
      // Parse int height and widths
      settings.intHeight    = parseInt(settings.height);
      settings.intWidth     = parseInt(settings.width);
      settings.intDotHeight = parseInt(settings.dotCss.height);
      settings.intDotWidth  = parseInt(settings.dotCss.width);
      
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
        'position': 'relative',
        'height'  : settings.intHeight + 'px',
        'width'   : settings.intWidth + 'px'
      });
      
      // Create static images and append to map
      for (i = 0; i < zoom.length; i++) {
        $('<img />')
          .attr('id', idPrefix + i)
          .attr('src',
            'http://maps.google.com/maps/api/staticmap'
            + '?maptype=' + settings.maptype
            + '&center='  + settings.latitude + ',' + settings.longitude
            + '&zoom='    + zoom[i]
            + '&size='    + settings.intWidth + 'x' + settings.intHeight
            + '&sensor='  + settings.sensor
          )
          .attr('height', settings.intHeight)
          .attr('width', settings.intWidth)
          .css({
            'position': 'absolute',
            'top'     : 0,
            'left'    : 0,
            'zIndex'  : 30 - zoom[i],
            'height'  : settings.intHeight + 'px',
            'width'   : settings.intWidth + 'px',
            'cursor'  : 'pointer'
          })
          .appendTo($this);
      }
      
      // Create dot and append to map
      $('<div />')
        .attr('id', idPrefix + 'dot')
        .attr('height', settings.intDotHeight)
        .attr('width', settings.intDotWidth)
        .appendTo($this);
      
      dotPositionCss = {
        'position': 'absolute',
        'top'     : (settings.intHeight / 2) - (settings.intDotHeight / 2),
        'left'    : (settings.intWidth / 2) - (settings.intDotWidth / 2),
        'zIndex'  : 30,
        'cursor'  : 'pointer'
      };
      
      // Add class if set, and update CSS
      if (settings.dotClass) {
        dotPositionCss.height = settings.dotCss.height;
        dotPositionCss.width  = settings.dotCss.width;
        
        settings.dotCss = dotPositionCss;
        
        $('#' + idPrefix + 'dot').addClass(settings.dotClass);
      } else {
        $.extend(settings.dotCss, dotPositionCss);
      }
      
      $('#' + idPrefix + 'dot').css(settings.dotCss);
      
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
