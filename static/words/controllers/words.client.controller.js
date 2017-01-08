angular.module('words').controller('WordsController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Words',
    function ($scope, $routeParams, $location, Authentication, Words) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var word = new Words({
                title : this.title,
                content : this.content,
                visibility : this.visibility
            });
            console.log(word.title +", " +word.content +", "+ word.visibility);
            word.$save(function (response) {
                console.log('save start!');
                $location.path('words/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.words = Words.query();
        };

        $scope.findOne = function () {
            $scope.word = Words.get({
                wordId : $routeParams.wordId
            })
        };

        $scope.update = function () {
            $scope.word.$update(function () {
                $location.path('words/' + $scope.word._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            })
        };

        $scope.delete = function (word) {
            if(word){
                word.$remove(function () {
                    for(var i in $scope.words){
                        if($scope.words[i] === word){
                            $scope.words.splice(i, 1);
                        }
                    }
                });
            }else{
                $scope.word.$remove(function () {
                    $location.path('words');
                });
            }
        };
    }
]);