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

            if ((namespace !== 'me') &
                (!self.get(namespace, id))) {
                // `me` does not get updated
                // if this is a new namespace+id combo,
                // increment the metadata
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc0FkZENvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc1ZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvSW5kZXhWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL01lVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9SZXNvdXJjZVZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvVGFnVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9mYWtlX2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9oYXNoLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9jbGFzcy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL2VkdWNhdG9yLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvbW9kZWwvbWUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL3RhZy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvY2xhc3NfY3JlYXRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19yZXNvdXJjZV9saXN0LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19zZWxlY3RhYmxlX2xpc3QuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvdGFnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVzb3VyY2VNb2RlbCAgICA9IHJlcXVpcmUoJy4vbW9kZWwvcmVzb3VyY2UnKTtcbnZhciBDbGFzc01vZGVsICAgICAgID0gcmVxdWlyZSgnLi9tb2RlbC9jbGFzcycpO1xudmFyIE1lTW9kZWwgICAgICAgICAgPSByZXF1aXJlKCcuL21vZGVsL21lJyk7XG52YXIgQ2xhc3NWaWV3Q3JlYXRlICA9IHJlcXVpcmUoJy4vdmlldy9jbGFzc19jcmVhdGUnKTtcbnZhciBDbGFzc1ZpZXdMaXN0ICAgID0gcmVxdWlyZSgnLi92aWV3L2NsYXNzX3NlbGVjdGFibGVfbGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQWRkQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX2RhdGE7XG4gICAgdmFyIHJlc291cmNlX21vZGVsO1xuICAgIHZhciBjbGFzc19tb2RlbHM7XG4gICAgdmFyIG1lO1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xhc3NBZGRDb250cm9sbGVyLnJlbmRlcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhkKTtcblxuICAgICAgICBtZSA9IE1lTW9kZWwoKVxuICAgICAgICAgICAgLmRhdGEoY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdtZScsICdtZScpKTtcblxuICAgICAgICAvLyBjbGFzc19pZDogY2xhc3NfbW9kZWxcbiAgICAgICAgY2xhc3NfbW9kZWxzID0gW107XG4gICAgICAgIG1lLmNsYXNzZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NfZGF0YSA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgnY2xhc3NlcycsIGQpO1xuICAgICAgICAgICAgY2xhc3NfbW9kZWxzLnB1c2goQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSkpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHJlc291cmNlX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgncmVzb3VyY2VzJywgZC5yZXNvdXJjZV9pZCk7XG5cbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9kYXRhKTtcblxuICAgICAgICAvLyB2aWV3c1xuICAgICAgICBjbGFzc19saXN0X3ZpZXcgPSBDbGFzc1ZpZXdMaXN0KClcbiAgICAgICAgICAgIC5jbGFzc2VzKGNsYXNzX21vZGVscyk7XG5cbiAgICAgICAgY2xhc3NfY3JlYXRlID0gQ2xhc3NWaWV3Q3JlYXRlKCk7XG5cbiAgICAgICAgLy8gZGlzcGF0Y2hlcnNcbiAgICAgICAgY2xhc3NfbGlzdF92aWV3LmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2NsYXNzU2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vIGQgPT4gQ2xhc3NNb2RlbFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGFzcyBzZWxlY3RlZCcsIGQudGl0bGUoKSk7XG5cbiAgICAgICAgICAgICAgICBkLnJlc291cmNlcy5hZGQocmVzb3VyY2VfbW9kZWwuaWQoKSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgLnNldCgnY2xhc3NlcycsIGQuaWQoKSwgZC5kYXRhKCkpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAndmlldycsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzX2lkOiBkLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzX3RpdGxlOiBkLnRpdGxlKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzX2NyZWF0ZS5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGFzc0NyZWF0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vIGQgPT4gbmV3IGNsYXNzIHRpdGxlXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBkLFxuICAgICAgICAgICAgICAgICAgICBpZDogY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCdjbGFzc2VzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGEgbmV3IGNsYXNzOiAnLCBjbGFzc19kYXRhKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2NsYXNzID0gQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbGFzc2VzLmFkZChuZXdfY2xhc3MuaWQoKSk7XG5cbiAgICAgICAgICAgICAgICBjbGFzc19saXN0X3ZpZXdcbiAgICAgICAgICAgICAgICAgICAgLmFkZF9jbGFzcyhuZXdfY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIC51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlLnNldCgnbWUnLCAnbWUnLCBtZS5kYXRhKCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ2NsYXNzZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19jbGFzcy5pZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19jbGFzcy5kYXRhKCkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBsYXlvdXRcbiAgICAgICAgY29udGV4dC5ib2R5X3NlbC5odG1sKCcnKTtcbiAgICAgICAgY2xhc3NfbGlzdF92aWV3XG4gICAgICAgICAgICAuY29udGFpbmVyKFxuICAgICAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgLmJvZHlfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2xhc3MtbGlzdC1jb250YWluZXInKSk7XG4gICAgICAgIGNsYXNzX2NyZWF0ZVxuICAgICAgICAgICAgLmNvbnRhaW5lcihcbiAgICAgICAgICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5ib2R5X3NlbFxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWFkZC1jb250YWluZXInKSk7XG5cbiAgICAgICAgY2xhc3NfbGlzdF92aWV3LnJlbmRlcigpO1xuICAgICAgICBjbGFzc19jcmVhdGUucmVuZGVyKCk7XG4gICAgICAgIFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL3Jlc291cmNlJyk7XG52YXIgQ2xhc3NNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvY2xhc3MnKTtcbnZhciBDbGFzc1ZpZXdSZXNvdXJjZUxpc3QgPSByZXF1aXJlKCcuL3ZpZXcvY2xhc3NfcmVzb3VyY2VfbGlzdCcpO1xudmFyIENsYXNzQWRkID0gcmVxdWlyZSgnLi9DbGFzc0FkZENvbnRyb2xsZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc0NvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5hY3Rpb25zID0ge307XG5cbiAgICBzZWxmLmFjdGlvbnMuYWRkID0gQ2xhc3NBZGQoY29udGV4dCk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGFzc0FkZENvbnRyb2xsZXIucmVuZGVyIC0gJytcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJ2aWV3IG9mIGNsYXNzZXMuJyk7XG4gICAgICAgIHZhciBjbGFzc19kYXRhID1cbiAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlLmdldCgnY2xhc3NlcycsIGhhc2guY2xhc3NfaWQpO1xuXG4gICAgICAgIHZhciByZXNvdXJjZV9tb2RlbHMgPSBbXTtcbiAgICAgICAgdmFyIGNsYXNzX21vZGVsID0gQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSk7XG5cbiAgICAgICAgY2xhc3NfbW9kZWwucmVzb3VyY2VzKCkuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlX2RhdGEgPSBjb250ZXh0LmRhdGFzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgncmVzb3VyY2VzJywgZCk7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKHJlc291cmNlX2RhdGEpO1xuICAgICAgICAgICAgcmVzb3VyY2VfbW9kZWxzLnB1c2gocmVzb3VyY2VfbW9kZWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc192aWV3X3Jlc291cmNlX2xpc3QgPSBDbGFzc1ZpZXdSZXNvdXJjZUxpc3QoKVxuICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgLmNsYXNzTW9kZWwoY2xhc3NfbW9kZWwpXG4gICAgICAgICAgICAucmVzb3VyY2VNb2RlbHMocmVzb3VyY2VfbW9kZWxzKTtcblxuICAgICAgICBjbGFzc192aWV3X3Jlc291cmNlX2xpc3QucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgSW5kZXhWaWV3ICA9IHJlcXVpcmUoJy4vdmlldy9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluZGV4Q29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZpZXcgID0gSW5kZXhWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKTtcblxuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBNZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9tZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE1lQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLm1vZGVsID0gTWVNb2RlbCgpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBUYWdNb2RlbCAgICAgID0gcmVxdWlyZSgnLi9tb2RlbC90YWcnKTtcbnZhciBFZHVjYXRvck1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9lZHVjYXRvcicpO1xudmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL3Jlc291cmNlJyk7XG52YXIgUmVzb3VyY2VWaWV3ICA9IHJlcXVpcmUoJy4vdmlldy9yZXNvdXJjZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX2RhdGE7XG4gICAgdmFyIHJlc291cmNlX21vZGVsO1xuICAgIHZhciB0YWdfbW9kZWxzO1xuICAgIHZhciBlZHVjYXRvcl9tb2RlbHM7XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJlc291cmNlX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdyZXNvdXJjZXMnLCBkLmlkKTtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKCkuZGF0YShyZXNvdXJjZV9kYXRhKTtcblxuICAgICAgICB0YWdfbW9kZWxzID0ge307XG4gICAgICAgIHZhciB0YWdfaWRzID0gcmVzb3VyY2VfbW9kZWwudGFncygpO1xuICAgICAgICB0YWdfaWRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ3RhZ3MnLCBkKTtcbiAgICAgICAgICAgIHRhZ19tb2RlbHNbdGFnLmlkXSA9IFRhZ01vZGVsKCkuZGF0YSh0YWcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZHVjYXRvcl9tb2RlbHMgPSB7fTtcbiAgICAgICAgdmFyIGVkdWNhdG9yX2lkcyA9IHJlc291cmNlX21vZGVsLmVkdWNhdG9ycygpO1xuICAgICAgICBlZHVjYXRvcl9pZHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkdWNhdG9yIGlkcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICB2YXIgZWR1Y2F0b3IgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ2VkdWNhdG9ycycsIGQpO1xuICAgICAgICAgICAgZWR1Y2F0b3JfbW9kZWxzXG4gICAgICAgICAgICAgICAgW2VkdWNhdG9yLmlkXSA9IEVkdWNhdG9yTW9kZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoZWR1Y2F0b3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3ICA9IFJlc291cmNlVmlldygpXG4gICAgICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbClcbiAgICAgICAgICAgICAgICAgICAgLnJlc291cmNlTW9kZWwocmVzb3VyY2VfbW9kZWwpXG4gICAgICAgICAgICAgICAgICAgIC50YWdzKHRhZ19tb2RlbHMpXG4gICAgICAgICAgICAgICAgICAgIC5lZHVjYXRvcnMoZWR1Y2F0b3JfbW9kZWxzKTtcblxuICAgICAgICBpZiAoZC52ZXJzaW9uKSB7XG4gICAgICAgICAgICB2aWV3LnZlcnNpb24oZC52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC5lZGl0KSB7XG4gICAgICAgICAgICB2aWV3LmVkaXQoZC5lZGl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZXcuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvVGFnLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0YWcnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICd2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgdGFnX2lkOiBkLmlkLFxuICAgICAgICAgICAgICAgICAgICB0YWdfbmFtZTogZC5uYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdhZGRUb0NsYXNzLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdhZGQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9pZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfdGl0bGU6IHZlcnNpb24udGl0bGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZXdUb0NsYXNzJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9FZHVjYXRvci5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlVmlld1RvRWR1Y2F0b3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldFZlcnNpb24uY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjYW5jZWxFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2F2ZUVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGVkaXRhYmxlLicpO1xuICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLnZlcnNpb25zLmFkZChkKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5zZXQoJ3Jlc291cmNlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLmRhdGEoKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbl9udW1iZXIgPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpO1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX251bWJlcik7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHZpZXcuZWRpdCgpID8gJ2VkaXQnIDogJ3ZpZXcnLFxuICAgICAgICAgICAgICAgICAgICBpZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZlcnNpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUgKCkge1xuICAgICAgICB2YXIgdmVyc2lvbl9udW1iZXIgPSB2aWV3LnZlcnNpb24oKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICBhY3Rpb246IHZpZXcuZWRpdCgpID8gJ2VkaXQnIDogJ3ZpZXcnLFxuICAgICAgICAgICAgaWQ6IHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICB0aXRsZTogdmVyc2lvbi50aXRsZSxcbiAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFRhZ1ZpZXcgPSByZXF1aXJlKCcuL3ZpZXcvdGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGFnQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNvdXJjZUNvbnRyb2xsZXIucmVuZGVyJyk7XG5cbiAgICAgICAgdmlldyAgPSBUYWdWaWV3KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbCk7XG5cbiAgICAgICAgLy8gYXR0YWNoIGRpc3BhdGNoIG1lc3NhZ2luZyB0byB2aWV3XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlc291cmNlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wibWFwc1wiLCBcImRvdWctc2NvdHRcIiwgXCJtYWtpbmctbWVhbmluZ1wiXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnY29saW5AZW1haWwuY29tJ11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB2ZXJzaW9uczogW3tcbiAgICAgICAgICAgIHRpdGxlOiAnTWFwcGluZzogVGhlIEpvdXJuZXkgYXMgQ29udGV4dCBmb3IgbmFycmF0aXZlJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBodG1sOiAnPHA+PHN0cm9uZz5NYXBzPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJtYXBzXCIsIFwiZG91Zy1zY290dFwiLCBcIm1ha2luZy1tZWFuaW5nXCJdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIE5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwcyE8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIm1hcHNcIiwgXCJkb3VnLXNjb3R0XCIsIFwibWFraW5nLW1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2FudGhlckBlbWFpbC5jb20nXVxuICAgICAgICB9XSxcbiAgICAgICAgY2xhc3NlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdGl0bGU6ICdDb2xpblxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnY29saW5AZW1haWwuY29tJ11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0aXRsZTogJ0FudGhlclxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMV0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnYW50aGVyQGVtYWlsLmNvbSddXG4gICAgICAgIH1dLFxuICAgICAgICBlZHVjYXRvcnM6IFt7XG4gICAgICAgICAgICBpZDogJ2NvbGluQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBlbWFpbDogJ2NvbGluQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAnQ29saW4nLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAnRnJhemVyJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgY2xhc3NlczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYW50aGVyQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBlbWFpbDogJ2FudGhlckBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0FudGhlcicsXG4gICAgICAgICAgICBsYXN0X25hbWU6ICdLaWxleScsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgdGFnczogW3tcbiAgICAgICAgICAgIGlkOiBcIm1hcHNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiTWFwc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcImRvdWctc2NvdHRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRG91ZyBTY290dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcIm1ha2luZy1tZWFuaW5nXCIsXG4gICAgICAgICAgICBuYW1lOiBcIk1ha2luZyBNZWFuaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIG1lOiBbe1xuICAgICAgICAgIGlkOiAnbWUnLFxuICAgICAgICAgIGNsYXNzZXM6IFtdLFxuICAgICAgICAgIHJlc291cmNlczogW11cbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgdmFyIG1ldGEgPSB7XG4gICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgY291bnQ6IGRhdGEucmVzb3VyY2VzLmxlbmd0aFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICBjb3VudDogZGF0YS5jbGFzc2VzLmxlbmd0aFxuICAgICAgICB9LFxuICAgICAgICBlZHVjYXRvcnM6IHtcbiAgICAgICAgICAgIGNvdW50OiBkYXRhLmVkdWNhdG9ycy5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgY291bnQ6IGRhdGEudGFncy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIGluaXRpYWxpemUgdGhlIGRhdGFcbiAgICBkYXRhLnJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXNvdXJjZXMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLmNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhc3NlcyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEuZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkdWNhdG9ycyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEudGFncy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFncyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLm1lLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21lIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGFcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIC5zZXRJdGVtKFxuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhW2tleV0pKTtcbiAgICB9XG5cbiAgICBzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkLCBkKSB7XG4gICAgICAgIHZhciB1cGRhdGVfbWV0YWRhdGEgPSBmYWxzZTtcbiAgICAgICAgdmFyIGl0ZW1faWQgPSBuYW1lc3BhY2U7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBpdGVtX2lkICs9ICgnIScgKyBpZCk7XG5cbiAgICAgICAgICAgIGlmICgobmFtZXNwYWNlICE9PSAnbWUnKSAmXG4gICAgICAgICAgICAgICAgKCFzZWxmLmdldChuYW1lc3BhY2UsIGlkKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBgbWVgIGRvZXMgbm90IGdldCB1cGRhdGVkXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIG5ldyBuYW1lc3BhY2UraWQgY29tYm8sXG4gICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgIHVwZGF0ZV9tZXRhZGF0YSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ3NldHRpbmc6ICcgKyBpdGVtX2lkKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuXG4gICAgICAgIGlmICh1cGRhdGVfbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHZhciBtZXRhID0gc2VsZi5nZXQobmFtZXNwYWNlKTtcbiAgICAgICAgICAgIG1ldGEuY291bnQgKz0gMTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGEpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkKSB7XG4gICAgICAgIHZhciBpdGVtX2lkID0gbmFtZXNwYWNlO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaXRlbV9pZCArPSAoJyEnICsgaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpdGVtX2lkKSk7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzaEZhY3RvcnkgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NoYW5nZScpO1xuXG4gICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBzZWxmLmlzKCk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZShjdXJyZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLmlzID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gZ2V0dGVyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlX2hhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dGVyXG4gICAgICAgIHZhciBoYXNoID0gJy8nO1xuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBoYXNoID0gZm9ybWF0X3Jlc291cmNlX2hhc2goZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICBoYXNoID0gZm9ybWF0X2NsYXNzX2hhc2goZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAndGFnJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF90YWdfaGFzaChkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhhc2g7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXQgaGFzaDogJywgaGFzaCk7XG5cbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlX2hhc2ggKGhhc2gpIHtcbiAgICAgICAgdmFyIGludGVnZXJfcmVnZXggPSAvXlxcZCskLztcblxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzID0gKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgICAgICBpbnB1dC5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pKGhhc2guc3BsaXQoJy8nKSk7XG5cbiAgICAgICAgdmFyIHBhcnNlZCA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbmRleCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3NbMV0sXG4gICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgIHBhcnNlZC50aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC52ZXJzaW9uID0gYXJnc1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLmVkaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzWzFdLm1hdGNoKGludGVnZXJfcmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZpZXdpbmcgYSBwYXJ0aWN1bGFyIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5jbGFzc19pZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuY2xhc3NfdGl0bGUgPSBhcmdzWzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgoYXJncy5sZW5ndGggPj0gNCkgJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGFyZ3NbM10gPT09ICdlZGl0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5hY3Rpb24gPSBhcmdzWzNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc29tZSBhY3Rpb24gaXMgYmVpbmcgdGFrZW4gb24gdGhlIGNsYXNzXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWN0aW9uID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzWzJdID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnR5cGUgPSBhcmdzWzJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnJlc291cmNlX2lkID0gYXJnc1szXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3RhZycpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndGFnJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246ICd2aWV3J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcmVzb3VyY2VfaGFzaChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWydyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgIGQudGl0bGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlX2Zvcl91cmwoZC50aXRsZSkgOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBkLnZlcnNpb25dO1xuXG4gICAgICAgIGlmIChkLmFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goJ2VkaXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X2NsYXNzX2hhc2ggKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ2NsYXNzJ107XG4gICAgICAgIC8vIGRlZmF1bHQgYWN0aW9uIGlzIHRvIHZpZXdcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgLy8gYWN0aW9uIHRha2VuIG9uIHRoZSBjbGFzc1xuICAgICAgICAgICAgLy8gc3VjaCBhcyAnYWRkJyAtLSAnYWRkIHRvIGNsYXNzJ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLnR5cGUpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGQucmVzb3VyY2VfaWQpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGVzY2FwZV9mb3JfdXJsKGQucmVzb3VyY2VfdGl0bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLmNsYXNzX2lkKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChlc2NhcGVfZm9yX3VybChkLmNsYXNzX3RpdGxlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgLy8gc2hvdWxkIG5ldmVyIGJlIGEgc3RhdGUgd2hlcmVcbiAgICAgICAgICAgIC8vIGVkaXQgaXMgdHJ1ZSAmIGFjdGlvbiBpcyBhIHN0cmluZ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3RhZ19oYXNoIChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWyd0YWcnXTtcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucHVzaChkLnRhZ19pZCk7XG4gICAgICAgIGFyZ3MucHVzaChkLm5hbWUpO1xuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2Zvcl91cmwgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgSGFzaCAgICAgPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBSb3V0ZXIgICA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG52YXIgRGF0YSAgICAgPSByZXF1aXJlKCcuL2Zha2VfZGF0YScpO1xudmFyIFJlc291cmNlID0gcmVxdWlyZSgnLi9SZXNvdXJjZVZpZXdDb250cm9sbGVyJyk7XG52YXIgQ2xhc3MgICAgPSByZXF1aXJlKCcuL0NsYXNzVmlld0NvbnRyb2xsZXInKTtcbnZhciBJbmRleCAgICA9IHJlcXVpcmUoJy4vSW5kZXhWaWV3Q29udHJvbGxlcicpO1xudmFyIFRhZyAgICAgID0gcmVxdWlyZSgnLi9UYWdWaWV3Q29udHJvbGxlcicpO1xudmFyIE1lICAgICAgID0gcmVxdWlyZSgnLi9NZVZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG5cbiAgICAvLyB2aWV3IGNvbnRyb2xsZXJzXG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LmNsYXNzXyAgICA9IENsYXNzKGNvbnRleHQpO1xuICAgIGNvbnRleHQuaW5kZXggICAgID0gSW5kZXgoY29udGV4dCk7XG4gICAgY29udGV4dC5yb3V0ZXIgICAgPSBSb3V0ZXIoY29udGV4dCk7XG4gICAgY29udGV4dC50YWcgICAgICAgPSBUYWcoY29udGV4dCk7XG4gICAgY29udGV4dC5tZSAgICAgICAgPSBNZShjb250ZXh0KTtcblxuICAgIChmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICAgICAgY29udGV4dC5yb3V0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH0pKCk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc01vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBpZDtcbiAgICB2YXIgdGl0bGU7XG4gICAgdmFyIGVkdWNhdG9ycyA9IFtdO1xuICAgIHZhciByZXNvdXJjZXMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi50aXRsZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpdGxlO1xuICAgICAgICB0aXRsZSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmVkdWNhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVkdWNhdG9ycztcbiAgICB9O1xuICAgIHNlbGYuZWR1Y2F0b3JzLmFkZCA9IGZ1bmN0aW9uIChlZHVjYXRvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBlZHVjYXRvcl9pZFwiO1xuICAgICAgICBcbiAgICAgICAgdmFyIGluX2VkdWNhdG9ycyA9IGZhbHNlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fZWR1Y2F0b3JzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9lZHVjYXRvcnMpIHtcbiAgICAgICAgICAgIGVkdWNhdG9ycy5wdXNoKGVkdWNhdG9yX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5lZHVjYXRvcnMucmVtb3ZlID0gZnVuY3Rpb24gKGVkdWNhdG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGVkdWNhdG9yX2lkXCI7XG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbl9yZXNvdXJjZXMgPSBmYWxzZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGluX3Jlc291cmNlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgZWR1Y2F0b3JzOiBlZHVjYXRvcnMsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCA9IHguaWQ7XG4gICAgICAgIHRpdGxlID0geC50aXRsZTtcbiAgICAgICAgZWR1Y2F0b3JzID0geC5lZHVjYXRvcnMgfHwgW107XG4gICAgICAgIHJlc291cmNlcyA9IHgucmVzb3VyY2VzIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFZHVjYXRvck1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBlbWFpbDtcbiAgICB2YXIgZmlyc3RfbmFtZSA9ICcnO1xuICAgIHZhciBsYXN0X25hbWUgID0gJyc7XG5cblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbWFpbF90b19pZChlbWFpbCk7XG4gICAgfTtcblxuICAgIHNlbGYuZW1haWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbWFpbDtcbiAgICB9O1xuXG4gICAgc2VsZi5uYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKChmaXJzdF9uYW1lKSA/IChmaXJzdF9uYW1lICsgJyAnKSA6ICcnKSArXG4gICAgICAgICAgICAgICBsYXN0X25hbWU7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0X25hbWU7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGFzdF9uYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQgICAgICAgIDogZW1haWxfdG9faWQoZW1haWwpLFxuICAgICAgICAgICAgICAgIGVtYWlsICAgICA6IGVtYWlsLFxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lIDogbGFzdF9uYW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgICA9IGQuaWQ7XG4gICAgICAgIGVtYWlsICAgICAgPSBkLmVtYWlsO1xuICAgICAgICBmaXJzdF9uYW1lID0gZC5maXJzdF9uYW1lO1xuICAgICAgICBsYXN0X25hbWUgID0gZC5sYXN0X25hbWU7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVtYWlsX3RvX2lkIChlKSB7XG4gICAgICAgIHJldHVybiBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIi8vIFRyYWNrcyBFZHVjYXRvciBsb2dnZWQgaW4gc3RhdGUsIGFuZFxuLy8ga2VlcHMgYSByZWZlcmVuY2UgdG8gdGhlaXIgRWR1Y2F0b3IgaWRcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cbiAgICB2YXIgaWQ7XG4gICAgdmFyIGNsYXNzZXMgICA9IFtdO1xuICAgIHZhciByZXNvdXJjZXMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi5hdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYXV0aGVudGljYXRlZDtcbiAgICAgICAgYXV0aGVudGljYXRlZCA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH07XG4gICAgc2VsZi5jbGFzc2VzLmFkZCA9IGZ1bmN0aW9uIChjbGFzc19pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBjbGFzc19pZFwiO1xuXG4gICAgICAgIHZhciBpbl9jbGFzc2VzID0gZmFsc2U7XG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGNsYXNzX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fY2xhc3NlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fY2xhc3Nlcykge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5jbGFzc2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChjbGFzc19pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBjbGFzc19pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGNsYXNzX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgIDogaWQsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyAgOiBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgID0geC5pZDtcbiAgICAgICAgY2xhc3NlcyAgID0geC5jbGFzc2VzO1xuICAgICAgICByZXNvdXJjZXMgPSB4LnJlc291cmNlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHZhciBpZDtcbiAgICB2YXIgdmVyc2lvbnMgPSBbXTtcbiAgICB2YXIgZWR1Y2F0b3JzICA9IFtdO1xuICAgIHZhciBjbGFzc2VzICA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb25zID0ge307XG4gICAgc2VsZi52ZXJzaW9ucy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgLy8gcmVzb3VyY2VzIGFyZSBub3QgdW5pcXVlLlxuICAgICAgICAvLyB0aGUgdmlldyBlbnN1cmVzIGEgY2hhbmdlIGhhcyBvY2N1cmVkXG4gICAgICAgIC8vIGJlZm9yZSBwYXNzaW5nIGEgbmV3IHZlcnNpb24gaW5cbiAgICAgICAgdmVyc2lvbnMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5nZXQgPSBmdW5jdGlvbiAodmVyc2lvbl9pZCkge1xuICAgICAgICAvLyBkb24ndCBtYWtlIHRoZSB1c2VyIHRoaW5rIGFib3V0IHRoZSBmYWN0XG4gICAgICAgIC8vIHRoYXQgY291bnRpbmcgc3RhcnRzIGZyb20gMC4gQmVjYXVzZVxuICAgICAgICAvLyB0aGVyZSB3aWxsIG5ldmVyIGJlIGEgdmVyc2lvbiAwLlxuICAgICAgICBpZiAodmVyc2lvbl9pZCA+IHZlcnNpb25zLmxlbmd0aCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2ZXJzaW9uc1t2ZXJzaW9uX2lkLTFdO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5jb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zLmxlbmd0aDtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMubGF0ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZi52ZXJzaW9ucy5nZXQoc2VsZi52ZXJzaW9ucy5jb3VudCgpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5lZHVjYXRvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlZHVjYXRvcnM7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5hZGQgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcblxuICAgICAgICB2YXIgaW5fZWR1Y2F0b3JzID0gZmFsc2U7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbl9lZHVjYXRvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX2VkdWNhdG9ycykge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnB1c2goZWR1Y2F0b3JfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5yZW1vdmUgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcblxuICAgICAgICB2YXIgaW5kZXhfdG9fcmVtb3ZlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXTtcbiAgICAgICAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdGFncyA9IHRhZ3MuY29uY2F0KGQudGFncyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2V0X3VuaXF1ZSh0YWdzKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gICAgICAgICAgICAgICAgZWR1Y2F0b3JzIDogZWR1Y2F0b3JzLFxuICAgICAgICAgICAgICAgIHRhZ3MgICAgOiB0YWdzLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMgOiBjbGFzc2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgPSB4LmlkO1xuICAgICAgICB2ZXJzaW9ucyA9IHgudmVyc2lvbnM7XG4gICAgICAgIGVkdWNhdG9ycyAgPSB4LmVkdWNhdG9ycztcbiAgICAgICAgdGFncyAgICAgPSB4LnRhZ3M7XG4gICAgICAgIGNsYXNzZXMgID0geC5jbGFzc2VzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfdW5pcXVlIChhcnIpIHtcbiAgICAgICAgdmFyIHUgPSB7fTtcbiAgICAgICAgdmFyIGEgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHUuaGFzT3duUHJvcGVydHkoYXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYS5wdXNoKGFycltpXSk7XG4gICAgICAgICAgICB1W2FycltpXV0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIi8vIFRhZ3MgYXJlIGluZGV4ZWQgYnkgYW4gZXNjYXBlZCB0YWcgbmFtZVxuLy8gdGhpcyB3YXksIHRhZ3MgYXJlIG5vcm1hbGl6ZWQsIGFuZCB0aGVyZVxuLy8gd2lsbCBiZSBubyBkdXBsaWNhdGUgdGFncy5cblxuLy8gJ3RhZyFncmFwaGljLWRlc2lnbicgPSB7IHRhZzogJ0dyYXBoaWMgRGVzaWduJ31cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUYWdNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgbmFtZTtcbiAgICB2YXIgcmVzb3VyY2VzID0gW107XG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFnX3RvX2lkKG5hbWUpO1xuICAgIH07XG5cbiAgICBzZWxmLm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBjbGVhbiA9IGZhbHNlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgY2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsZWFuKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBzZWxmLmlkKCksXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkID0geC5pZDtcbiAgICAgICAgbmFtZSA9IHgubmFtZTtcbiAgICAgICAgcmVzb3VyY2VzID0geC5yZXNvdXJjZXM7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRhZ190b19pZCAodCkge1xuICAgICAgICByZXR1cm4gdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3V0ZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBwcmV2aW91c192aWV3ID0ge1xuICAgICAgICBjb250cm9sbGVyOiAnaW5kZXgnXG4gICAgfTtcblxuICAgIGNvbnRleHQuaGFzaC5kaXNwYXRjaFxuICAgICAgICAub24oJ2NoYW5nZS5yb3V0ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2V0KGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0KGNvbnRleHQuaGFzaC5pcygpKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldCAoZCkge1xuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc291cmNlLnJlbmRlcihkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIGlmIChkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xhc3NfLmFjdGlvbnMuYWRkLnJlbmRlcihkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGFzc18ucmVuZGVyKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3RhZycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyb3V0ZSB0byB0YWcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgY29udGV4dC50YWcucmVuZGVyKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2luZGV4Jykge1xuICAgICAgICAgICAgY29udGV4dC5pbmRleC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICc0MDQnKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LmVycm9yLnJlbmRlcignNDA0JylcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzX3ZpZXcgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQ3JlYXRlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuXG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NsYXNzQ3JlYXRlZCcpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZm9ybSA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0td3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdmb3JtJylcbiAgICAgICAgICAgICAgICAuYXR0cignbmFtZScsICdjbGFzcy1jcmVhdGUtLWZvcm0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvblN1Ym1pdCcsICdyZXR1cm4gZmFsc2U7Jyk7XG5cbiAgICAgICAgdmFyIGlucHV0ID1cbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0tbGFiZWwnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdOZXcgY2xhc3MgdGl0bGUnKVxuICAgICAgICAgICAgLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjbGFzcy1jcmVhdGUtLWlucHV0JylcbiAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0tYnV0dG9uJylcbiAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdidXR0b24nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdDcmVhdGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdDcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdfY2xhc3NfbmFtZSA9IGlucHV0LnByb3BlcnR5KCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3X2NsYXNzX25hbWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc0NyZWF0ZWQobmV3X2NsYXNzX25hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucHJvcGVydHkoJ3ZhbHVlJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NWaWV3UmVzb3VyY2VMaXN0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjbGFzc19tb2RlbDtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWxzO1xuXG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ3gnKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jbGFzc01vZGVsID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2xhc3NfbW9kZWw7XG4gICAgICAgIGNsYXNzX21vZGVsID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VNb2RlbHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbHM7XG4gICAgICAgIHJlc291cmNlX21vZGVscyA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmh0bWwoJycpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0td3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAgICAgLnRleHQoY2xhc3NfbW9kZWwudGl0bGUoKSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICdjbGFzcy12aWV3LXJlc291cmNlLWxpc3QtLWxpc3QnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmNsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0tbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5kYXRhKHJlc291cmNlX21vZGVscylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgJ2NsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0tbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC52ZXJzaW9ucy5sYXRlc3QoKS50aXRsZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzU2VsZWN0YWJsZUxpc3RWaWV3ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjbGFzc2VzID0gW107XG5cbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgbGlzdF9zZWxfd3JhcHBlcjtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xhc3NTZWxlY3RlZCcpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYWRkX2NsYXNzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIlJlcXVpcmVzIENsYXNzIE1vZGVsXCI7XG4gICAgICAgIGNsYXNzZXMucHVzaCh4KTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzIHNlbGVjdGFibGUgbGlzdCB2aWV3IC0gYWRkIGNsYXNzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxpc3Rfc2VsX3dyYXBwZXIgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWxlY3RhYmxlLWNsYXNzLWxpc3Qtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NlbGVjdGFibGUtY2xhc3MtbGlzdCcpO1xuXG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGlzdF9zZWxfd3JhcHBlclxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnNlbGVjdGFibGUtY2xhc3MtbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5kYXRhKGNsYXNzZXMsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmlkKCk7IH0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWxlY3RhYmxlLWNsYXNzLWxpc3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xhc3NTZWxlY3RlZChkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGl0bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleFZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2gxJykudGV4dCgnRGF0YWJhbmsuJyk7XG4gICAgICAgIGdyaWQuYXBwZW5kKCdoNCcpLnRleHQoJ1RoZSBiZWdpbm5pbmcuJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8wLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBIHJlc291cmNlJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8xLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBbm90aGVyIHJlc291cmNlJyk7XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSB7fTtcbiAgICB2YXIgZWR1Y2F0b3JzICAgICAgPSB7fTtcbiAgICB2YXIgdGFncyAgICAgICAgICAgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHZhciBlZGl0ID0gZmFsc2U7XG4gICAgdmFyIHZlcnNpb25fZGlzcGxheWVkO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhZGRUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb1RhZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYW5jZWxFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzYXZlRWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9FZHVjYXRvcicpO1xuXG4gICAgdmFyIGxheW91dF9hY3Rpb25hYmxlX2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWFjdGlvbnMnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1hY3Rpb25zIGxlZnQgZml4ZWQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnNcbiAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHZhciBsYXlvdXRfZWRpdGFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgZWRpdGFibGUgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9lZGl0YWJsZV9jb250ZW50XG4gICAgfV07XG5cbiAgICBzZWxmLnJlc291cmNlTW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmVzb3VyY2VfbW9kZWw7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gbW9kZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRhZ3MgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YWdzO1xuICAgICAgICB0YWdzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWR1Y2F0b3JzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZWR1Y2F0b3JzO1xuICAgICAgICBlZHVjYXRvcnMgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb24gPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2ZXJzaW9uX2Rpc3BsYXllZDtcbiAgICAgICAgdmVyc2lvbl9kaXNwbGF5ZWQgPSAreDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWRpdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGVkaXQ7XG4gICAgICAgIGVkaXQgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgoIXNlbGYudmVyc2lvbigpKSB8XG4gICAgICAgICAgICAoc2VsZi52ZXJzaW9uKCkgPiByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSkpIHtcblxuICAgICAgICAgICAgc2VsZi52ZXJzaW9uKHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciByZW5kZXJfbWV0aG9kO1xuICAgICAgICBpZiAoZWRpdCkge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9lZGl0YWJsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlcl9tZXRob2QgPSByZW5kZXJfYWN0aW9uYWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyaWQuY2FsbChyZW5kZXJfbWV0aG9kKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2VkaXRhYmxlIChzZWwpIHtcbiAgICAgICAgdmFyIGxheW91dCA9IHNlbC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2VkaXRhYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2FjdGlvbmFibGUgKHNlbCkge1xuXG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9hY3Rpb25hYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBzZWwuY2FsbChkLmxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9hY3Rpb25zIChzZWwpIHtcbiAgICAgICAgLy8gZWRpdFxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tZWRpdCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0IGVkaXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0RWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdFZGl0IHRoaXMgYXNzaWdubWVudC4nKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhyZXNvdXJjZV9tb2RlbC52ZXJzaW9ucy5jb3VudCgpKTtcbiAgICAgICAgLy8gdmVyc2lvbnNcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJylcbiAgICAgICAgICAgIC5kYXRhKGQzLnJhbmdlKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9ICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJztcbiAgICAgICAgICAgICAgICBpZiAoKGQgKyAxKSA9PT0gc2VsZi52ZXJzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgdmVyc2lvbicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZXJzaW9uKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRWZXJzaW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndi4nICsgKGQrMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGFzc1xuICAgICAgICB2YXIgYWN0aW9uc19jbGFzcyA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLWFkZCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYWRkVG9DbGFzcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0FkZCB0byBDbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLXZpZXcnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0NsYXNzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnVmlldyBDbGFzcycpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2FjdGlvbmFibGVfY29udGVudCAoc2VsKSB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzb3VyY2VfbW9kZWwuZGF0YSgpO1xuXG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fZGlzcGxheWVkKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdoMycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQodmVyc2lvbi50aXRsZSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5JylcbiAgICAgICAgICAgIC5odG1sKHZlcnNpb24uYm9keS5odG1sKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnVGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gdGFnOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb1RhZyh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0YWdzW2RdLm5hbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWdzW2RdLm5hbWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tZWR1Y2F0b3JzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0F1dGhvcicpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudCcrXG4gICAgICAgICAgICAgICAgICAgICAgICctLWVkdWNhdG9ycy0tZWR1Y2F0b3InKVxuICAgICAgICAgICAgLmRhdGEocmVzb3VyY2VfbW9kZWwuZWR1Y2F0b3JzKCkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSB2aWV3IHRvIGVkdWNhdG9yOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0VkdWNhdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGVkdWNhdG9yc1tkXS5uYW1lKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudCcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnLS1lZHVjYXRvcnMtLWVkdWNhdG9yJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZHVjYXRvcnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlZHVjYXRvcnNbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnQgKHNlbCkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlc291cmNlX21vZGVsLmRhdGEoKTtcblxuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX2Rpc3BsYXllZCk7XG5cbiAgICAgICAgdmFyIGZvcm0gPSBzZWwuYXBwZW5kKCdmb3JtJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybScpXG4gICAgICAgICAgICAuYXR0cignb25TdWJtaXQnLCAncmV0dXJuIGZhbHNlOycpO1xuXG4gICAgICAgIHZhciBlZGl0YWJsZV90aXRsZSA9IGZvcm0uYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgdmVyc2lvbi50aXRsZSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSB3aXRoIGFuIGh0bWwgZWRpdG9yLlxuICAgICAgICAvLyBib2R5Lmh0bWwgaW4sIHB1bGwgb3V0IHZhbHVlIGFuZFxuICAgICAgICAvLyBzdGFzaCBpdCBiYWNrIGludG8gYm9keS5odG1sXG4gICAgICAgIHZhciBlZGl0YWJsZV9ib2R5X2h0bWwgPSBmb3JtLmFwcGVuZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgndmFsdWUnLCB2ZXJzaW9uLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgdmFyIGVkaXRhYmxlX3RhZ3MgPSBmb3JtXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZ3NbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnQ2FuY2VsJylcbiAgICAgICAgICAgIC50ZXh0KCdDYW5jZWwnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2FuY2VsRWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3N1Ym1pdCcpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnU2F2ZScpXG4gICAgICAgICAgICAudGV4dCgnU2F2ZScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkX3RhZ3NfaWQgPSBbXTtcbiAgICAgICAgICAgICAgICBlZGl0YWJsZV90YWdzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCh0aGlzKS5wcm9wZXJ0eSgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF90YWdzX2lkLnB1c2goZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X3ZlcnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlZGl0YWJsZV90aXRsZS5wcm9wZXJ0eSgndmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogZWRpdGFibGVfYm9keV9odG1sLnByb3BlcnR5KCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHNlbGVjdGVkX3RhZ3NfaWRcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKChuZXdfdmVyc2lvbi50aXRsZSAhPT0gdmVyc2lvbi50aXRsZSkgfFxuICAgICAgICAgICAgICAgICAgICAobmV3X3ZlcnNpb24uYm9keS5odG1sICE9PSB2ZXJzaW9uLmJvZHkuaHRtbCkgfFxuICAgICAgICAgICAgICAgICAgICAoIShhcnJheUVxdWFscyhuZXdfdmVyc2lvbi50YWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi50YWdzKSkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNhdmVFZGl0YWJsZShuZXdfdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5RXF1YWxzIChhcnIxLCBhcnIyKSB7XG4gICAgICAgIGlmIChhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gYXJyMS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07Il19
