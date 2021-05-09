function onTextReady(text){
    console.log(text);
}

function onResponse(response){
    return response.text();
}

fetch("/menu",fetchOptions)
.then(onResponse)
.then(onTextReady);