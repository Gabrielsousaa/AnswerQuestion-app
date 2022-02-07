const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database')
const Question = require('./models/Question')
const Answer = require('./models/Answer')

connection
    .authenticate()
    .then(() => {
        console.log('Connection with database.. successfull')
    })
    .catch(err => {
        console.log(err);
    })

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//routes

app.get('/question', (req, res) => {
    res.render("../src/views/questioning")
})
app.post('/savequestion', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    })
})
app.get('/', (req, res) => {
    Question.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then((questions) => res.render('../src/views/home', {
        questions: questions
    })
    )
})

app.get("/question/:id", (req, res) => {
    var id = req.params.id

    Question.findOne({ where: { id: id } })
        .then((question) => {
            if (question != undefined) {
                Answer.findAll({
                    where: { questionId: question.id },
                    order: [
                        ['id', 'DESC']
                    ]
                }).then(answers => {
                    res.render("../src/views/question", {
                        question: question,
                        answers: answers
                    })
                })
            } else {
                res.redirect("/")
            }
        })
})

app.post("/answer", (req, res) => {
    var body = req.body.body;
    var questionId = req.body.question;

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/')
    })
})

//server
app.listen(8080, () => {
    console.log('Server is running...')
});