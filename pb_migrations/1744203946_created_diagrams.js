/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "json490538492",
        "maxSize": 0,
        "name": "nodes",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json3215592885",
        "maxSize": 0,
        "name": "edges",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_371567561",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "name": "diagrams",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && @collection.projects.id?=\"${projectId}\" && @collection.projects.userId = @request.auth.id"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561");

  return app.delete(collection);
})
