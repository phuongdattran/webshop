const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const homeCtrl = require("../controller/frontend/home");
const myAccountCtrl = require("../controller/frontend/myaccount");
const signInCtrl = require("../controller/frontend/signin");
const shopCtrl = require("../controller/frontend/shop");
const searchCtrl = require("../controller/frontend/search");

router.get("/home/", homeCtrl.homePage);

router.get("/myaccount/", auth, myAccountCtrl.myAccountPage);

router.get("/myaccount/userinfo/", auth, myAccountCtrl.userInfoPage);
router.get("/myaccount/edituserinfo/", auth, myAccountCtrl.editUserInfoPage);
router.get(
  "/myaccount/changepassword/",
  auth,
  myAccountCtrl.changePasswordPage
);

router.get("/myaccount/address/", auth, myAccountCtrl.addressPage);
router.get("/myaccount/address/add/", auth, myAccountCtrl.addAddressPage);
router.get("/myaccount/address/edit/:id", auth, myAccountCtrl.editAddressPage);

router.get("/signup/", signInCtrl.signUpPage);
router.get("/signin/", signInCtrl.signInPage);
router.get("/signout/", auth, signInCtrl.signOut);

router.get("/shop/", shopCtrl.shopPage);

router.post("/search/", searchCtrl.searchPage);

module.exports = router;
