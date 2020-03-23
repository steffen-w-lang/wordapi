module.exports = function (router)
{
    var genbrugController = require('../controllers/genbrugController.js');
    var documentController = require('../controllers/documentController.js');

    router.route('/api/genbrug')
        .post(genbrugController.createOrReplaceGenbrug)
        .get(genbrugController.getGenbrug);

    router.route('/api/document')
        .post(documentController.createOrReplaceDocument);
    router.route('/api/document/:documentFileName')
        .get(documentController.getDocument);
}