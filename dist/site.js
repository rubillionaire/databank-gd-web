(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ResourceModel = require('./resource_model');
var ResourceView = require('./resource_view');
var AuthorModel = function () {
    var self = {};
    self.id = function () {
        return 5;
    };
    return self;
};

var body_sel = d3.select('body');

var author_model   = AuthorModel();
var resource_model = ResourceModel()
    .versions.add({
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
    })
    .authors.add(author_model.id());

var resource_view = ResourceView()
    .container(body_sel)
    .model(resource_model)
    .render();

},{"./resource_model":2,"./resource_view":3}],2:[function(require,module,exports){
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
        if (version_id > (versions.length - 1)) return undefined;
        
        return versions[version_id];
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

    self.data = function () {
        return {
            id: id,
            versions: versions,
            authors: authors
        };
    };

    return self;
};
},{}],3:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};
    var resource_model = {};
    var container_sel;

    self.dispatch = d3.dispatch('addToClass',
                                'changeViewToClass',
                                'changeViewToTag',
                                'setEditable',
                                'setVersion');

    var actions = {
        edit: {
            select_value: '.action-edit-resource',
            cls: 'action-edit-resource',
            data: [{
                text: 'Edit this assignment',
                click: function (d) {
                    self.dispatch.setEditable();
                }
            }]
        },
        versions: {
            select_value: '.action-select-version',
            cls: 'action-edit-resource',
            data: []
        },
        class: {
            select_value: '.action-on-class',
            cls: 'action-on-class',
            data: [{
                text: 'Add to Class',
                click: function (d) {
                    self.dispatch.addToClass(resource_model);
                }
            }, {
                text: 'View Class',
                click: function (d) {
                    self.dispatch.changeViewToClass();
                }
            }]
        }
    };

    var layout_data = [{
        type: 'resource-structure',
        name: 'resource-actions',
        cls: 'col--resource--actions left fixed'
    }, {
        type: 'resource-structure',
        name: 'resource-content',
        cls: 'col--resource--body right'
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

    self.render = function () {
        var grid = container_sel
                        .append('div')
                        .attr('class', 'grid');

        var layout = grid.selectAll('.resource-structure')
            .data(layout_data)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return d.cls + ' ' + d.type;
            })
            .each(function (d, i) {
                var sel = d3.select(this);
                if (d.name === 'resource-actions') {
                    sel.call(layout_actions);
                } else {
                    sel.call(layout_resource);
                }
            });

        return self;
    };

    function layout_actions (sel) {
        console.log('layout actions');

        // edit
        sel.append('div')
            .attr('class', 'resource-action--edit')
            .on('click', function (d) {
                console.log('set editable');
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
            .attr('class', 'resource-action--versions--version')
            .on('click', function (d) {
                console.log('set version');
                self.dispatch.setVersion(d);
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

    function layout_resource (sel) {
        var data = resource_model.data();
        console.log('layout resource');
        console.log(data);

        var version = data.versions.length - 1;

        sel.append('h3')
            .attr('class', 'resource-content--title')
            .text(data.versions[version].title);

        sel.append('div')
            .attr('class', 'resource-content--body')
            .html(data.versions[version].body.html);

        sel.append('div')
            .attr('class', 'resource-content--tags')
            .append('ul')
            .selectAll('.resource-content--tags--tag')
            .data(data.versions[version].tags)
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

    return self;
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9yZXNvdXJjZV9tb2RlbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3Jlc291cmNlX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL3Jlc291cmNlX21vZGVsJyk7XG52YXIgUmVzb3VyY2VWaWV3ID0gcmVxdWlyZSgnLi9yZXNvdXJjZV92aWV3Jyk7XG52YXIgQXV0aG9yTW9kZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gNTtcbiAgICB9O1xuICAgIHJldHVybiBzZWxmO1xufTtcblxudmFyIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbnZhciBhdXRob3JfbW9kZWwgICA9IEF1dGhvck1vZGVsKCk7XG52YXIgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAudmVyc2lvbnMuYWRkKHtcbiAgICAgICAgdGl0bGU6ICdNYXBwaW5nOiBUaGUgSm91cm5leSBhcyBDb250ZXh0IGZvciBuYXJyYXRpdmUnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBodG1sOiAnPHA+PHN0cm9uZz5NYXBzPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgfSxcbiAgICAgICAgdGFnczogW1wiTWFwc1wiLCBcIkRvdWcgU2NvdHRcIiwgXCJNYWtpbmcgTWVhbmluZ1wiXVxuICAgIH0pXG4gICAgLmF1dGhvcnMuYWRkKGF1dGhvcl9tb2RlbC5pZCgpKTtcblxudmFyIHJlc291cmNlX3ZpZXcgPSBSZXNvdXJjZVZpZXcoKVxuICAgIC5jb250YWluZXIoYm9keV9zZWwpXG4gICAgLm1vZGVsKHJlc291cmNlX21vZGVsKVxuICAgIC5yZW5kZXIoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHZlcnNpb25zID0gW107XG4gICAgdmFyIGF1dGhvcnMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi52ZXJzaW9ucyA9IHt9O1xuICAgIHNlbGYudmVyc2lvbnMuYWRkID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgIHZlcnNpb25zLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuZ2V0ID0gZnVuY3Rpb24gKHZlcnNpb25faWQpIHtcbiAgICAgICAgaWYgKHZlcnNpb25faWQgPiAodmVyc2lvbnMubGVuZ3RoIC0gMSkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmVyc2lvbnNbdmVyc2lvbl9pZF07XG4gICAgfTtcbiAgICBzZWxmLnZlcnNpb25zLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmVyc2lvbnMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBzZWxmLmF1dGhvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhdXRob3JzO1xuICAgIH07XG4gICAgc2VsZi5hdXRob3JzLmFkZCA9IGZ1bmN0aW9uIChhdXRob3JfaWQpIHtcbiAgICAgICAgYXV0aG9ycy5wdXNoKGF1dGhvcl9pZCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gICAgICAgICAgICBhdXRob3JzOiBhdXRob3JzXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYWRkVG9DbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9DbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9UYWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0RWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0VmVyc2lvbicpO1xuXG4gICAgdmFyIGFjdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICAgIHNlbGVjdF92YWx1ZTogJy5hY3Rpb24tZWRpdC1yZXNvdXJjZScsXG4gICAgICAgICAgICBjbHM6ICdhY3Rpb24tZWRpdC1yZXNvdXJjZScsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdFZGl0IHRoaXMgYXNzaWdubWVudCcsXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0RWRpdGFibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB2ZXJzaW9uczoge1xuICAgICAgICAgICAgc2VsZWN0X3ZhbHVlOiAnLmFjdGlvbi1zZWxlY3QtdmVyc2lvbicsXG4gICAgICAgICAgICBjbHM6ICdhY3Rpb24tZWRpdC1yZXNvdXJjZScsXG4gICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9LFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgc2VsZWN0X3ZhbHVlOiAnLmFjdGlvbi1vbi1jbGFzcycsXG4gICAgICAgICAgICBjbHM6ICdhY3Rpb24tb24tY2xhc3MnLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQWRkIHRvIENsYXNzJyxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hZGRUb0NsYXNzKHJlc291cmNlX21vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1ZpZXcgQ2xhc3MnLFxuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0NsYXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbGF5b3V0X2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWFjdGlvbnMnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1hY3Rpb25zIGxlZnQgZml4ZWQnXG4gICAgfSwge1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWNvbnRlbnQnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1ib2R5IHJpZ2h0J1xuICAgIH1dO1xuXG4gICAgc2VsZi5tb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbDtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBtb2RlbDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBncmlkID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIGxheW91dCA9IGdyaWQuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9kYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNscyArICcgJyArIGQudHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGQubmFtZSA9PT0gJ3Jlc291cmNlLWFjdGlvbnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbC5jYWxsKGxheW91dF9hY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWwuY2FsbChsYXlvdXRfcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9ucyAoc2VsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsYXlvdXQgYWN0aW9ucycpO1xuXG4gICAgICAgIC8vIGVkaXRcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWVkaXQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCBlZGl0YWJsZScpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0RWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdFZGl0IHRoaXMgYXNzaWdubWVudC4nKTtcblxuICAgICAgICAvLyB2ZXJzaW9uc1xuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMnKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnJlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nKVxuICAgICAgICAgICAgLmRhdGEoZDMucmFuZ2UocmVzb3VyY2VfbW9kZWwudmVyc2lvbnMuY291bnQoKSkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tdmVyc2lvbnMtLXZlcnNpb24nKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldCB2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRWZXJzaW9uKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3YuJyArIChkKzEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xhc3NcbiAgICAgICAgdmFyIGFjdGlvbnNfY2xhc3MgPSBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MnKTtcblxuICAgICAgICBhY3Rpb25zX2NsYXNzLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLWNsYXNzLS1hZGQnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFkZFRvQ2xhc3MocmVzb3VyY2VfbW9kZWwpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0FkZCB0byBDbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLXZpZXcnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0NsYXNzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnVmlldyBDbGFzcycpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X3Jlc291cmNlIChzZWwpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNvdXJjZV9tb2RlbC5kYXRhKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsYXlvdXQgcmVzb3VyY2UnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgdmFyIHZlcnNpb24gPSBkYXRhLnZlcnNpb25zLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnaDMnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEudmVyc2lvbnNbdmVyc2lvbl0udGl0bGUpO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tYm9keScpXG4gICAgICAgICAgICAuaHRtbChkYXRhLnZlcnNpb25zW3ZlcnNpb25dLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YS52ZXJzaW9uc1t2ZXJzaW9uXS50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgdmlldyB0byB0YWc6ICcsIGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2hhbmdlVmlld1RvVGFnKGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
