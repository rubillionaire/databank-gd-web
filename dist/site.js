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
        me: [{
          id: 'me',
          classes: [],
          resources: []
        }]
    };

    data.me.forEach(function (d) {
        localStorage.setItem('me!' + d.id,
                           JSON.stringify(d));
    });

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
var Data     = require('./datastore');
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
},{"./ClassViewController":2,"./IndexViewController":3,"./MeViewController":4,"./ResourceViewController":5,"./TagViewController":6,"./datastore":7,"./hash":8,"./router":15}],10:[function(require,module,exports){
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