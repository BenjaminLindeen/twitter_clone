document.addEventListener("DOMContentLoaded", function () {
    let likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach(btn => {
        btn.addEventListener("click", async function (event) {
            event.preventDefault();
            let itemId = this.getAttribute("tweet-id");
            const api_url = `/like/tweet`;
            try {
                const response = await fetch(api_url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: parseInt(itemId)})
                });
                if (response.ok) {
                    if (response.status === 200 || response.status === 404) {
                        let likes = this.closest("tr").querySelector("td:nth-child(3)")
                        console.log(likes);
                        likes.innerText = parseInt(likes.innerText) + 1;
                    }
                } else {
                    console.error("HTTP-Error:", response.status, await response.text());
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(btn => {
        btn.addEventListener("click", async function (event) {
            event.preventDefault();
            let itemId = this.getAttribute("tweet-id");
            let tweetInput = this.closest("tr").querySelector("#tweet");
            let newTweet = tweetInput.value;
            if (!newTweet) {
                return; // Do nothing if the input is empty
            }
            const api_url = `/edit/tweet`;
            try {
                const response = await fetch(api_url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: parseInt(itemId), tweet: newTweet})
                });
                if (response.ok) {
                    if (response.status === 200 || response.status === 404) {
                        this.closest("tr").querySelector("td:nth-child(2)").innerText = newTweet;
                    }
                } else {
                    console.error("HTTP-Error:", response.status, await response.text());
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async function (event) {
            event.preventDefault();
            let itemId = this.getAttribute("tweet-id");
            const api_url = `/delete/tweet`;
            try {
                const response = await fetch(api_url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: parseInt(itemId)})
                });
                if (response.ok) {
                    if (response.status === 200 || response.status === 404) {
                        let row = this.closest("tr");
                        row.parentElement.removeChild(row);
                    }
                } else {
                    console.error("HTTP-Error:", response.status, await response.text());
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    });
});