document.addEventListener("DOMContentLoaded", function () {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async function (event) {
            event.preventDefault();
            let itemId = this.getAttribute("contact-id");
            const api_url = `/api/contact`;
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

function timeUntil() {
    const table = document.getElementById('recentposts');
    const rows = table.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const date = row.cells[2];
        const span = row.querySelector('#time-until');
        const contact_date = Date.parse(date.innerText);
        const time_now = Date.now();
        if (!span || !date) {
            continue;
        }
        if (isNaN(contact_date)) {
            span.innerText = "N/A";
        } else if (contact_date < time_now) {
            span.innerText = "Past";
        } else {
            const difference = contact_date - time_now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            span.innerText = days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";
        }
    }
}

timeUntil();
setInterval(timeUntil, 1000);