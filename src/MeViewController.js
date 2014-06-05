var MeModel = require('./model/me');

module.exports = function MeController (context) {
    var self = {};
    var view;

    self.model = MeModel();

    return self;
};