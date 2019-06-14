const form = document.querySelector('.url-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = form.querySelector('.url-input');
    const url = input.value.trim();

    if (!url) {
        return console.log('Invalid URL!');
    }

    fetch('/url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    }).then((res) => {
        console.log(res);
        if (!res.ok) {
            throw Error(res.statusText);
        }

        return res.json();
    }).then((json) => {
        console.log(location, data);
    });
});