var $ = require('jquery');
var Backbone = require('backbone');

// TEMPLATES
var loginTemp = require('../templates/login.hbs');

// App
var App = require('../app');

// Home View
var  loginView = Backbone.View.extend({
  el: $('.main-attach'),

  render: function () {
    this.$el.html(loginTemp());


    if (window.location.href.split('?')[1] === 'fail') {
      $('.fail').show();  
    } 
  }

});

module.exports = loginView;