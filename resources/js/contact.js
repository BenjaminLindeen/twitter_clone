window.addEventListener("load", (event) => {
    function char_difference() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const ans = document.getElementById("characters");
        const nameLength = name.value.length;
        const emailLength = email.value.length;
        if (nameLength !== 0) {
            const difference = emailLength / nameLength;
            ans.innerText = `Your email has approximately ${difference.toFixed(2)} times more characters than your name.`;
        } else {
            ans.innerText = "";
        }
    }

    document.getElementById("name").addEventListener("change", char_difference);
    document.getElementById("email").addEventListener("change", char_difference);
});