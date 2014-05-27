(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        localStorage.setItem(namespace + '!' + id,
                             JSON.stringify(d));
    };

    self.get = function (namespace, id) {
        return JSON.parse(
            localStorage.getItem(namespace + '!' + id));
    }


    return self;
};
},{}],2:[function(require,module,exports){
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
        console.log(args.length);
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

        return '#' + args.join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};
},{}],3:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./resource/controller.js');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel = body_sel;
    context.hash     = Hash();
    context.data     = Data();
    context.resource = Resource(context);
    context.router   = Router(context);

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./fake_data":1,"./hash":2,"./resource/controller.js":4,"./router":7}],4:[function(require,module,exports){
var Model = require('./model');
var View  = require('./view');

module.exports = function ResourceController (context) {
    var self = {};
    var data;
    var model;
    var view;

    self.render = function (d) {
        data  = context.data.get('resource', d.id);
        model = Model().data(data);
        view  = View()
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
            })
            .on('setEditable.controller', function () {
                stash_and_rerender_state();
            })
            .on('cancelEditable.controller', function () {
                stash_and_rerender_state();
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
},{"./model":5,"./view":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
                                'saveEdtiable',
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
        console.log('render_method');
        console.log(render_method);
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
            .attr('name', 'resource-content-form');

        form.append('input')
            .attr('type', 'text')
            .attr('name', 'resource-content--title--editable')
            .property('value', version.title);

        // replace with an html editor.
        // body.html in, pull out value and
        // stash it back into body.html
        form.append('textarea')
            .attr('name', 'resource-content--body--editable')
            .property('value', version.body.html);

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
                self.dispatch.saveEditable();
            });
    }

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

        previous_view = d;
    }

    return self;
};
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvZmFrZV9kYXRhLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaGFzaC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvcmVzb3VyY2UvY29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3Jlc291cmNlL21vZGVsLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvcmVzb3VyY2Uvdmlldy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlc291cmNlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wiTWFwc1wiLCBcIkRvdWcgU2NvdHRcIiwgXCJNYWtpbmcgTWVhbmluZ1wiXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBhdXRob3JzOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB2ZXJzaW9uczogW3tcbiAgICAgICAgICAgIHRpdGxlOiAnTWFwcGluZzogVGhlIEpvdXJuZXkgYXMgQ29udGV4dCBmb3IgbmFycmF0aXZlJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBodG1sOiAnPHA+PHN0cm9uZz5NYXBzPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJNYXBzXCIsIFwiRG91ZyBTY290dFwiLCBcIk1ha2luZyBNZWFuaW5nXCJdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIE5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwcyE8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIk1hcHNcIiwgXCJEb3VnIFNjb3R0XCIsIFwiTWFraW5nIE1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0aG9yczogWzFdXG4gICAgICAgIH1dLFxuICAgICAgICBjbGFzc2VzOiBbe1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICB0aXRsZTogJ0NvbGluXFwncyBDbGFzcycsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFswXSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFswXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHRpdGxlOiAnQW50aGVyXFwncyBDbGFzcycsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgdXNlcnM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIG5hbWU6ICdDb2xpbiBGcmF6ZXInLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBjbGFzc2VzOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAnQW50aGVyIEtpbGV5JyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzFdLFxuICAgICAgICAgICAgY2xhc3NlczogWzFdXG4gICAgICAgIH1dXG4gICAgfTtcblxuXG4gICAgZGF0YS5yZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzb3VyY2UhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG4gICAgZGF0YS5jbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXNzZXMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG4gICAgZGF0YS51c2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VycyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSk7XG4gICAgfSlcblxuICAgIHNlbGYuc2V0ID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgaWQsIGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZXNwYWNlICsgJyEnICsgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5nZXQgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBpZCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWVzcGFjZSArICchJyArIGlkKSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNoRmFjdG9yeSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2hhbmdlJyk7XG5cbiAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHNlbGYuaXMoKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlKGN1cnJlbnQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaXMgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyBnZXR0ZXJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VfaGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR0ZXJcbiAgICAgICAgdmFyIGhhc2ggPSAnLyc7XG4gICAgICAgIGlmIChkLnZpZXcgPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIGhhc2ggPSBmb3JtYXRfcmVzb3VyY2VfaGFzaChkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhhc2g7XG5cbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlX2hhc2ggKGhhc2gpIHtcbiAgICAgICAgaWYgKGhhc2guaW5kZXhPZignIycpID09PSAwKSB7XG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJncyA9IChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IFtdO1xuICAgICAgICAgICAgaW5wdXQuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGlmIChkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9KShoYXNoLnNwbGl0KCcvJykpO1xuXG4gICAgICAgIHZhciBwYXJzZWQgPSB7XG4gICAgICAgICAgICB2aWV3OiAnaW5kZXgnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICdyZXNvdXJjZScpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICB2aWV3OiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgIGlkOiBhcmdzWzFdLFxuICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQudGl0bGUgPSBhcmdzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQudmVyc2lvbiA9IGFyZ3NbM107XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLmVkaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcmVzb3VyY2VfaGFzaChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWydyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgIGQudGl0bGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlX2Zvcl91cmwoZC50aXRsZSkgOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBkLnZlcnNpb25dO1xuXG4gICAgICAgIGlmIChkLmVkaXQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnZWRpdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjJyArIGFyZ3Muam9pbignLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9mb3JfdXJsIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEhhc2ggICAgID0gcmVxdWlyZSgnLi9oYXNoJyk7XG52YXIgUm91dGVyICAgPSByZXF1aXJlKCcuL3JvdXRlcicpO1xudmFyIERhdGEgICAgID0gcmVxdWlyZSgnLi9mYWtlX2RhdGEnKTtcbnZhciBSZXNvdXJjZSA9IHJlcXVpcmUoJy4vcmVzb3VyY2UvY29udHJvbGxlci5qcycpO1xuXG52YXIgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuXG5kYXRhYmFzZSgpO1xuXG5cbmZ1bmN0aW9uIGRhdGFiYXNlICgpIHtcbiAgICB2YXIgY29udGV4dCAgICAgID0ge307XG5cbiAgICBjb250ZXh0LmJvZHlfc2VsID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICA9IEhhc2goKTtcbiAgICBjb250ZXh0LmRhdGEgICAgID0gRGF0YSgpO1xuICAgIGNvbnRleHQucmVzb3VyY2UgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LnJvdXRlciAgID0gUm91dGVyKGNvbnRleHQpO1xuXG4gICAgKGZ1bmN0aW9uIGluaXRpYWxpemUgKCkge1xuICAgICAgICBjb250ZXh0LnJvdXRlci5pbml0aWFsaXplKCk7XG4gICAgfSkoKTtcbn0iLCJ2YXIgTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyk7XG52YXIgVmlldyAgPSByZXF1aXJlKCcuL3ZpZXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhO1xuICAgIHZhciBtb2RlbDtcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgZGF0YSAgPSBjb250ZXh0LmRhdGEuZ2V0KCdyZXNvdXJjZScsIGQuaWQpO1xuICAgICAgICBtb2RlbCA9IE1vZGVsKCkuZGF0YShkYXRhKTtcbiAgICAgICAgdmlldyAgPSBWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgICAgICAgICAubW9kZWwobW9kZWwpO1xuXG4gICAgICAgIGlmIChkLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHZpZXcudmVyc2lvbihkLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLmVkaXQpIHtcbiAgICAgICAgICAgIHZpZXcuZWRpdChkLmVkaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9UYWcuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignYWRkVG9DbGFzcy5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldFZlcnNpb24uY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjYW5jZWxFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbW9kZWwudmVyc2lvbnMuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgIHZpZXc6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICBpZDogbW9kZWwuaWQoKSxcbiAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbl9udW1iZXIsXG4gICAgICAgICAgICBlZGl0OiB2aWV3LmVkaXQoKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHZlcnNpb25zID0gW107XG4gICAgdmFyIGF1dGhvcnMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi52ZXJzaW9ucyA9IHt9O1xuICAgIHNlbGYudmVyc2lvbnMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgIHZlcnNpb25zLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuZ2V0ID0gZnVuY3Rpb24gKHZlcnNpb25faWQpIHtcbiAgICAgICAgLy8gZG9uJ3QgbWFrZSB0aGUgdXNlciB0aGluayBhYm91dCB0aGUgZmFjdFxuICAgICAgICAvLyB0aGF0IGNvdW50aW5nIHN0YXJ0cyBmcm9tIDAuIEJlY2F1c2VcbiAgICAgICAgLy8gdGhlcmUgd2lsbCBuZXZlciBiZSBhIHZlcnNpb24gMC5cbiAgICAgICAgaWYgKHZlcnNpb25faWQgPiB2ZXJzaW9ucy5sZW5ndGgpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmVyc2lvbnNbdmVyc2lvbl9pZC0xXTtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuY291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9ucy5sZW5ndGg7XG4gICAgfTtcblxuICAgIHNlbGYuYXV0aG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGF1dGhvcnM7XG4gICAgfTtcbiAgICBzZWxmLmF1dGhvcnMuYWRkID0gZnVuY3Rpb24gKGF1dGhvcl9pZCkge1xuICAgICAgICBhdXRob3JzLnB1c2goYXV0aG9yX2lkKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICAgICAgICAgICAgICAgIGF1dGhvcnM6IGF1dGhvcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCA9IHguaWQ7XG4gICAgICAgIHZlcnNpb25zID0geC52ZXJzaW9ucztcbiAgICAgICAgYXV0aG9ycyA9IHguYXV0aG9ycztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VWaWV3ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciByZXNvdXJjZV9tb2RlbCA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuXG4gICAgdmFyIGVkaXQgPSBmYWxzZTtcbiAgICB2YXIgdmVyc2lvbl9kaXNwbGF5ZWQ7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FkZFRvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvQ2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2hhbmdlVmlld1RvVGFnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhbmNlbEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NhdmVFZHRpYWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRWZXJzaW9uJyk7XG5cbiAgICB2YXIgbGF5b3V0X2FjdGlvbmFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtYWN0aW9ucycsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWFjdGlvbnMgbGVmdCBmaXhlZCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9uc1xuICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2FjdGlvbmFibGVfY29udGVudFxuICAgIH1dO1xuXG4gICAgdmFyIGxheW91dF9lZGl0YWJsZV9kYXRhID0gW3tcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZS1jb250ZW50JyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSBlZGl0YWJsZSByaWdodCcsXG4gICAgICAgIGxheW91dDogbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHNlbGYubW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmVzb3VyY2VfbW9kZWw7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gbW9kZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IHNlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudmVyc2lvbiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHZlcnNpb25fZGlzcGxheWVkO1xuICAgICAgICB2ZXJzaW9uX2Rpc3BsYXllZCA9ICt4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5lZGl0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZWRpdDtcbiAgICAgICAgZWRpdCA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCghc2VsZi52ZXJzaW9uKCkpIHxcbiAgICAgICAgICAgIChzZWxmLnZlcnNpb24oKSA+IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpKSkge1xuXG4gICAgICAgICAgICBzZWxmLnZlcnNpb24ocmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3JpZCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIHJlbmRlcl9tZXRob2Q7XG4gICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICByZW5kZXJfbWV0aG9kID0gcmVuZGVyX2VkaXRhYmxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9hY3Rpb25hYmxlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJfbWV0aG9kJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlbmRlcl9tZXRob2QpO1xuICAgICAgICBncmlkLmNhbGwocmVuZGVyX21ldGhvZCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9lZGl0YWJsZSAoc2VsKSB7XG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9lZGl0YWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGQubGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9hY3Rpb25hYmxlIChzZWwpIHtcblxuICAgICAgICB2YXIgbGF5b3V0ID0gc2VsLnNlbGVjdEFsbCgnLnJlc291cmNlLXN0cnVjdHVyZScpXG4gICAgICAgICAgICAuZGF0YShsYXlvdXRfYWN0aW9uYWJsZV9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgc2VsLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2FjdGlvbmFibGVfYWN0aW9ucyAoc2VsKSB7XG4gICAgICAgIC8vIGVkaXRcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWVkaXQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCBlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdCh0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldEVkaXRhYmxlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnRWRpdCB0aGlzIGFzc2lnbm1lbnQuJyk7XG5cbiAgICAgICAgLy8gdmVyc2lvbnNcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJylcbiAgICAgICAgICAgIC5kYXRhKGQzLnJhbmdlKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9ICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJztcbiAgICAgICAgICAgICAgICBpZiAoKGQgKyAxKSA9PT0gc2VsZi52ZXJzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgdmVyc2lvbicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZXJzaW9uKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRWZXJzaW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndi4nICsgKGQrMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGFzc1xuICAgICAgICB2YXIgYWN0aW9uc19jbGFzcyA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLWFkZCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYWRkVG9DbGFzcyhyZXNvdXJjZV9tb2RlbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnQWRkIHRvIENsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tdmlldycpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvQ2xhc3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdWaWV3IENsYXNzJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2gzJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZScpXG4gICAgICAgICAgICAudGV4dCh2ZXJzaW9uLnRpdGxlKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHknKVxuICAgICAgICAgICAgLmh0bWwodmVyc2lvbi5ib2R5Lmh0bWwpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gdGFnOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb1RhZyhkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9lZGl0YWJsZV9jb250ZW50IChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQodmVyc2lvbl9kaXNwbGF5ZWQpO1xuXG4gICAgICAgIHZhciBmb3JtID0gc2VsLmFwcGVuZCgnZm9ybScpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LWZvcm0nKTtcblxuICAgICAgICBmb3JtLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpXG4gICAgICAgICAgICAuYXR0cignbmFtZScsICdyZXNvdXJjZS1jb250ZW50LS10aXRsZS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24udGl0bGUpO1xuXG4gICAgICAgIC8vIHJlcGxhY2Ugd2l0aCBhbiBodG1sIGVkaXRvci5cbiAgICAgICAgLy8gYm9keS5odG1sIGluLCBwdWxsIG91dCB2YWx1ZSBhbmRcbiAgICAgICAgLy8gc3Rhc2ggaXQgYmFjayBpbnRvIGJvZHkuaHRtbFxuICAgICAgICBmb3JtLmFwcGVuZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAncmVzb3VyY2UtY29udGVudC0tYm9keS0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLnByb3BlcnR5KCd2YWx1ZScsIHZlcnNpb24uYm9keS5odG1sKTtcblxuICAgICAgICBmb3JtLmFwcGVuZCgnYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LWZvcm0tLWJ1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgJ0NhbmNlbCcpXG4gICAgICAgICAgICAudGV4dCgnQ2FuY2VsJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNhbmNlbEVkaXRhYmxlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBmb3JtLmFwcGVuZCgnYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LWZvcm0tLWJ1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdzdWJtaXQnKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgJ1NhdmUnKVxuICAgICAgICAgICAgLnRleHQoJ1NhdmUnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2F2ZUVkaXRhYmxlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3V0ZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBwcmV2aW91c192aWV3ID0ge1xuICAgICAgICB2aWV3OiAnaW5kZXgnXG4gICAgfTtcblxuICAgIGNvbnRleHQuaGFzaC5kaXNwYXRjaFxuICAgICAgICAub24oJ2NoYW5nZS5yb3V0ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2V0KGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0KGNvbnRleHQuaGFzaC5pcygpKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldCAoZCkge1xuICAgICAgICBpZiAoZC52aWV3ID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc291cmNlLnJlbmRlcihkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzX3ZpZXcgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
