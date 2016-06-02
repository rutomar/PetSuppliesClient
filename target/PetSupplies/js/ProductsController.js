'use strict';

petSupplies.controller('ProductsController', function($rootScope, $scope,
		$location, $http, $window) {

	var cartUri = $rootScope.webserviceuri + '/cart/';

	var productQuantity = 0;

	console.log('inside productsControler');

	$scope.addToCart = function(product) {

		if ($rootScope.activeUser) {
			console.log(data.createCartItem(product));
			console.log('active user true for ading to cart');

			productQuantity = 1;

			$http.post(cartUri, data.createCartItem(product)).success(
					function(data) {
						console.log(data);
						if (data) {
							$scope.message = "Product Added to Cart";
							console.log('userID '
									+ $rootScope.activeUser.userId)
							$scope.fetchAllItems($rootScope.activeUser.userId);
							$window.alert($scope.message);
							$location.path("/product");
						}

					}).error(function(data, status, headers, config) {
				console.log(status);
			});

		} else {
			alert('Kindly login to purchase.');
			$location.path('/login');
		}
	};

	$scope.fetchAllItems = function(userId) {

		$http.get(cartUri + userId).success(function(data) {
			console.log(data);
			if (data) {
				$rootScope.cartItems = data;
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
		});

	};

	var data = {
		createCartItem : function(product) {
			return {
				userProdCode : $rootScope.activeUser.userId
						+ product.productCode,
				userId : $rootScope.activeUser.userId,
				productCode : product.productCode,
				productName : product.productName,
				productPrice : product.productPrice,
				quantity : productQuantity
			};
		}

	};

	$scope.searchProduct = function(productName) {

		if (productName) {
			$http.get(
					$rootScope.webserviceuri + '/product/productName/'
							+ productName).success(function(data) {
				$rootScope.products = data;
				console.log('Products found.');
			}).error(function() {
				console.error('Error while fetching products');
			});

		} else {

			// get all products
			$http.get($rootScope.webserviceuri + '/product').success(
					function(data) {
						$rootScope.products = data;
						console.log('Products found.');
					}).error(function() {
				console.error('Error while fetching products');
			});

		}

		console.log('navigating to product');
		$location.path("/product");
	}
});