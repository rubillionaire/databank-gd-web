(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./model/resource":5,"./view/resource":7}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

        return '#' + args.join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};
},{}],4:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel  = body_sel;
    context.hash      = Hash();
    context.datastore = Data();
    context.resource  = Resource(context);
    context.router    = Router(context);

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./ResourceViewController":1,"./fake_data":2,"./hash":3,"./router":6}],5:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvUmVzb3VyY2VWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL2Zha2VfZGF0YS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL2hhc2guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL3Jlc291cmNlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvcm91dGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9yZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZXNvdXJjZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9yZXNvdXJjZScpO1xudmFyIFJlc291cmNlVmlldyAgPSByZXF1aXJlKCcuL3ZpZXcvcmVzb3VyY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZUNvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhO1xuICAgIHZhciBtb2RlbDtcbiAgICB2YXIgdmlldztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgZGF0YSAgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ3Jlc291cmNlJywgZC5pZCk7XG4gICAgICAgIG1vZGVsID0gUmVzb3VyY2VNb2RlbCgpLmRhdGEoZGF0YSk7XG4gICAgICAgIHZpZXcgID0gUmVzb3VyY2VWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgICAgICAgICAubW9kZWwobW9kZWwpO1xuXG4gICAgICAgIGlmIChkLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHZpZXcudmVyc2lvbihkLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLmVkaXQpIHtcbiAgICAgICAgICAgIHZpZXcuZWRpdChkLmVkaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9UYWcuY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignYWRkVG9DbGFzcy5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldFZlcnNpb24uY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjYW5jZWxFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2F2ZUVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGVkaXRhYmxlLicpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZlcnNpb25zLmFkZChkKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5zZXQoJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0YSgpKTtcblxuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IG1vZGVsLnZlcnNpb25zLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBtb2RlbC52ZXJzaW9ucy5nZXQodmVyc2lvbl9udW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB2ZXJzaW9uLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uX251bWJlcixcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogdmlldy5lZGl0KClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSAoKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uX251bWJlciA9IHZpZXcudmVyc2lvbigpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG1vZGVsLnZlcnNpb25zLmdldCh2ZXJzaW9uX251bWJlcik7XG4gICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICB2aWV3OiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgaWQ6IG1vZGVsLmlkKCksXG4gICAgICAgICAgICB0aXRsZTogdmVyc2lvbi50aXRsZSxcbiAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyLFxuICAgICAgICAgICAgZWRpdDogdmlldy5lZGl0KClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgICByZXNvdXJjZXM6IFt7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIHZlcnNpb25zOiBbe1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIk1hcHNcIiwgXCJEb3VnIFNjb3R0XCIsIFwiTWFraW5nIE1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0aG9yczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wiTWFwc1wiLCBcIkRvdWcgU2NvdHRcIiwgXCJNYWtpbmcgTWVhbmluZ1wiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBOYXJyYXRpdmUnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHMhPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJNYXBzXCIsIFwiRG91ZyBTY290dFwiLCBcIk1ha2luZyBNZWFuaW5nXCJdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dGhvcnM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgY2xhc3NlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdGl0bGU6ICdDb2xpblxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBhdXRob3JzOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0aXRsZTogJ0FudGhlclxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMV0sXG4gICAgICAgICAgICBhdXRob3JzOiBbMV1cbiAgICAgICAgfV0sXG4gICAgICAgIHVzZXJzOiBbe1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBuYW1lOiAnQ29saW4gRnJhemVyJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgY2xhc3NlczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgbmFtZTogJ0FudGhlciBLaWxleScsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsxXVxuICAgICAgICB9XVxuICAgIH07XG5cblxuICAgIGRhdGEucmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jlc291cmNlIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEuY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFzc2VzIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KVxuICAgIGRhdGEudXNlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcnMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pXG5cbiAgICBzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkLCBkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nOiAnICsgbmFtZXNwYWNlICsgJyEnICsgaWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lc3BhY2UgKyAnIScgKyBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH07XG5cbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZXNwYWNlICsgJyEnICsgaWQpKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hGYWN0b3J5ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjaGFuZ2UnKTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc2VsZi5pcygpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2UoY3VycmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5pcyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIGdldHRlclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZV9oYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHRlclxuICAgICAgICB2YXIgaGFzaCA9ICcvJztcbiAgICAgICAgaWYgKGQudmlldyA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaGFzaDtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldCBoYXNoOiAnLCBoYXNoKTtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VfaGFzaCAoaGFzaCkge1xuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzID0gKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgICAgICBpbnB1dC5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pKGhhc2guc3BsaXQoJy8nKSk7XG5cbiAgICAgICAgdmFyIHBhcnNlZCA9IHtcbiAgICAgICAgICAgIHZpZXc6ICdpbmRleCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIHZpZXc6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3NbMV0sXG4gICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgIHBhcnNlZC50aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC52ZXJzaW9uID0gYXJnc1szXTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQuZWRpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9yZXNvdXJjZV9oYXNoKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ3Jlc291cmNlJyxcbiAgICAgICAgICAgICAgICAgICAgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgZC50aXRsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVfZm9yX3VybChkLnRpdGxlKSA6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQudmVyc2lvbl07XG5cbiAgICAgICAgaWYgKGQuZWRpdCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKCdlZGl0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyMnICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2Zvcl91cmwgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgSGFzaCAgICAgPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBSb3V0ZXIgICA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG52YXIgRGF0YSAgICAgPSByZXF1aXJlKCcuL2Zha2VfZGF0YScpO1xudmFyIFJlc291cmNlID0gcmVxdWlyZSgnLi9SZXNvdXJjZVZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LnJvdXRlciAgICA9IFJvdXRlcihjb250ZXh0KTtcblxuICAgIChmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICAgICAgY29udGV4dC5yb3V0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH0pKCk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBpZDtcbiAgICB2YXIgdmVyc2lvbnMgPSBbXTtcbiAgICB2YXIgYXV0aG9ycyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb25zID0ge307XG4gICAgc2VsZi52ZXJzaW9ucy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgdmVyc2lvbnMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5nZXQgPSBmdW5jdGlvbiAodmVyc2lvbl9pZCkge1xuICAgICAgICAvLyBkb24ndCBtYWtlIHRoZSB1c2VyIHRoaW5rIGFib3V0IHRoZSBmYWN0XG4gICAgICAgIC8vIHRoYXQgY291bnRpbmcgc3RhcnRzIGZyb20gMC4gQmVjYXVzZVxuICAgICAgICAvLyB0aGVyZSB3aWxsIG5ldmVyIGJlIGEgdmVyc2lvbiAwLlxuICAgICAgICBpZiAodmVyc2lvbl9pZCA+IHZlcnNpb25zLmxlbmd0aCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2ZXJzaW9uc1t2ZXJzaW9uX2lkLTFdO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5jb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgc2VsZi5hdXRob3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXV0aG9ycztcbiAgICB9O1xuICAgIHNlbGYuYXV0aG9ycy5hZGQgPSBmdW5jdGlvbiAoYXV0aG9yX2lkKSB7XG4gICAgICAgIGF1dGhvcnMucHVzaChhdXRob3JfaWQpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gICAgICAgICAgICAgICAgYXV0aG9yczogYXV0aG9yc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkID0geC5pZDtcbiAgICAgICAgdmVyc2lvbnMgPSB4LnZlcnNpb25zO1xuICAgICAgICBhdXRob3JzID0geC5hdXRob3JzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3V0ZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBwcmV2aW91c192aWV3ID0ge1xuICAgICAgICB2aWV3OiAnaW5kZXgnXG4gICAgfTtcblxuICAgIGNvbnRleHQuaGFzaC5kaXNwYXRjaFxuICAgICAgICAub24oJ2NoYW5nZS5yb3V0ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2V0KGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0KGNvbnRleHQuaGFzaC5pcygpKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldCAoZCkge1xuICAgICAgICBpZiAoZC52aWV3ID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc291cmNlLnJlbmRlcihkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzX3ZpZXcgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHZhciBlZGl0ID0gZmFsc2U7XG4gICAgdmFyIHZlcnNpb25fZGlzcGxheWVkO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhZGRUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb1RhZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYW5jZWxFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzYXZlRWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0VmVyc2lvbicpO1xuXG4gICAgdmFyIGxheW91dF9hY3Rpb25hYmxlX2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWFjdGlvbnMnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1hY3Rpb25zIGxlZnQgZml4ZWQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnNcbiAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHZhciBsYXlvdXRfZWRpdGFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgZWRpdGFibGUgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9lZGl0YWJsZV9jb250ZW50XG4gICAgfV07XG5cbiAgICBzZWxmLm1vZGVsID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJlc291cmNlX21vZGVsO1xuICAgICAgICByZXNvdXJjZV9tb2RlbCA9IG1vZGVsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb24gPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2ZXJzaW9uX2Rpc3BsYXllZDtcbiAgICAgICAgdmVyc2lvbl9kaXNwbGF5ZWQgPSAreDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWRpdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGVkaXQ7XG4gICAgICAgIGVkaXQgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgoIXNlbGYudmVyc2lvbigpKSB8XG4gICAgICAgICAgICAoc2VsZi52ZXJzaW9uKCkgPiByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSkpIHtcblxuICAgICAgICAgICAgc2VsZi52ZXJzaW9uKHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciByZW5kZXJfbWV0aG9kO1xuICAgICAgICBpZiAoZWRpdCkge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9lZGl0YWJsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlcl9tZXRob2QgPSByZW5kZXJfYWN0aW9uYWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyaWQuY2FsbChyZW5kZXJfbWV0aG9kKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2VkaXRhYmxlIChzZWwpIHtcbiAgICAgICAgdmFyIGxheW91dCA9IHNlbC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2VkaXRhYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2FjdGlvbmFibGUgKHNlbCkge1xuXG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9hY3Rpb25hYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBzZWwuY2FsbChkLmxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9hY3Rpb25zIChzZWwpIHtcbiAgICAgICAgLy8gZWRpdFxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tZWRpdCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0IGVkaXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0RWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdFZGl0IHRoaXMgYXNzaWdubWVudC4nKTtcblxuICAgICAgICAvLyB2ZXJzaW9uc1xuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nKVxuICAgICAgICAgICAgLmRhdGEoZDMucmFuZ2UocmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuY291bnQoKSkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nO1xuICAgICAgICAgICAgICAgIGlmICgoZCArIDEpID09PSBzZWxmLnZlcnNpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjbHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCB2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLnZlcnNpb24oZCsxKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNldFZlcnNpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2LicgKyAoZCsxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNsYXNzXG4gICAgICAgIHZhciBhY3Rpb25zX2NsYXNzID0gc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzJyk7XG5cbiAgICAgICAgYWN0aW9uc19jbGFzcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcy0tYWRkJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hZGRUb0NsYXNzKHJlc291cmNlX21vZGVsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBZGQgdG8gQ2xhc3MnKTtcblxuICAgICAgICBhY3Rpb25zX2NsYXNzLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzLS12aWV3JylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2VWaWV3VG9DbGFzcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ1ZpZXcgQ2xhc3MnKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnQgKHNlbCkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlc291cmNlX21vZGVsLmRhdGEoKTtcblxuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX2Rpc3BsYXllZCk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnaDMnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KHZlcnNpb24udGl0bGUpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tYm9keScpXG4gICAgICAgICAgICAuaHRtbCh2ZXJzaW9uLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdmlldyB0byB0YWc6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvVGFnKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnQgKHNlbCkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlc291cmNlX21vZGVsLmRhdGEoKTtcblxuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX2Rpc3BsYXllZCk7XG5cbiAgICAgICAgdmFyIGZvcm0gPSBzZWwuYXBwZW5kKCdmb3JtJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybScpXG4gICAgICAgICAgICAuYXR0cignb25TdWJtaXQnLCAncmV0dXJuIGZhbHNlOycpO1xuXG4gICAgICAgIHZhciBlZGl0YWJsZV90aXRsZSA9IGZvcm0uYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgdmVyc2lvbi50aXRsZSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSB3aXRoIGFuIGh0bWwgZWRpdG9yLlxuICAgICAgICAvLyBib2R5Lmh0bWwgaW4sIHB1bGwgb3V0IHZhbHVlIGFuZFxuICAgICAgICAvLyBzdGFzaCBpdCBiYWNrIGludG8gYm9keS5odG1sXG4gICAgICAgIHZhciBlZGl0YWJsZV9ib2R5X2h0bWwgPSBmb3JtLmFwcGVuZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgndmFsdWUnLCB2ZXJzaW9uLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgdmFyIGVkaXRhYmxlX3RhZ3MgPSBmb3JtXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MtLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgnY2hlY2tlZCcsIHRydWUpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdDYW5jZWwnKVxuICAgICAgICAgICAgLnRleHQoJ0NhbmNlbCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC1mb3JtLS1idXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnc3VibWl0JylcbiAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdTYXZlJylcbiAgICAgICAgICAgIC50ZXh0KCdTYXZlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgdGFncyA9IFtdO1xuICAgICAgICAgICAgICAgIGVkaXRhYmxlX3RhZ3MuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KHRoaXMpLnByb3BlcnR5KCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBuZXdfdmVyc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGVkaXRhYmxlX3RpdGxlLnByb3BlcnR5KCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBlZGl0YWJsZV9ib2R5X2h0bWwucHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogdGFnc1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5ld192ZXJzaW9uLnRpdGxlICE9PSB2ZXJzaW9uLnRpdGxlKSB8XG4gICAgICAgICAgICAgICAgICAgIChuZXdfdmVyc2lvbi5ib2R5Lmh0bWwgIT09IHZlcnNpb24uYm9keS5odG1sKSB8XG4gICAgICAgICAgICAgICAgICAgICghKGFycmF5RXF1YWxzKG5ld192ZXJzaW9uLnRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uLnRhZ3MpKSkpIHtcblxuICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2F2ZUVkaXRhYmxlKG5ld192ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNhbmNlbEVkaXRhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJyYXlFcXVhbHMgKGFycjEsIGFycjIpIHtcbiAgICAgICAgaWYgKGFycjEubGVuZ3RoICE9PSBhcnIyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSBhcnIxLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgIGlmIChhcnIxW2ldICE9PSBhcnIyW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
