/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_31310043")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && diagram_id.projectId.userId = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && diagram_id.projectId.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && diagram_id.projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && diagram_id.projectId.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_31310043")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": null,
    "updateRule": null,
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
