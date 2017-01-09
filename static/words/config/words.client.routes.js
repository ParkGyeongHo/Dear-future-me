angular.module('words').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/words', {
                templateUrl : 'words/views/list-word.client.view.html'
        }).
            when('/mywords', {
                templateUrl : 'words/views/mylist-word.client.view.html'
        }).
            when('/words/create', {
                templateUrl : 'words/views/create-word.client.view.html'
        }).
            when('/words/:wordId', {
                templateUrl : 'words/views/view-word.client.view.html'
        }).
            when('/words/:wordId/edit', {
                templateUrl : 'words/views/edit-word.client.view.html'
        }).
            when('/dashboard', {
                templateUrl : 'words/views/dash-word.client.view.html'
        });
    }
]);