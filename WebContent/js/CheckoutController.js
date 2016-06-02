'use strict';

petSupplies
		.controller(
				'CheckoutController',
				function($rootScope, $scope, $location, $http) {

					var orderUri = $rootScope.webserviceuri + '/order/';

					var fetchAllOrders = function() {
						console.log('fetchAllOrders for user :'
								+ $rootScope.activeUser.userId);
						$rootScope.orderTotal = 0;
						$http
								.get(orderUri + $rootScope.activeUser.userId)
								.success(
										function(data) {
											console.log('Success');
											if (data) {
												console.log('orders' + data);
												$rootScope.orders = data;
												for (var i = 0; i < $rootScope.orders.length; i++) {
													$rootScope.orderTotal = $rootScope.orderTotal
															+ $rootScope.orders[i].totalPrice;
													console
															.log('calculating totalcost '
																	+ $rootScope.orderTotal)
												}

											}
										})
								.error(function(data, status, headers, config) {
									console.log(status);
								});
					};

					fetchAllOrders();
				});