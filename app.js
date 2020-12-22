var express          = require("express"),
    app              = express(),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    Alumno           = require("./models/alumno"),
    User             = require("./models/user");

//APP CONFIG
mongoose.connect("mongodb+srv://alpha:AlphaIsnotH3r3@diegocluster-nhnkp.mongodb.net/coedin?retryWrites=true", {useNewUrlParser:true} );
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "ac83cf04626daf7fc360b24123519cdf",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session() );
passport.use(new LocalStrategy(User.authenticate() ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/alumnos", isLoggedIn, function(req, res){
    Alumno.find({}, function(err, allAlumnos){
        if(err){
            console.log(err);
        }else{
            res.render("alumnos/index",{alumnos:allAlumnos, currentUser: req.user} );
        }
    });

});

app.get("/alumnos/nuevo",isLoggedIn, function(req, res){
     res.render("alumnos/nuevo");

    
});

//CREATE ROUTE
app.post("/alumnos",isLoggedIn, function(req, res){
    req.body.alumno.body = req.sanitize(req.body.alumno.body);
    Alumno.create(req.body.alumno, function(err, newAlumno){
        if (err){
            res.render("nuevo");
        } else {
            res.redirect("/alumnos");
        }
    });
});

//SHOW ROUTE
app.get("/alumnos/:id",isLoggedIn, function(req,res){
    Alumno.findById(req.params.id, function(err, foundAlumno){
        if(err){
            res.redirect("/alumnos")
        }else{
            res.render("alumnos/show",{alumno:foundAlumno})
        }
    });

});

//EDIT ROUTE
app.get("/alumnos/:id/edit",isLoggedIn, function(req, res){
    if(req.user.username === "Alpha"){
        Alumno.findById(req.params.id, function(err, foundAlumno){
            if(err){
                res.redirect("/alumnos");
            } else {
                res.render("alumnos/edit", {alumno: foundAlumno});
            }
        });
    } else if(req. user.username === "Eduardo"){
        Alumno.findById(req.params.id, function(err, foundAlumno){
            if(err){
                res.redirect("/alumnos");
            } else {
                res.render("alumnos/edit", {alumno: foundAlumno});
            }
        });
    } else {
        res.redirect("/error");
    }
});

//UPDATE ROUTE
app.put("/alumnos/:id", function(req, res){
    req.body.alumno.body = req.sanitize(req.body.alumno.body)
    Alumno.findByIdAndUpdate(req.params.id, req.body.alumno, function(err, updatedAlumno){
        if(err){
            res.redirect("/alumnos");
        } else {
            res.redirect("/alumnos/" + req.params.id);
        }

    });
});

//DELETE ROUTE
app.delete("/alumnos/:id",isLoggedIn, function(req,res){
    if(req.user.username === "Alpha"){
        Alumno.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/alumnos");
            } else {
                res.redirect("/alumnos");
            }
        });
    } else if(req.user.username === "Eduardo"){
        Alumno.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/alumnos");
            } else {
                res.redirect("/alumnos");
            }
        });
    } else {
        res.redirect("/error");
    }
    
});

//=====================
//RUTA ERROR (NO ES REST... ES IDEA MIA )
//====================
app.get("/error", isLoggedIn, function(req, res){
    res.render("error");
});

// =============================
// AUTH ROUTES
// =============================

app.get("/register",isLoggedIn, function(req, res){
    if(req.user.username === "Alpha"){
        res.render("register");
    } else if(req.user.username === "Eduardo"){
        res.render("register");
    } else {
        res.redirect("/error");
    }
});
//SIGN UP LOGIN
app.post("/register",isLoggedIn, function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/alumnos");
        });
    });
});
//LOGIN FORM
app.get("/login", function(req,res){
    res.render("login");
});
//LOGIN LOGIC
app.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/alumnos",
        failureRedirect: "/login"
    
    }), function(req, res){

});

//LOGOUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated() ){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000, process.env.IP, function(){
    console.log("El servidor COEDIN esta corriendo !");
});
