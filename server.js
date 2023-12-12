const express = require('express');
const basicAuth = require('express-basic-auth');
const {addContact, deleteContact, getContacts} = require('./data.js');
const app = express();
const port = 4131;

app.use(express.urlencoded({extended: true}));
app.use("/resources", express.static("resources"));
app.use(express.json());

app.set("views", "templates");
app.set("view engine", "pug");

const middleware = basicAuth({
    users: {'admin': 'password'},
    challenge: true
});

app.get(["/", "/main"], (req, res) => {
    res.render("mainpage.pug");
});

app.get("/contact", (req, res) => {
    res.render("contactform.pug");
});

app.get("/recentposts", async (req, res) => {
    try {
        const recentposts = await getContacts();
        const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        for (let i = 0; i < recentposts.length; i++) {
            recentposts[i].date = dateFormatter.format(recentposts[i].date);
        }
        res.render("recentposts.pug", {recentposts});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving contact log");
    }
});

app.post("/contact", async (req, res) => {
    const formData = req.body;
    if (!formData.name || !formData.email || !formData.date || !formData.department) {
        res.render("failure.pug");
        return;
    }
    await addContact(formData.name, formData.email, formData.date, formData.department, formData.subscribe === 'yes');
    res.render("success.pug");
});

app.delete("/api/contact/", middleware, async (req, res) => {
    if (!req.is('json')) {
        res.status(400).send("Invalid Headers");
        return;
    }

    const data = req.body;
    if (typeof data.id === 'undefined') {
        res.status(400).send("ID not in JSON");
        return;
    }

    const contactIndex = data.id;
    if (contactIndex === -1) {
        res.status(404).send("Invalid ID");
        return;
    }

    try {
        await deleteContact(contactIndex);
        res.send("Contact deleted");
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.use((req, res) => {
    res.status(404).render("404.pug");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});