var $ = require('jquery');
var Backbone = require('backbone');

var cookie = require('js-cookie');

var user = {}
var userCookie = cookie.get('user');

if (userCookie) {
  user = JSON.parse(userCookie.slice(2));
} else {
  window.location = '/#/login'; //url of redirect
}


// TEMPLATES
var addProfileTemp = require('../templates/add-profile.hbs');

// App
var App = require('../app');


// Home View
var  addProfileView= Backbone.View.extend({
  el: $('.main-attach'),

  events: {
    "submit form.add-profile": "submitForm"
  },
  render: function () {
    this.$el.html(addProfileTemp({ownerId: user.owner_id}));


  },

  submitForm: function() {

    var formData = {
        ownerId: user.owner_id, 
        dogName: $('form.add-profile .dog-name').val(),
        breed: $('form.add-profile .breed').val(),
        gender: $('form.add-profile .gender-radio-m').val(),
        date: $('form.add-profile .date').val(),
        contact: $('form.add-profile .contact').val(),
        number: $('form.add-profile .number').val(),
        description: $('form.add-profile .description').val()
    }

    $.post('/api/dog', formData)
      .then(function (dogUrl) {
        
          var parts = dogUrl.split('/');
          var dogId = parts.pop();

          App.router.navigate('dogs/' + dogId, true); 
    })

    return false;
  }
});

module.exports = addProfileView;