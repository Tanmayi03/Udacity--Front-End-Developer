const toPercent = (probability) => {
    return `${(probability * 100).toFixed(2)}%`
};

const handleSubmit = (event) => {
    event.preventDefault()

    const formInput = document.getElementById('input-url').value;

    const data = {
        url: formInput
    };

    fetch('http://localhost:3000/analyze', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
        .then(result => result.json())
        .then(jsonResult => {
            document.getElementById('results').innerHTML =
                `<div>
            <span>- polarity: ${jsonResult.polarity} (${toPercent(jsonResult.polarity_confidence)})</span><br>
            <span>- subjectivity: ${jsonResult.subjectivity} (${toPercent(jsonResult.subjectivity_confidence)})</span>
        </div>`
            document.getElementById('result').style.display = 'block';
        })
};

export { handleSubmit, toPercent };