var Backbone = require('backbone');
var $ = require('jquery');

// APP
var App = require('./app');

// VIEWS
// Home
var HomeView = require('./views/home.js');
App.Views.Home = new HomeView();

// Register
var RegisterView = require('./views/register.js');
App.Views.Register = new RegisterView();

// Login
var LoginView = require('./views/login.js');
App.Views.Login = new LoginView();

// Add Profile
var AddProfileView = require('./views/add-profile.js');
App.Views.AddProfile = new AddProfileView();

// Dog Profile Display
var DogProfileView = require('./views/dog-profile-display.js');
App.Views.DogProfile = new DogProfileView();


// App Router
App.Router = Backbone.Router.extend({

	// Route definitions
	routes: {
		'': 'homeView',
		'login(/)': 'loginUser',
		'register(/)': 'registerNew',
		'dogs/add(/)': 'addProfile',
		'dogs/:id(/)': 'dogProfileDisplay',
		'dogs/:id/delete(/)': 'deleteDogProfile',
		'*actions': 'defaultRoute'
	},

	// Route handlers

	homeView: function() {
		App.Views.Home.render();
	},

	loginUser: function () {
		App.Views.Login.render();
	},

	registerNew: function() {
		App.Views.Register.render(); 
	},

	addProfile: function() {
	 	App.Views.AddProfile.render();
	 },

	dogProfileDisplay: function(id) {
	 	App.Views.DogProfile.render(id);
	 },

	deleteDogProfile: function(id) {
		
		$.ajax({
  			type: 'DELETE',
  			url: '/api/dog/' + id
 
    	}).then(function(data) {
    		console.log(data);
    	}).fail(function(xhr) {
    		console.log(xhr);
    	})

    	App.router.navigate('/#', true); 

	 },

	defaultRoute: function(actions) {
		console.log('404');
	}

});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();