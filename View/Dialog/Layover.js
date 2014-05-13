define([
  'jquery',
  'be/View/Dialog'
], function($, View) {
  'use strict';

  var constructor = View.extend({
    destroy : function() {
      this.hide();
      this._super();
    },

    template : function(data) {
      return this._super($.extend({
        dialogType : "layover",
        layover    : true,
        toolbar    : true
      }, data));
    },

    rendered : function() {
      this._super();
      this.show();
    },

    show : function() {
      if (!this.$view) { return; }
      this.scrollTop = this.scrollTop || $(window).scrollTop();
      $('#site-content').hide();
      $('html').addClass('overflow-hidden');
      this.$view.show();
      return this._super();
    },

    hide : function() {
      if (!this.$view) { return; }
      $('#site-content').show();
      $('html').removeClass('overflow-hidden');
      window.scrollTo(0, this.scrollTop);
      delete this.scrollTop;
      this.$view.hide();
      return this._super();
    }
  });

  return constructor;
});
