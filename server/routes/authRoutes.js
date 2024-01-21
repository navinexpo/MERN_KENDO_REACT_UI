const { register, login, getData } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/data", getData);

module.exports = router;
