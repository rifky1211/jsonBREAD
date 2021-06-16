const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const port = 3000



let data = [
  {"string": "Testing Data", "integer": 12, "float": 1.45, "date":"2000-11-12", "boolean": false},
  {"string": "Coba Lagi", "integer": 99, "float": 100.405, "date":"2000-11-12", "boolean": false},
  {"string": "Super Sekali", "integer": 0, "float": 1.45, "date":"Kosong", "boolean": false}
]

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => res.render('index',{datas: data}))
app.get('/add', (req, res) => res.render('add'))
app.post('/add', (req, res) => {
  data.push({string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean});
  res.redirect('/')
})
app.get('/delete/:id', (req, res) => {
  let index = req.params.id;
  data.splice(index,1)
  res.redirect('/')

})

app.get('/edit/:id', (req,res) => {
  let index = req.params.id;
  res.render('edit', {datas: data[index]})
})
app.post('/edit/:id', (req, res) => {
  let index = req.params.id;
  
  data[index] = {string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean}
  res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })