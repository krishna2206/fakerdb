/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && projectId.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": "@request.auth.id != \"\" && @collection.projects.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && @request.body.projectId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && @collection.projects.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
})
