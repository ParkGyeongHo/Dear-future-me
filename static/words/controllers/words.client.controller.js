angular.module('words').controller('WordsController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Words',
    function ($scope, $routeParams, $location, Authentication, Words) {
        $scope.authentication = Authentication;

        var title = ['오늘 하루는 어떠셨나요?', '오늘의 교훈은?', '오늘의 명언을 남겨보세요.'];
        var result = Math.floor(Math.random() * title.length);
        $scope.title = title[result];

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

        $scope.delete = function (wordData) {
            console.log(wordData);
            if(wordData){
                wordData.$remove(function () {
                    console.log('remove')
                    for(var i in $scope.words){
                        if($scope.words[i] === wordData){
                            $scope.words.splice(i, 1);
                        }
                    }
                });
            }else{
                console.log($scope.word)
                $scope.word.$remove(function () {
                    $location.path('words');
                });
            }
        };
    }
]);

angular.module("charts").controller("BarCtrl", function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});