module.exports = function hashFactory () {
    var self = {};

    self.dispatch = d3.dispatch('change');

    d3.select(window)
        .on('hashchange', function () {
            var current = self.is();
            self.dispatch.change(current);
        });

    self.is = function (d) {
        // getter
        if (!arguments.length) {
            return parse_hash(window.location.hash);
        }

        // setter
        var hash = '/';
        if (d.controller === 'resource') {
            hash = format_resource_hash(d);
        }
        else
        if (d.controller === 'class') {
            hash = format_class_hash(d);
        }
        else
        if (d.controller === 'tag') {
            hash = format_tag_hash(d);
        }

        window.location = hash;
        console.log('set hash: ', hash);

        return hash;
    };

    function parse_hash (hash) {
        var integer_regex = /^\d+$/;

        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }

        var args = (function (input) {
            output = [];
            input.forEach(function (d) {
                if (d.length > 0) {
                    output.push(d);
                }
            });
            return output;
        })(hash.split('/'));

        var parsed = {
            controller: 'index'
        };

        if (args[0] === 'resource') {
            parsed = {
                controller: 'resource',
                id: args[1],
                edit: false
            };
            if (args.length >= 3) {
                parsed.title = args[2];
            }
            if (args.length >= 4) {
                parsed.version = args[3];
            }
            if (args.length >= 5) {
                parsed.edit = true;
            }
        }
        else
        if (args[0] === 'class') {
            parsed = {
                controller: 'class',
                action: undefined
            };

            if (args.length >= 2) {
                if (args[1].match(integer_regex)) {
                    // viewing a particular class
                    parsed.id = args[1];
                    if (args.length >= 3) {
                        parsed.title = args[2];
                    }
                    if ((args.length >= 4) &
                        (args[3] === 'edit')) {
                        parsed.action = args[3];
                    }
                } else {
                    // some action is being taken on the class

                    if (args[1] === 'add') {
                        parsed.action = args[1];
                        if (args[2] === 'resource') {
                            parsed.type = args[2];

                            if (args.length >= 4) {
                                parsed.resource_id = args[3];
                            }
                        }
                    }
                }
            }
        }
        else
        if (args[0] === 'tag') {
            parsed = {
                controller: 'tag',
                action: 'view'
            }
        }

        return parsed;
    }

    function format_resource_hash(d) {
        var args = ['resource',
                    d.id,
                    d.title ?
                        escape_for_url(d.title) : 'resource',
                    d.version];

        if (d.action === 'edit') {
            args.push('edit');
        }

        return '#/' + args.join('/');
    }

    function format_class_hash (d) {
        var args = ['class'];

        // default action is to view
        if (d.action === 'add') {
            // action taken on the class
            // such as 'add' -- 'add to class'
            args.push(d.action);
            args.push(d.type);
        }

        args.push(d.resource_id);
        args.push(escape_for_url(d.resource_title));

        if (d.action === 'edit') {
            // should never be a state where
            // edit is true & action is a string
            args.push(d.action);
        }

        return '#/' + args.join('/');
    }

    function format_tag_hash (d) {
        var args = ['tag'];
        if (d.action === 'add') {
            args.push(d.action);
        }

        args.push(d.tag_id);
        args.push(d.name);

        return '#/' + args.join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};