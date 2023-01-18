const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();


const flash = require('connect-flash');

mongoose.connect(
"mongodb+srv://parth:P1r5h0403@gql.xedwfcs.mongodb.net/temp2?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => { console.log("Mongoose is connected"); });

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000", //loc of react app
    credentials: true
}))

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }
  app.use(session(sessionConfig))
  
  app.use(passport.initialize());
  app.use(passport.session()); 
  passport.use(new LocalStrategy(User.authenticate()));
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
app.use("/farmer", require("./routes/farmer.js"));
app.use("/wholesaler", require("./routes/wholesaler.js"));
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.send("No user exists");
        } else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send('Successfully Authenticated');
                console.log(req.user);
            })
        }
    })(req, res, next);
});

app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const { email, username, password, isFarmer, isWholesaler } = req.body;
            const user = new User({ email, username, password, isFarmer, isWholesaler});
            const registeredUser = await User.register(user, password);
            res.send(registeredUser);
        }
        

    });

});

app.get('/logout', (req,res)=>{
    if(req.user){
      req.logout(function(err) {
        if (err) { return next(err)}});
      return res.send(`Goodbye `);
    }
    else{
      res.send("Not logged in");
    }  
})

app.get("/getuser", (req, res) => {
    res.send(req.user);
});

app.listen(4000, () => {
    console.log('Server has started')
})