'use strict';
petSupplies.controller('LoginController', function LoginController($rootScope,
		$scope, $http, $location) {

	$rootScope.cartTotal = 0;

	$scope.login = function() {
		console.log("inside login");
		if ($scope.serviceStarted && $scope.userId && $scope.password) {
			$http.get(
					$rootScope.webserviceuri + "/loginUser/" + $scope.userId
							+ "/" + $scope.password).success(function(data) {

				if (data) {
					createLoggedInUserObject(data);
					console.log('success');
					$location.path('/product');

				} else {
					$scope.message = 'Invalid Credentials.';
					console.log('failed');
				}

			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		}
	};

	function createLoggedInUserObject(data) {
		$rootScope.activeUser = {
			userId : data.userId,
			userName : data.userName,
			password : data.password,
			address : {
				userId : data.address.userId,
				address : data.address.address,
				emailId : data.address.emailId,
				city : data.address.city
			}
		};
	}
});