'use strict';

petSupplies
		.controller(
				'HomePageController',
				function HomePageController($rootScope, $scope, $http,
						$location) {

					$scope.websiteName = "PetShop Supplies";
					$rootScope.webserviceuri = "http://localhost:8084/core";
					$rootScope.homePage = $location.absUrl();
					console.log("Pintnig webserviceuri"
							+ $rootScope.webserviceuri);
					console.log("$rootScope.homePage" + $rootScope.homePage);

					$scope.serviceStarted = false;

					$http
							.get($rootScope.webserviceuri)
							.success(
									function(data) {
										console.log(data);
										$scope.serviceStarted = data;

										console.log("Pintnig serviceStarted"
												+ $scope.serviceStarted);

										if (!$scope.serviceStarted) {
											$rootScope.message = "Service is temporarily unavialble. Please try again later."
											console.log("Pintnig message"
													+ message);
										} else
											init();
									});

					var init = function() {
						if ($scope.serviceStarted) {
							console.log('inside init');
							// get Categories
							$http
									.get($rootScope.webserviceuri + '/category')
									.success(function(data) {
										$rootScope.categories = data;
										console.log('Categories found.');
									})
									.error(
											function() {
												console
														.error('Error while fetching categories');
											});

							// get products
							$http
									.get($rootScope.webserviceuri + '/product')
									.success(function(data) {
										$rootScope.products = data;
										console.log('Products found.');
									})
									.error(
											function() {
												console
														.error('Error while fetching products');
											});
							console.log('navigating to product');
							$location.path("/product");
						}
					};

					$scope.getCatProds = function(categoryCode) {
						$http.get(
								$rootScope.webserviceuri + '/productCategory',
								{
									params : {
										categoryCode : categoryCode
									}
								}).success(function(data) {
							console.log('getting product ' + categoryCode);
							if (data) {
								$rootScope.products = data;
								$rootScope.categorySelected = categoryCode;
								$location.path("/product");
							}
						}).error(function(data, status, headers, config) {
							console.log(status);
							return false;
						});
					};

					$scope.getProducts = function() {
						init();
						$rootScope.categorySelected = '';
					};

					$scope.logout = function() {
						$rootScope.activeUser = null;
						$location.path('/logout');

					};

				});