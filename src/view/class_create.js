module.exports = function ClassCreateView () {
    var self = {};
    var classes = [];

    var container_sel;

    self.dispatch = d3.dispatch('classCreated');

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

    self.render = function () {
        var form = container_sel
            .append('div')
                .attr('class', 'class-create--wrapper')
            .append('form')
                .attr('name', 'class-create--form')
                .attr('onSubmit', 'return false;');

        var input =
            form.append('label')
                .attr('class', 'class-create--label')
                .text('New class title')
            .append('input')
                .attr('class', 'class-create--input')
                .attr('type', 'text');

        form.append('button')
                .attr('class', 'class-create--button')
                .attr('type', 'button')
                .attr('value', 'Create')
                .text('Create')
                .on('click', function () {
                    var new_class_name = input.property('value');
                    if (new_class_name.length > 0) {
                        self.dispatch
                            .classCreated(new_class_name);
                        input.property('value', '');
                    }
                });

        return self;
    };


    return self;
};