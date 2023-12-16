const express = require('express');
const {
    getTweet,
    getNumberOfTweets,
    addTweet,
    likeTweet,
    editTweet,
    deleteTweet,
} = require('./database.js');
const app = express();
const port = 4131;

app.use(express.urlencoded({extended: true}));
app.use("/resources", express.static("resources"));
app.use(express.json());

app.set("views", "pug");
app.set("view engine", "pug");

app.get(["/", "/home"], (req, res) => {
    res.render("home.pug");
});

app.get("/tweet", (req, res) => {
    res.render("tweet.pug");
});

app.get("/recenttweets", async (req, res) => {
    try {
        const sort = "date"
        const pageSize = 5;
        let currentPage = parseInt(req.query.page) || 1;
        let recenttweets = await getTweet(sort, currentPage, pageSize);
        let totalTweets = await getNumberOfTweets();
        let totalPages = Math.ceil(totalTweets / pageSize);

        const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        for (let i = 0; i < recenttweets.length; i++) {
            recenttweets[i].date = dateFormatter.format(recenttweets[i].date);
        }

        res.render('recenttweets.pug', {recenttweets, currentPage, totalPages});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving recent posts");
    }
});

app.get("/populartweets", async (req, res) => {
    try {
        const sort = "likes"
        const pageSize = 5;
        let currentPage = parseInt(req.query.page) || 1;
        let populartweets = await getTweet(sort, currentPage, pageSize);
        let totalTweets = await getNumberOfTweets();
        let totalPages = Math.ceil(totalTweets / pageSize);

        const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        for (let i = 0; i < populartweets.length; i++) {
            populartweets[i].date = dateFormatter.format(populartweets[i].date);
        }

        res.render("populartweets.pug", {populartweets, currentPage, totalPages});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving popular posts");
    }
});

app.post("/tweet", async (req, res) => {
    const formData = req.body;
    if (!formData.inputField) {
        res.render("failure.pug");
        return;
    }
    await addTweet(formData.inputField);
    res.redirect("/recenttweets");
});

app.put("/like/tweet", async (req, res) => {
    if (!req.is('json')) {
        res.status(400).send("Invalid Headers");
        return;
    }

    const data = req.body;
    if (typeof data.id === 'undefined') {
        res.status(400).send("ID not in JSON");
        return;
    }

    const tweetIndex = data.id;
    if (tweetIndex === -1) {
        res.status(404).send("Invalid ID");
        return;
    }

    try {
        await likeTweet(tweetIndex);
        res.send("Tweet liked");
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.put("/edit/tweet", async (req, res) => {
    if (!req.is('json')) {
        res.status(400).send("Invalid Headers");
        return;
    }

    const data = req.body;
    if (typeof data.id === 'undefined' || typeof data.tweet === 'undefined') {
        res.status(400).send("ID or tweet not in JSON");
        return;
    }

    const tweetIndex = data.id;
    if (tweetIndex === -1) {
        res.status(404).send("Invalid ID");
        return;
    }

    try {
        await editTweet(tweetIndex, data.tweet);
        res.send("Tweet edited");
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.delete("/delete/tweet/", async (req, res) => {
    if (!req.is('json')) {
        res.status(400).send("Invalid Headers");
        return;
    }

    const data = req.body;
    if (typeof data.id === 'undefined') {
        res.status(400).send("ID not in JSON");
        return;
    }

    const tweetIndex = data.id;
    if (tweetIndex === -1) {
        res.status(404).send("Invalid ID");
        return;
    }

    try {
        await deleteTweet(tweetIndex);
        res.send("Tweet deleted");
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