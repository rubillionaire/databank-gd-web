(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ResourceModel = require('./resource_model');
var ResourceView = require('./resource_view');
var AuthorModel = function () {
    var self = {};
    self.id = function () {
        return 5;
    }
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
                                'setEditable');

    var actions = {
        edit: {
            select_value: '.action-edit-resource',
            cls: 'action-edit-resource',
            data: [{
                text: 'Edit this assignment',
                click: function (d) {
                    self.dispatch.toggleEdit();
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
        name: 'column-actions',
        cls: 'col--resource--actions left fixed',
        data: actions
    }, {
        type: 'resource-structure',
        name: 'column-resource',
        cls: 'col--resource--body right',
        data: resource_model
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
                if (d.name === 'column-actions') {
                    sel.call(layout_actions);
                } else {
                    sel.call(layout_resource);
                }
            });

        return self;
    };

    function layout_actions (sel) {
        console.log('layout actions');
    }

    function layout_resource (self) {
        console.log('layout resource');
    }

    return self;
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9yZXNvdXJjZV9tb2RlbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3Jlc291cmNlX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL3Jlc291cmNlX21vZGVsJyk7XG52YXIgUmVzb3VyY2VWaWV3ID0gcmVxdWlyZSgnLi9yZXNvdXJjZV92aWV3Jyk7XG52YXIgQXV0aG9yTW9kZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gNTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG59O1xuXG52YXIgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxudmFyIGF1dGhvcl9tb2RlbCAgID0gQXV0aG9yTW9kZWwoKTtcbnZhciByZXNvdXJjZV9tb2RlbCA9IFJlc291cmNlTW9kZWwoKVxuICAgIC52ZXJzaW9ucy5hZGQoe1xuICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIGh0bWw6ICc8cD48c3Ryb25nPk1hcHM8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICB9LFxuICAgICAgICB0YWdzOiBbXCJNYXBzXCIsIFwiRG91ZyBTY290dFwiLCBcIk1ha2luZyBNZWFuaW5nXCJdXG4gICAgfSlcbiAgICAuYXV0aG9ycy5hZGQoYXV0aG9yX21vZGVsLmlkKCkpO1xuXG52YXIgcmVzb3VyY2VfdmlldyA9IFJlc291cmNlVmlldygpXG4gICAgLmNvbnRhaW5lcihib2R5X3NlbClcbiAgICAubW9kZWwocmVzb3VyY2VfbW9kZWwpXG4gICAgLnJlbmRlcigpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBpZDtcbiAgICB2YXIgdmVyc2lvbnMgPSBbXTtcbiAgICB2YXIgYXV0aG9ycyA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb25zID0ge307XG4gICAgc2VsZi52ZXJzaW9ucy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgdmVyc2lvbnMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5nZXQgPSBmdW5jdGlvbiAodmVyc2lvbl9pZCkge1xuICAgICAgICBpZiAodmVyc2lvbl9pZCA+ICh2ZXJzaW9ucy5sZW5ndGggLSAxKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2ZXJzaW9uc1t2ZXJzaW9uX2lkXTtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMuY291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9ucy5sZW5ndGg7XG4gICAgfTtcblxuICAgIHNlbGYuYXV0aG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGF1dGhvcnM7XG4gICAgfTtcbiAgICBzZWxmLmF1dGhvcnMuYWRkID0gZnVuY3Rpb24gKGF1dGhvcl9pZCkge1xuICAgICAgICBhdXRob3JzLnB1c2goYXV0aG9yX2lkKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHZlcnNpb25zOiB2ZXJzaW9ucyxcbiAgICAgICAgICAgIGF1dGhvcnM6IGF1dGhvcnNcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VWaWV3ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciByZXNvdXJjZV9tb2RlbCA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhZGRUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NldEVkaXRhYmxlJyk7XG5cbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgICAgc2VsZWN0X3ZhbHVlOiAnLmFjdGlvbi1lZGl0LXJlc291cmNlJyxcbiAgICAgICAgICAgIGNsczogJ2FjdGlvbi1lZGl0LXJlc291cmNlJyxcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0VkaXQgdGhpcyBhc3NpZ25tZW50JyxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC50b2dnbGVFZGl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgdmVyc2lvbnM6IHtcbiAgICAgICAgICAgIHNlbGVjdF92YWx1ZTogJy5hY3Rpb24tc2VsZWN0LXZlcnNpb24nLFxuICAgICAgICAgICAgY2xzOiAnYWN0aW9uLWVkaXQtcmVzb3VyY2UnLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIHNlbGVjdF92YWx1ZTogJy5hY3Rpb24tb24tY2xhc3MnLFxuICAgICAgICAgICAgY2xzOiAnYWN0aW9uLW9uLWNsYXNzJyxcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0FkZCB0byBDbGFzcycsXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYWRkVG9DbGFzcyhyZXNvdXJjZV9tb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdWaWV3IENsYXNzJyxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jaGFuZ2VWaWV3VG9DbGFzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxheW91dF9kYXRhID0gW3tcbiAgICAgICAgdHlwZTogJ3Jlc291cmNlLXN0cnVjdHVyZScsXG4gICAgICAgIG5hbWU6ICdjb2x1bW4tYWN0aW9ucycsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWFjdGlvbnMgbGVmdCBmaXhlZCcsXG4gICAgICAgIGRhdGE6IGFjdGlvbnNcbiAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAnY29sdW1uLXJlc291cmNlJyxcbiAgICAgICAgY2xzOiAnY29sLS1yZXNvdXJjZS0tYm9keSByaWdodCcsXG4gICAgICAgIGRhdGE6IHJlc291cmNlX21vZGVsXG4gICAgfV07XG5cbiAgICBzZWxmLm1vZGVsID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJlc291cmNlX21vZGVsO1xuICAgICAgICByZXNvdXJjZV9tb2RlbCA9IG1vZGVsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGF5b3V0ID0gZ3JpZC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoZC5uYW1lID09PSAnY29sdW1uLWFjdGlvbnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbC5jYWxsKGxheW91dF9hY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWwuY2FsbChsYXlvdXRfcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9ucyAoc2VsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsYXlvdXQgYWN0aW9ucycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dF9yZXNvdXJjZSAoc2VsZikge1xuICAgICAgICBjb25zb2xlLmxvZygnbGF5b3V0IHJlc291cmNlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
