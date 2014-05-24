# Model

All of the data that will be stored in the application.

## Resource

Resources are the atomic unit of the site. Reou have editable titles, bodies, and tags.

### Methods

#### `Resource({title:, body:, tags:})`

Creates a new `resource`, optionally with the new title, body and tags.
Returns a reference to the new `resource`.

#### `id()`

Returns the `id` of the object.

#### `versions.new({title:, body:, tags:})`

Adds a new version to the versions array.

#### `versions.count()`

Returns the length of the `versions` array.


### Structure

```Javascript
{
    id: 0,
    versions: [{
        title: 'Assignment Number One',
        body: {
            html: '<div><p>This is th txt of th assignment<p></div>'
        },
        tags: ['Graphic Design', 'Paper']
    }, {
        title: 'Assignment Number One',
        body: {
            html: '<div><p>This is the text of the assignment<p></div>'
        },
        tags: ['Graphic Design', 'Paper']
    }],
    authors: [4, 5]
}
```

## Class

Classes are collections of resources.

### Methods

#### `Class({title:})`

Intialize a new `class` with the `title` passed in.
Returns a reference to the `class`.

#### `id()`

Returns the `id` of the object.

#### `resource.add(id)`

Adds the resource id to the resources.

#### `resource.remove(id)`

Remove the resource id from the resources.

### Structure

```Javascript
{
    id: 0,
    title: '',

    // reference to objects that relate,
    // but are maintained elsewhere
    resources: [6, 7],
    authors: [8, 9]
}
```

## User

### Methods

#### `User({name:})`

Intialize a new `user` with the `name` passed in.
Returns a reference to the `user`.

#### `id()`

Returns the `id` of the object.

#### `classes.add(id)`

Adds the specified `class` id to the `classes` array.
Returns a reference to the User.

#### `classes.remove(id)`

Removes the specified `class` id from the `classes` array.
Returns a reference to the User.

#### `resources.add(id)`

Adds the specified `resource` id to the `resources` array.
Returns a reference to the User.

#### `resources.remove(id)`

Removes the specified `resource` id from the `resources` array.
Returns a reference to the User.

### Structure

```Javascript
{
    id: 0,
    name: 'Colin',
    email: '',
    url: '',

    // references to objects of which
    // this user is the author
    classes: [0, 1],
    resources: [2, 3]
}
```


# View

Views represent interfaces into the data models.

## `resource/<id>/<title>/<version>`

`id` is an integer, it will determine the appropriate resource to load. The `title` will be loaded based on the resource. `version` is also an integer, specifying which integer to load. Not specificying a version lands you on the most recent version.

### Functionality

- Add/Remove this resource to a class
- View the versions of this resource
- View the class (class/)
- Fork resource (make a copy for you to start your own editing history)

## `resource/<id>/<title>/<version>/edit`

Editing interface for the resource of `id`, `title`, and `version`. Available to only those with priveldges. Starting with the owner.

### Functionality

- Edit a resource
- Save your edits
- Discard your edits


## `class/<id>/<title>`

`id` is an integer, it will determine the appropriate class to load. The `title` will be loaded based on the class.

### Functionality

- View/link all resources in a class

## `class/<id>/<title>/edit`

Same as above, but the editable version. Available to only those with priveldges. Starting with the owner.

### Functionality

- View/link all resources in a class
- Remove resources from the class


## `tag/<tag>`

`tag` is a string, identifying which resources to load.

### Functionality

- View/link all resources with a particular tag.