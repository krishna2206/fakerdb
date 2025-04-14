/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json3215592885",
    "maxSize": 0,
    "name": "edges",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json3215592885",
    "maxSize": 0,
    "name": "edges",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
