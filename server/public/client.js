console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    getToDos();
}

function getToDos() {
    console.log('in getToDoes');
    $('#notDone').empty();

    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log('GET /todo response', response);
        render();
    }).catch(function (error) {
        console.log('GET /todo error', error);
    });
}

function render() {
    console.log('in render');
}