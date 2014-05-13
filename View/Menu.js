define([
  'jquery',
  'be/View/Dialog',
  'nbd/util/async',
  'jquery/ui/position'
], function($, View, async) {
  'use strict';

  var constructor = View.extend({
    init : function() {
      this._super.apply(this, arguments);
      this.dismiss = function(e) {
        if (e.originalEvent.data !== this) {
          this.hide();
          e.preventDefault();
        }
      }.bind(this);
    },

    destroy : function() {
      this._unbind();
      this._super.apply(this, arguments);
    },

    template : function(data) {
      return this._super($.extend({
        dialogType   : "menu",
        blocking     : false,
        hide_toolbar : true
      }, data));
    },

    rendered : function() {
      this._super();
      var self = this;

      // "annotate" the event
      this.$view.on('click touchend', function(e) {
        e.originalEvent.data = self;
      });
    },

    _bind : function() {
      $('html').on('click touchend', this.dismiss);
    },

    _unbind : function() {
      $('html').off('click touchend', this.dismiss);
    },

    position : function($context, positioning) {
      if (!this.$view) { return; }

      if ($context) {
        this._lastContext = $context;
      }

      var defaultPosition = {
        my : "left top",
        at : "left bottom+10",
        of : this._lastContext,
        collision : "flipfit"
      };

      this.$view.position($.extend(defaultPosition, positioning));
    },

    show : function() {
      if (!this.$view) { return; }

      async(this._bind.bind(this));
      this.$view.addClass('shown');
      return this._super();
    },

    hide : function() {
      if (!this.$view) { return; }

      this._unbind();
      this.$view.removeClass('shown');
      return this._super();
    },

    toggle : function() {
      return this[this.$view.hasClass('shown') ? 'hide' : 'show']();
    }
  });

  return constructor;
});
