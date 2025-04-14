/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select463611947",
    "maxSelect": 1,
    "name": "databaseType",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Oracle"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // remove field
  collection.fields.removeById("select463611947")

  return app.save(collection)
})
