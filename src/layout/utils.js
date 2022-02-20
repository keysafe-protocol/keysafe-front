export function http_post(url, data) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    }).then(response => response.json())
}


export function http_get(url, func) {
    fetch(url)
        .then(response => {
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
                const text = e.srcElement.result;
                func(text);
            })
            reader.readAsText(blob);
        })
}
