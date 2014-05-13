define([
  'nbd/util/extend',
  'be/View/Dialog',
  'lib/keyboard'
], function(extend, View, keyboard) {
  'use strict';

  var constructor = View.extend({
    template: function(data) {
      return this._super(extend({
        dialogType: "desktop",
        blocking: true,
        toolbar: true
      }, data));
    },

    render: function() {
      constructor.Z_INDEX += 2;
      this._zIndex = constructor.Z_INDEX;
      return this._super.apply(this, arguments);
    },

    rendered: function() {
      this._super();
      this.$view.filter('.blocking-div')
      .on('click', this.hide.bind(this));
    },

    position: function() {
      if (!this.$view) { return; }

      var $dialog = this.$view.filter('.popup');

      var windowHeight = window.innerHeight ||
        // IE compatibility
        document.documentElement.offsetHeight,
      offsetTop = (windowHeight - $dialog.outerHeight()) / 2;

      // Manually center
      $dialog.css({
        "z-index": this._zIndex,
        "margin-left": -~~($dialog.width() / 2) + 'px',
        top: Math.max(0, offsetTop)
      })
      // Then show in position
      .addClass('shown');

      this.$view.filter('.blocking-div')
      .css("z-index", this._zIndex - 1);
    },

    show: function() {
      if (!this.$view) { return; }
      keyboard.on({escape: this.hide.bind(this)});
      if (!this.$view.parent().is(document.body)) {
        this.$view.appendTo(document.body);
      }
      return this._super();
    },

    hide: function() {
      if (!this.$view) { return; }
      keyboard.off();
      this.$view.detach();
      return this._super();
    },

    toggle: function() {
      var state = this.$view.parent().is(document.body);
      return this[ state ? 'hide': 'show' ]();
    }
  }, {
    Z_INDEX: 250
  });

  return constructor;
});
