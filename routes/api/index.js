const router = require("express").Router();
const userRoutes = require("./user");
const db = require("../../models");
const passport = require("../../config/passport");
var url = require("url")
var isAuthenticated = require("../../config/middleware/isAuthenticated");
//const socketIOClient =require("socket.io-client");
//var socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');
// const jwt =require('jsonwebtoken');

//passport.authenticate("local")
router.post("/login", passport.authenticate("local"), function (req, res) {
    console.log("Login entered")
    res.status(200).send({"id":req.user.dataValues.id});
    // if(req.user){
    //res.redirect(url.format({pathname:"/user"}));
   //res.json("/home");
//    res.json(req.user.dataValues.username).send("User Logged in");
    // console.log(req.user.dataValues.username)
    // }
    //res.redirect("/home")
    // req.login(req.user, function(err) {
    //     if (err) { return next(err); }
    //     return res.redirect('/home');
    //   });
  });
// router.post("/login", passport.authenticate("local", {successRedirect:"/home", failureRedirect:"/login", failureFlash: true}))

//Sign up user, creating new user in User table with provided input
router.post("/signup", function(req,res){
    console.log(req.body);
    if(req.body.username && req.body.password && req.body.email){

        db.User.create({
            username: req.body.username.trim(),
            password: req.body.password.trim(),
            email: req.body.email.trim()
          
        }).then(function(dbUser){
            const userId = dbUser.dataValues.id;
            db.Portfolio.create({
                symbol: "initial",
                userId: userId
            });
            db.Stock.create({stock:"googl,msft,amzn", UserId:dbUser.dataValues.id});
            console.log("Uesr Created");
            res.status(200).send("Signup Successful");
            //res.redirect('/login')
        }).catch(function (err){
            res.json(err);
        })
    }else{
        res.redirect('/signup');
    }
});

router.get("/", function(req,res){
    console.log("get /user route hit");
})

//Logging out user
router.get("/logout", function(req,res){
    req.logout();
    console.log("logging out");
    //res.redirect("/login");
    res.status(200).send('User Signed out');
})

//Get Perticular user stock watchlist from stock table 
router.get("/home/watchlist", isAuthenticated, function(req, res){
    db.Stock.findOne({where:{UserId:parseInt(req.user.id)}}).then(function(userstock){
        console.log(userstock.dataValues);
        res.json(userstock.dataValues);
    });
})

//Update Perticular user stock watchlist from stock table 
router.put("/home/watchlist", isAuthenticated, function(req, res){
    console.log(req.body.stockSymbols.toLowerCase());
    db.Stock.update(
        {stock:req.body.stockSymbols.toLowerCase().trim()},
        {where:{UserId:parseInt(req.body.id)}}).then(function (userStock) {
        console.log(userStock);
        if(userStock){
            res.status(200).send("updated");
        }
    });
})

//Get User Portfolio //Ritesh please work on this 
router.get("/portfolio/:id", isAuthenticated, function(req, res){
    console.log("portfolio id hit");
    console.log(parseInt(req.user.id) === parseInt(req.params.id));
    console.log("user id from req.user " + req.user.id);
    console.log("user id from params " + req.params.id);
    if(parseInt(req.user.id) === parseInt(req.params.id)){
        db.Portfolio.findAll({where:{userId:parseInt(req.params.id)}}).then(function (userFolio){
            console.log(userFolio);
        })
    }

})

// route to check Wallet Value
router.get("/home/:id", isAuthenticated, function(req,res){ 
    db.Portfolio.findAll({
        limit: 1,
            // where: {
            //     id: 1
            // },
            order: [[ 'createdAt', 'DESC']]
    }).then(function(found){
        console.log("GET WALLET VALUE ROUTE HIT!********************");
        console.log(found[0].dataValues.cash);
        let cashValue = found[0].dataValues.cash;
        return(res);
        return(cashValue);
    })
})


