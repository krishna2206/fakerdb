/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_252388348");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\" && \n@request.body.sourceTableId.projectId.userId = @request.auth.id && \n@request.body.targetTableId.projectId.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && \nsourceTableId.projectId.userId = @request.auth.id",
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
        "cascadeDelete": true,
        "collectionId": "pbc_3008659311",
        "hidden": false,
        "id": "relation1911044112",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "sourceTableId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3008659311",
        "hidden": false,
        "id": "relation3458071110",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "targetTableId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_259843118",
        "hidden": false,
        "id": "relation3726148029",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "sourceFieldId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_259843118",
        "hidden": false,
        "id": "relation1642939371",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "targetFieldId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select4141373331",
        "maxSelect": 1,
        "name": "relationType",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "one-to-one",
          "one-to-many",
          "many-to-many"
        ]
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
    "id": "pbc_252388348",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && \nsourceTableId.projectId.userId = @request.auth.id",
    "name": "tableRelations",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\" && \nsourceTableId.projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && \nsourceTableId.projectId.userId = @request.auth.id"
  });

  return app.save(collection);
})
