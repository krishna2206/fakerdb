/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "updateRule": "@request.auth.id != \"\" && @request.body.projectId.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_371567561")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && @collection.projects.userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && @collection.projects.userId = @request.auth.id && @request.body.userId = @request.auth.id"
  }, collection)

  return app.save(collection)
})
