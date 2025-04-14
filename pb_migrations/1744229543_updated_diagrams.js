/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation1821597943",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "projectId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @request.body.projectId.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_484305853",
    "hidden": false,
    "id": "relation1821597943",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "projectId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

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
})
