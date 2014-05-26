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