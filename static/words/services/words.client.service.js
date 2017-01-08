angular.module('words').factory('Words', ['$resource',
    function ($resource) {
        return $resource('api/words/:wordId', {
            wordId : '@_id'
        }, {
            update : {
                method : 'PUT'
            }
        })
    }
]);