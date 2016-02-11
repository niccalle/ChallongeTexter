var app = angular.module('challongeApp', []);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller('setUpController', function($scope, $http){
	$scope.bracketId = "";
	$scope.submitId = function(){
		$http.get('/phoneNumber/'+$scope.bracketId);
	}
});

app.controller('phoneNumberController', function($scope, $http){
	$scope.entrants = [];
	$scope.bracketId = window.location.pathname.split('/')[2];
	$http.get('/getBracket/'+$scope.bracketId).then(function successCallback(response){
		console.log(response);
		$scope.entrants = response['data'];
	},
	function errorCallback(response){
		console.log(response);
	});
})