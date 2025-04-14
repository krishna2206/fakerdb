/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_259843118")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && \n@request.body.tableId.projectId.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && \ntableId.projectId.userId = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && \ntableId.projectId.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && \ntableId.projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && \ntableId.projectId.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_259843118")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
