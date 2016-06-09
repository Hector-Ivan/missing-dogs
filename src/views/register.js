var $ = require('jquery');
var Backbone = require('backbone');

// TEMPLATES
var registerTemp = require('../templates/register.hbs');

// App
var App = require('../app');

// Register View
var  registerView= Backbone.View.extend({
  el: $('.main-attach'),

  render: function () {
    this.$el.html(registerTemp());
  }

});

module.exports = registerView;