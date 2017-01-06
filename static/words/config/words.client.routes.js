angular.module('words').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'words/views/words.client.view.html'
        }).otherwise({
            redirectTo : '/'
        });
    }
]);