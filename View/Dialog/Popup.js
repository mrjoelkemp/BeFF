define([
  'jquery',
  'nbd/util/extend',
  '../Dialog'
], function($, extend, View) {
  'use strict';

  var constructor = View.extend({
    template: function(data) {
      return this._super(extend({
        dialogType: "desktop",
        blocking: true,
        toolbar: true
      }, data));
    },

    destroy: function() {
      this._super.apply(this, arguments);
      if (this.$block) {
        this.$block.remove();
        this.$block = null;
      }
    },

    render: function() {
      constructor.Z_INDEX += 2;
      this._zIndex = constructor.Z_INDEX;
      return this._super.apply(this, arguments);
    },

    rendered: function() {
      this.$block = this.$block || $('<div>', {
        class: "blocking-div"
      })
      .after(this.$view);
      this._super();
    },

    position: function() {
      if (!this.$view) { return; }

      var windowHeight = window.innerHeight ||
        // IE compatibility
        document.documentElement.offsetHeight,
      offsetTop = (windowHeight - this.$view.outerHeight()) / 2;

      // Manually center
      this.$view.css({
        "z-index": this._zIndex,
        "margin-left": -~~(this.$view.width() / 2) + 'px',
        top: Math.max(0, offsetTop)
      })
      // Then show in position
      .addClass('shown');

      this.$block.css("z-index", this._zIndex - 1);
    },

    show: function() {
      if (!this.$view) { return; }
      if (!this.$view.parent().is(document.body)) {
        this.$view.appendTo(document.body);
      }
      return this._super();
    },

    hide: function() {
      if (!this.$view) { return; }
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
