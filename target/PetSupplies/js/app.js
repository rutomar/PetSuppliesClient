'use strict';
var petSupplies = angular.module('petSupplies', [ 'ngRoute', 'ngResource' ]);

petSupplies.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/logout', {
		templateUrl : 'templates/logout.html',
		controller : 'LogoutController'
	}).when('/product', {
		templateUrl : 'templates/products.html',
		controller : 'ProductsController'
	}).when('/register', {
		templateUrl : 'templates/userRegister.html',
		controller : 'AddUserController'
	}).when('/login', {
		templateUrl : 'templates/login.html',
		controller : 'LoginController'
	}).when('/cart', {
		templateUrl : 'templates/cart.html',
		controller : 'CartController'
	}).when('/order', {
		templateUrl : 'templates/order.html',
		controller : 'CheckoutController'
	});

	$locationProvider.html5Mode(true);

});
