var users = require('../controllers/users.server.controller'),
    words = require('../controllers/words.server.controller');

module.exports = function (app) {
    app.route('/api/words')
        .get(words.wordsList)
        .post(users.requiresLogin ,words.create);

    app.route('/api/words/:wordId')
        .get(words.read)
        .put(users.requiresLogin, words.hasAuthorization, words.update)
        .delete(users.requiresLogin, words.hasAuthorization, words.delete);

    app.param('wordId', words.wordsByID);
};