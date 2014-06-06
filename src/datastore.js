module.exports = function () {
    var self = {};
    var data = {
        me: [{
          id: 'me',
          classes: [],
          resources: []
        }]
    };

    data.me.forEach(function (d) {
        localStorage.setItem('me!' + d.id,
                           JSON.stringify(d));
    });

    self.set = function (namespace, id, d) {
        var update_metadata = false;
        var item_id = namespace;
        if (arguments.length === 3) {
            item_id += ('!' + id);

            if ((namespace !== 'me') &
                (!self.get(namespace, id))) {
                // `me` does not get updated
                // if this is a new namespace+id combo,
                // increment the metadata
                update_metadata = true;
            }
        }
        console.log('setting: ' + item_id);
        localStorage.setItem(item_id,
                             JSON.stringify(d));

        if (update_metadata) {
            var meta = self.get(namespace);
            meta.count += 1;
            localStorage.setItem(namespace,
                                 JSON.stringify(meta));
        }
    };

    self.get = function (namespace, id) {
        var item_id = namespace;
        if (arguments.length === 2) {
            item_id += ('!' + id);
        }

        return JSON.parse(
            localStorage.getItem(item_id));
    };


    return self;
};