var app = angular.module('challongeApp', []);

app.controller('setUpController', function($scope, $http){
	$scope.bracketId = "";
	$scope.submitId = function(){
		$http.get('/getBracket/'+$scope.bracketId);
	}
});