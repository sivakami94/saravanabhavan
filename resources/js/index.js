const app = require("express");
const path = require("path");
const app =express();

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'))
app.get('/', (req, res) => {
    res.render("home.ejs")
})
app.listen(3000, () => {
    console.log("server stated");
})