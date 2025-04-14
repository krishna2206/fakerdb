/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "id": "pbc_diagrams",
    "name": "diagrams",
    "type": "base",
    "system": false,
    "schema": [
      {
        "id": "relation1821597943",
        "name": "projectId",
        "type": "relation",
        "system": false,
        "required": true,
        "unique": true,
        "options": {
          "collectionId": "pbc_484305853",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "id": "json_nodes",
        "name": "nodes",
        "type": "json",
        "system": false,
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "id": "json_edges",
        "name": "edges",
        "type": "json",
        "system": false,
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "id": "autodate2990389176",
        "name": "created",
        "type": "autodate",
        "system": false,
        "required": false,
        "unique": false,
        "options": {
          "onlyOnCreate": true,
          "onUpdate": false
        }
      },
      {
        "id": "autodate3332085495",
        "name": "updated",
        "type": "autodate",
        "system": false,
        "required": false,
        "unique": false,
        "options": {
          "onlyOnCreate": true,
          "onUpdate": true
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return app.save(collection);
}, (app) => {
  app.daoFactory.removeCollection("pbc_diagrams");
  return app.save();
});