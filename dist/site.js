(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./view/index":8}],2:[function(require,module,exports){
var ResourceModel = require('./model/resource');
var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var data;
    var model;
    var view;

    self.render = function (d) {
        data  = context.datastore.get('resource', d.id);
        model = ResourceModel().data(data);
        view  = ResourceView()
                    .container(context.body_sel)
                    .model(model);

        if (d.version) {
            view.version(d.version);
        }
        if (d.edit) {
            view.edit(d.edit);
        }

        view.dispatch
            .on('changeViewToTag.controller', function () {

            })
            .on('addToClass.controller', function (d) {

            })
            .on('changeViewToClass.controller', function (d) {

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
                model.versions.add(d);
                context.datastore.set('resource',
                                      model.id(),
                                      model.data());

                var version_number = model.versions.count();
                var version = model.versions.get(version_number);

                context.hash.is({
                    view: 'resource',
                    id: model.id(),
                    title: version.title,
                    version: version_number,
                    edit: view.edit()
                });
            });

        view.render();
    };

    function stash_and_rerender_state () {
        var version_number = view.version();
        var version = model.versions.get(version_number);
        context.hash.is({
            view: 'resource',
            id: model.id(),
            title: version.title,
            version: version_number,
            edit: view.edit()
        });
    }
    
    return self;
};
},{"./model/resource":6,"./view/resource":9}],3:[function(require,module,exports){
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
            tags: ["Maps", "Doug Scott", "Making Meaning"]
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
            tags: ["Maps", "Doug Scott", "Making Meaning"]
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
            tags: ["Maps", "Doug Scott", "Making Meaning"]
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
        }]
    };


    data.resources.forEach(function (d) {
        localStorage.setItem('resource!' + d.id,
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
},{}],4:[function(require,module,exports){
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
        if (d.view === 'resource') {
            hash = format_resource_hash(d);
        }

        window.location = hash;
        console.log('set hash: ', hash);

        return hash;
    };

    function parse_hash (hash) {
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
            view: 'index'
        };

        if (args[0] === 'resource') {
            parsed = {
                view: 'resource',
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

        return parsed;
    }

    function format_resource_hash(d) {
        var args = ['resource',
                    d.id,
                    d.title ?
                        escape_for_url(d.title) : 'resource',
                    d.version];

        if (d.edit) {
            args.push('edit');
        }

        return '#/' + args.join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};
},{}],5:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
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
    context.index     = Index(context);
    context.router    = Router(context);

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./IndexViewController":1,"./ResourceViewController":2,"./fake_data":3,"./hash":4,"./router":7}],6:[function(require,module,exports){
module.exports = function ResourceModel () {
    var self = {};
    var id;
    var versions = [];
    var authors = [];

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
        authors.push(author_id);
        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: id,
                versions: versions,
                authors: authors
            };
        }

        id = x.id;
        versions = x.versions;
        authors = x.authors;

        return self;
    };

    return self;
};
},{}],7:[function(require,module,exports){
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
        if (d.view === 'index') {
            context.index.render();
        }

        previous_view = d;
    }

    return self;
};
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};
    var resource_model = {};
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

    self.model = function (model) {
        if (!arguments.length) return resource_model;
        resource_model = model;
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
                self.dispatch.addToClass(resource_model);
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
                self.dispatch.changeViewToTag(d);
            })
            .attr('class', 'resource-content--tags--tag')
            .append('p')
            .text(function (d) {
                return d;
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
                return d;
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
                var tags = [];
                editable_tags.each(function (d, i) {
                    if (d3.select(this).property('checked')) {
                        tags.push(d);
                    }
                });
                var new_version = {
                    title: editable_title.property('value'),
                    body: {
                        html: editable_body_html.property('value')
                    },
                    tags: tags
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
},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvSW5kZXhWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL1Jlc291cmNlVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9mYWtlX2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9oYXNoLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L3Jlc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSW5kZXhWaWV3ICA9IHJlcXVpcmUoJy4vdmlldy9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluZGV4Q29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZpZXcgID0gSW5kZXhWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKTtcblxuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSZXNvdXJjZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9yZXNvdXJjZScpO1xudmFyIFJlc291cmNlVmlldyAgPSByZXF1aXJlKCcuL3ZpZXcvcmVzb3VyY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhO1xuICAgIHZhciBtb2RlbDtcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgZGF0YSAgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ3Jlc291cmNlJywgZC5pZCk7XG4gICAgICAgIG1vZGVsID0gUmVzb3VyY2VNb2RlbCgpLmRhdGEoZGF0YSk7XG4gICAgICAgIHZpZXcgID0gUmVzb3VyY2VWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgICAgICAgICAubW9kZWwobW9kZWwpO1xuXG4gICAgICAgIGlmIChkLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHZpZXcudmVyc2lvbihkLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLmVkaXQpIHtcbiAgICAgICAgICAgIHZpZXcuZWRpdChkLmVkaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9UYWcuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignYWRkVG9DbGFzcy5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldFZlcnNpb24uY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjYW5jZWxFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2F2ZUVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGVkaXRhYmxlLicpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZlcnNpb25zLmFkZChkKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5zZXQoJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0YSgpKTtcblxuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IG1vZGVsLnZlcnNpb25zLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBtb2RlbC52ZXJzaW9ucy5nZXQodmVyc2lvbl9udW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlcixcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogdmlldy5lZGl0KClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSAoKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IHZpZXcudmVyc2lvbigpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG1vZGVsLnZlcnNpb25zLmdldCh2ZXJzaW9uX251bWJlcik7XG4gICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICB2aWV3OiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgaWQ6IG1vZGVsLmlkKCksXG4gICAgICAgICAgICB0aXRsZTogdmVyc2lvbi50aXRsZSxcbiAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyLFxuICAgICAgICAgICAgZWRpdDogdmlldy5lZGl0KClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgICByZXNvdXJjZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHZlcnNpb25zOiBbe1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIk1hcHNcIiwgXCJEb3VnIFNjb3R0XCIsIFwiTWFraW5nIE1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0aG9yczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wiTWFwc1wiLCBcIkRvdWcgU2NvdHRcIiwgXCJNYWtpbmcgTWVhbmluZ1wiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBOYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHMhPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJNYXBzXCIsIFwiRG91ZyBTY290dFwiLCBcIk1ha2luZyBNZWFuaW5nXCJdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgY2xhc3NlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdGl0bGU6ICdDb2xpblxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBhdXRob3JzOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0aXRsZTogJ0FudGhlclxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMV0sXG4gICAgICAgICAgICBhdXRob3JzOiBbMV1cbiAgICAgICAgfV0sXG4gICAgICAgIHVzZXJzOiBbe1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBuYW1lOiAnQ29saW4gRnJhemVyJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgY2xhc3NlczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgbmFtZTogJ0FudGhlciBLaWxleScsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsxXVxuICAgICAgICB9XVxuICAgIH07XG5cblxuICAgIGRhdGEucmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jlc291cmNlIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEuY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFzc2VzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEudXNlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcnMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG5cbiAgICBzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkLCBkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nOiAnICsgbmFtZXNwYWNlICsgJyEnICsgaWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UgKyAnIScgKyBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH07XG5cbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZXNwYWNlICsgJyEnICsgaWQpKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hGYWN0b3J5ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjaGFuZ2UnKTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc2VsZi5pcygpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2UoY3VycmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pcyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIGdldHRlclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZV9oYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHRlclxuICAgICAgICB2YXIgaGFzaCA9ICcvJztcbiAgICAgICAgaWYgKGQudmlldyA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaGFzaDtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBoYXNoOiAnLCBoYXNoKTtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VfaGFzaCAoaGFzaCkge1xuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzID0gKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgICAgICBpbnB1dC5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pKGhhc2guc3BsaXQoJy8nKSk7XG5cbiAgICAgICAgdmFyIHBhcnNlZCA9IHtcbiAgICAgICAgICAgIHZpZXc6ICdpbmRleCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIHZpZXc6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3NbMV0sXG4gICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgIHBhcnNlZC50aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC52ZXJzaW9uID0gYXJnc1szXTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQuZWRpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgZC50aXRsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVfZm9yX3VybChkLnRpdGxlKSA6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQudmVyc2lvbl07XG5cbiAgICAgICAgaWYgKGQuZWRpdCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKCdlZGl0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyMvJyArIGFyZ3Muam9pbignLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9mb3JfdXJsIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEhhc2ggICAgID0gcmVxdWlyZSgnLi9oYXNoJyk7XG52YXIgUm91dGVyICAgPSByZXF1aXJlKCcuL3JvdXRlcicpO1xudmFyIERhdGEgICAgID0gcmVxdWlyZSgnLi9mYWtlX2RhdGEnKTtcbnZhciBSZXNvdXJjZSA9IHJlcXVpcmUoJy4vUmVzb3VyY2VWaWV3Q29udHJvbGxlcicpO1xudmFyIEluZGV4ICAgID0gcmVxdWlyZSgnLi9JbmRleFZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG5cbiAgICAvLyB2aWV3IGNvbnRyb2xsZXJzXG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LmluZGV4ICAgICA9IEluZGV4KGNvbnRleHQpO1xuICAgIGNvbnRleHQucm91dGVyICAgID0gUm91dGVyKGNvbnRleHQpO1xuXG4gICAgKGZ1bmN0aW9uIGluaXRpYWxpemUgKCkge1xuICAgICAgICBjb250ZXh0LnJvdXRlci5pbml0aWFsaXplKCk7XG4gICAgfSkoKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlTW9kZWwgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGlkO1xuICAgIHZhciB2ZXJzaW9ucyA9IFtdO1xuICAgIHZhciBhdXRob3JzID0gW107XG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHNlbGYudmVyc2lvbnMgPSB7fTtcbiAgICBzZWxmLnZlcnNpb25zLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICB2ZXJzaW9ucy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLnZlcnNpb25zLmdldCA9IGZ1bmN0aW9uICh2ZXJzaW9uX2lkKSB7XG4gICAgICAgIC8vIGRvbid0IG1ha2UgdGhlIHVzZXIgdGhpbmsgYWJvdXQgdGhlIGZhY3RcbiAgICAgICAgLy8gdGhhdCBjb3VudGluZyBzdGFydHMgZnJvbSAwLiBCZWNhdXNlXG4gICAgICAgIC8vIHRoZXJlIHdpbGwgbmV2ZXIgYmUgYSB2ZXJzaW9uIDAuXG4gICAgICAgIGlmICh2ZXJzaW9uX2lkID4gdmVyc2lvbnMubGVuZ3RoKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zW3ZlcnNpb25faWQtMV07XG4gICAgfTtcbiAgICBzZWxmLnZlcnNpb25zLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmVyc2lvbnMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBzZWxmLmF1dGhvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhdXRob3JzO1xuICAgIH07XG4gICAgc2VsZi5hdXRob3JzLmFkZCA9IGZ1bmN0aW9uIChhdXRob3JfaWQpIHtcbiAgICAgICAgYXV0aG9ycy5wdXNoKGF1dGhvcl9pZCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgICAgICAgICAgICAgICBhdXRob3JzOiBhdXRob3JzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgPSB4LmlkO1xuICAgICAgICB2ZXJzaW9ucyA9IHgudmVyc2lvbnM7XG4gICAgICAgIGF1dGhvcnMgPSB4LmF1dGhvcnM7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJvdXRlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHByZXZpb3VzX3ZpZXcgPSB7XG4gICAgICAgIHZpZXc6ICdpbmRleCdcbiAgICB9O1xuXG4gICAgY29udGV4dC5oYXNoLmRpc3BhdGNoXG4gICAgICAgIC5vbignY2hhbmdlLnJvdXRlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBzZXQoZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXQoY29udGV4dC5oYXNoLmlzKCkpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0IChkKSB7XG4gICAgICAgIGlmIChkLnZpZXcgPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzb3VyY2UucmVuZGVyKGQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLnZpZXcgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIGNvbnRleHQuaW5kZXgucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91c192aWV3ID0gZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleFZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2gxJykudGV4dCgnRGF0YWJhbmsuJyk7XG4gICAgICAgIGdyaWQuYXBwZW5kKCdoNCcpLnRleHQoJ1RoZSBiZWdpbm5pbmcuJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8wLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBIHJlc291cmNlJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8xLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBbm90aGVyIHJlc291cmNlJyk7XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX21vZGVsID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICB2YXIgZWRpdCA9IGZhbHNlO1xuICAgIHZhciB2ZXJzaW9uX2Rpc3BsYXllZDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYWRkVG9DbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9DbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9UYWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0RWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2FuY2VsRWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2F2ZUVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldFZlcnNpb24nKTtcblxuICAgIHZhciBsYXlvdXRfYWN0aW9uYWJsZV9kYXRhID0gW3tcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1hY3Rpb25zJyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYWN0aW9ucyBsZWZ0IGZpeGVkJyxcbiAgICAgICAgbGF5b3V0OiBsYXlvdXRfYWN0aW9uYWJsZV9hY3Rpb25zXG4gICAgfSwge1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWNvbnRlbnQnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1ib2R5IHJpZ2h0JyxcbiAgICAgICAgbGF5b3V0OiBsYXlvdXRfYWN0aW9uYWJsZV9jb250ZW50XG4gICAgfV07XG5cbiAgICB2YXIgbGF5b3V0X2VkaXRhYmxlX2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWNvbnRlbnQnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1ib2R5IGVkaXRhYmxlIHJpZ2h0JyxcbiAgICAgICAgbGF5b3V0OiBsYXlvdXRfZWRpdGFibGVfY29udGVudFxuICAgIH1dO1xuXG4gICAgc2VsZi5tb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbDtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBtb2RlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi52ZXJzaW9uID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmVyc2lvbl9kaXNwbGF5ZWQ7XG4gICAgICAgIHZlcnNpb25fZGlzcGxheWVkID0gK3g7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmVkaXQgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlZGl0O1xuICAgICAgICBlZGl0ID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoKCFzZWxmLnZlcnNpb24oKSkgfFxuICAgICAgICAgICAgKHNlbGYudmVyc2lvbigpID4gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCkpKSB7XG5cbiAgICAgICAgICAgIHNlbGYudmVyc2lvbihyZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBncmlkID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgcmVuZGVyX21ldGhvZDtcbiAgICAgICAgaWYgKGVkaXQpIHtcbiAgICAgICAgICAgIHJlbmRlcl9tZXRob2QgPSByZW5kZXJfZWRpdGFibGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJfbWV0aG9kID0gcmVuZGVyX2FjdGlvbmFibGU7XG4gICAgICAgIH1cblxuICAgICAgICBncmlkLmNhbGwocmVuZGVyX21ldGhvZCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9lZGl0YWJsZSAoc2VsKSB7XG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9lZGl0YWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGQubGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9hY3Rpb25hYmxlIChzZWwpIHtcblxuICAgICAgICB2YXIgbGF5b3V0ID0gc2VsLnNlbGVjdEFsbCgnLnJlc291cmNlLXN0cnVjdHVyZScpXG4gICAgICAgICAgICAuZGF0YShsYXlvdXRfYWN0aW9uYWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9ucyAoc2VsKSB7XG4gICAgICAgIC8vIGVkaXRcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWVkaXQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCBlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdCh0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldEVkaXRhYmxlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnRWRpdCB0aGlzIGFzc2lnbm1lbnQuJyk7XG5cbiAgICAgICAgLy8gdmVyc2lvbnNcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJylcbiAgICAgICAgICAgIC5kYXRhKGQzLnJhbmdlKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9ICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJztcbiAgICAgICAgICAgICAgICBpZiAoKGQgKyAxKSA9PT0gc2VsZi52ZXJzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgdmVyc2lvbicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZXJzaW9uKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRWZXJzaW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndi4nICsgKGQrMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGFzc1xuICAgICAgICB2YXIgYWN0aW9uc19jbGFzcyA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLWFkZCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYWRkVG9DbGFzcyhyZXNvdXJjZV9tb2RlbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQWRkIHRvIENsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tdmlldycpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvQ2xhc3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdWaWV3IENsYXNzJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2gzJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZScpXG4gICAgICAgICAgICAudGV4dCh2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHknKVxuICAgICAgICAgICAgLmh0bWwodmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gdGFnOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb1RhZyhkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9lZGl0YWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHZhciBmb3JtID0gc2VsLmFwcGVuZCgnZm9ybScpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LWZvcm0nKVxuICAgICAgICAgICAgLmF0dHIoJ29uU3VibWl0JywgJ3JldHVybiBmYWxzZTsnKTtcblxuICAgICAgICB2YXIgZWRpdGFibGVfdGl0bGUgPSBmb3JtLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24udGl0bGUpO1xuXG4gICAgICAgIC8vIHJlcGxhY2Ugd2l0aCBhbiBodG1sIGVkaXRvci5cbiAgICAgICAgLy8gYm9keS5odG1sIGluLCBwdWxsIG91dCB2YWx1ZSBhbmRcbiAgICAgICAgLy8gc3Rhc2ggaXQgYmFjayBpbnRvIGJvZHkuaHRtbFxuICAgICAgICB2YXIgZWRpdGFibGVfYm9keV9odG1sID0gZm9ybS5hcHBlbmQoJ3RleHRhcmVhJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5LS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5LS1lZGl0YWJsZScpXG4gICAgICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgdmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHZhciBlZGl0YWJsZV90YWdzID0gZm9ybVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWNvbnRlbnQtLXRhZ3MtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnQ2FuY2VsJylcbiAgICAgICAgICAgIC50ZXh0KCdDYW5jZWwnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2FuY2VsRWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3N1Ym1pdCcpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnU2F2ZScpXG4gICAgICAgICAgICAudGV4dCgnU2F2ZScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIHRhZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBlZGl0YWJsZV90YWdzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCh0aGlzKS5wcm9wZXJ0eSgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzLnB1c2goZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X3ZlcnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlZGl0YWJsZV90aXRsZS5wcm9wZXJ0eSgndmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogZWRpdGFibGVfYm9keV9odG1sLnByb3BlcnR5KCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3NcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKChuZXdfdmVyc2lvbi50aXRsZSAhPT0gdmVyc2lvbi50aXRsZSkgfFxuICAgICAgICAgICAgICAgICAgICAobmV3X3ZlcnNpb24uYm9keS5odG1sICE9PSB2ZXJzaW9uLmJvZHkuaHRtbCkgfFxuICAgICAgICAgICAgICAgICAgICAoIShhcnJheUVxdWFscyhuZXdfdmVyc2lvbi50YWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi50YWdzKSkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNhdmVFZGl0YWJsZShuZXdfdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5RXF1YWxzIChhcnIxLCBhcnIyKSB7XG4gICAgICAgIGlmIChhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gYXJyMS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07Il19
