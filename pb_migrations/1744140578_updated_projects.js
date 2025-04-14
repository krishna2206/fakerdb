/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && userId = @request.auth.id",
    "listRule": "@request.auth.id != \"\" && userId = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && \nuserId = @request.auth.id && \n(@request.body.userId = userId || @request.body.userId = \"\")",
    "viewRule": "@request.auth.id != \"\" && userId = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_484305853")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
