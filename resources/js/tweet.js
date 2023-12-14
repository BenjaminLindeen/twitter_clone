window.addEventListener("load", (event) => {
    function char_difference() {
        const tweet = document.getElementById("tweet");
        const ans = document.getElementById("characters");
        const tweetLength = tweet.value.length;
        const maxTweet = 14;
        const difference = maxTweet - tweetLength;
        ans.innerText = `${difference.toFixed()} Characters left`;
    }

    document.getElementById("tweet").addEventListener("input", char_difference);
});