/**
 * words 모듈 인출후
 * controller()메소드를 이용해 WordsController 생성자 함수 생성
 * $scope 객체 의존성 주입
 * */
angular.module('words').controller('WordsController', ['$scope',
    'Authentication',
    function($scope, Authentication) {
        $scope.name = Authentication.user ? Authentication.user.username : 'MEAN Application'
     }
]);
