const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router.router("/")
    .get(articlesController.findAll)
    .post(articlesController.create);

router
    .route("/:id")
    .get(articlesController.findbyId)
    .put(articlesController.update)
    .delete(articlesController.remove);

module.exports = router;