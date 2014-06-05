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