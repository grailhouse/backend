const SneaksAPI = require("../controllers/sneaks.controllers");
const router = require("express").Router();
const sneaks = new SneaksAPI();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Grabs sneaker info from the database given the styleID
router.get("/id/:id", function (req, res) {
    sneaks.findOne(req.params.id, function (error, shoe) {
        if (error) {
            res.send("Product Not Found");
        } else {
            res.json(shoe);
        }
    });
});

// Grabs price maps from each site of a particular shoe
router.get("/id/:id/prices", function (req, res) {
    sneaks.getProductPrices(req.params.id, 1, function (error, products) {
        if (error) {
            res.send("Product Not Found");
        } else {
            res.json(products);
        }
    });
});

// grabs 10 of the most popular sneakers
router.get("/home", function (req, res) {
    const count = req.query.count || 280;
    // if the user doesn't provide the query param, it defaults to 40
    sneaks.getMostPopular(count, function (error, products) {
        if (error) {
            res.send("Product Not Found");
        } else {
            res.json(products);
        }
    });
});

// grabs all of the most popular sneakers
router.get("/trending", function (req, res) {
    const count = req.query.count || 150;
    // if the user doesn't provide the query param, it defaults to 40
    sneaks.getMostPopular(count, function (error, products) {
        if (error) {
            res.send("Product Not Found");
        } else {
            res.json(products);
        }
    });
});

// Grabs all sneakers given a keyword/parameter
router.get("/search/:shoe", function (req, res) {
    const count = req.query.count || 150;
    // if the user doesn't provide the query param, it defaults to 40
    sneaks.getProducts(req.params.shoe, count, function (error, products) {
        if (error) {
            res.send("Product Not Found");
        } else {
            res.json(products);
        }
    });
});
//  Grabs all sneakers in the database
// router.get('/shoes', function(req, res){
//     sneaks.findAll( function(error, products){
//         if (error) {
//             console.log(error)
//             res.send("No Products In Database");
//           } else {
//             res.json(products);
//           }
//     })
// });

// redirects root route to home page
router.get("/", function (req, res) {
    res.redirect("/home");
});

module.exports = router;
