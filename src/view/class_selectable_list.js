module.exports = function ClassSelectableListView () {
    var self = {};
    var classes = {};

    var container_sel;
    var list_sel_wrapper;

    self.dispatch = d3.dispatch('classSelected');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classes = function (x) {
        if (!arguments.length) return classes;
        classes = x;
        return self;
    };

    self.add_class = function (x) {
        if (!arguments.length) throw "Requires Class Model";
        console.log('class selectable list view - add class');
        console.log(classes);
        classes.push(x);
        return self;
    };

    self.render = function () {
        list_sel_wrapper = container_sel
            .append('div')
                .attr('class', 'selectable-class-list-wrapper')
            .append('ul')
                .attr('class', 'selectable-class-list');

        

        return self.update();
    };

    self.update = function () {
        list_sel_wrapper
            .selectAll('.selectable-class-list-item')
            .data(classes, function (d) { return d.id(); })
            .enter()
            .append('li')
                .attr('class', 'selectable-class-list-item')
                .on('click', function (d) {
                    self.dispatch.classSelected(d);
                })
            .append('p')
                .text(function (d) {
                    return d.title();
                });

        return self;
    };


    return self;
};