// post route to take in buys and sells and update portfolio and make a record in transactions
router.post("/home/wallet", function(req,res){
    const userId = (req.user.id);
    console.log(" post buy/sell route hit");
  
// -------------IN THE CASE OF A BUY ---------------------------------->
    if(req.body.buy){
        console.log("YOU ARE BUYING A STOCK OMG!!")
        let newCashBalance = 0
        let quantityNew = parseInt(req.body.quantity.trim());
        let symbolNew = req.body.symbol.trim();
        let quantityOld = 0
    
        db.Portfolio.findAll({
            limit: 1,
            where: {
                symbol: symbolNew,
                userId: userId
            },
            order: [[ 'createdAt', 'DESC' ]]
        }).then(function(found){

            quantityOld = parseInt((found[0].dataValues.quantity));
        })

        db.Portfolio.findAll({
            limit: 1,
            where: {
                userId: userId
            },
            order: [ [ 'createdAt', 'DESC' ]]
        }).then(function(found){

            let currentCash = found[0].dataValues.cash;
            quantityNew = quantityNew + quantityOld;
            newCashBalance = currentCash - req.body.purchaseTotal;
            console.log(newCashBalance +"_"+ quantityNew +"_"+ symbolNew + "is the info *******####*****");

            db.Portfolio.create({
                userId: userId,
                quantity: quantityNew, 
                symbol: symbolNew, 
                cash: newCashBalance
            });
        });

        db.Transaction.create({
            userIdTransaction: userId,
            quantity: req.body.quantity.trim(),
            symbol: req.body.symbol.trim(),
            purchasePrice: req.body.purchasePrice,
            purchaseTotal: req.body.purchaseTotal
        }).then(function(dbTransaction){
            res.status(200).send("Purchase Successful");
            
        }).catch(function (err){
            res.json(err);
        });
    }else{
 //------------IN THE CASE OF A SELL-------------------------------->
        console.log("YOU ARE SELLING A STOCK!!!! OMG!")
        let newCashBalance = 0
        let quantitySold = parseInt(req.body.quantity.trim());
        let symbolNew = req.body.symbol.trim();
        let quantityOld = 0
        let quantityNew = 0
        
        db.Portfolio.findAll({
            limit: 1,
                where: {
                    symbol: symbolNew,
                    userId: userId
                },
                order: [[ 'createdAt', 'DESC' ]]
        }).then(function(found){
      
            quantityOld = parseInt((found[0].dataValues.quantity));
        })
    
        db.Portfolio.findAll({
            limit: 1,
            where: {
                userId: userId
            },
            order: [ [ 'createdAt', 'DESC' ]]
        }).then(function(found){
            // console.log(found)
            // console.log("above is the found portfolio entry")
            let currentCash = found[0].dataValues.cash;
            quantityNew = quantityOld - quantitySold;
            newCashBalance = currentCash + req.body.purchaseTotal;
            // console.log(newCashBalance +"_"+ quantityNew +"_"+ symbolNew + "is the info *******####*****");
    
            db.Portfolio.create({
                userId: userId,
                quantity: quantityNew, 
                symbol: symbolNew, 
                cash: newCashBalance
            });
        })
        
        db.Transaction.create({
            userIdTransaction: userId,
            quantity: req.body.quantity.trim(),
            buy: false,
            symbol: req.body.symbol.trim(),
            purchasePrice: req.body.purchasePrice,
            purchaseTotal: req.body.purchaseTotal
        }).then(function(dbTransaction){
            res.status(200).send("Sale Successful");
            
        }).catch(function (err){
            res.json(err);
        })

    }    
})





// router.get("/user",  isAuthenticated, function(req, res) {
//     //console.log(req.user);
//     console.log("home get route")
//     db.User.findOne({ where: { email: req.user.email } }).then(function(user) {
//       // console.log(user.admin);
//       console.log(user);
//       res.json(user);
//     //   if(user.admin){
//     //     console.log("inside table")
//     //     res.render("home", {
//     //       user: req.user.name
//     //     });
//     //   }else {
//     //     res.redirect("/employee")
//     //   }
//     });
//   });

// router.get("/user/home", isAuthenticated, function(req,res){
//     res.redirect("/home")
// })

// app.post("/api/users", function (req, res) {
//     console.log(req.body);
//     db.User.create(req.body).then(function (dbUser) {
//       //res.json(dbUser);
//       res.redirect('/')
//     }).catch(function (err) {
//       //console.log(err);
//       res.json(err);
//       //res.redirect('/')
//       // res.status(422).json(err.errors[0].message);
//     });
//   });


 module.exports = router;
