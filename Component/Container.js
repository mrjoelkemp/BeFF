define([
  'jquery',
  'nbd/util/construct',
  '../Component',
  '../Controller',
  '../trait/eventMappable'
], function($, construct, Component, Controller, eventMappable) {
  'use strict';

  /**
   * Manages a DOM region that contains a list of Controllers for each item
   * @module BeFF/Component/Container
   */
  return Component.extend({
    /**
     * The controller class constructed for each item in the container
     * Defaults to the base BeFF/Controller unless overridden
     * @type {BeFF/Controller}
     */
    controller: Controller,

    /**
     * @param  {$ $view The "container" element that we should manage
     */
    init: function($view) {
      this.$view = $view;
    },

    /**
     * Sets up event delegation and constructs controllers for
     * the existing children within the $view
     * @return {[type]} [description]
     */
    bind: function() {
      this._mapEvents();
      this._nodes = this.$view.children().toArray()
      .map(this.decorate, this);
    },

    /**
     * Destroys delegation bindings
     */
    unbind: function() {
      this._undelegateEvents();
    },

    /**
     * Constructs an instance of the controller with the passed args
     * @return {BeFF/Controller} An instance of the controller
     */
    decorate: function () {
      return construct.apply(this.controller, arguments);
    },

    /**
     * Constructs a controller for every element of the resultset
     * and renders the controller into our managed $view
     * @param {Array} resultset A list of JSON objects representing new items in the container
     * @returns {Array} A list of the newly constructed controllers rendered into $view
     */
    add: function(resultset) {
      var nodes = resultset.map(this.decorate, this).filter(Boolean);

      nodes.forEach(function(node) {
        return node.render && node.render(this.$view);
      }, this);

      this._nodes = this._nodes.concat(nodes);

      return nodes;
    },

    /**
     * Destroys all of the managed controllers and empties
     * our managed $view
     * @return {$} Our newly emptied $view
     */
    empty: function() {
      this._nodes.forEach(function(item) {
        return item && item.destroy && item.destroy();
      });
      this._nodes = [];
      return this.$view.empty();
    },

    /**
     * @return {Boolean} Whether or not we have any managed controllers
     */
    isEmpty: function() {
      return !this._nodes.length;
    }
  })
  .mixin(eventMappable);
});
