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
});