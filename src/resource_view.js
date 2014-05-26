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