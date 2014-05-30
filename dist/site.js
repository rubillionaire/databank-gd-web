(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ResourceModel = require('./model/resource');
var ClassModel    = require('./model/class');
var ClassViewAdd  = require('./view/class');

module.exports = function ClassAddController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var class_model;
    var view;

    self.render = function (d) {
        console.log('ClassAddController.render');
        console.log(d);

        // if logged out dispatch to log in
        // with trace of getting back to this state


        resource_data  = context.datastore
                                .get('resources', d.resource_id);

        resource_model = ResourceModel()
                            .data(resource_data);

        /// if logged in, look for classes that the user
        /// has, in ordre to populate a view that allows
        /// them to select or create a class
        // class_data  = context.datastore.get('class', )
        // class_model = ClassModel().data();
        
    };

    return self;
};
},{"./model/class":9,"./model/resource":11,"./view/class":14}],2:[function(require,module,exports){
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
},{"./ClassAddController":1}],3:[function(require,module,exports){
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
},{"./view/index":15}],4:[function(require,module,exports){
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
},{"./model/educator":10,"./model/resource":11,"./model/tag":12,"./view/resource":16}],5:[function(require,module,exports){
var TagView       = require('./view/tag');

module.exports = function ResourceController (context) {
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
},{"./view/tag":17}],6:[function(require,module,exports){
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
            first_name: 'Colin',
            last_name: 'Frazer',
            resources: [0],
            classes: [0]
        }, {
            id: 'anther@email.com',
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
        }]
    };


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

    self.set = function (namespace, id, d) {
        console.log('setting: ' + namespace + '!' + id);
        localStorage.setItem(namespace + '!' + id,
                             JSON.stringify(d));
    };

    self.get = function (namespace, id) {
        return JSON.parse(
            localStorage.getItem(namespace + '!' + id));
    };


    return self;
};
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
var Class    = require('./ClassViewController');
var Index    = require('./IndexViewController');
var Tag      = require('./TagViewController');

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

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./ClassViewController":2,"./IndexViewController":3,"./ResourceViewController":4,"./TagViewController":5,"./fake_data":6,"./hash":7,"./router":13}],9:[function(require,module,exports){
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
        educators = x.educators;
        resources = x.resources;

        return self;
    };

    return self;
};
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    self.render = function () {
  
        return self;
    };

    return self;
};
},{}]},{},[8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvQ2xhc3NBZGRDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvQ2xhc3NWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL0luZGV4Vmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9SZXNvdXJjZVZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvVGFnVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9mYWtlX2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9oYXNoLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9jbGFzcy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL2VkdWNhdG9yLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvbW9kZWwvcmVzb3VyY2UuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC90YWcuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9yb3V0ZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L2NsYXNzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvcmVzb3VyY2UuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L3RhZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVzb3VyY2VNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvcmVzb3VyY2UnKTtcbnZhciBDbGFzc01vZGVsICAgID0gcmVxdWlyZSgnLi9tb2RlbC9jbGFzcycpO1xudmFyIENsYXNzVmlld0FkZCAgPSByZXF1aXJlKCcuL3ZpZXcvY2xhc3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc0FkZENvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciByZXNvdXJjZV9kYXRhO1xuICAgIHZhciByZXNvdXJjZV9tb2RlbDtcbiAgICB2YXIgY2xhc3NfbW9kZWw7XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGFzc0FkZENvbnRyb2xsZXIucmVuZGVyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGQpO1xuXG4gICAgICAgIC8vIGlmIGxvZ2dlZCBvdXQgZGlzcGF0Y2ggdG8gbG9nIGluXG4gICAgICAgIC8vIHdpdGggdHJhY2Ugb2YgZ2V0dGluZyBiYWNrIHRvIHRoaXMgc3RhdGVcblxuXG4gICAgICAgIHJlc291cmNlX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgncmVzb3VyY2VzJywgZC5yZXNvdXJjZV9pZCk7XG5cbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9kYXRhKTtcblxuICAgICAgICAvLy8gaWYgbG9nZ2VkIGluLCBsb29rIGZvciBjbGFzc2VzIHRoYXQgdGhlIHVzZXJcbiAgICAgICAgLy8vIGhhcywgaW4gb3JkcmUgdG8gcG9wdWxhdGUgYSB2aWV3IHRoYXQgYWxsb3dzXG4gICAgICAgIC8vLyB0aGVtIHRvIHNlbGVjdCBvciBjcmVhdGUgYSBjbGFzc1xuICAgICAgICAvLyBjbGFzc19kYXRhICA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgnY2xhc3MnLCApXG4gICAgICAgIC8vIGNsYXNzX21vZGVsID0gQ2xhc3NNb2RlbCgpLmRhdGEoKTtcbiAgICAgICAgXG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgQ2xhc3NBZGQgPSByZXF1aXJlKCcuL0NsYXNzQWRkQ29udHJvbGxlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmFjdGlvbnMgPSB7fTtcblxuICAgIHNlbGYuYWN0aW9ucy5hZGQgPSBDbGFzc0FkZChjb250ZXh0KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsYXNzQWRkQ29udHJvbGxlci5yZW5kZXIgLSAnK1xuICAgICAgICAgICAgICAgICAgICAnb3ZlcnZpZXcgb2YgY2xhc3Nlcy4nKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBJbmRleFZpZXcgID0gcmVxdWlyZSgnLi92aWV3L2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5kZXhDb250cm9sbGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmlldyAgPSBJbmRleFZpZXcoKVxuICAgICAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRleHQuYm9keV9zZWwpO1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFRhZ01vZGVsICAgICAgPSByZXF1aXJlKCcuL21vZGVsL3RhZycpO1xudmFyIEVkdWNhdG9yTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL2VkdWNhdG9yJyk7XG52YXIgUmVzb3VyY2VNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvcmVzb3VyY2UnKTtcbnZhciBSZXNvdXJjZVZpZXcgID0gcmVxdWlyZSgnLi92aWV3L3Jlc291cmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VDb250cm9sbGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcmVzb3VyY2VfZGF0YTtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWw7XG4gICAgdmFyIHRhZ19tb2RlbHM7XG4gICAgdmFyIGVkdWNhdG9yX21vZGVscztcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmVzb3VyY2VfZGF0YSAgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ3Jlc291cmNlcycsIGQuaWQpO1xuICAgICAgICByZXNvdXJjZV9tb2RlbCA9IFJlc291cmNlTW9kZWwoKS5kYXRhKHJlc291cmNlX2RhdGEpO1xuXG4gICAgICAgIHRhZ19tb2RlbHMgPSB7fTtcbiAgICAgICAgdmFyIHRhZ19pZHMgPSByZXNvdXJjZV9tb2RlbC50YWdzKCk7XG4gICAgICAgIHRhZ19pZHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgndGFncycsIGQpO1xuICAgICAgICAgICAgdGFnX21vZGVsc1t0YWcuaWRdID0gVGFnTW9kZWwoKS5kYXRhKHRhZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkdWNhdG9yX21vZGVscyA9IHt9O1xuICAgICAgICB2YXIgZWR1Y2F0b3JfaWRzID0gcmVzb3VyY2VfbW9kZWwuZWR1Y2F0b3JzKCk7XG4gICAgICAgIGVkdWNhdG9yX2lkcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWR1Y2F0b3IgaWRzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgIHZhciBlZHVjYXRvciA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgnZWR1Y2F0b3JzJywgZCk7XG4gICAgICAgICAgICBlZHVjYXRvcl9tb2RlbHNcbiAgICAgICAgICAgICAgICBbZWR1Y2F0b3IuaWRdID0gRWR1Y2F0b3JNb2RlbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShlZHVjYXRvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcgID0gUmVzb3VyY2VWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgICAgICAgICAucmVzb3VyY2VNb2RlbChyZXNvdXJjZV9tb2RlbClcbiAgICAgICAgICAgICAgICAgICAgLnRhZ3ModGFnX21vZGVscylcbiAgICAgICAgICAgICAgICAgICAgLmVkdWNhdG9ycyhlZHVjYXRvcl9tb2RlbHMpO1xuXG4gICAgICAgIGlmIChkLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHZpZXcudmVyc2lvbihkLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLmVkaXQpIHtcbiAgICAgICAgICAgIHZpZXcuZWRpdChkLmVkaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9UYWcuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3RhZycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3ZpZXcnLFxuICAgICAgICAgICAgICAgICAgICB0YWdfaWQ6IGQuaWQsXG4gICAgICAgICAgICAgICAgICAgIHRhZ19uYW1lOiBkLm5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2FkZFRvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbl9udW1iZXIgPSB2aWV3LnZlcnNpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9udW1iZXIpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2FkZCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlX2lkOiByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV90aXRsZTogdmVyc2lvbi50aXRsZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9DbGFzcy5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlVmlld1RvQ2xhc3MnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NoYW5nZVZpZXdUb0VkdWNhdG9yLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VWaWV3VG9FZHVjYXRvcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2V0VmVyc2lvbi5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2V0RWRpdGFibGUuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NhbmNlbEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzYXZlRWRpdGFibGUuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgZWRpdGFibGUuJyk7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuYWRkKGQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlLnNldCgncmVzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfbW9kZWwuZGF0YSgpKTtcblxuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdmlldy5lZGl0KCkgPyAnZWRpdCcgOiAndmlldycsXG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdmVyc2lvbi50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbl9udW1iZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSAoKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IHZpZXcudmVyc2lvbigpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9udW1iZXIpO1xuICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgIGFjdGlvbjogdmlldy5lZGl0KCkgPyAnZWRpdCcgOiAndmlldycsXG4gICAgICAgICAgICBpZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbl9udW1iZXJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgVGFnVmlldyAgICAgICA9IHJlcXVpcmUoJy4vdmlldy90YWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVzb3VyY2VDb250cm9sbGVyLnJlbmRlcicpO1xuXG4gICAgICAgIHZpZXcgID0gVGFnVmlldygpO1xuICAgICAgICAgICAgICAgICAgICAvLyAuY29udGFpbmVyKGNvbnRleHQuYm9keV9zZWwpO1xuXG4gICAgICAgIC8vIGF0dGFjaCBkaXNwYXRjaCBtZXNzYWdpbmcgdG8gdmlld1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgICByZXNvdXJjZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHZlcnNpb25zOiBbe1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIm1hcHNcIiwgXCJkb3VnLXNjb3R0XCIsIFwibWFraW5nLW1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2NvbGluQGVtYWlsLmNvbSddXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wibWFwc1wiLCBcImRvdWctc2NvdHRcIiwgXCJtYWtpbmctbWVhbmluZ1wiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBOYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHMhPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJtYXBzXCIsIFwiZG91Zy1zY290dFwiLCBcIm1ha2luZy1tZWFuaW5nXCJdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGVkdWNhdG9yczogWydhbnRoZXJAZW1haWwuY29tJ11cbiAgICAgICAgfV0sXG4gICAgICAgIGNsYXNzZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHRpdGxlOiAnQ29saW5cXCdzIENsYXNzJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2NvbGluQGVtYWlsLmNvbSddXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGl0bGU6ICdBbnRoZXJcXCdzIENsYXNzJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzFdLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2FudGhlckBlbWFpbC5jb20nXVxuICAgICAgICB9XSxcbiAgICAgICAgZWR1Y2F0b3JzOiBbe1xuICAgICAgICAgICAgaWQ6ICdjb2xpbkBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0NvbGluJyxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJ0ZyYXplcicsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFswXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFswXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2FudGhlckBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0FudGhlcicsXG4gICAgICAgICAgICBsYXN0X25hbWU6ICdLaWxleScsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgdGFnczogW3tcbiAgICAgICAgICAgIGlkOiBcIm1hcHNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiTWFwc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcImRvdWctc2NvdHRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRG91ZyBTY290dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcIm1ha2luZy1tZWFuaW5nXCIsXG4gICAgICAgICAgICBuYW1lOiBcIk1ha2luZyBNZWFuaW5nXCJcbiAgICAgICAgfV1cbiAgICB9O1xuXG5cbiAgICBkYXRhLnJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXNvdXJjZXMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLmNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhc3NlcyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEuZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkdWNhdG9ycyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEudGFncy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFncyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcblxuICAgIHNlbGYuc2V0ID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgaWQsIGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldHRpbmc6ICcgKyBuYW1lc3BhY2UgKyAnIScgKyBpZCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWVzcGFjZSArICchJyArIGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSk7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0ID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lc3BhY2UgKyAnIScgKyBpZCkpO1xuICAgIH07XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hGYWN0b3J5ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjaGFuZ2UnKTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc2VsZi5pcygpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2UoY3VycmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pcyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIGdldHRlclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZV9oYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHRlclxuICAgICAgICB2YXIgaGFzaCA9ICcvJztcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9jbGFzc19oYXNoKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3RhZycpIHtcbiAgICAgICAgICAgIGhhc2ggPSBmb3JtYXRfdGFnX2hhc2goZCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBoYXNoO1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0IGhhc2g6ICcsIGhhc2gpO1xuXG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwYXJzZV9oYXNoIChoYXNoKSB7XG4gICAgICAgIHZhciBpbnRlZ2VyX3JlZ2V4ID0gL15cXGQrJC87XG5cbiAgICAgICAgaWYgKGhhc2guaW5kZXhPZignIycpID09PSAwKSB7XG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJncyA9IChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xuICAgICAgICAgICAgaW5wdXQuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGlmIChkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9KShoYXNoLnNwbGl0KCcvJykpO1xuXG4gICAgICAgIHZhciBwYXJzZWQgPSB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAnaW5kZXgnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGlkOiBhcmdzWzFdLFxuICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQudGl0bGUgPSBhcmdzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQudmVyc2lvbiA9IGFyZ3NbM107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5lZGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChhcmdzWzBdID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJnc1sxXS5tYXRjaChpbnRlZ2VyX3JlZ2V4KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB2aWV3aW5nIGEgcGFydGljdWxhciBjbGFzc1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQuaWQgPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnRpdGxlID0gYXJnc1syXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFyZ3MubGVuZ3RoID49IDQpICZcbiAgICAgICAgICAgICAgICAgICAgICAgIChhcmdzWzNdID09PSAnZWRpdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWN0aW9uID0gYXJnc1szXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbWUgYWN0aW9uIGlzIGJlaW5nIHRha2VuIG9uIHRoZSBjbGFzc1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzWzFdID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmFjdGlvbiA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJnc1syXSA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC50eXBlID0gYXJnc1syXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5yZXNvdXJjZV9pZCA9IGFyZ3NbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICd0YWcnKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3RhZycsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAndmlldydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Jlc291cmNlX2hhc2goZCkge1xuICAgICAgICB2YXIgYXJncyA9IFsncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBkLmlkLFxuICAgICAgICAgICAgICAgICAgICBkLnRpdGxlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZV9mb3JfdXJsKGQudGl0bGUpIDogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZC52ZXJzaW9uXTtcblxuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgYXJncy5wdXNoKCdlZGl0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyMvJyArIGFyZ3Muam9pbignLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9jbGFzc19oYXNoIChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWydjbGFzcyddO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgYWN0aW9uIGlzIHRvIHZpZXdcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgLy8gYWN0aW9uIHRha2VuIG9uIHRoZSBjbGFzc1xuICAgICAgICAgICAgLy8gc3VjaCBhcyAnYWRkJyAtLSAnYWRkIHRvIGNsYXNzJ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLnR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKGQucmVzb3VyY2VfaWQpO1xuICAgICAgICBhcmdzLnB1c2goZXNjYXBlX2Zvcl91cmwoZC5yZXNvdXJjZV90aXRsZSkpO1xuXG4gICAgICAgIGlmIChkLmFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgbmV2ZXIgYmUgYSBzdGF0ZSB3aGVyZVxuICAgICAgICAgICAgLy8gZWRpdCBpcyB0cnVlICYgYWN0aW9uIGlzIGEgc3RyaW5nXG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfdGFnX2hhc2ggKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ3RhZyddO1xuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKGQudGFnX2lkKTtcbiAgICAgICAgYXJncy5wdXNoKGQubmFtZSk7XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVfZm9yX3VybCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBIYXNoICAgICA9IHJlcXVpcmUoJy4vaGFzaCcpO1xudmFyIFJvdXRlciAgID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcbnZhciBEYXRhICAgICA9IHJlcXVpcmUoJy4vZmFrZV9kYXRhJyk7XG52YXIgUmVzb3VyY2UgPSByZXF1aXJlKCcuL1Jlc291cmNlVmlld0NvbnRyb2xsZXInKTtcbnZhciBDbGFzcyAgICA9IHJlcXVpcmUoJy4vQ2xhc3NWaWV3Q29udHJvbGxlcicpO1xudmFyIEluZGV4ICAgID0gcmVxdWlyZSgnLi9JbmRleFZpZXdDb250cm9sbGVyJyk7XG52YXIgVGFnICAgICAgPSByZXF1aXJlKCcuL1RhZ1ZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG5cbiAgICAvLyB2aWV3IGNvbnRyb2xsZXJzXG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LmNsYXNzXyAgICA9IENsYXNzKGNvbnRleHQpO1xuICAgIGNvbnRleHQuaW5kZXggICAgID0gSW5kZXgoY29udGV4dCk7XG4gICAgY29udGV4dC5yb3V0ZXIgICAgPSBSb3V0ZXIoY29udGV4dCk7XG4gICAgY29udGV4dC50YWcgICAgICAgPSBUYWcoY29udGV4dCk7XG5cbiAgICAoZnVuY3Rpb24gaW5pdGlhbGl6ZSAoKSB7XG4gICAgICAgIGNvbnRleHQucm91dGVyLmluaXRpYWxpemUoKTtcbiAgICB9KSgpO1xufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBlZHVjYXRvcnMgPSBbXTtcbiAgICB2YXIgcmVzb3VyY2VzID0gW107XG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHNlbGYudGl0bGUgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aXRsZTtcbiAgICAgICAgdGl0bGUgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZHVjYXRvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlZHVjYXRvcnM7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5hZGQgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcbiAgICAgICAgXG4gICAgICAgIHZhciBpbl9lZHVjYXRvcnMgPSBmYWxzZTtcbiAgICAgICAgZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSBlZHVjYXRvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluX2VkdWNhdG9ycyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fZWR1Y2F0b3JzKSB7XG4gICAgICAgICAgICBlZHVjYXRvcnMucHVzaChlZHVjYXRvcl9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuZWR1Y2F0b3JzLnJlbW92ZSA9IGZ1bmN0aW9uIChlZHVjYXRvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBlZHVjYXRvcl9pZFwiO1xuICAgICAgICB2YXIgaW5kZXhfdG9fcmVtb3ZlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIGVkdWNhdG9ycy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXNvdXJjZXM7XG4gICAgfTtcbiAgICBzZWxmLnJlc291cmNlcy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2VfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgcmVzb3VyY2VfaWRcIjtcblxuICAgICAgICB2YXIgaW5fcmVzb3VyY2VzID0gZmFsc2U7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBpbl9yZXNvdXJjZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX3Jlc291cmNlcykge1xuICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2VfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLnJlc291cmNlcy5yZW1vdmUgPSBmdW5jdGlvbiAocmVzb3VyY2VfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgcmVzb3VyY2VfaWRcIjtcblxuICAgICAgICB2YXIgaW5kZXhfdG9fcmVtb3ZlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgcmVzb3VyY2VzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIGVkdWNhdG9yczogZWR1Y2F0b3JzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgPSB4LmlkO1xuICAgICAgICB0aXRsZSA9IHgudGl0bGU7XG4gICAgICAgIGVkdWNhdG9ycyA9IHguZWR1Y2F0b3JzO1xuICAgICAgICByZXNvdXJjZXMgPSB4LnJlc291cmNlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRWR1Y2F0b3JNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgZW1haWw7XG4gICAgdmFyIGZpcnN0X25hbWUgPSAnJztcbiAgICB2YXIgbGFzdF9uYW1lICA9ICcnO1xuXG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW1haWxfdG9faWQoZW1haWwpO1xuICAgIH07XG5cbiAgICBzZWxmLmVtYWlsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW1haWw7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICgoZmlyc3RfbmFtZSkgPyAoZmlyc3RfbmFtZSArICcgJykgOiAnJykgK1xuICAgICAgICAgICAgICAgbGFzdF9uYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLm5hbWUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmaXJzdF9uYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLm5hbWUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxhc3RfbmFtZTtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgICA6IGVtYWlsX3RvX2lkKGVtYWlsKSxcbiAgICAgICAgICAgICAgICBlbWFpbCAgICAgOiBlbWFpbCxcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdF9uYW1lLFxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZSA6IGxhc3RfbmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkICAgICAgICAgPSBkLmlkO1xuICAgICAgICBlbWFpbCAgICAgID0gZC5lbWFpbDtcbiAgICAgICAgZmlyc3RfbmFtZSA9IGQuZmlyc3RfbmFtZTtcbiAgICAgICAgbGFzdF9uYW1lICA9IGQubGFzdF9uYW1lO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlbWFpbF90b19pZCAoZSkge1xuICAgICAgICByZXR1cm4gZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICB2YXIgaWQ7XG4gICAgdmFyIHZlcnNpb25zID0gW107XG4gICAgdmFyIGVkdWNhdG9ycyAgPSBbXTtcbiAgICB2YXIgY2xhc3NlcyAgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi52ZXJzaW9ucyA9IHt9O1xuICAgIHNlbGYudmVyc2lvbnMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgIC8vIHJlc291cmNlcyBhcmUgbm90IHVuaXF1ZS5cbiAgICAgICAgLy8gdGhlIHZpZXcgZW5zdXJlcyBhIGNoYW5nZSBoYXMgb2NjdXJlZFxuICAgICAgICAvLyBiZWZvcmUgcGFzc2luZyBhIG5ldyB2ZXJzaW9uIGluXG4gICAgICAgIHZlcnNpb25zLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuZ2V0ID0gZnVuY3Rpb24gKHZlcnNpb25faWQpIHtcbiAgICAgICAgLy8gZG9uJ3QgbWFrZSB0aGUgdXNlciB0aGluayBhYm91dCB0aGUgZmFjdFxuICAgICAgICAvLyB0aGF0IGNvdW50aW5nIHN0YXJ0cyBmcm9tIDAuIEJlY2F1c2VcbiAgICAgICAgLy8gdGhlcmUgd2lsbCBuZXZlciBiZSBhIHZlcnNpb24gMC5cbiAgICAgICAgaWYgKHZlcnNpb25faWQgPiB2ZXJzaW9ucy5sZW5ndGgpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmVyc2lvbnNbdmVyc2lvbl9pZC0xXTtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuY291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9ucy5sZW5ndGg7XG4gICAgfTtcblxuICAgIHNlbGYuZWR1Y2F0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWR1Y2F0b3JzO1xuICAgIH07XG4gICAgc2VsZi5lZHVjYXRvcnMuYWRkID0gZnVuY3Rpb24gKGVkdWNhdG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGVkdWNhdG9yX2lkXCI7XG5cbiAgICAgICAgdmFyIGluX2VkdWNhdG9ycyA9IGZhbHNlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fZWR1Y2F0b3JzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9lZHVjYXRvcnMpIHtcbiAgICAgICAgICAgIGVkdWNhdG9ycy5wdXNoKGVkdWNhdG9yX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5lZHVjYXRvcnMucmVtb3ZlID0gZnVuY3Rpb24gKGVkdWNhdG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGVkdWNhdG9yX2lkXCI7XG5cbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSBlZHVjYXRvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RvX3JlbW92ZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIGVkdWNhdG9ycy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRhZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0YWdzID0gW107XG4gICAgICAgIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHRhZ3MgPSB0YWdzLmNvbmNhdChkLnRhZ3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdldF91bmlxdWUodGFncyk7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZCAgICAgIDogaWQsXG4gICAgICAgICAgICAgICAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICAgICAgICAgICAgICAgIGVkdWNhdG9ycyA6IGVkdWNhdG9ycyxcbiAgICAgICAgICAgICAgICB0YWdzICAgIDogdGFncyxcbiAgICAgICAgICAgICAgICBjbGFzc2VzIDogY2xhc3Nlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkICAgICAgID0geC5pZDtcbiAgICAgICAgdmVyc2lvbnMgPSB4LnZlcnNpb25zO1xuICAgICAgICBlZHVjYXRvcnMgID0geC5lZHVjYXRvcnM7XG4gICAgICAgIHRhZ3MgICAgID0geC50YWdzO1xuICAgICAgICBjbGFzc2VzICA9IHguY2xhc3NlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X3VuaXF1ZSAoYXJyKSB7XG4gICAgICAgIHZhciB1ID0ge307XG4gICAgICAgIHZhciBhID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1Lmhhc093blByb3BlcnR5KGFycltpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEucHVzaChhcnJbaV0pO1xuICAgICAgICAgICAgdVthcnJbaV1dID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCIvLyBUYWdzIGFyZSBpbmRleGVkIGJ5IGFuIGVzY2FwZWQgdGFnIG5hbWVcbi8vIHRoaXMgd2F5LCB0YWdzIGFyZSBub3JtYWxpemVkLCBhbmQgdGhlcmVcbi8vIHdpbGwgYmUgbm8gZHVwbGljYXRlIHRhZ3MuXG5cbi8vICd0YWchZ3JhcGhpYy1kZXNpZ24nID0geyB0YWc6ICdHcmFwaGljIERlc2lnbid9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGFnTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIG5hbWU7XG4gICAgdmFyIHJlc291cmNlcyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRhZ190b19pZChuYW1lKTtcbiAgICB9O1xuXG4gICAgc2VsZi5uYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuXG4gICAgc2VsZi5yZXNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXNvdXJjZXM7XG4gICAgfTtcbiAgICBzZWxmLnJlc291cmNlcy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2VfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgcmVzb3VyY2VfaWRcIjtcblxuICAgICAgICB2YXIgY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGNsZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjbGVhbikge1xuICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2VfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLnJlc291cmNlcy5yZW1vdmUgPSBmdW5jdGlvbiAocmVzb3VyY2VfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgcmVzb3VyY2VfaWRcIjtcblxuICAgICAgICB2YXIgaW5kZXhfdG9fcmVtb3ZlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgcmVzb3VyY2VzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogc2VsZi5pZCgpLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCA9IHguaWQ7XG4gICAgICAgIG5hbWUgPSB4Lm5hbWU7XG4gICAgICAgIHJlc291cmNlcyA9IHgucmVzb3VyY2VzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0YWdfdG9faWQgKHQpIHtcbiAgICAgICAgcmV0dXJuIHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm91dGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcHJldmlvdXNfdmlldyA9IHtcbiAgICAgICAgY29udHJvbGxlcjogJ2luZGV4J1xuICAgIH07XG5cbiAgICBjb250ZXh0Lmhhc2guZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdjaGFuZ2Uucm91dGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHNldChkKTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldChjb250ZXh0Lmhhc2guaXMoKSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXQgKGQpIHtcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgY29udGV4dC5yZXNvdXJjZS5yZW5kZXIoZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICBpZiAoZC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsYXNzXy5hY3Rpb25zLmFkZC5yZW5kZXIoZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xhc3NfLnJlbmRlcihkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICd0YWcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm91dGUgdG8gdGFnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgIGNvbnRleHQudGFnLnJlbmRlcihkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIGNvbnRleHQuaW5kZXgucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnNDA0Jykge1xuICAgICAgICAgICAgLy8gY29udGV4dC5lcnJvci5yZW5kZXIoJzQwNCcpXG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c192aWV3ID0gZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IixudWxsLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluZGV4VmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ3JpZCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuICAgICAgICBncmlkLmFwcGVuZCgnaDEnKS50ZXh0KCdEYXRhYmFuay4nKTtcbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2g0JykudGV4dCgnVGhlIGJlZ2lubmluZy4nKTtcblxuICAgICAgICBncmlkLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsICcjL3Jlc291cmNlLzAvJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0EgcmVzb3VyY2UnKTtcblxuICAgICAgICBncmlkLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsICcjL3Jlc291cmNlLzEvJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0Fub3RoZXIgcmVzb3VyY2UnKTtcbiAgICAgICAgXG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHZhciByZXNvdXJjZV9tb2RlbCA9IHt9O1xuICAgIHZhciBlZHVjYXRvcnMgICAgICA9IHt9O1xuICAgIHZhciB0YWdzICAgICAgICAgICA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuXG4gICAgdmFyIGVkaXQgPSBmYWxzZTtcbiAgICB2YXIgdmVyc2lvbl9kaXNwbGF5ZWQ7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FkZFRvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvVGFnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbmNlbEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NhdmVFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRWZXJzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0VkdWNhdG9yJyk7XG5cbiAgICB2YXIgbGF5b3V0X2FjdGlvbmFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtYWN0aW9ucycsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWFjdGlvbnMgbGVmdCBmaXhlZCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9uc1xuICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfY29udGVudFxuICAgIH1dO1xuXG4gICAgdmFyIGxheW91dF9lZGl0YWJsZV9kYXRhID0gW3tcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSBlZGl0YWJsZSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHNlbGYucmVzb3VyY2VNb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbDtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBtb2RlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudGFncyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhZ3M7XG4gICAgICAgIHRhZ3MgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZHVjYXRvcnMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlZHVjYXRvcnM7XG4gICAgICAgIGVkdWNhdG9ycyA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IHNlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudmVyc2lvbiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHZlcnNpb25fZGlzcGxheWVkO1xuICAgICAgICB2ZXJzaW9uX2Rpc3BsYXllZCA9ICt4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZGl0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZWRpdDtcbiAgICAgICAgZWRpdCA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCghc2VsZi52ZXJzaW9uKCkpIHxcbiAgICAgICAgICAgIChzZWxmLnZlcnNpb24oKSA+IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpKSkge1xuXG4gICAgICAgICAgICBzZWxmLnZlcnNpb24ocmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3JpZCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIHJlbmRlcl9tZXRob2Q7XG4gICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICByZW5kZXJfbWV0aG9kID0gcmVuZGVyX2VkaXRhYmxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9hY3Rpb25hYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JpZC5jYWxsKHJlbmRlcl9tZXRob2QpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZWRpdGFibGUgKHNlbCkge1xuICAgICAgICB2YXIgbGF5b3V0ID0gc2VsLnNlbGVjdEFsbCgnLnJlc291cmNlLXN0cnVjdHVyZScpXG4gICAgICAgICAgICAuZGF0YShsYXlvdXRfZWRpdGFibGVfZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jbHMgKyAnICcgKyBkLnR5cGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChkLmxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfYWN0aW9uYWJsZSAoc2VsKSB7XG5cbiAgICAgICAgdmFyIGxheW91dCA9IHNlbC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2FjdGlvbmFibGVfZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jbHMgKyAnICcgKyBkLnR5cGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbC5jYWxsKGQubGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnMgKHNlbCkge1xuICAgICAgICAvLyBlZGl0XG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1lZGl0JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgZWRpdGFibGUnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRFZGl0YWJsZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0VkaXQgdGhpcyBhc3NpZ25tZW50LicpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpO1xuICAgICAgICAvLyB2ZXJzaW9uc1xuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nKVxuICAgICAgICAgICAgLmRhdGEoZDMucmFuZ2UocmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuY291bnQoKSkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nO1xuICAgICAgICAgICAgICAgIGlmICgoZCArIDEpID09PSBzZWxmLnZlcnNpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCB2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZlcnNpb24oZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldFZlcnNpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2LicgKyAoZCsxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsYXNzXG4gICAgICAgIHZhciBhY3Rpb25zX2NsYXNzID0gc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tYWRkJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hZGRUb0NsYXNzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQWRkIHRvIENsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tdmlldycpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvQ2xhc3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdWaWV3IENsYXNzJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2gzJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZScpXG4gICAgICAgICAgICAudGV4dCh2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHknKVxuICAgICAgICAgICAgLmh0bWwodmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdUYWdzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdmlldyB0byB0YWc6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvVGFnKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRhZ3NbZF0ubmFtZSgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MtLXRhZycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZ3NbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS1lZHVjYXRvcnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQXV0aG9yJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50JytcbiAgICAgICAgICAgICAgICAgICAgICAgJy0tZWR1Y2F0b3JzLS1lZHVjYXRvcicpXG4gICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9tb2RlbC5lZHVjYXRvcnMoKSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gZWR1Y2F0b3I6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvRWR1Y2F0b3Ioe1xuICAgICAgICAgICAgICAgICAgICBpZDogZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZWR1Y2F0b3JzW2RdLm5hbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICctLWVkdWNhdG9ycy0tZWR1Y2F0b3InKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkdWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkdWNhdG9yc1tkXS5uYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfZWRpdGFibGVfY29udGVudCAoc2VsKSB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzb3VyY2VfbW9kZWwuZGF0YSgpO1xuXG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fZGlzcGxheWVkKTtcblxuICAgICAgICB2YXIgZm9ybSA9IHNlbC5hcHBlbmQoJ2Zvcm0nKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC1mb3JtJylcbiAgICAgICAgICAgIC5hdHRyKCdvblN1Ym1pdCcsICdyZXR1cm4gZmFsc2U7Jyk7XG5cbiAgICAgICAgdmFyIGVkaXRhYmxlX3RpdGxlID0gZm9ybS5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC0tdGl0bGUtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgndmFsdWUnLCB2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICAvLyByZXBsYWNlIHdpdGggYW4gaHRtbCBlZGl0b3IuXG4gICAgICAgIC8vIGJvZHkuaHRtbCBpbiwgcHVsbCBvdXQgdmFsdWUgYW5kXG4gICAgICAgIC8vIHN0YXNoIGl0IGJhY2sgaW50byBib2R5Lmh0bWxcbiAgICAgICAgdmFyIGVkaXRhYmxlX2JvZHlfaHRtbCA9IGZvcm0uYXBwZW5kKCd0ZXh0YXJlYScpXG4gICAgICAgICAgICAuYXR0cignaWQnLCAncmVzb3VyY2UtY29udGVudC0tYm9keS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC0tYm9keS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24uYm9keS5odG1sKTtcblxuICAgICAgICB2YXIgZWRpdGFibGVfdGFncyA9IGZvcm1cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuZGF0YSh2ZXJzaW9uLnRhZ3MpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFnc1tkXS5uYW1lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgnY2hlY2tlZCcsIHRydWUpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdDYW5jZWwnKVxuICAgICAgICAgICAgLnRleHQoJ0NhbmNlbCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnc3VibWl0JylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdTYXZlJylcbiAgICAgICAgICAgIC50ZXh0KCdTYXZlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRfdGFnc19pZCA9IFtdO1xuICAgICAgICAgICAgICAgIGVkaXRhYmxlX3RhZ3MuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KHRoaXMpLnByb3BlcnR5KCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkX3RhZ3NfaWQucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBuZXdfdmVyc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVkaXRhYmxlX3RpdGxlLnByb3BlcnR5KCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBlZGl0YWJsZV9ib2R5X2h0bWwucHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogc2VsZWN0ZWRfdGFnc19pZFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5ld192ZXJzaW9uLnRpdGxlICE9PSB2ZXJzaW9uLnRpdGxlKSB8XG4gICAgICAgICAgICAgICAgICAgIChuZXdfdmVyc2lvbi5ib2R5Lmh0bWwgIT09IHZlcnNpb24uYm9keS5odG1sKSB8XG4gICAgICAgICAgICAgICAgICAgICghKGFycmF5RXF1YWxzKG5ld192ZXJzaW9uLnRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uLnRhZ3MpKSkpIHtcblxuICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2F2ZUVkaXRhYmxlKG5ld192ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNhbmNlbEVkaXRhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJyYXlFcXVhbHMgKGFycjEsIGFycjIpIHtcbiAgICAgICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBhcnIxLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgIGlmIChhcnIxW2ldICE9PSBhcnIyW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICBcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
