define([
  '../View',
  '../../ux/keyboard'
], function(View, keyboard) {
  'use strict';

  var constructor = View.extend({
    init: function(model) {
      this._super(model);
      this.on('postrender', this._bindButtons);
    },

    _bindButtons: function($view) {
      $view
      .on('click', '.js-close', this.hide.bind(this))
      .on('click', '.js-disabled', false);
    },

    position: function() {},

    show: function() {
      keyboard.on({
        escape: this.hide.bind(this)
      });
      return this.trigger('show', this.$view);
    },

    hide: function() {
      keyboard.off();
      return this.trigger('hide', this.$view);
    },

    toggle: function() {
      var state = this.$view.is(':visible');
      return this[state ? 'hide': 'show']();
    }
  });

  return constructor;
});
