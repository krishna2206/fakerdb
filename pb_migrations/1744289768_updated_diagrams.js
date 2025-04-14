/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // remove field
  collection.fields.removeById("file2406866991")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2406866991",
    "max": 500000,
    "min": 0,
    "name": "previewImage",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file2406866991",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "previewImage",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("text2406866991")

  return app.save(collection)
})
