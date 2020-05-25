const ipValidate = (event) => {
    event.preventDefault()

    const formIp = document.getElementById('input-url').value
    const ipError = document.getElementById('invalid-input-value')
    const submit = document.getElementById('submit-button')

    if (formIp.length) {
        if (urlValidate(formIp)) {
            spanIp.innerText = '';
            submit.style.display = 'inline';
        } else {
            spanIp.innerText = 'Invalid Url';
            submit.style.display = 'none';
        }
    } else {
        spanIp.innerText = 'Empty value';
        submit.style.display = 'none';
    }
};

const validateUrl = (url) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regUrl = new RegExp(expression);
    return !!url.match(regUrl)
};

export { validateUrl, ipValidate };