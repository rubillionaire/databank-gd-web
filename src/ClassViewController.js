var ClassAdd = require('./ClassAddController');

module.exports = function ClassController (context) {
    var self = {};

    self.actions = {};

    self.actions.add = ClassAdd(context);

    self.render = function (d) {
        console.log('ClassAddController.render - '+
                    'overview of classes.');
    };

    return self;
};