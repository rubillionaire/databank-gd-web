module.exports = [{
    key: 'resource!0',
    value: {
        type: 'resource',
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
        tags: ["maps", "doug-scott", "making-meaning"]
        }],
        educators: ['colin@email.com'],
        classes: []
    }
}, {
    key: 'resource!1',
    value: {
        type: 'resource',
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
        tags: ["maps", "doug-scott", "making-meaning"]
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
        tags: ["maps", "doug-scott", "making-meaning"]
        }],
        educators: ['anther@email.com'],
        classes: []
    }
}, {
    key: 'class!0',
    value: {
        type: 'class',
        id: 0,
        title: 'Colin\'s Class',
        resources: [0],
        educators: ['colin@email.com']
    }
}, {
    key: 'class!1',
    value: {
        type: 'class',
        id: 1,
        title: 'Anther\'s Class',
        resources: [1],
        educators: ['anther@email.com']
    }
}, {
    key: 'educator!colin@email.com',
    value: {
        type: 'educator',
        id: 'colin@email.com',
        email: 'colin@email.com',
        first_name: 'Colin',
        last_name: 'Frazer',
        resources: [0],
        classes: [0]
    }
}, {
    key: 'educator!anther@email.com',
    value: {
        type: 'educator',
        id: 'anther@email.com',
        email: 'anther@email.com',
        first_name: 'Anther',
        last_name: 'Kiley',
        resources: [1],
        classes: [1]
    }
}, {
    key: 'tag!maps',
    value: {
        type: 'tag',
        id: "maps",
        name: "Maps",
        resources: [0, 1]
    }
}, {
    key: 'tag!doug-scott',
    value: {
        type: 'tag',
        id: "doug-scott",
        name: "Doug Scott",
        resources: [0, 1]
    }
}, {
    key: 'tag!making-meaning',
    value: {
        type: 'tag',
        id: "making-meaning",
        name: "Making Meaning",
        resources: [0, 1]
    }
}];