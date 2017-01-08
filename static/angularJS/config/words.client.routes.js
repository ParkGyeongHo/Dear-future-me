angular.module('angularJS').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'angularJS/views/words.client.view.html'
        }).otherwise({
            redirectTo : '/'
        });
    }
]);