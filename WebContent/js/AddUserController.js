'use strict';

petSupplies.controller("AddUserController", function AddUserController(
		$rootScope, $scope, $location, $http) {

	$scope.register = function(user) {

		if ($scope.serviceStarted && user) {
			user.address.userId = user.userId;
			console.log('service is up');

			$http.post($rootScope.webserviceuri + "/user",
					data.createUserObject(user)).success(function(response) {
				console.log(response);
				if (response) {
					$scope.message = "User Registered Successfully!";
					$scope.addUserForm.$setPristine();
				}

			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		}

	};

	var data = {
		createUserObject : function(user) {
			return {
				userId : user.userId,
				userName : user.userName,
				password : user.password,
				role : 'USER',
				address : {
					userId : user.userId,
					address : user.address.address,
					emailId : user.address.email,
					city : user.address.city
				}
			};
		}
	};

	$scope.getUserId = function() {
		console.log('in getUser');
		if ($scope.user && $scope.user.userId) {
			$http.get(
					$rootScope.webserviceuri + "/validateUser/"
							+ $scope.user.userId).success(function(data) {
				if (data)
					$scope.existingUser = true;
				else
					$scope.existingUser = false;
			});
		}
	};

	$scope.clear = function() {
		$scope.user = {
			userId : '',
			userName : '',
			password : '',
			role : '',
			address : {
				userId : '',
				address : '',
				emailId : '',
				city : ''
			}
		};

		$scope.addUserForm.$setPristine(); // reset Form

		$location.path("/product"); // go to home page listed products
	};

});