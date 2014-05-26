module.exports = function router (context) {
    var self = {};
    var previous_view = {
        view: 'index'
    };

    context.hash.dispatch
        .on('change.router', function (d) {
            set(d);
        });

    self.initialize = function () {
        set(context.hash.is());
        return self;
    };

    function set (d) {
        if (d.view === 'resource') {
            context.resource.render(d);
        }

        previous_view = d;
    }

    return self;
};