var $ = require('jquery');
var Backbone = require('backbone');

var cookie = require('js-cookie');

var user = {}
var userCookie = cookie.get('user');

if (userCookie) {
  user = JSON.parse(userCookie.slice(2));
	$('.login').hide();
	$('.logout').show();
}




// TEMPLATES
var homeTemp = require('../templates/home.hbs');
var dogListTemp = require('../templates/dog-list.hbs');

// App
var App = require('../app');

// Home View
var  homeView= Backbone.View.extend({
  el: $('.main-attach'),

  render: function () {
    this.$el.html(homeTemp());

    var _this = this;

    $.get('/api/dog').then(function(dogs) {
    	_this.$('.dog-list').html(dogListTemp(dogs))
    })
   }
});

module.exports = homeView;