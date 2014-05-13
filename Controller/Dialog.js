define([
  'nbd/Controller/Entity',
  'nbd/util/media'
], function(Entity, media) {
  'use strict';

  var constructor = Entity.extend({
    init : function() {
      this._super.apply(this, arguments);
      media.on('all', this.mediaView, this);
    },

    destroy : function() {
      media.off(null, null, this);
      if (this._view) {
        this._view.destroy();
      }
      this._model.destroy();
    },

    _initView : function(CLASSES, model) {
      var ViewClass,
      breakpoints = media.getState();

      if (typeof CLASSES === 'function') {
        ViewClass = CLASSES;
      }
      else {
        ViewClass = breakpoints.map(function(breakpoint) {
          return CLASSES[breakpoint];
        })
        .filter(function(ViewClass) {
          return !!ViewClass;
        })[0];
      }

      if (typeof ViewClass !== 'function') { return; }

      this._view = this._view = new ViewClass(model);
      this._view._controller = this._view._controller = this;
    },

    render : function() {
      return this._view && this._view.render.apply(this._view, arguments);
    },

    mediaView : function(breakpoint, active) {
      var ViewClass = this.constructor.VIEW_CLASS[breakpoint];
      if (ViewClass && active) {
        this.requestView(ViewClass);
      }
    },

    switchView : function(ViewClass) {
      var existing = this._view;
      this._initView(ViewClass, this._model);

      return existing && existing.destroy();
    }
  });

  return constructor;
});
