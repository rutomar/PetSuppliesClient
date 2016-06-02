'use strict';

petSupplies.controller('LogoutController', function($rootScope, $scope,
		$location, $window) {

	var destroyRootScope = function() {
		console.log('Logging out User');
		$rootScope.activeUser = null;
		$rootScope.cartItems = null;
		$rootScope.orders = null;
		$window.alert('User logged out successfully!');
		$location.path('/product');
	};

	destroyRootScope();
});