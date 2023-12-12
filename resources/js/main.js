window.addEventListener("DOMContentLoaded", (event) => {
    const toggle_style = document.getElementById('theme-toggle');
    const appearance = document.getElementById('body-dark');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        if (currentTheme === 'dark') {
            appearance.classList.add('body-dark');
        } else if (currentTheme === 'light') {
            appearance.classList.remove('body-dark');
        }
    }

    toggle_style.addEventListener('click', toggleStyle);

    function toggleStyle() {
        if (appearance.classList.contains('body-dark')) {
            appearance.classList.remove('body-dark');
            localStorage.setItem('theme', 'light');
        } else {
            appearance.classList.add('body-dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    function updateSaleBanner() {
        fetch('/api/sale')
            .then(response => response.json())
            .then(data => {
                if (data.active && data.message) {
                    document.getElementById('sale-banner').style.display = 'block';
                    document.getElementById('sale-banner').textContent = data.message;
                } else {
                    document.getElementById('sale-banner').style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching sale data:', error));
    }

    setInterval(updateSaleBanner, 1000);

    document.getElementById('set-sale').addEventListener('click', function () {
        const saleMessage = document.getElementById('sale-input').value;
        fetch('/api/sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: saleMessage}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Sale update failed');
                return response.text();
            })
            .then(result => {
                console.log('Sale set successfully:', result);
            })
            .catch(error => {
                console.error('Error setting sale:', error);
            });
    });

    document.getElementById('delete-sale').addEventListener('click', function () {
        fetch('/api/sale', {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) throw new Error('Sale deletion failed');
                return response.text();
            })
            .then(result => {
                console.log('Sale deleted successfully:', result);
            })
            .catch(error => {
                console.error('Error deleting sale:', error);
            });
    });
});