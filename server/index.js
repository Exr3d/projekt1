const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const saltRounds = 10


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ 
    key: "userid",
    secret: "KlanMVP5secretDataName",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        expires: 60 * 60 * 24,
    },
})
);

////....

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'projekttodo'
})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.post("/task", (req, res) => {
    const nick = req.body.nick
    const zadania = req.body.zadania

    if(nick != ""){
        db.query("INSERT INTO todo (nick, zadania) VALUES (?, ?)",
        [nick,zadania],
        (err, result) => {
            if(err) {
                console.error(err)
                res.send(err)
            }else{
                res.send({ message: "Task wysłany pomyślnie!"});
            }
        }
        )
    }else{
        console.log("nie zalogowany");
    }
    
})


app.post("/rejestruj", (req, res) => {
    //console.log('post register working')
    const nick = req.body.nick
    const haslo = req.body.haslo

    bcrypt.hash(haslo, saltRounds, (err, hash) =>{
        if(err){
            console.log(err)
        }

        db.query("INSERT INTO uzytkownicy (nick, haslo) VALUES (?, ?)",
     [nick, hash], 
     (err, result) => {
        if (err) {
            console.error(err)
            res.send(err)
        } else {
            res.send({ message: "Zarejestrowano!" });
        }
     }
    )
    })
    
})

app.post("/getTask", (req,res) => {
    const nick = req.body.nick

    db.query(
        "SELECT numer, zadania FROM todo WHERE nick = ?;", 
    nick,
    (err, result) => {
        if(err){
            res.send({err: err});
        }
        if(result.length > 0){
            console.log(result)
            res.send(result);
        }else{
            res.send({ message: "Taki użytkownik nie ma zadań!" });
        }
    })
})

app.get("/loguj", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user });
    } else{
        res.send({loggedIn: false});
    }
});

app.get("/todo", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user });
    } else{
        res.send({loggedIn: false});
    }
})

app.post("/loguj", (req, res) => {
    //console.log('post login working')
    const nick = req.body.nick
    const haslo = req.body.haslo

    db.query(
        "SELECT * FROM uzytkownicy WHERE nick = ?;",
        nick,
        (err, result) => {
            if(err){
                res.send({err: err});
            }


            if(result.length > 0) {
                bcrypt.compare(haslo, result[0].haslo, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    }else{
                        res.send({ message: "Zły login lub hasło" });
                    }
                })
            }else{
                    res.send({ message: "Taki użytkownik nie istnieje" });
                }

        }

    )
})

app.listen(3001, () => {
    console.log("server working, port 3001")
})