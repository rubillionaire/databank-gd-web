(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ResourceModel    = require('./model/resource');
var ClassModel       = require('./model/class');
var MeModel          = require('./model/me');
var ClassViewCreate  = require('./view/class_create');
var ClassViewList    = require('./view/class_selectable_list');

module.exports = function ClassAddController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var class_models;
    var me;
    var view;

    self.render = function (d) {
        console.log('ClassAddController.render');
        console.log(d);

        me = MeModel()
            .data(context.datastore.get('me', 'me'));

        // class_id: class_model
        class_models = [];
        me.classes().forEach(function (d, i) {
            var class_data = context.datastore.get('classes', d);
            class_models.push(ClassModel().data(class_data));
        });


        resource_data  = context.datastore
                                .get('resources', d.resource_id);

        resource_model = ResourceModel()
                            .data(resource_data);

        // views
        class_list_view = ClassViewList()
            .classes(class_models);

        class_create = ClassViewCreate();

        // dispatchers
        class_list_view.dispatch
            .on('classSelected', function (d) {
                // d => ClassModel
                console.log('class selected', d.title());

                d.resources.add(resource_model.id());
                context.datastore
                       .set('classes', d.id(), d.data());

                context.hash.is({
                    controller: 'class',
                    action: 'view',
                    class_id: d.id(),
                    class_title: d.title()
                });
            });

        class_create.dispatch
            .on('classCreated', function (d) {
                // d => new class title
                var class_data = {
                    title: d,
                    id: context.datastore
                               .get('classes')
                               .count
                };
                console.log('created a new class: ', class_data);
                var new_class = ClassModel().data(class_data);

                me.classes.add(new_class.id());

                class_list_view
                    .add_class(new_class)
                    .update();

                // save data
                context.datastore.set('me', 'me', me.data());
                context.datastore
                       .set('classes',
                            new_class.id(),
                            new_class.data());

            });

        // layout
        context.body_sel.html('');
        class_list_view
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-list-container'));
        class_create
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-add-container'));

        class_list_view.render();
        class_create.render();
        
    };

    return self;
};
},{"./model/class":10,"./model/me":12,"./model/resource":13,"./view/class_create":16,"./view/class_selectable_list":18}],2:[function(require,module,exports){
var ResourceModel = require('./model/resource');
var ClassModel = require('./model/class');
var ClassViewResourceList = require('./view/class_resource_list');
var ClassAdd = require('./ClassAddController');

module.exports = function ClassController (context) {
    var self = {};

    self.actions = {};

    self.actions.add = ClassAdd(context);

    self.render = function (hash) {
        console.log('ClassAddController.render - '+
                    'overview of classes.');
        var class_data =
            context.datastore.get('classes', hash.class_id);

        var resource_models = [];
        var class_model = ClassModel().data(class_data);

        class_model.resources().forEach(function (d, i) {
            var resource_data = context.datastore
                                       .get('resources', d);
            var resource_model = ResourceModel()
                                    .data(resource_data);
            resource_models.push(resource_model);
        });

        class_view_resource_list = ClassViewResourceList()
            .container(context.body_sel)
            .classModel(class_model)
            .resourceModels(resource_models);

        class_view_resource_list.render();

        return self;
    };

    return self;
};
},{"./ClassAddController":1,"./model/class":10,"./model/resource":13,"./view/class_resource_list":17}],3:[function(require,module,exports){
var IndexView  = require('./view/index');

module.exports = function IndexController (context) {
    var self = {};

    self.render = function (d) {
        view  = IndexView()
                    .container(context.body_sel);

        view.render();
    };
    
    return self;
};
},{"./view/index":19}],4:[function(require,module,exports){
var MeModel = require('./model/me');

module.exports = function MeController (context) {
    var self = {};
    var view;

    self.model = MeModel();

    return self;
};
},{"./model/me":12}],5:[function(require,module,exports){
var TagModel      = require('./model/tag');
var EducatorModel = require('./model/educator');
var ResourceModel = require('./model/resource');
var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var tag_models;
    var educator_models;
    var view;

    self.render = function (d) {
        resource_data  = context.datastore.get('resources', d.id);
        resource_model = ResourceModel().data(resource_data);

        tag_models = {};
        var tag_ids = resource_model.tags();
        tag_ids.forEach(function (d, i) {
            var tag = context.datastore.get('tags', d);
            tag_models[tag.id] = TagModel().data(tag);
        });

        educator_models = {};
        var educator_ids = resource_model.educators();
        educator_ids.forEach(function (d, i) {
            console.log('educator ids');
            console.log(d);
            var educator = context.datastore.get('educators', d);
            educator_models
                [educator.id] = EducatorModel()
                                    .data(educator);
        });

        view  = ResourceView()
                    .container(context.body_sel)
                    .resourceModel(resource_model)
                    .tags(tag_models)
                    .educators(educator_models);

        if (d.version) {
            view.version(d.version);
        }
        if (d.edit) {
            view.edit(d.edit);
        }

        view.dispatch
            .on('changeViewToTag.controller', function (d) {
                context.hash.is({
                    controller: 'tag',
                    action: 'view',
                    tag_id: d.id,
                    tag_name: d.name
                });
            })
            .on('addToClass.controller', function () {
                var version_number = view.version();
                var version = resource_model
                                    .versions
                                    .get(version_number);
                context.hash.is({
                    controller: 'class',
                    action: 'add',
                    type: 'resource',
                    resource_id: resource_model.id(),
                    resource_title: version.title
                });

            })
            .on('changeViewToClass.controller', function (d) {
                console.log('changeViewToClass');
                console.log(d);
            })
            .on('changeViewToEducator.controller', function (d) {
                console.log('changeViewToEducator');
                console.log(d);
            })
            .on('setVersion.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('setEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('cancelEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('saveEditable.controller', function (d) {
                console.log('save editable.');
                resource_model.versions.add(d);
                context.datastore.set('resources',
                                      resource_model.id(),
                                      resource_model.data());

                var version_number = resource_model
                                        .versions
                                        .count();
                var version = resource_model
                                    .versions
                                    .get(version_number);

                context.hash.is({
                    controller: 'resource',
                    action: view.edit() ? 'edit' : 'view',
                    id: resource_model.id(),
                    title: version.title,
                    version: version_number
                });
            });

        view.render();
    };

    function stash_and_rerender_state () {
        var version_number = view.version();
        var version = resource_model
                        .versions
                        .get(version_number);
        context.hash.is({
            controller: 'resource',
            action: view.edit() ? 'edit' : 'view',
            id: resource_model.id(),
            title: version.title,
            version: version_number
        });
    }
    
    return self;
};
},{"./model/educator":11,"./model/resource":13,"./model/tag":14,"./view/resource":20}],6:[function(require,module,exports){
var TagView = require('./view/tag');

module.exports = function TagController (context) {
    var self = {};
    var view;

    self.render = function (d) {
        console.log('ResourceController.render');

        view  = TagView();
                    // .container(context.body_sel);

        // attach dispatch messaging to view

        view.render();
    };

    return self;
};
},{"./view/tag":21}],7:[function(require,module,exports){
module.exports = function () {
    var self = {};
    var data = {
        resources: [{
            id: 0,
            versions: [{
            title: 'Mapping: The Journey as Context for narrative',
            body: {
                html: '<p><strong>Maps</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }],
            educators: ['colin@email.com']
        }, {
            id: 1,
            versions: [{
            title: 'Mapping: The Journey as Context for narrative',
            body: {
                html: '<p><strong>Maps</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }, {
            title: 'Mapping: The Journey as Context for Narrative',
            body: {
                html: '<p><strong>Maps!</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }],
            educators: ['anther@email.com']
        }],
        classes: [{
            id: 0,
            title: 'Colin\'s Class',
            resources: [0],
            educators: ['colin@email.com']
        }, {
            id: 1,
            title: 'Anther\'s Class',
            resources: [1],
            educators: ['anther@email.com']
        }],
        educators: [{
            id: 'colin@email.com',
            email: 'colin@email.com',
            first_name: 'Colin',
            last_name: 'Frazer',
            resources: [0],
            classes: [0]
        }, {
            id: 'anther@email.com',
            email: 'anther@email.com',
            first_name: 'Anther',
            last_name: 'Kiley',
            resources: [1],
            classes: [1]
        }],
        tags: [{
            id: "maps",
            name: "Maps"
        }, {
            id: "doug-scott",
            name: "Doug Scott"
        }, {
            id: "making-meaning",
            name: "Making Meaning"
        }],
        me: [{
          id: 'me',
          classes: [],
          resources: []
        }]
    };

    var meta = {
        resources: {
            count: data.resources.length
        },
        classes: {
            count: data.classes.length
        },
        educators: {
            count: data.educators.length
        },
        tags: {
            count: data.tags.length
        }
    };


    // initialize the data
    data.resources.forEach(function (d) {
        localStorage.setItem('resources!' + d.id,
                             JSON.stringify(d));
    });
    data.classes.forEach(function (d) {
        localStorage.setItem('classes!' + d.id,
                             JSON.stringify(d));
    });
    data.educators.forEach(function (d) {
        localStorage.setItem('educators!' + d.id,
                             JSON.stringify(d));
    });
    data.tags.forEach(function (d) {
      localStorage.setItem('tags!' + d.id,
                           JSON.stringify(d));
    });
    data.me.forEach(function (d) {
        localStorage.setItem('me!' + d.id,
                           JSON.stringify(d));
    });

    // initialize the metadata
    for (var key in meta) {
        localStorage
            .setItem(
                key,
                JSON.stringify(meta[key]));
    }

    self.set = function (namespace, id, d) {
        var update_metadata = false;
        var item_id = namespace;
        if (arguments.length === 3) {
            item_id += ('!' + id);

            if (namespace !== 'me') {
                update_metadata = true;
            }
        }
        console.log('setting: ' + item_id);
        localStorage.setItem(item_id,
                             JSON.stringify(d));

        if (update_metadata) {
            var meta = self.get(namespace);
            meta.count += 1;
            localStorage.setItem(namespace,
                                 JSON.stringify(meta));
        }
    };

    self.get = function (namespace, id) {
        var item_id = namespace;
        if (arguments.length === 2) {
            item_id += ('!' + id);
        }

        return JSON.parse(
            localStorage.getItem(item_id));
    };


    return self;
};
},{}],8:[function(require,module,exports){
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
                    parsed.class_id = args[1];
                    if (args.length >= 3) {
                        parsed.class_title = args[2];
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
            args.push(d.resource_id);
            args.push(escape_for_url(d.resource_title));
        } else {
            args.push(d.class_id);
            args.push(escape_for_url(d.class_title));
        }

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
},{}],9:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
var Class    = require('./ClassViewController');
var Index    = require('./IndexViewController');
var Tag      = require('./TagViewController');
var Me       = require('./MeViewController');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel  = body_sel;
    context.hash      = Hash();
    context.datastore = Data();

    // view controllers
    context.resource  = Resource(context);
    context.class_    = Class(context);
    context.index     = Index(context);
    context.router    = Router(context);
    context.tag       = Tag(context);
    context.me        = Me(context);

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./ClassViewController":2,"./IndexViewController":3,"./MeViewController":4,"./ResourceViewController":5,"./TagViewController":6,"./fake_data":7,"./hash":8,"./router":15}],10:[function(require,module,exports){
module.exports = function ClassModel () {
    var self = {};
    var id;
    var title;
    var educators = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.title = function (x) {
        if (!arguments.length) return title;
        title = x;
        return self;
    };

    self.educators = function () {
        return educators;
    };
    self.educators.add = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        
        var in_educators = false;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                in_educators = true;
            }
        });

        if (!in_educators) {
            educators.push(educator_id);
        }

        return self;
    };
    self.educators.remove = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        var index_to_remove;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            educators.splice(index_to_remove, 1);
        }
        return self;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var in_resources = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                in_resources = true;
            }
        });

        if (!in_resources) {
            resources.push(resource_id);
        }

        return self;
    };
    self.resources.remove = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var index_to_remove;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            resources.splice(index_to_remove, 1);
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: id,
                title: title,
                educators: educators,
                resources: resources
            };
        }

        id = x.id;
        title = x.title;
        educators = x.educators || [];
        resources = x.resources || [];

        return self;
    };

    return self;
};
},{}],11:[function(require,module,exports){
module.exports = function EducatorModel () {
    var self = {};
    var email;
    var first_name = '';
    var last_name  = '';


    self.id = function () {
        return email_to_id(email);
    };

    self.email = function () {
        return email;
    };

    self.name = function () {
        return ((first_name) ? (first_name + ' ') : '') +
               last_name;
    };

    self.name.first = function () {
        return first_name;
    };

    self.name.last = function () {
        return last_name;
    };

    self.data = function (d) {
        if (!arguments.length) {
            return {
                id        : email_to_id(email),
                email     : email,
                first_name: first_name,
                last_name : last_name
            };
        }

        id         = d.id;
        email      = d.email;
        first_name = d.first_name;
        last_name  = d.last_name;

        return self;
    };

    function email_to_id (e) {
        return e.toLowerCase();
    }

    return self;
};
},{}],12:[function(require,module,exports){
// Tracks Educator logged in state, and
// keeps a reference to their Educator id

module.exports = function MeModel () {
    var self = {};
    var authenticated = false;

    var id;
    var classes   = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.authenticated = function (x) {
        if (!arguments.length) return authenticated;
        authenticated = x;
        return self;
    };

    self.classes = function () {
        return classes;
    };
    self.classes.add = function (class_id) {
        if (!arguments.length) throw "Need class_id";

        var in_classes = false;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                in_classes = true;
            }
        });

        if (!in_classes) {
            classes.push(class_id);
        }

        return self;
    };
    self.classes.remove = function (class_id) {
        if (!arguments.length) throw "Need class_id";

        var index_to_remove;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            classes.splice(index_to_remove, 1);
        }

        return self;
    };

    self.resources = function () {
        return resources;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id       : id,
                classes  : classes,
                resources: resources
            };
        }

        id        = x.id;
        classes   = x.classes;
        resources = x.resources;

        return self;
    };

    return self;
};
},{}],13:[function(require,module,exports){
module.exports = function ResourceModel () {
    var self = {};

    var id;
    var versions = [];
    var educators  = [];
    var classes  = [];

    self.id = function () {
        return id;
    };

    self.versions = {};
    self.versions.add = function (resource) {
        // resources are not unique.
        // the view ensures a change has occured
        // before passing a new version in
        versions.push(resource);
        return self;
    };
    self.versions.get = function (version_id) {
        // don't make the user think about the fact
        // that counting starts from 0. Because
        // there will never be a version 0.
        if (version_id > versions.length) return undefined;
        
        return versions[version_id-1];
    };
    self.versions.count = function () {
        return versions.length;
    };
    self.versions.latest = function () {
        return self.versions.get(self.versions.count());
    };

    self.educators = function () {
        return educators;
    };
    self.educators.add = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";

        var in_educators = false;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                in_educators = true;
            }
        });

        if (!in_educators) {
            educators.push(educator_id);
        }

        return self;
    };
    self.educators.remove = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";

        var index_to_remove;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            educators.splice(index_to_remove, 1);
        }

        return self;
    };

    self.tags = function () {
        var tags = [];
        versions.forEach(function (d, i) {
            tags = tags.concat(d.tags);
        });
        return get_unique(tags);
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id      : id,
                versions: versions,
                educators : educators,
                tags    : tags,
                classes : classes
            };
        }

        id       = x.id;
        versions = x.versions;
        educators  = x.educators;
        tags     = x.tags;
        classes  = x.classes;

        return self;
    };

    function get_unique (arr) {
        var u = {};
        var a = [];

        for (var i = 0; i < arr.length; i++) {
            if (u.hasOwnProperty(arr[i])) {
                continue;
            }
            a.push(arr[i]);
            u[arr[i]] = 1;
        }

        return a;
    }

    return self;
};
},{}],14:[function(require,module,exports){
// Tags are indexed by an escaped tag name
// this way, tags are normalized, and there
// will be no duplicate tags.

// 'tag!graphic-design' = { tag: 'Graphic Design'}

module.exports = function TagModel () {
    var self = {};
    var name;
    var resources = [];

    self.id = function () {
        return tag_to_id(name);
    };

    self.name = function () {
        return name;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var clean = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                clean = true;
            }
        });

        if (!clean) {
            resources.push(resource_id);
        }

        return self;
    };
    self.resources.remove = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var index_to_remove;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            resources.splice(index_to_remove, 1);
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: self.id(),
                name: name,
                resources: resources
            };
        }

        id = x.id;
        name = x.name;
        resources = x.resources;

        return self;
    };

    function tag_to_id (t) {
        return t.toLowerCase().replace(/ /g, '-');
    }

    return self;
};
},{}],15:[function(require,module,exports){
module.exports = function router (context) {
    var self = {};
    var previous_view = {
        controller: 'index'
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
        if (d.controller === 'resource') {
            context.resource.render(d);
        }
        else
        if (d.controller === 'class') {
            if (d.action) {
                context.class_.actions.add.render(d);
            } else {
                context.class_.render(d);
            }
        }
        else
        if (d.controller === 'tag') {
            console.log('route to tag');
            console.log(d);
            context.tag.render(d);
        }
        else
        if (d.controller === 'index') {
            context.index.render();
        }
        else
        if (d.controller === '404') {
            // context.error.render('404')
        }

        previous_view = d;
    }

    return self;
};
},{}],16:[function(require,module,exports){
module.exports = function ClassCreateView () {
    var self = {};
    var classes = [];

    var container_sel;

    self.dispatch = d3.dispatch('classCreated');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classes = function (x) {
        if (!arguments.length) return classes;
        classes = x;
        return self;
    };

    self.render = function () {
        var form = container_sel
            .append('div')
                .attr('class', 'class-create--wrapper')
            .append('form')
                .attr('name', 'class-create--form')
                .attr('onSubmit', 'return false;');

        var input =
            form.append('label')
                .attr('class', 'class-create--label')
                .text('New class title')
            .append('input')
                .attr('class', 'class-create--input')
                .attr('type', 'text');

        form.append('button')
                .attr('class', 'class-create--button')
                .attr('type', 'button')
                .attr('value', 'Create')
                .text('Create')
                .on('click', function () {
                    var new_class_name = input.property('value');
                    if (new_class_name.length > 0) {
                        self.dispatch
                            .classCreated(new_class_name);
                        input.property('value', '');
                    }
                });

        return self;
    };


    return self;
};
},{}],17:[function(require,module,exports){
module.exports = function ClassViewResourceList () {
    var self = {};
    var class_model;
    var resource_models;

    var container_sel;

    self.dispatch = d3.dispatch('x');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classModel = function (x) {
        if (!arguments.length) return class_model;
        class_model = x;
        return self;
    };

    self.resourceModels = function (x) {
        if (!arguments.length) return resource_models;
        resource_models = x;
        return self;
    };

    self.render = function () {
        container_sel
            .html('')
            .append('div')
                .attr('class',
                      'class-view-resource-list--wrapper')
            .append('h2')
                .text(class_model.title())
            .append('ul')
                .attr('class',
                      'class-view-resource-list--list')
            .selectAll('.class-view-resource-list--list-item')
            .data(resource_models)
            .enter()
            .append('li')
            .attr('class',
                  'class-view-resource-list--list-item')
            .append('p')
            .text(function (d) {
                return d.versions.latest().title;
            });

        return self;
    };


    return self;
};
},{}],18:[function(require,module,exports){
module.exports = function ClassSelectableListView () {
    var self = {};
    var classes = [];

    var container_sel;
    var list_sel_wrapper;

    self.dispatch = d3.dispatch('classSelected');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classes = function (x) {
        if (!arguments.length) return classes;
        classes = x;
        return self;
    };

    self.add_class = function (x) {
        if (!arguments.length) throw "Requires Class Model";
        classes.push(x);
        console.log('class selectable list view - add class');
        console.log(classes);
        return self;
    };

    self.render = function () {
        list_sel_wrapper = container_sel
            .append('div')
                .attr('class', 'selectable-class-list-wrapper')
            .append('ul')
                .attr('class', 'selectable-class-list');

        

        return self.update();
    };

    self.update = function () {
        list_sel_wrapper
            .selectAll('.selectable-class-list-item')
            .data(classes, function (d) { return d.id(); })
            .enter()
            .append('li')
                .attr('class', 'selectable-class-list-item')
                .on('click', function (d) {
                    self.dispatch.classSelected(d);
                })
            .append('p')
                .text(function (d) {
                    return d.title();
                });

        return self;
    };


    return self;
};
},{}],19:[function(require,module,exports){
module.exports = function IndexView () {
    var self = {};
    var container_sel;

    self.dispatch = d3.dispatch();

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    

    self.render = function () {
        var grid = container_sel
                        .html('')
                        .append('div')
                        .attr('class', 'grid');


        grid.append('h1').text('Databank.');
        grid.append('h4').text('The beginning.');

        grid.append('a')
            .attr('href', '#/resource/0/')
            .append('p')
            .text('A resource');

        grid.append('a')
            .attr('href', '#/resource/1/')
            .append('p')
            .text('Another resource');
        

        return self;
    };

    return self;
};
},{}],20:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    var resource_model = {};
    var educators      = {};
    var tags           = {};
    var container_sel;

    var edit = false;
    var version_displayed;

    self.dispatch = d3.dispatch('addToClass',
                                'changeViewToClass',
                                'changeViewToTag',
                                'setEditable',
                                'cancelEditable',
                                'saveEditable',
                                'setVersion',
                                'changeViewToEducator');

    var layout_actionable_data = [{
        type: 'resource-structure',
        name: 'resource-actions',
        cls: 'col--resource--actions left fixed',
        layout: layout_actionable_actions
    }, {
        type: 'resource-structure',
        name: 'resource-content',
        cls: 'col--resource--body right',
        layout: layout_actionable_content
    }];

    var layout_editable_data = [{
        type: 'resource-structure',
        name: 'resource-content',
        cls: 'col--resource--body editable right',
        layout: layout_editable_content
    }];

    self.resourceModel = function (model) {
        if (!arguments.length) return resource_model;
        resource_model = model;
        return self;
    };

    self.tags = function (x) {
        if (!arguments.length) return tags;
        tags = x;
        return self;
    };

    self.educators = function (x) {
        if (!arguments.length) return educators;
        educators = x;
        return self;
    };

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.version = function (x) {
        if (!arguments.length) return version_displayed;
        version_displayed = +x;
        return self;
    };

    self.edit = function (x) {
        if (!arguments.length) return edit;
        edit = x;
        return self;
    };

    self.render = function () {
        if ((!self.version()) |
            (self.version() > resource_model
                                    .versions
                                    .count())) {

            self.version(resource_model
                            .versions
                            .count());
        }

        var grid = container_sel
                        .html('')
                        .append('div')
                        .attr('class', 'grid');

        var render_method;
        if (edit) {
            render_method = render_editable;
        } else {
            render_method = render_actionable;
        }

        grid.call(render_method);

        return self;
    };

    function render_editable (sel) {
        var layout = sel.selectAll('.resource-structure')
            .data(layout_editable_data)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return d.cls + ' ' + d.type;
            })
            .each(function (d, i) {
                d3.select(this).call(d.layout);
            });
    }

    function render_actionable (sel) {

        var layout = sel.selectAll('.resource-structure')
            .data(layout_actionable_data)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return d.cls + ' ' + d.type;
            })
            .each(function (d, i) {
                var sel = d3.select(this);
                sel.call(d.layout);
            });
    }

    function layout_actionable_actions (sel) {
        // edit
        sel.append('div')
            .attr('class', 'resource-action--edit')
            .on('click', function (d) {
                console.log('set editable');
                self.edit(true);
                self.dispatch.setEditable();
            })
            .append('p')
            .text('Edit this assignment.');

        console.log(resource_model.versions.count());
        // versions
        sel.append('div')
            .attr('class', 'resource-action--versions')
            .append('ul')
            .selectAll('.resource-action--versions--version')
            .data(d3.range(resource_model.versions.count()))
            .enter()
            .append('li')
            .attr('class', function (d) {
                var cls = 'resource-action--versions--version';
                if ((d + 1) === self.version()) {
                    cls += ' selected';
                }
                return cls;
            })
            .on('click', function (d) {
                console.log('set version');
                console.log(d+1);
                self.version(d+1);
                self.dispatch.setVersion();
            })
            .append('p')
            .text(function (d) {
                return 'v.' + (d+1);
            });

        // class
        var actions_class = sel.append('div')
            .attr('class', 'resource-action--class');

        actions_class.append('div')
            .attr('class', 'resource-action--class--add')
            .on('click', function () {
                self.dispatch.addToClass();
            })
            .append('p')
            .text('Add to Class');

        actions_class.append('div')
            .attr('class', 'resource-action--class--view')
            .on('click', function () {
                self.dispatch.changeViewToClass();
            })
            .append('p')
            .text('View Class');

    }

    function layout_actionable_content (sel) {
        var data = resource_model.data();

        var version = resource_model
                            .versions
                            .get(version_displayed);

        sel.append('h3')
            .attr('class', 'resource-content--title')
            .text(version.title);

        sel.append('div')
            .attr('class', 'resource-content--body')
            .html(version.body.html);

        sel.append('div')
            .attr('class', 'resource-content--tags')
            .append('p')
            .text('Tags')
            .append('ul')
            .selectAll('.resource-content--tags--tag')
            .data(version.tags)
            .enter()
            .append('li')
            .on('click', function (d) {
                console.log('change view to tag: ', d);
                self.dispatch.changeViewToTag({
                    id: d,
                    name: tags[d].name()
                });
            })
            .attr('class', 'resource-content--tags--tag')
            .append('p')
            .text(function (d) {
                return tags[d].name();
            });

        sel.append('div')
            .attr('class', 'resource-content--educators')
            .append('p')
            .text('Author')
            .append('ul')
            .selectAll('.resource-content'+
                       '--educators--educator')
            .data(resource_model.educators())
            .enter()
            .append('li')
            .on('click', function (d) {
                console.log('change view to educator: ', d);
                self.dispatch.changeViewToEducator({
                    id: d,
                    name: educators[d].name()
                });
            })
            .attr('class', 'resource-content'+
                           '--educators--educator')
            .append('p')
            .text(function (d) {
                console.log(educators);
                console.log(d);
                return educators[d].name();
            });
    }

    function layout_editable_content (sel) {
        var data = resource_model.data();

        var version = resource_model
                            .versions
                            .get(version_displayed);

        var form = sel.append('form')
            .attr('name', 'resource-content-form')
            .attr('onSubmit', 'return false;');

        var editable_title = form.append('input')
            .attr('type', 'text')
            .attr('name', 'resource-content--title--editable')
            .property('value', version.title);

        // replace with an html editor.
        // body.html in, pull out value and
        // stash it back into body.html
        var editable_body_html = form.append('textarea')
            .attr('id', 'resource-content--body--editable')
            .attr('name', 'resource-content--body--editable')
            .property('value', version.body.html);

        var editable_tags = form
            .selectAll('.resource-content--tags--editable')
            .data(version.tags)
            .enter()
            .append('label')
            .text(function (d) {
                return tags[d].name();
            })
            .append('input')
            .attr('class', 'resource-content--tags--editable')
            .attr('type', 'checkbox')
            .property('checked', true)
            .attr('value', function (d) {
                return d;
            });

        form.append('button')
            .attr('class', 'resource-content-form--button')
            .attr('type', 'button')
            .attr('value', 'Cancel')
            .text('Cancel')
            .on('click', function () {
                self.edit(false);
                self.dispatch.cancelEditable();
            });

        form.append('button')
            .attr('class', 'resource-content-form--button')
            .attr('type', 'submit')
            .attr('value', 'Save')
            .text('Save')
            .on('click', function () {
                self.edit(false);
                console.log('saved');
                var selected_tags_id = [];
                editable_tags.each(function (d, i) {
                    if (d3.select(this).property('checked')) {
                        selected_tags_id.push(d);
                    }
                });
                var new_version = {
                    title: editable_title.property('value'),
                    body: {
                        html: editable_body_html.property('value')
                    },
                    tags: selected_tags_id
                };

                if ((new_version.title !== version.title) |
                    (new_version.body.html !== version.body.html) |
                    (!(arrayEquals(new_version.tags,
                                 version.tags)))) {

                   self.dispatch.saveEditable(new_version);
                } else {
                    self.dispatch.cancelEditable();
                }
            });
    }

    function arrayEquals (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = arr1.length; i--; ) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    return self;
};
},{}],21:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    self.render = function () {
  
        return self;
    };

    return self;
};
},{}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc0FkZENvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc1ZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvSW5kZXhWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL01lVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9SZXNvdXJjZVZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvVGFnVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9mYWtlX2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9oYXNoLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9jbGFzcy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL2VkdWNhdG9yLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvbW9kZWwvbWUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL3RhZy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvY2xhc3NfY3JlYXRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19yZXNvdXJjZV9saXN0LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19zZWxlY3RhYmxlX2xpc3QuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvdGFnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlc291cmNlTW9kZWwgICAgPSByZXF1aXJlKCcuL21vZGVsL3Jlc291cmNlJyk7XG52YXIgQ2xhc3NNb2RlbCAgICAgICA9IHJlcXVpcmUoJy4vbW9kZWwvY2xhc3MnKTtcbnZhciBNZU1vZGVsICAgICAgICAgID0gcmVxdWlyZSgnLi9tb2RlbC9tZScpO1xudmFyIENsYXNzVmlld0NyZWF0ZSAgPSByZXF1aXJlKCcuL3ZpZXcvY2xhc3NfY3JlYXRlJyk7XG52YXIgQ2xhc3NWaWV3TGlzdCAgICA9IHJlcXVpcmUoJy4vdmlldy9jbGFzc19zZWxlY3RhYmxlX2xpc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc0FkZENvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciByZXNvdXJjZV9kYXRhO1xuICAgIHZhciByZXNvdXJjZV9tb2RlbDtcbiAgICB2YXIgY2xhc3NfbW9kZWxzO1xuICAgIHZhciBtZTtcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsYXNzQWRkQ29udHJvbGxlci5yZW5kZXInKTtcbiAgICAgICAgY29uc29sZS5sb2coZCk7XG5cbiAgICAgICAgbWUgPSBNZU1vZGVsKClcbiAgICAgICAgICAgIC5kYXRhKGNvbnRleHQuZGF0YXN0b3JlLmdldCgnbWUnLCAnbWUnKSk7XG5cbiAgICAgICAgLy8gY2xhc3NfaWQ6IGNsYXNzX21vZGVsXG4gICAgICAgIGNsYXNzX21vZGVscyA9IFtdO1xuICAgICAgICBtZS5jbGFzc2VzKCkuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGNsYXNzX2RhdGEgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ2NsYXNzZXMnLCBkKTtcbiAgICAgICAgICAgIGNsYXNzX21vZGVscy5wdXNoKENsYXNzTW9kZWwoKS5kYXRhKGNsYXNzX2RhdGEpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXNvdXJjZV9kYXRhICA9IGNvbnRleHQuZGF0YXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoJ3Jlc291cmNlcycsIGQucmVzb3VyY2VfaWQpO1xuXG4gICAgICAgIHJlc291cmNlX21vZGVsID0gUmVzb3VyY2VNb2RlbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEocmVzb3VyY2VfZGF0YSk7XG5cbiAgICAgICAgLy8gdmlld3NcbiAgICAgICAgY2xhc3NfbGlzdF92aWV3ID0gQ2xhc3NWaWV3TGlzdCgpXG4gICAgICAgICAgICAuY2xhc3NlcyhjbGFzc19tb2RlbHMpO1xuXG4gICAgICAgIGNsYXNzX2NyZWF0ZSA9IENsYXNzVmlld0NyZWF0ZSgpO1xuXG4gICAgICAgIC8vIGRpc3BhdGNoZXJzXG4gICAgICAgIGNsYXNzX2xpc3Rfdmlldy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGFzc1NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBkID0+IENsYXNzTW9kZWxcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Mgc2VsZWN0ZWQnLCBkLnRpdGxlKCkpO1xuXG4gICAgICAgICAgICAgICAgZC5yZXNvdXJjZXMuYWRkKHJlc291cmNlX21vZGVsLmlkKCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ2NsYXNzZXMnLCBkLmlkKCksIGQuZGF0YSgpKTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3ZpZXcnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc19pZDogZC5pZCgpLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc190aXRsZTogZC50aXRsZSgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc19jcmVhdGUuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2xhc3NDcmVhdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBkID0+IG5ldyBjbGFzcyB0aXRsZVxuICAgICAgICAgICAgICAgIHZhciBjbGFzc19kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbnRleHQuZGF0YXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgnY2xhc3NlcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBhIG5ldyBjbGFzczogJywgY2xhc3NfZGF0YSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld19jbGFzcyA9IENsYXNzTW9kZWwoKS5kYXRhKGNsYXNzX2RhdGEpO1xuXG4gICAgICAgICAgICAgICAgbWUuY2xhc3Nlcy5hZGQobmV3X2NsYXNzLmlkKCkpO1xuXG4gICAgICAgICAgICAgICAgY2xhc3NfbGlzdF92aWV3XG4gICAgICAgICAgICAgICAgICAgIC5hZGRfY2xhc3MobmV3X2NsYXNzKVxuICAgICAgICAgICAgICAgICAgICAudXBkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzYXZlIGRhdGFcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5zZXQoJ21lJywgJ21lJywgbWUuZGF0YSgpKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCdjbGFzc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfY2xhc3MuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfY2xhc3MuZGF0YSgpKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGF5b3V0XG4gICAgICAgIGNvbnRleHQuYm9keV9zZWwuaHRtbCgnJyk7XG4gICAgICAgIGNsYXNzX2xpc3Rfdmlld1xuICAgICAgICAgICAgLmNvbnRhaW5lcihcbiAgICAgICAgICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5ib2R5X3NlbFxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWxpc3QtY29udGFpbmVyJykpO1xuICAgICAgICBjbGFzc19jcmVhdGVcbiAgICAgICAgICAgIC5jb250YWluZXIoXG4gICAgICAgICAgICAgICAgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAuYm9keV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjbGFzcy1hZGQtY29udGFpbmVyJykpO1xuXG4gICAgICAgIGNsYXNzX2xpc3Rfdmlldy5yZW5kZXIoKTtcbiAgICAgICAgY2xhc3NfY3JlYXRlLnJlbmRlcigpO1xuICAgICAgICBcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSZXNvdXJjZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9yZXNvdXJjZScpO1xudmFyIENsYXNzTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL2NsYXNzJyk7XG52YXIgQ2xhc3NWaWV3UmVzb3VyY2VMaXN0ID0gcmVxdWlyZSgnLi92aWV3L2NsYXNzX3Jlc291cmNlX2xpc3QnKTtcbnZhciBDbGFzc0FkZCA9IHJlcXVpcmUoJy4vQ2xhc3NBZGRDb250cm9sbGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NDb250cm9sbGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuYWN0aW9ucyA9IHt9O1xuXG4gICAgc2VsZi5hY3Rpb25zLmFkZCA9IENsYXNzQWRkKGNvbnRleHQpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xhc3NBZGRDb250cm9sbGVyLnJlbmRlciAtICcrXG4gICAgICAgICAgICAgICAgICAgICdvdmVydmlldyBvZiBjbGFzc2VzLicpO1xuICAgICAgICB2YXIgY2xhc3NfZGF0YSA9XG4gICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ2NsYXNzZXMnLCBoYXNoLmNsYXNzX2lkKTtcblxuICAgICAgICB2YXIgcmVzb3VyY2VfbW9kZWxzID0gW107XG4gICAgICAgIHZhciBjbGFzc19tb2RlbCA9IENsYXNzTW9kZWwoKS5kYXRhKGNsYXNzX2RhdGEpO1xuXG4gICAgICAgIGNsYXNzX21vZGVsLnJlc291cmNlcygpLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZV9kYXRhID0gY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoJ3Jlc291cmNlcycsIGQpO1xuICAgICAgICAgICAgdmFyIHJlc291cmNlX21vZGVsID0gUmVzb3VyY2VNb2RlbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9kYXRhKTtcbiAgICAgICAgICAgIHJlc291cmNlX21vZGVscy5wdXNoKHJlc291cmNlX21vZGVsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2xhc3Nfdmlld19yZXNvdXJjZV9saXN0ID0gQ2xhc3NWaWV3UmVzb3VyY2VMaXN0KClcbiAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbClcbiAgICAgICAgICAgIC5jbGFzc01vZGVsKGNsYXNzX21vZGVsKVxuICAgICAgICAgICAgLnJlc291cmNlTW9kZWxzKHJlc291cmNlX21vZGVscyk7XG5cbiAgICAgICAgY2xhc3Nfdmlld19yZXNvdXJjZV9saXN0LnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEluZGV4VmlldyAgPSByZXF1aXJlKCcuL3ZpZXcvaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleENvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICB2aWV3ICA9IEluZGV4VmlldygpXG4gICAgICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbCk7XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgTWVNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvbWUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5tb2RlbCA9IE1lTW9kZWwoKTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgVGFnTW9kZWwgICAgICA9IHJlcXVpcmUoJy4vbW9kZWwvdGFnJyk7XG52YXIgRWR1Y2F0b3JNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvZWR1Y2F0b3InKTtcbnZhciBSZXNvdXJjZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9yZXNvdXJjZScpO1xudmFyIFJlc291cmNlVmlldyAgPSByZXF1aXJlKCcuL3ZpZXcvcmVzb3VyY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciByZXNvdXJjZV9kYXRhO1xuICAgIHZhciByZXNvdXJjZV9tb2RlbDtcbiAgICB2YXIgdGFnX21vZGVscztcbiAgICB2YXIgZWR1Y2F0b3JfbW9kZWxzO1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXNvdXJjZV9kYXRhICA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgncmVzb3VyY2VzJywgZC5pZCk7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gUmVzb3VyY2VNb2RlbCgpLmRhdGEocmVzb3VyY2VfZGF0YSk7XG5cbiAgICAgICAgdGFnX21vZGVscyA9IHt9O1xuICAgICAgICB2YXIgdGFnX2lkcyA9IHJlc291cmNlX21vZGVsLnRhZ3MoKTtcbiAgICAgICAgdGFnX2lkcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gY29udGV4dC5kYXRhc3RvcmUuZ2V0KCd0YWdzJywgZCk7XG4gICAgICAgICAgICB0YWdfbW9kZWxzW3RhZy5pZF0gPSBUYWdNb2RlbCgpLmRhdGEodGFnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWR1Y2F0b3JfbW9kZWxzID0ge307XG4gICAgICAgIHZhciBlZHVjYXRvcl9pZHMgPSByZXNvdXJjZV9tb2RlbC5lZHVjYXRvcnMoKTtcbiAgICAgICAgZWR1Y2F0b3JfaWRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlZHVjYXRvciBpZHMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgdmFyIGVkdWNhdG9yID0gY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdlZHVjYXRvcnMnLCBkKTtcbiAgICAgICAgICAgIGVkdWNhdG9yX21vZGVsc1xuICAgICAgICAgICAgICAgIFtlZHVjYXRvci5pZF0gPSBFZHVjYXRvck1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKGVkdWNhdG9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldyAgPSBSZXNvdXJjZVZpZXcoKVxuICAgICAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRleHQuYm9keV9zZWwpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNvdXJjZU1vZGVsKHJlc291cmNlX21vZGVsKVxuICAgICAgICAgICAgICAgICAgICAudGFncyh0YWdfbW9kZWxzKVxuICAgICAgICAgICAgICAgICAgICAuZWR1Y2F0b3JzKGVkdWNhdG9yX21vZGVscyk7XG5cbiAgICAgICAgaWYgKGQudmVyc2lvbikge1xuICAgICAgICAgICAgdmlldy52ZXJzaW9uKGQudmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQuZWRpdCkge1xuICAgICAgICAgICAgdmlldy5lZGl0KGQuZWRpdCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3LmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2NoYW5nZVZpZXdUb1RhZy5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndGFnJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAndmlldycsXG4gICAgICAgICAgICAgICAgICAgIHRhZ19pZDogZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgdGFnX25hbWU6IGQubmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignYWRkVG9DbGFzcy5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IHZpZXcudmVyc2lvbigpO1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX251bWJlcik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnYWRkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfaWQ6IHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlX3RpdGxlOiB2ZXJzaW9uLnRpdGxlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NoYW5nZVZpZXdUb0NsYXNzLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VWaWV3VG9DbGFzcycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvRWR1Y2F0b3IuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZXdUb0VkdWNhdG9yJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzZXRWZXJzaW9uLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzZXRFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2FuY2VsRWRpdGFibGUuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NhdmVFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSBlZGl0YWJsZS4nKTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC52ZXJzaW9ucy5hZGQoZCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kYXRhc3RvcmUuc2V0KCdyZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC5kYXRhKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKTtcbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9udW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB2aWV3LmVkaXQoKSA/ICdlZGl0JyA6ICd2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX251bWJlcik7XG4gICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgYWN0aW9uOiB2aWV3LmVkaXQoKSA/ICdlZGl0JyA6ICd2aWV3JyxcbiAgICAgICAgICAgIGlkOiByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgdGl0bGU6IHZlcnNpb24udGl0bGUsXG4gICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBUYWdWaWV3ID0gcmVxdWlyZSgnLi92aWV3L3RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRhZ0NvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzb3VyY2VDb250cm9sbGVyLnJlbmRlcicpO1xuXG4gICAgICAgIHZpZXcgID0gVGFnVmlldygpO1xuICAgICAgICAgICAgICAgICAgICAvLyAuY29udGFpbmVyKGNvbnRleHQuYm9keV9zZWwpO1xuXG4gICAgICAgIC8vIGF0dGFjaCBkaXNwYXRjaCBtZXNzYWdpbmcgdG8gdmlld1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgICByZXNvdXJjZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHZlcnNpb25zOiBbe1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIm1hcHNcIiwgXCJkb3VnLXNjb3R0XCIsIFwibWFraW5nLW1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2NvbGluQGVtYWlsLmNvbSddXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wibWFwc1wiLCBcImRvdWctc2NvdHRcIiwgXCJtYWtpbmctbWVhbmluZ1wiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBOYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHMhPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJtYXBzXCIsIFwiZG91Zy1zY290dFwiLCBcIm1ha2luZy1tZWFuaW5nXCJdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGVkdWNhdG9yczogWydhbnRoZXJAZW1haWwuY29tJ11cbiAgICAgICAgfV0sXG4gICAgICAgIGNsYXNzZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHRpdGxlOiAnQ29saW5cXCdzIENsYXNzJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2NvbGluQGVtYWlsLmNvbSddXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGl0bGU6ICdBbnRoZXJcXCdzIENsYXNzJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzFdLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2FudGhlckBlbWFpbC5jb20nXVxuICAgICAgICB9XSxcbiAgICAgICAgZWR1Y2F0b3JzOiBbe1xuICAgICAgICAgICAgaWQ6ICdjb2xpbkBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZW1haWw6ICdjb2xpbkBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0NvbGluJyxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJ0ZyYXplcicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFswXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFswXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2FudGhlckBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZW1haWw6ICdhbnRoZXJAZW1haWwuY29tJyxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICdBbnRoZXInLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAnS2lsZXknLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMV0sXG4gICAgICAgICAgICBjbGFzc2VzOiBbMV1cbiAgICAgICAgfV0sXG4gICAgICAgIHRhZ3M6IFt7XG4gICAgICAgICAgICBpZDogXCJtYXBzXCIsXG4gICAgICAgICAgICBuYW1lOiBcIk1hcHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogXCJkb3VnLXNjb3R0XCIsXG4gICAgICAgICAgICBuYW1lOiBcIkRvdWcgU2NvdHRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogXCJtYWtpbmctbWVhbmluZ1wiLFxuICAgICAgICAgICAgbmFtZTogXCJNYWtpbmcgTWVhbmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBtZTogW3tcbiAgICAgICAgICBpZDogJ21lJyxcbiAgICAgICAgICBjbGFzc2VzOiBbXSxcbiAgICAgICAgICByZXNvdXJjZXM6IFtdXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIHZhciBtZXRhID0ge1xuICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgIGNvdW50OiBkYXRhLnJlc291cmNlcy5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3Nlczoge1xuICAgICAgICAgICAgY291bnQ6IGRhdGEuY2xhc3Nlcy5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgZWR1Y2F0b3JzOiB7XG4gICAgICAgICAgICBjb3VudDogZGF0YS5lZHVjYXRvcnMubGVuZ3RoXG4gICAgICAgIH0sXG4gICAgICAgIHRhZ3M6IHtcbiAgICAgICAgICAgIGNvdW50OiBkYXRhLnRhZ3MubGVuZ3RoXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvLyBpbml0aWFsaXplIHRoZSBkYXRhXG4gICAgZGF0YS5yZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzb3VyY2VzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSk7XG4gICAgfSk7XG4gICAgZGF0YS5jbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXNzZXMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLmVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZHVjYXRvcnMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhZ3MhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSk7XG4gICAgfSk7XG4gICAgZGF0YS5tZS5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtZSEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcblxuICAgIC8vIGluaXRpYWxpemUgdGhlIG1ldGFkYXRhXG4gICAgZm9yICh2YXIga2V5IGluIG1ldGEpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAuc2V0SXRlbShcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YVtrZXldKSk7XG4gICAgfVxuXG4gICAgc2VsZi5zZXQgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBpZCwgZCkge1xuICAgICAgICB2YXIgdXBkYXRlX21ldGFkYXRhID0gZmFsc2U7XG4gICAgICAgIHZhciBpdGVtX2lkID0gbmFtZXNwYWNlO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgaXRlbV9pZCArPSAoJyEnICsgaWQpO1xuXG4gICAgICAgICAgICBpZiAobmFtZXNwYWNlICE9PSAnbWUnKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlX21ldGFkYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnc2V0dGluZzogJyArIGl0ZW1faWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSk7XG5cbiAgICAgICAgaWYgKHVwZGF0ZV9tZXRhZGF0YSkge1xuICAgICAgICAgICAgdmFyIG1ldGEgPSBzZWxmLmdldChuYW1lc3BhY2UpO1xuICAgICAgICAgICAgbWV0YS5jb3VudCArPSAxO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0ID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgaWQpIHtcbiAgICAgICAgdmFyIGl0ZW1faWQgPSBuYW1lc3BhY2U7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBpdGVtX2lkICs9ICgnIScgKyBpZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGl0ZW1faWQpKTtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNoRmFjdG9yeSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2hhbmdlJyk7XG5cbiAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHNlbGYuaXMoKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlKGN1cnJlbnQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaXMgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyBnZXR0ZXJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VfaGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR0ZXJcbiAgICAgICAgdmFyIGhhc2ggPSAnLyc7XG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIGhhc2ggPSBmb3JtYXRfcmVzb3VyY2VfaGFzaChkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIGhhc2ggPSBmb3JtYXRfY2xhc3NfaGFzaChkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICd0YWcnKSB7XG4gICAgICAgICAgICBoYXNoID0gZm9ybWF0X3RhZ19oYXNoKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaGFzaDtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBoYXNoOiAnLCBoYXNoKTtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VfaGFzaCAoaGFzaCkge1xuICAgICAgICB2YXIgaW50ZWdlcl9yZWdleCA9IC9eXFxkKyQvO1xuXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMnKSA9PT0gMCkge1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFyZ3MgPSAoZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgICAgIGlucHV0LmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfSkoaGFzaC5zcGxpdCgnLycpKTtcblxuICAgICAgICB2YXIgcGFyc2VkID0ge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ2luZGV4J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhcmdzWzBdID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICBpZDogYXJnc1sxXSxcbiAgICAgICAgICAgICAgICBlZGl0OiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnRpdGxlID0gYXJnc1syXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnZlcnNpb24gPSBhcmdzWzNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQuZWRpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0ubWF0Y2goaW50ZWdlcl9yZWdleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmlld2luZyBhIHBhcnRpY3VsYXIgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmNsYXNzX2lkID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5jbGFzc190aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKChhcmdzLmxlbmd0aCA+PSA0KSAmXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXJnc1szXSA9PT0gJ2VkaXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmFjdGlvbiA9IGFyZ3NbM107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb21lIGFjdGlvbiBpcyBiZWluZyB0YWtlbiBvbiB0aGUgY2xhc3NcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnc1sxXSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5hY3Rpb24gPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMl0gPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQudHlwZSA9IGFyZ3NbMl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQucmVzb3VyY2VfaWQgPSBhcmdzWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChhcmdzWzBdID09PSAndGFnJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0YWcnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3ZpZXcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgZC50aXRsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVfZm9yX3VybChkLnRpdGxlKSA6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQudmVyc2lvbl07XG5cbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnZWRpdCcpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnZWRpdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfY2xhc3NfaGFzaCAoZCkge1xuICAgICAgICB2YXIgYXJncyA9IFsnY2xhc3MnXTtcbiAgICAgICAgLy8gZGVmYXVsdCBhY3Rpb24gaXMgdG8gdmlld1xuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAvLyBhY3Rpb24gdGFrZW4gb24gdGhlIGNsYXNzXG4gICAgICAgICAgICAvLyBzdWNoIGFzICdhZGQnIC0tICdhZGQgdG8gY2xhc3MnXG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICAgICAgYXJncy5wdXNoKGQudHlwZSk7XG4gICAgICAgICAgICBhcmdzLnB1c2goZC5yZXNvdXJjZV9pZCk7XG4gICAgICAgICAgICBhcmdzLnB1c2goZXNjYXBlX2Zvcl91cmwoZC5yZXNvdXJjZV90aXRsZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuY2xhc3NfaWQpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGVzY2FwZV9mb3JfdXJsKGQuY2xhc3NfdGl0bGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkLmFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgbmV2ZXIgYmUgYSBzdGF0ZSB3aGVyZVxuICAgICAgICAgICAgLy8gZWRpdCBpcyB0cnVlICYgYWN0aW9uIGlzIGEgc3RyaW5nXG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfdGFnX2hhc2ggKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ3RhZyddO1xuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKGQudGFnX2lkKTtcbiAgICAgICAgYXJncy5wdXNoKGQubmFtZSk7XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVfZm9yX3VybCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBIYXNoICAgICA9IHJlcXVpcmUoJy4vaGFzaCcpO1xudmFyIFJvdXRlciAgID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcbnZhciBEYXRhICAgICA9IHJlcXVpcmUoJy4vZmFrZV9kYXRhJyk7XG52YXIgUmVzb3VyY2UgPSByZXF1aXJlKCcuL1Jlc291cmNlVmlld0NvbnRyb2xsZXInKTtcbnZhciBDbGFzcyAgICA9IHJlcXVpcmUoJy4vQ2xhc3NWaWV3Q29udHJvbGxlcicpO1xudmFyIEluZGV4ICAgID0gcmVxdWlyZSgnLi9JbmRleFZpZXdDb250cm9sbGVyJyk7XG52YXIgVGFnICAgICAgPSByZXF1aXJlKCcuL1RhZ1ZpZXdDb250cm9sbGVyJyk7XG52YXIgTWUgICAgICAgPSByZXF1aXJlKCcuL01lVmlld0NvbnRyb2xsZXInKTtcblxudmFyIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cblxuZGF0YWJhc2UoKTtcblxuXG5mdW5jdGlvbiBkYXRhYmFzZSAoKSB7XG4gICAgdmFyIGNvbnRleHQgICAgICA9IHt9O1xuXG4gICAgY29udGV4dC5ib2R5X3NlbCAgPSBib2R5X3NlbDtcbiAgICBjb250ZXh0Lmhhc2ggICAgICA9IEhhc2goKTtcbiAgICBjb250ZXh0LmRhdGFzdG9yZSA9IERhdGEoKTtcblxuICAgIC8vIHZpZXcgY29udHJvbGxlcnNcbiAgICBjb250ZXh0LnJlc291cmNlICA9IFJlc291cmNlKGNvbnRleHQpO1xuICAgIGNvbnRleHQuY2xhc3NfICAgID0gQ2xhc3MoY29udGV4dCk7XG4gICAgY29udGV4dC5pbmRleCAgICAgPSBJbmRleChjb250ZXh0KTtcbiAgICBjb250ZXh0LnJvdXRlciAgICA9IFJvdXRlcihjb250ZXh0KTtcbiAgICBjb250ZXh0LnRhZyAgICAgICA9IFRhZyhjb250ZXh0KTtcbiAgICBjb250ZXh0Lm1lICAgICAgICA9IE1lKGNvbnRleHQpO1xuXG4gICAgKGZ1bmN0aW9uIGluaXRpYWxpemUgKCkge1xuICAgICAgICBjb250ZXh0LnJvdXRlci5pbml0aWFsaXplKCk7XG4gICAgfSkoKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGlkO1xuICAgIHZhciB0aXRsZTtcbiAgICB2YXIgZWR1Y2F0b3JzID0gW107XG4gICAgdmFyIHJlc291cmNlcyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnRpdGxlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGl0bGU7XG4gICAgICAgIHRpdGxlID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWR1Y2F0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWR1Y2F0b3JzO1xuICAgIH07XG4gICAgc2VsZi5lZHVjYXRvcnMuYWRkID0gZnVuY3Rpb24gKGVkdWNhdG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGVkdWNhdG9yX2lkXCI7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW5fZWR1Y2F0b3JzID0gZmFsc2U7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbl9lZHVjYXRvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX2VkdWNhdG9ycykge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnB1c2goZWR1Y2F0b3JfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5yZW1vdmUgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSBlZHVjYXRvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RvX3JlbW92ZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICBlZHVjYXRvcnMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGluX3Jlc291cmNlcyA9IGZhbHNlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fcmVzb3VyY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9yZXNvdXJjZXMpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMucmVtb3ZlID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RvX3JlbW92ZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBlZHVjYXRvcnM6IGVkdWNhdG9ycyxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkID0geC5pZDtcbiAgICAgICAgdGl0bGUgPSB4LnRpdGxlO1xuICAgICAgICBlZHVjYXRvcnMgPSB4LmVkdWNhdG9ycyB8fCBbXTtcbiAgICAgICAgcmVzb3VyY2VzID0geC5yZXNvdXJjZXMgfHwgW107XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEVkdWNhdG9yTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGVtYWlsO1xuICAgIHZhciBmaXJzdF9uYW1lID0gJyc7XG4gICAgdmFyIGxhc3RfbmFtZSAgPSAnJztcblxuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVtYWlsX3RvX2lkKGVtYWlsKTtcbiAgICB9O1xuXG4gICAgc2VsZi5lbWFpbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVtYWlsO1xuICAgIH07XG5cbiAgICBzZWxmLm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoKGZpcnN0X25hbWUpID8gKGZpcnN0X25hbWUgKyAnICcpIDogJycpICtcbiAgICAgICAgICAgICAgIGxhc3RfbmFtZTtcbiAgICB9O1xuXG4gICAgc2VsZi5uYW1lLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmlyc3RfbmFtZTtcbiAgICB9O1xuXG4gICAgc2VsZi5uYW1lLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0X25hbWU7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZCAgICAgICAgOiBlbWFpbF90b19pZChlbWFpbCksXG4gICAgICAgICAgICAgICAgZW1haWwgICAgIDogZW1haWwsXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWUgOiBsYXN0X25hbWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCAgICAgICAgID0gZC5pZDtcbiAgICAgICAgZW1haWwgICAgICA9IGQuZW1haWw7XG4gICAgICAgIGZpcnN0X25hbWUgPSBkLmZpcnN0X25hbWU7XG4gICAgICAgIGxhc3RfbmFtZSAgPSBkLmxhc3RfbmFtZTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZW1haWxfdG9faWQgKGUpIHtcbiAgICAgICAgcmV0dXJuIGUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwiLy8gVHJhY2tzIEVkdWNhdG9yIGxvZ2dlZCBpbiBzdGF0ZSwgYW5kXG4vLyBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGVpciBFZHVjYXRvciBpZFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE1lTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcblxuICAgIHZhciBpZDtcbiAgICB2YXIgY2xhc3NlcyAgID0gW107XG4gICAgdmFyIHJlc291cmNlcyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLmF1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBhdXRoZW50aWNhdGVkO1xuICAgICAgICBhdXRoZW50aWNhdGVkID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfTtcbiAgICBzZWxmLmNsYXNzZXMuYWRkID0gZnVuY3Rpb24gKGNsYXNzX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGNsYXNzX2lkXCI7XG5cbiAgICAgICAgdmFyIGluX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gY2xhc3NfaWQpIHtcbiAgICAgICAgICAgICAgICBpbl9jbGFzc2VzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9jbGFzc2VzKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmNsYXNzZXMucmVtb3ZlID0gZnVuY3Rpb24gKGNsYXNzX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGNsYXNzX2lkXCI7XG5cbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gY2xhc3NfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQgICAgICAgOiBpZCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzICA6IGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCAgICAgICAgPSB4LmlkO1xuICAgICAgICBjbGFzc2VzICAgPSB4LmNsYXNzZXM7XG4gICAgICAgIHJlc291cmNlcyA9IHgucmVzb3VyY2VzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgdmFyIGlkO1xuICAgIHZhciB2ZXJzaW9ucyA9IFtdO1xuICAgIHZhciBlZHVjYXRvcnMgID0gW107XG4gICAgdmFyIGNsYXNzZXMgID0gW107XG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHNlbGYudmVyc2lvbnMgPSB7fTtcbiAgICBzZWxmLnZlcnNpb25zLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICAvLyByZXNvdXJjZXMgYXJlIG5vdCB1bmlxdWUuXG4gICAgICAgIC8vIHRoZSB2aWV3IGVuc3VyZXMgYSBjaGFuZ2UgaGFzIG9jY3VyZWRcbiAgICAgICAgLy8gYmVmb3JlIHBhc3NpbmcgYSBuZXcgdmVyc2lvbiBpblxuICAgICAgICB2ZXJzaW9ucy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLnZlcnNpb25zLmdldCA9IGZ1bmN0aW9uICh2ZXJzaW9uX2lkKSB7XG4gICAgICAgIC8vIGRvbid0IG1ha2UgdGhlIHVzZXIgdGhpbmsgYWJvdXQgdGhlIGZhY3RcbiAgICAgICAgLy8gdGhhdCBjb3VudGluZyBzdGFydHMgZnJvbSAwLiBCZWNhdXNlXG4gICAgICAgIC8vIHRoZXJlIHdpbGwgbmV2ZXIgYmUgYSB2ZXJzaW9uIDAuXG4gICAgICAgIGlmICh2ZXJzaW9uX2lkID4gdmVyc2lvbnMubGVuZ3RoKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zW3ZlcnNpb25faWQtMV07XG4gICAgfTtcbiAgICBzZWxmLnZlcnNpb25zLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmVyc2lvbnMubGVuZ3RoO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5sYXRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnZlcnNpb25zLmdldChzZWxmLnZlcnNpb25zLmNvdW50KCkpO1xuICAgIH07XG5cbiAgICBzZWxmLmVkdWNhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVkdWNhdG9ycztcbiAgICB9O1xuICAgIHNlbGYuZWR1Y2F0b3JzLmFkZCA9IGZ1bmN0aW9uIChlZHVjYXRvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBlZHVjYXRvcl9pZFwiO1xuXG4gICAgICAgIHZhciBpbl9lZHVjYXRvcnMgPSBmYWxzZTtcbiAgICAgICAgZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSBlZHVjYXRvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluX2VkdWNhdG9ycyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fZWR1Y2F0b3JzKSB7XG4gICAgICAgICAgICBlZHVjYXRvcnMucHVzaChlZHVjYXRvcl9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuZWR1Y2F0b3JzLnJlbW92ZSA9IGZ1bmN0aW9uIChlZHVjYXRvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBlZHVjYXRvcl9pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICBlZHVjYXRvcnMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi50YWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGFncyA9IFtdO1xuICAgICAgICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB0YWdzID0gdGFncy5jb25jYXQoZC50YWdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnZXRfdW5pcXVlKHRhZ3MpO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQgICAgICA6IGlkLFxuICAgICAgICAgICAgICAgIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgICAgICAgICAgICAgICBlZHVjYXRvcnMgOiBlZHVjYXRvcnMsXG4gICAgICAgICAgICAgICAgdGFncyAgICA6IHRhZ3MsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA6IGNsYXNzZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCAgICAgICA9IHguaWQ7XG4gICAgICAgIHZlcnNpb25zID0geC52ZXJzaW9ucztcbiAgICAgICAgZWR1Y2F0b3JzICA9IHguZWR1Y2F0b3JzO1xuICAgICAgICB0YWdzICAgICA9IHgudGFncztcbiAgICAgICAgY2xhc3NlcyAgPSB4LmNsYXNzZXM7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF91bmlxdWUgKGFycikge1xuICAgICAgICB2YXIgdSA9IHt9O1xuICAgICAgICB2YXIgYSA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodS5oYXNPd25Qcm9wZXJ0eShhcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhLnB1c2goYXJyW2ldKTtcbiAgICAgICAgICAgIHVbYXJyW2ldXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwiLy8gVGFncyBhcmUgaW5kZXhlZCBieSBhbiBlc2NhcGVkIHRhZyBuYW1lXG4vLyB0aGlzIHdheSwgdGFncyBhcmUgbm9ybWFsaXplZCwgYW5kIHRoZXJlXG4vLyB3aWxsIGJlIG5vIGR1cGxpY2F0ZSB0YWdzLlxuXG4vLyAndGFnIWdyYXBoaWMtZGVzaWduJyA9IHsgdGFnOiAnR3JhcGhpYyBEZXNpZ24nfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRhZ01vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBuYW1lO1xuICAgIHZhciByZXNvdXJjZXMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWdfdG9faWQobmFtZSk7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGNsZWFuID0gZmFsc2U7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghY2xlYW4pIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMucmVtb3ZlID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RvX3JlbW92ZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IHNlbGYuaWQoKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgPSB4LmlkO1xuICAgICAgICBuYW1lID0geC5uYW1lO1xuICAgICAgICByZXNvdXJjZXMgPSB4LnJlc291cmNlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdGFnX3RvX2lkICh0KSB7XG4gICAgICAgIHJldHVybiB0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvdXRlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHByZXZpb3VzX3ZpZXcgPSB7XG4gICAgICAgIGNvbnRyb2xsZXI6ICdpbmRleCdcbiAgICB9O1xuXG4gICAgY29udGV4dC5oYXNoLmRpc3BhdGNoXG4gICAgICAgIC5vbignY2hhbmdlLnJvdXRlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBzZXQoZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXQoY29udGV4dC5oYXNoLmlzKCkpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0IChkKSB7XG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzb3VyY2UucmVuZGVyKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgaWYgKGQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGFzc18uYWN0aW9ucy5hZGQucmVuZGVyKGQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsYXNzXy5yZW5kZXIoZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAndGFnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JvdXRlIHRvIHRhZycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICBjb250ZXh0LnRhZy5yZW5kZXIoZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnaW5kZXgnKSB7XG4gICAgICAgICAgICBjb250ZXh0LmluZGV4LnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJzQwNCcpIHtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuZXJyb3IucmVuZGVyKCc0MDQnKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNfdmlldyA9IGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NDcmVhdGVWaWV3ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjbGFzc2VzID0gW107XG5cbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xhc3NDcmVhdGVkJyk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IHNlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY2xhc3NlcyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmb3JtID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2xhc3MtY3JlYXRlLS13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2Zvcm0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ2NsYXNzLWNyZWF0ZS0tZm9ybScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29uU3VibWl0JywgJ3JldHVybiBmYWxzZTsnKTtcblxuICAgICAgICB2YXIgaW5wdXQgPVxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2xhc3MtY3JlYXRlLS1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnRleHQoJ05ldyBjbGFzcyB0aXRsZScpXG4gICAgICAgICAgICAuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0taW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcblxuICAgICAgICBmb3JtLmFwcGVuZCgnYnV0dG9uJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2xhc3MtY3JlYXRlLS1idXR0b24nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgJ0NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnRleHQoJ0NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld19jbGFzc19uYW1lID0gaW5wdXQucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdfY2xhc3NfbmFtZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzQ3JlYXRlZChuZXdfY2xhc3NfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wcm9wZXJ0eSgndmFsdWUnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc1ZpZXdSZXNvdXJjZUxpc3QgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNsYXNzX21vZGVsO1xuICAgIHZhciByZXNvdXJjZV9tb2RlbHM7XG5cbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgneCcpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzTW9kZWwgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFzc19tb2RlbDtcbiAgICAgICAgY2xhc3NfbW9kZWwgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZXNvdXJjZU1vZGVscyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJlc291cmNlX21vZGVscztcbiAgICAgICAgcmVzb3VyY2VfbW9kZWxzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAnY2xhc3Mtdmlldy1yZXNvdXJjZS1saXN0LS13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgICAgICAudGV4dChjbGFzc19tb2RlbC50aXRsZSgpKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0tbGlzdCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcuY2xhc3Mtdmlldy1yZXNvdXJjZS1saXN0LS1saXN0LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdGEocmVzb3VyY2VfbW9kZWxzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAnY2xhc3Mtdmlldy1yZXNvdXJjZS1saXN0LS1saXN0LWl0ZW0nKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnZlcnNpb25zLmxhdGVzdCgpLnRpdGxlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NTZWxlY3RhYmxlTGlzdFZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNsYXNzZXMgPSBbXTtcblxuICAgIHZhciBjb250YWluZXJfc2VsO1xuICAgIHZhciBsaXN0X3NlbF93cmFwcGVyO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjbGFzc1NlbGVjdGVkJyk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IHNlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY2xhc3NlcyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRfY2xhc3MgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiUmVxdWlyZXMgQ2xhc3MgTW9kZWxcIjtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKHgpO1xuICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Mgc2VsZWN0YWJsZSBsaXN0IHZpZXcgLSBhZGQgY2xhc3MnKTtcbiAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGlzdF9zZWxfd3JhcHBlciA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NlbGVjdGFibGUtY2xhc3MtbGlzdC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc2VsZWN0YWJsZS1jbGFzcy1saXN0Jyk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgcmV0dXJuIHNlbGYudXBkYXRlKCk7XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsaXN0X3NlbF93cmFwcGVyXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcuc2VsZWN0YWJsZS1jbGFzcy1saXN0LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdGEoY2xhc3NlcywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaWQoKTsgfSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NlbGVjdGFibGUtY2xhc3MtbGlzdC1pdGVtJylcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGFzc1NlbGVjdGVkKGQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC50aXRsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluZGV4VmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ3JpZCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuICAgICAgICBncmlkLmFwcGVuZCgnaDEnKS50ZXh0KCdEYXRhYmFuay4nKTtcbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2g0JykudGV4dCgnVGhlIGJlZ2lubmluZy4nKTtcblxuICAgICAgICBncmlkLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsICcjL3Jlc291cmNlLzAvJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0EgcmVzb3VyY2UnKTtcblxuICAgICAgICBncmlkLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsICcjL3Jlc291cmNlLzEvJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0Fub3RoZXIgcmVzb3VyY2UnKTtcbiAgICAgICAgXG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHZhciByZXNvdXJjZV9tb2RlbCA9IHt9O1xuICAgIHZhciBlZHVjYXRvcnMgICAgICA9IHt9O1xuICAgIHZhciB0YWdzICAgICAgICAgICA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuXG4gICAgdmFyIGVkaXQgPSBmYWxzZTtcbiAgICB2YXIgdmVyc2lvbl9kaXNwbGF5ZWQ7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FkZFRvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvVGFnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbmNlbEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NhdmVFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRWZXJzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0VkdWNhdG9yJyk7XG5cbiAgICB2YXIgbGF5b3V0X2FjdGlvbmFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtYWN0aW9ucycsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWFjdGlvbnMgbGVmdCBmaXhlZCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9uc1xuICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfY29udGVudFxuICAgIH1dO1xuXG4gICAgdmFyIGxheW91dF9lZGl0YWJsZV9kYXRhID0gW3tcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSBlZGl0YWJsZSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHNlbGYucmVzb3VyY2VNb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbDtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBtb2RlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudGFncyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhZ3M7XG4gICAgICAgIHRhZ3MgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZHVjYXRvcnMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlZHVjYXRvcnM7XG4gICAgICAgIGVkdWNhdG9ycyA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IHNlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudmVyc2lvbiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHZlcnNpb25fZGlzcGxheWVkO1xuICAgICAgICB2ZXJzaW9uX2Rpc3BsYXllZCA9ICt4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZGl0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZWRpdDtcbiAgICAgICAgZWRpdCA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCghc2VsZi52ZXJzaW9uKCkpIHxcbiAgICAgICAgICAgIChzZWxmLnZlcnNpb24oKSA+IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpKSkge1xuXG4gICAgICAgICAgICBzZWxmLnZlcnNpb24ocmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3JpZCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIHJlbmRlcl9tZXRob2Q7XG4gICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICByZW5kZXJfbWV0aG9kID0gcmVuZGVyX2VkaXRhYmxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9hY3Rpb25hYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JpZC5jYWxsKHJlbmRlcl9tZXRob2QpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZWRpdGFibGUgKHNlbCkge1xuICAgICAgICB2YXIgbGF5b3V0ID0gc2VsLnNlbGVjdEFsbCgnLnJlc291cmNlLXN0cnVjdHVyZScpXG4gICAgICAgICAgICAuZGF0YShsYXlvdXRfZWRpdGFibGVfZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jbHMgKyAnICcgKyBkLnR5cGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChkLmxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfYWN0aW9uYWJsZSAoc2VsKSB7XG5cbiAgICAgICAgdmFyIGxheW91dCA9IHNlbC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2FjdGlvbmFibGVfZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jbHMgKyAnICcgKyBkLnR5cGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbC5jYWxsKGQubGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnMgKHNlbCkge1xuICAgICAgICAvLyBlZGl0XG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1lZGl0JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgZWRpdGFibGUnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRFZGl0YWJsZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0VkaXQgdGhpcyBhc3NpZ25tZW50LicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpO1xuICAgICAgICAvLyB2ZXJzaW9uc1xuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nKVxuICAgICAgICAgICAgLmRhdGEoZDMucmFuZ2UocmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuY291bnQoKSkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nO1xuICAgICAgICAgICAgICAgIGlmICgoZCArIDEpID09PSBzZWxmLnZlcnNpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCB2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZlcnNpb24oZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldFZlcnNpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2LicgKyAoZCsxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsYXNzXG4gICAgICAgIHZhciBhY3Rpb25zX2NsYXNzID0gc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tYWRkJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hZGRUb0NsYXNzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQWRkIHRvIENsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tdmlldycpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvQ2xhc3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdWaWV3IENsYXNzJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2gzJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZScpXG4gICAgICAgICAgICAudGV4dCh2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHknKVxuICAgICAgICAgICAgLmh0bWwodmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdUYWdzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdmlldyB0byB0YWc6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvVGFnKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRhZ3NbZF0ubmFtZSgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MtLXRhZycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZ3NbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS1lZHVjYXRvcnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQXV0aG9yJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50JytcbiAgICAgICAgICAgICAgICAgICAgICAgJy0tZWR1Y2F0b3JzLS1lZHVjYXRvcicpXG4gICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9tb2RlbC5lZHVjYXRvcnMoKSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gZWR1Y2F0b3I6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvRWR1Y2F0b3Ioe1xuICAgICAgICAgICAgICAgICAgICBpZDogZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZWR1Y2F0b3JzW2RdLm5hbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICctLWVkdWNhdG9ycy0tZWR1Y2F0b3InKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkdWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkdWNhdG9yc1tkXS5uYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfZWRpdGFibGVfY29udGVudCAoc2VsKSB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzb3VyY2VfbW9kZWwuZGF0YSgpO1xuXG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fZGlzcGxheWVkKTtcblxuICAgICAgICB2YXIgZm9ybSA9IHNlbC5hcHBlbmQoJ2Zvcm0nKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC1mb3JtJylcbiAgICAgICAgICAgIC5hdHRyKCdvblN1Ym1pdCcsICdyZXR1cm4gZmFsc2U7Jyk7XG5cbiAgICAgICAgdmFyIGVkaXRhYmxlX3RpdGxlID0gZm9ybS5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC0tdGl0bGUtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgndmFsdWUnLCB2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICAvLyByZXBsYWNlIHdpdGggYW4gaHRtbCBlZGl0b3IuXG4gICAgICAgIC8vIGJvZHkuaHRtbCBpbiwgcHVsbCBvdXQgdmFsdWUgYW5kXG4gICAgICAgIC8vIHN0YXNoIGl0IGJhY2sgaW50byBib2R5Lmh0bWxcbiAgICAgICAgdmFyIGVkaXRhYmxlX2JvZHlfaHRtbCA9IGZvcm0uYXBwZW5kKCd0ZXh0YXJlYScpXG4gICAgICAgICAgICAuYXR0cignaWQnLCAncmVzb3VyY2UtY29udGVudC0tYm9keS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC0tYm9keS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24uYm9keS5odG1sKTtcblxuICAgICAgICB2YXIgZWRpdGFibGVfdGFncyA9IGZvcm1cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuZGF0YSh2ZXJzaW9uLnRhZ3MpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFnc1tkXS5uYW1lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgnY2hlY2tlZCcsIHRydWUpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdDYW5jZWwnKVxuICAgICAgICAgICAgLnRleHQoJ0NhbmNlbCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnc3VibWl0JylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdTYXZlJylcbiAgICAgICAgICAgIC50ZXh0KCdTYXZlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRfdGFnc19pZCA9IFtdO1xuICAgICAgICAgICAgICAgIGVkaXRhYmxlX3RhZ3MuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KHRoaXMpLnByb3BlcnR5KCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkX3RhZ3NfaWQucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBuZXdfdmVyc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVkaXRhYmxlX3RpdGxlLnByb3BlcnR5KCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBlZGl0YWJsZV9ib2R5X2h0bWwucHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogc2VsZWN0ZWRfdGFnc19pZFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5ld192ZXJzaW9uLnRpdGxlICE9PSB2ZXJzaW9uLnRpdGxlKSB8XG4gICAgICAgICAgICAgICAgICAgIChuZXdfdmVyc2lvbi5ib2R5Lmh0bWwgIT09IHZlcnNpb24uYm9keS5odG1sKSB8XG4gICAgICAgICAgICAgICAgICAgICghKGFycmF5RXF1YWxzKG5ld192ZXJzaW9uLnRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uLnRhZ3MpKSkpIHtcblxuICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2F2ZUVkaXRhYmxlKG5ld192ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNhbmNlbEVkaXRhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJyYXlFcXVhbHMgKGFycjEsIGFycjIpIHtcbiAgICAgICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBhcnIxLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgIGlmIChhcnIxW2ldICE9PSBhcnIyW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICBcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
