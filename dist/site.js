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
},{"./model/class":8,"./model/resource":9,"./view/class":11}],2:[function(require,module,exports){
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
},{"./view/index":12}],4:[function(require,module,exports){
var ResourceModel = require('./model/resource');
var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var tag_data;
    var view;

    self.render = function (d) {
        resource_data  = context.datastore.get('resources', d.id);
        resource_model = ResourceModel().data(resource_data);

        var tag_ids = resource_model.tags();
        tag_data = {};
        tag_ids.forEach(function (d, i) {
            var tag = context.datastore.get('tags', d);
            tag_data[tag.id] = tag.name;
        });

        view  = ResourceView()
                    .container(context.body_sel)
                    .resourceModel(resource_model)
                    .tags(tag_data);

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
},{"./model/resource":9,"./view/resource":13}],5:[function(require,module,exports){
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
            tags: [0, 1, 2]
            }],
            authors: [0]
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
            tags: [0, 1, 2]
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
            tags: [0, 1, 2]
            }],
            authors: [1]
        }],
        classes: [{
            id: 0,
            title: 'Colin\'s Class',
            resources: [0],
            authors: [0]
        }, {
            id: 1,
            title: 'Anther\'s Class',
            resources: [1],
            authors: [1]
        }],
        users: [{
            id: 0,
            name: 'Colin Frazer',
            resources: [0],
            classes: [0]
        }, {
            id: 1,
            name: 'Anther Kiley',
            resources: [1],
            classes: [1]
        }],
        tags: [{
          id: 0,
          name: "Maps"
        }, {
          id: 1,
          name: "Doug Scott"
        }, {
          id: 2,
          name: "Making Meaning"
        }]
    };


    data.resources.forEach(function (d) {
        localStorage.setItem('resources!' + d.id,
                            JSON.stringify(d));
    })
    data.classes.forEach(function (d) {
        localStorage.setItem('classes!' + d.id,
                            JSON.stringify(d));
    })
    data.users.forEach(function (d) {
        localStorage.setItem('users!' + d.id,
                            JSON.stringify(d));
    })
    data.tags.forEach(function (d) {
      localStorage.setItem('tags!' + d.id,
                           JSON.stringify(d));
    })

    self.set = function (namespace, id, d) {
        console.log('setting: ' + namespace + '!' + id);
        localStorage.setItem(namespace + '!' + id,
                             JSON.stringify(d));
    };

    self.get = function (namespace, id) {
        return JSON.parse(
            localStorage.getItem(namespace + '!' + id));
    }


    return self;
};
},{}],6:[function(require,module,exports){
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

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};
},{}],7:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
var Class    = require('./ClassViewController');
var Index    = require('./IndexViewController');

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

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./ClassViewController":2,"./IndexViewController":3,"./ResourceViewController":4,"./fake_data":5,"./hash":6,"./router":10}],8:[function(require,module,exports){
module.exports = function ClassModel () {
    var self = {};
    var id;
    var title;
    var authors = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.title = function (x) {
        if (!arguments.length) return title;
        title = x;
        return self;
    };

    self.authors = function () {
        return authors;
    };
    self.authors.add = function (author_id) {
        if (!arguments.length) throw "Need author_id";
        
        var in_authors = false;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                in_authors = true;
            }
        });

        if (!in_authors) {
            authors.push(author_id);
        }

        return self;
    };
    self.authors.remove = function (author_id) {
        if (!arguments.length) throw "Need author_id";
        var index_to_remove;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            authors.splice(index_to_remove, 1);
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
                authors: authors,
                resources: resources
            };
        }

        id = x.id;
        title = x.title;
        authors = x.authors;
        resources = x.resources;

        return self;
    };

    return self;
};
},{}],9:[function(require,module,exports){
module.exports = function ResourceModel () {
    var self = {};

    var id;
    var versions = [];
    var authors  = [];
    var classes  = [];

    self.id = function () {
        return id;
    };

    self.versions = {};
    self.versions.add = function (resource) {
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

    self.authors = function () {
        return authors;
    };
    self.authors.add = function (author_id) {
        if (!arguments.length) throw "Need author_id";

        var in_authors = false;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                in_authors = true;
            }
        });

        if (!in_authors) {
            authors.push(author_id);
        }

        return self;
    };
    self.authors.remove = function (author_id) {
        if (!arguments.length) throw "Need author_id";
        var index_to_remove;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            authors.splice(index_to_remove, 1);
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
                authors : authors,
                tags    : tags,
                classes : classes
            };
        }

        id       = x.id;
        versions = x.versions;
        authors  = x.authors;
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    var resource_model = {};
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
                                'setVersion');

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
            .append('ul')
            .selectAll('.resource-content--tags--tag')
            .data(version.tags)
            .enter()
            .append('li')
            .on('click', function (d) {
                console.log('change view to tag: ', d);
                self.dispatch.changeViewToTag({
                    id: d,
                    name: tags[d]
                });
            })
            .attr('class', 'resource-content--tags--tag')
            .append('p')
            .text(function (d) {
                return tags[d];
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
                return tags[d];
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
                var selected_tags = [];
                editable_tags.each(function (d, i) {
                    if (d3.select(this).property('checked')) {
                        selected_tags.push(d);
                    }
                });
                var new_version = {
                    title: editable_title.property('value'),
                    body: {
                        html: editable_body_html.property('value')
                    },
                    tags: selected_tags
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
},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvQ2xhc3NBZGRDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvQ2xhc3NWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL0luZGV4Vmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9SZXNvdXJjZVZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvZmFrZV9kYXRhLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaGFzaC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvbW9kZWwvY2xhc3MuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvY2xhc3MuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9yZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZXNvdXJjZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9yZXNvdXJjZScpO1xudmFyIENsYXNzTW9kZWwgICAgPSByZXF1aXJlKCcuL21vZGVsL2NsYXNzJyk7XG52YXIgQ2xhc3NWaWV3QWRkICA9IHJlcXVpcmUoJy4vdmlldy9jbGFzcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQWRkQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX2RhdGE7XG4gICAgdmFyIHJlc291cmNlX21vZGVsO1xuICAgIHZhciBjbGFzc19tb2RlbDtcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsYXNzQWRkQ29udHJvbGxlci5yZW5kZXInKTtcbiAgICAgICAgY29uc29sZS5sb2coZCk7XG5cbiAgICAgICAgLy8gaWYgbG9nZ2VkIG91dCBkaXNwYXRjaCB0byBsb2cgaW5cbiAgICAgICAgLy8gd2l0aCB0cmFjZSBvZiBnZXR0aW5nIGJhY2sgdG8gdGhpcyBzdGF0ZVxuXG5cbiAgICAgICAgcmVzb3VyY2VfZGF0YSAgPSBjb250ZXh0LmRhdGFzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCdyZXNvdXJjZXMnLCBkLnJlc291cmNlX2lkKTtcblxuICAgICAgICByZXNvdXJjZV9tb2RlbCA9IFJlc291cmNlTW9kZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKHJlc291cmNlX2RhdGEpO1xuXG4gICAgICAgIC8vLyBpZiBsb2dnZWQgaW4sIGxvb2sgZm9yIGNsYXNzZXMgdGhhdCB0aGUgdXNlclxuICAgICAgICAvLy8gaGFzLCBpbiBvcmRyZSB0byBwb3B1bGF0ZSBhIHZpZXcgdGhhdCBhbGxvd3NcbiAgICAgICAgLy8vIHRoZW0gdG8gc2VsZWN0IG9yIGNyZWF0ZSBhIGNsYXNzXG4gICAgICAgIC8vIGNsYXNzX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdjbGFzcycsIClcbiAgICAgICAgLy8gY2xhc3NfbW9kZWwgPSBDbGFzc01vZGVsKCkuZGF0YSgpO1xuICAgICAgICBcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBDbGFzc0FkZCA9IHJlcXVpcmUoJy4vQ2xhc3NBZGRDb250cm9sbGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NDb250cm9sbGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuYWN0aW9ucyA9IHt9O1xuXG4gICAgc2VsZi5hY3Rpb25zLmFkZCA9IENsYXNzQWRkKGNvbnRleHQpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xhc3NBZGRDb250cm9sbGVyLnJlbmRlciAtICcrXG4gICAgICAgICAgICAgICAgICAgICdvdmVydmlldyBvZiBjbGFzc2VzLicpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEluZGV4VmlldyAgPSByZXF1aXJlKCcuL3ZpZXcvaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleENvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICB2aWV3ICA9IEluZGV4VmlldygpXG4gICAgICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbCk7XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgUmVzb3VyY2VNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvcmVzb3VyY2UnKTtcbnZhciBSZXNvdXJjZVZpZXcgID0gcmVxdWlyZSgnLi92aWV3L3Jlc291cmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VDb250cm9sbGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcmVzb3VyY2VfZGF0YTtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWw7XG4gICAgdmFyIHRhZ19kYXRhO1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXNvdXJjZV9kYXRhICA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgncmVzb3VyY2VzJywgZC5pZCk7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gUmVzb3VyY2VNb2RlbCgpLmRhdGEocmVzb3VyY2VfZGF0YSk7XG5cbiAgICAgICAgdmFyIHRhZ19pZHMgPSByZXNvdXJjZV9tb2RlbC50YWdzKCk7XG4gICAgICAgIHRhZ19kYXRhID0ge307XG4gICAgICAgIHRhZ19pZHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgndGFncycsIGQpO1xuICAgICAgICAgICAgdGFnX2RhdGFbdGFnLmlkXSA9IHRhZy5uYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3ICA9IFJlc291cmNlVmlldygpXG4gICAgICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbClcbiAgICAgICAgICAgICAgICAgICAgLnJlc291cmNlTW9kZWwocmVzb3VyY2VfbW9kZWwpXG4gICAgICAgICAgICAgICAgICAgIC50YWdzKHRhZ19kYXRhKTtcblxuICAgICAgICBpZiAoZC52ZXJzaW9uKSB7XG4gICAgICAgICAgICB2aWV3LnZlcnNpb24oZC52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC5lZGl0KSB7XG4gICAgICAgICAgICB2aWV3LmVkaXQoZC5lZGl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZXcuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvVGFnLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0YWcnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICd2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgdGFnX2lkOiBkLmlkLFxuICAgICAgICAgICAgICAgICAgICB0YWdfbmFtZTogZC5uYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdhZGRUb0NsYXNzLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdhZGQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9pZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfdGl0bGU6IHZlcnNpb24udGl0bGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZXdUb0NsYXNzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzZXRWZXJzaW9uLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzZXRFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2FuY2VsRWRpdGFibGUuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NhdmVFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZSBlZGl0YWJsZS4nKTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC52ZXJzaW9ucy5hZGQoZCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kYXRhc3RvcmUuc2V0KCdyZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9tb2RlbC5kYXRhKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKTtcbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9udW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB2aWV3LmVkaXQoKSA/ICdlZGl0JyA6ICd2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX251bWJlcik7XG4gICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgYWN0aW9uOiB2aWV3LmVkaXQoKSA/ICdlZGl0JyA6ICd2aWV3JyxcbiAgICAgICAgICAgIGlkOiByZXNvdXJjZV9tb2RlbC5pZCgpLFxuICAgICAgICAgICAgdGl0bGU6IHZlcnNpb24udGl0bGUsXG4gICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlc291cmNlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogWzAsIDEsIDJdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFswXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHZlcnNpb25zOiBbe1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFswLCAxLCAyXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBOYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHMhPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbMCwgMSwgMl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0aG9yczogWzFdXG4gICAgICAgIH1dLFxuICAgICAgICBjbGFzc2VzOiBbe1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICB0aXRsZTogJ0NvbGluXFwncyBDbGFzcycsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFswXSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFswXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHRpdGxlOiAnQW50aGVyXFwncyBDbGFzcycsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgdXNlcnM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIG5hbWU6ICdDb2xpbiBGcmF6ZXInLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBjbGFzc2VzOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAnQW50aGVyIEtpbGV5JyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzFdLFxuICAgICAgICAgICAgY2xhc3NlczogWzFdXG4gICAgICAgIH1dLFxuICAgICAgICB0YWdzOiBbe1xuICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgIG5hbWU6IFwiTWFwc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBuYW1lOiBcIkRvdWcgU2NvdHRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgbmFtZTogXCJNYWtpbmcgTWVhbmluZ1wiXG4gICAgICAgIH1dXG4gICAgfTtcblxuXG4gICAgZGF0YS5yZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzb3VyY2VzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEuY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFzc2VzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEudXNlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcnMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG4gICAgZGF0YS50YWdzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YWdzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG5cbiAgICBzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkLCBkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nOiAnICsgbmFtZXNwYWNlICsgJyEnICsgaWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UgKyAnIScgKyBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH07XG5cbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZXNwYWNlICsgJyEnICsgaWQpKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hGYWN0b3J5ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjaGFuZ2UnKTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc2VsZi5pcygpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2UoY3VycmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pcyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIGdldHRlclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZV9oYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHRlclxuICAgICAgICB2YXIgaGFzaCA9ICcvJztcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9jbGFzc19oYXNoKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaGFzaDtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBoYXNoOiAnLCBoYXNoKTtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VfaGFzaCAoaGFzaCkge1xuICAgICAgICB2YXIgaW50ZWdlcl9yZWdleCA9IC9eXFxkKyQvO1xuXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMnKSA9PT0gMCkge1xuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFyZ3MgPSAoZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBbXTtcbiAgICAgICAgICAgIGlucHV0LmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfSkoaGFzaC5zcGxpdCgnLycpKTtcblxuICAgICAgICB2YXIgcGFyc2VkID0ge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ2luZGV4J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhcmdzWzBdID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICBpZDogYXJnc1sxXSxcbiAgICAgICAgICAgICAgICBlZGl0OiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnRpdGxlID0gYXJnc1syXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnZlcnNpb24gPSBhcmdzWzNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQuZWRpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0ubWF0Y2goaW50ZWdlcl9yZWdleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmlld2luZyBhIHBhcnRpY3VsYXIgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmlkID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC50aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKChhcmdzLmxlbmd0aCA+PSA0KSAmXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXJnc1szXSA9PT0gJ2VkaXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmFjdGlvbiA9IGFyZ3NbM107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb21lIGFjdGlvbiBpcyBiZWluZyB0YWtlbiBvbiB0aGUgY2xhc3NcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnc1sxXSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5hY3Rpb24gPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMl0gPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQudHlwZSA9IGFyZ3NbMl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQucmVzb3VyY2VfaWQgPSBhcmdzWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Jlc291cmNlX2hhc2goZCkge1xuICAgICAgICB2YXIgYXJncyA9IFsncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBkLmlkLFxuICAgICAgICAgICAgICAgICAgICBkLnRpdGxlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZV9mb3JfdXJsKGQudGl0bGUpIDogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZC52ZXJzaW9uXTtcblxuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgYXJncy5wdXNoKCdlZGl0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyMvJyArIGFyZ3Muam9pbignLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9jbGFzc19oYXNoIChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWydjbGFzcyddO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgYWN0aW9uIGlzIHRvIHZpZXdcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgLy8gYWN0aW9uIHRha2VuIG9uIHRoZSBjbGFzc1xuICAgICAgICAgICAgLy8gc3VjaCBhcyAnYWRkJyAtLSAnYWRkIHRvIGNsYXNzJ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLnR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKGQucmVzb3VyY2VfaWQpO1xuICAgICAgICBhcmdzLnB1c2goZXNjYXBlX2Zvcl91cmwoZC5yZXNvdXJjZV90aXRsZSkpO1xuXG4gICAgICAgIGlmIChkLmFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgbmV2ZXIgYmUgYSBzdGF0ZSB3aGVyZVxuICAgICAgICAgICAgLy8gZWRpdCBpcyB0cnVlICYgYWN0aW9uIGlzIGEgc3RyaW5nXG4gICAgICAgICAgICBhcmdzLnB1c2goZC5hY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjLycgKyBhcmdzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVfZm9yX3VybCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBIYXNoICAgICA9IHJlcXVpcmUoJy4vaGFzaCcpO1xudmFyIFJvdXRlciAgID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcbnZhciBEYXRhICAgICA9IHJlcXVpcmUoJy4vZmFrZV9kYXRhJyk7XG52YXIgUmVzb3VyY2UgPSByZXF1aXJlKCcuL1Jlc291cmNlVmlld0NvbnRyb2xsZXInKTtcbnZhciBDbGFzcyAgICA9IHJlcXVpcmUoJy4vQ2xhc3NWaWV3Q29udHJvbGxlcicpO1xudmFyIEluZGV4ICAgID0gcmVxdWlyZSgnLi9JbmRleFZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG5cbiAgICAvLyB2aWV3IGNvbnRyb2xsZXJzXG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LmNsYXNzXyAgICA9IENsYXNzKGNvbnRleHQpO1xuICAgIGNvbnRleHQuaW5kZXggICAgID0gSW5kZXgoY29udGV4dCk7XG4gICAgY29udGV4dC5yb3V0ZXIgICAgPSBSb3V0ZXIoY29udGV4dCk7XG5cbiAgICAoZnVuY3Rpb24gaW5pdGlhbGl6ZSAoKSB7XG4gICAgICAgIGNvbnRleHQucm91dGVyLmluaXRpYWxpemUoKTtcbiAgICB9KSgpO1xufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHRpdGxlO1xuICAgIHZhciBhdXRob3JzID0gW107XG4gICAgdmFyIHJlc291cmNlcyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnRpdGxlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGl0bGU7XG4gICAgICAgIHRpdGxlID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXV0aG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGF1dGhvcnM7XG4gICAgfTtcbiAgICBzZWxmLmF1dGhvcnMuYWRkID0gZnVuY3Rpb24gKGF1dGhvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBhdXRob3JfaWRcIjtcbiAgICAgICAgXG4gICAgICAgIHZhciBpbl9hdXRob3JzID0gZmFsc2U7XG4gICAgICAgIGF1dGhvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGF1dGhvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluX2F1dGhvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX2F1dGhvcnMpIHtcbiAgICAgICAgICAgIGF1dGhvcnMucHVzaChhdXRob3JfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmF1dGhvcnMucmVtb3ZlID0gZnVuY3Rpb24gKGF1dGhvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBhdXRob3JfaWRcIjtcbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgYXV0aG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gYXV0aG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIGF1dGhvcnMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VzO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGluX3Jlc291cmNlcyA9IGZhbHNlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fcmVzb3VyY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9yZXNvdXJjZXMpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5yZXNvdXJjZXMucmVtb3ZlID0gZnVuY3Rpb24gKHJlc291cmNlX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIHJlc291cmNlX2lkXCI7XG5cbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RvX3JlbW92ZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBhdXRob3JzOiBhdXRob3JzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgPSB4LmlkO1xuICAgICAgICB0aXRsZSA9IHgudGl0bGU7XG4gICAgICAgIGF1dGhvcnMgPSB4LmF1dGhvcnM7XG4gICAgICAgIHJlc291cmNlcyA9IHgucmVzb3VyY2VzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgdmFyIGlkO1xuICAgIHZhciB2ZXJzaW9ucyA9IFtdO1xuICAgIHZhciBhdXRob3JzICA9IFtdO1xuICAgIHZhciBjbGFzc2VzICA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb25zID0ge307XG4gICAgc2VsZi52ZXJzaW9ucy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgdmVyc2lvbnMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5nZXQgPSBmdW5jdGlvbiAodmVyc2lvbl9pZCkge1xuICAgICAgICAvLyBkb24ndCBtYWtlIHRoZSB1c2VyIHRoaW5rIGFib3V0IHRoZSBmYWN0XG4gICAgICAgIC8vIHRoYXQgY291bnRpbmcgc3RhcnRzIGZyb20gMC4gQmVjYXVzZVxuICAgICAgICAvLyB0aGVyZSB3aWxsIG5ldmVyIGJlIGEgdmVyc2lvbiAwLlxuICAgICAgICBpZiAodmVyc2lvbl9pZCA+IHZlcnNpb25zLmxlbmd0aCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2ZXJzaW9uc1t2ZXJzaW9uX2lkLTFdO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5jb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgc2VsZi5hdXRob3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXV0aG9ycztcbiAgICB9O1xuICAgIHNlbGYuYXV0aG9ycy5hZGQgPSBmdW5jdGlvbiAoYXV0aG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGF1dGhvcl9pZFwiO1xuXG4gICAgICAgIHZhciBpbl9hdXRob3JzID0gZmFsc2U7XG4gICAgICAgIGF1dGhvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGF1dGhvcl9pZCkge1xuICAgICAgICAgICAgICAgIGluX2F1dGhvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX2F1dGhvcnMpIHtcbiAgICAgICAgICAgIGF1dGhvcnMucHVzaChhdXRob3JfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmF1dGhvcnMucmVtb3ZlID0gZnVuY3Rpb24gKGF1dGhvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBhdXRob3JfaWRcIjtcbiAgICAgICAgdmFyIGluZGV4X3RvX3JlbW92ZTtcbiAgICAgICAgYXV0aG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gYXV0aG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleF90b19yZW1vdmUpIHtcbiAgICAgICAgICAgIGF1dGhvcnMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXTtcbiAgICAgICAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdGFncyA9IHRhZ3MuY29uY2F0KGQudGFncyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2V0X3VuaXF1ZSh0YWdzKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gICAgICAgICAgICAgICAgYXV0aG9ycyA6IGF1dGhvcnMsXG4gICAgICAgICAgICAgICAgdGFncyAgICA6IHRhZ3MsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA6IGNsYXNzZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCAgICAgICA9IHguaWQ7XG4gICAgICAgIHZlcnNpb25zID0geC52ZXJzaW9ucztcbiAgICAgICAgYXV0aG9ycyAgPSB4LmF1dGhvcnM7XG4gICAgICAgIHRhZ3MgICAgID0geC50YWdzO1xuICAgICAgICBjbGFzc2VzICA9IHguY2xhc3NlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X3VuaXF1ZSAoYXJyKSB7XG4gICAgICAgIHZhciB1ID0ge307XG4gICAgICAgIHZhciBhID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1Lmhhc093blByb3BlcnR5KGFycltpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEucHVzaChhcnJbaV0pO1xuICAgICAgICAgICAgdVthcnJbaV1dID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvdXRlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHByZXZpb3VzX3ZpZXcgPSB7XG4gICAgICAgIGNvbnRyb2xsZXI6ICdpbmRleCdcbiAgICB9O1xuXG4gICAgY29udGV4dC5oYXNoLmRpc3BhdGNoXG4gICAgICAgIC5vbignY2hhbmdlLnJvdXRlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBzZXQoZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXQoY29udGV4dC5oYXNoLmlzKCkpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0IChkKSB7XG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzb3VyY2UucmVuZGVyKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgaWYgKGQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGFzc18uYWN0aW9ucy5hZGQucmVuZGVyKGQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsYXNzXy5yZW5kZXIoZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnaW5kZXgnKSB7XG4gICAgICAgICAgICBjb250ZXh0LmluZGV4LnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJzQwNCcpIHtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuZXJyb3IucmVuZGVyKCc0MDQnKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXNfdmlldyA9IGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsbnVsbCwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleFZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2gxJykudGV4dCgnRGF0YWJhbmsuJyk7XG4gICAgICAgIGdyaWQuYXBwZW5kKCdoNCcpLnRleHQoJ1RoZSBiZWdpbm5pbmcuJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8wLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBIHJlc291cmNlJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8xLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBbm90aGVyIHJlc291cmNlJyk7XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSB7fTtcbiAgICB2YXIgdGFncyAgICAgICAgICAgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHZhciBlZGl0ID0gZmFsc2U7XG4gICAgdmFyIHZlcnNpb25fZGlzcGxheWVkO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhZGRUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb1RhZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYW5jZWxFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzYXZlRWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0VmVyc2lvbicpO1xuXG4gICAgdmFyIGxheW91dF9hY3Rpb25hYmxlX2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWFjdGlvbnMnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1hY3Rpb25zIGxlZnQgZml4ZWQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnNcbiAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHZhciBsYXlvdXRfZWRpdGFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgZWRpdGFibGUgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9lZGl0YWJsZV9jb250ZW50XG4gICAgfV07XG5cbiAgICBzZWxmLnJlc291cmNlTW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmVzb3VyY2VfbW9kZWw7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gbW9kZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRhZ3MgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YWdzO1xuICAgICAgICB0YWdzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi52ZXJzaW9uID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmVyc2lvbl9kaXNwbGF5ZWQ7XG4gICAgICAgIHZlcnNpb25fZGlzcGxheWVkID0gK3g7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmVkaXQgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlZGl0O1xuICAgICAgICBlZGl0ID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoKCFzZWxmLnZlcnNpb24oKSkgfFxuICAgICAgICAgICAgKHNlbGYudmVyc2lvbigpID4gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCkpKSB7XG5cbiAgICAgICAgICAgIHNlbGYudmVyc2lvbihyZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBncmlkID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgcmVuZGVyX21ldGhvZDtcbiAgICAgICAgaWYgKGVkaXQpIHtcbiAgICAgICAgICAgIHJlbmRlcl9tZXRob2QgPSByZW5kZXJfZWRpdGFibGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJfbWV0aG9kID0gcmVuZGVyX2FjdGlvbmFibGU7XG4gICAgICAgIH1cblxuICAgICAgICBncmlkLmNhbGwocmVuZGVyX21ldGhvZCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9lZGl0YWJsZSAoc2VsKSB7XG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9lZGl0YWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGQubGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9hY3Rpb25hYmxlIChzZWwpIHtcblxuICAgICAgICB2YXIgbGF5b3V0ID0gc2VsLnNlbGVjdEFsbCgnLnJlc291cmNlLXN0cnVjdHVyZScpXG4gICAgICAgICAgICAuZGF0YShsYXlvdXRfYWN0aW9uYWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9ucyAoc2VsKSB7XG4gICAgICAgIC8vIGVkaXRcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWVkaXQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCBlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdCh0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldEVkaXRhYmxlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnRWRpdCB0aGlzIGFzc2lnbm1lbnQuJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2cocmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuY291bnQoKSk7XG4gICAgICAgIC8vIHZlcnNpb25zXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS12ZXJzaW9ucycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtYWN0aW9uLS12ZXJzaW9ucy0tdmVyc2lvbicpXG4gICAgICAgICAgICAuZGF0YShkMy5yYW5nZShyZXNvdXJjZV9tb2RlbC52ZXJzaW9ucy5jb3VudCgpKSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBjbHMgPSAncmVzb3VyY2UtYWN0aW9uLS12ZXJzaW9ucy0tdmVyc2lvbic7XG4gICAgICAgICAgICAgICAgaWYgKChkICsgMSkgPT09IHNlbGYudmVyc2lvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNscyArPSAnIHNlbGVjdGVkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0IHZlcnNpb24nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKzEpO1xuICAgICAgICAgICAgICAgIHNlbGYudmVyc2lvbihkKzEpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0VmVyc2lvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3YuJyArIChkKzEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xhc3NcbiAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3MgPSBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MnKTtcblxuICAgICAgICBhY3Rpb25zX2NsYXNzLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzLS1hZGQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFkZFRvQ2xhc3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBZGQgdG8gQ2xhc3MnKTtcblxuICAgICAgICBhY3Rpb25zX2NsYXNzLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzLS12aWV3JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2VWaWV3VG9DbGFzcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ1ZpZXcgQ2xhc3MnKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnQgKHNlbCkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlc291cmNlX21vZGVsLmRhdGEoKTtcblxuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX2Rpc3BsYXllZCk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnaDMnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KHZlcnNpb24udGl0bGUpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tYm9keScpXG4gICAgICAgICAgICAuaHRtbCh2ZXJzaW9uLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdmlldyB0byB0YWc6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvVGFnKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRhZ3NbZF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFnc1tkXTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9lZGl0YWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHZhciBmb3JtID0gc2VsLmFwcGVuZCgnZm9ybScpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LWZvcm0nKVxuICAgICAgICAgICAgLmF0dHIoJ29uU3VibWl0JywgJ3JldHVybiBmYWxzZTsnKTtcblxuICAgICAgICB2YXIgZWRpdGFibGVfdGl0bGUgPSBmb3JtLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24udGl0bGUpO1xuXG4gICAgICAgIC8vIHJlcGxhY2Ugd2l0aCBhbiBodG1sIGVkaXRvci5cbiAgICAgICAgLy8gYm9keS5odG1sIGluLCBwdWxsIG91dCB2YWx1ZSBhbmRcbiAgICAgICAgLy8gc3Rhc2ggaXQgYmFjayBpbnRvIGJvZHkuaHRtbFxuICAgICAgICB2YXIgZWRpdGFibGVfYm9keV9odG1sID0gZm9ybS5hcHBlbmQoJ3RleHRhcmVhJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5LS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5LS1lZGl0YWJsZScpXG4gICAgICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgdmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHZhciBlZGl0YWJsZV90YWdzID0gZm9ybVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWNvbnRlbnQtLXRhZ3MtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWdzW2RdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnQ2FuY2VsJylcbiAgICAgICAgICAgIC50ZXh0KCdDYW5jZWwnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2FuY2VsRWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3N1Ym1pdCcpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnU2F2ZScpXG4gICAgICAgICAgICAudGV4dCgnU2F2ZScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkX3RhZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBlZGl0YWJsZV90YWdzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCh0aGlzKS5wcm9wZXJ0eSgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF90YWdzLnB1c2goZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X3ZlcnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlZGl0YWJsZV90aXRsZS5wcm9wZXJ0eSgndmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogZWRpdGFibGVfYm9keV9odG1sLnByb3BlcnR5KCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHNlbGVjdGVkX3RhZ3NcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKChuZXdfdmVyc2lvbi50aXRsZSAhPT0gdmVyc2lvbi50aXRsZSkgfFxuICAgICAgICAgICAgICAgICAgICAobmV3X3ZlcnNpb24uYm9keS5odG1sICE9PSB2ZXJzaW9uLmJvZHkuaHRtbCkgfFxuICAgICAgICAgICAgICAgICAgICAoIShhcnJheUVxdWFscyhuZXdfdmVyc2lvbi50YWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi50YWdzKSkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNhdmVFZGl0YWJsZShuZXdfdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5RXF1YWxzIChhcnIxLCBhcnIyKSB7XG4gICAgICAgIGlmIChhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gYXJyMS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07Il19
