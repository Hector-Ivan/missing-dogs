var $ = require('jquery');
var Backbone = require('backbone');

// TEMPLATES
var dogProfileTemp = require('../templates/dog-bio.hbs');

// App
var App = require('../app');

// Home View
var  dogProfileView= Backbone.View.extend({
  el: $('.main-attach'),

  render: function (id) {

    var _this = this;

    $.get('/api/dog/' + id).then(function(dog) {
     	_this.$el.html(dogProfileTemp(dog[0]))
     	console.log(dog[0]);
     })
   }
});

module.exports = dogProfileView;