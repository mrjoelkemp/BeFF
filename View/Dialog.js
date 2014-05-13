define([
  'jquery',
  'nbd/View/Entity',
  'nbd/util/extend',
  'hgn!templates/dialog',
  'hgn!templates/button'
], function($, View, extend, dialog, button) {
  'use strict';

  var constructor = View.extend({
    mustache: {},

    template: function(data) {
      return $(dialog(data, extend({
        content: this.mustache.template,
        button: button.template
      }, this.partials)));
    },

    rendered: function() {
      this.$view
      .on('click', '.js-close, .close, .form-button-close, .form-button-cancel',
          this.hide.bind(this))
      .on('click', '.form-button-disabled', false);
    },

    position: function() {},

    show: function() {
      return this.trigger('show', this.$view);
    },

    hide: function() {
      return this.trigger('hide', this.$view);
    },

    toggle: function() {
      var state = this.$view.is(':visible');
      return this[ state ? 'hide': 'show' ]();
    }
  });

  return constructor;
});
