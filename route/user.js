const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const async = require("async");
const expressLayouts = require("express-ejs-layouts");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// user/
router.post("/signup", (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
  };
  // res.send(newUser)
  User.findOne({ email: newUser.email })
    .then((user) => {
      // if email not incloads the database
      if (!user) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser).then(() =>
            res.json({ msg: "user created", userInf: newUser, signup: true })
          );
        });
      } else {
        //if email have been used
        res.json({ msg: "email  used", signup: false });
      }
    })
    .catch((err) => res.json(err));
});
router.post("/signin", (req, res) => {
  const signinUser = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({ email: signinUser.email })
    .then((user) => {
      //if email exist
      if (user) {
        // if password is correct
        if (bcrypt.compareSync(signinUser.password, user.password)) {
          user.password = undefined;
          user.email = undefined;
          user.firstName = undefined;
          user.lastName = undefined;
          user.createdAt = undefined;
          user.updatedAt = undefined;

          let payload = { user };
          let token = jwt.sign(payload, "SECRET", { expiresIn: 1500 });
          res.json({ token, signin: true });
          // if password is not correct
        } else {
          res.json({ msg: "password is not correct" });
        }
        //if email not exist
      } else {
        res.json({ msg: "email is not found" });
      }
    })
    .catch((err) => res.json(err));
});

// FORGET PASSWORD

router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var tokenM = buf.toString("hex");
          done(err, tokenM);
        });
      },
      function (tokenM, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            // req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot");
          }

          user.resetPasswordToken = tokenM;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, tokenM, user);
          });
        });
      },
      function (tokenM, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "experiment.yourself1@gmail.com",
            pass: process.env.GMAILPW,
          },
        });
        var mailOptions = {
          to: user.email,
          from: "experiment.yourself1@gmail.com",
          subject: "Mercury Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            tokenM +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          console.log("mail sent");
          req.flash(
            "success",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});

router.get("/reset/:tokenM", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.tokenM,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset", { tokenM: req.params.tokenM });
    }
  );
});

router.post("/reset/:tokenM", function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.tokenM,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            console.log("password" + user.password + "and the user is" + user);

            user.save(function (err) {
              if (err) {
                console.log("here");
                return res.redirect("back");
              } else {
                console.log("here2");
                req.logIn(user, function (err) {
                  done(err, user);
                });
              }
            });
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "experiment.yourself1@gmail.com",
            pass: process.env.GMAILPW,
          },
        });
        var mailOptions = {
          to: user.email,
          from: "experiment.yourself1@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/home");
    }
  );
});

module.exports = router;
