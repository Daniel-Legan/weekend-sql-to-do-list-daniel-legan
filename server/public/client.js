console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    refreshToDos();
}

function refreshToDos() {
    console.log('in refreshToDos');
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log('GET /todo response', response);
        renderToDos(response);
    }).catch(function (error) {
        console.log('GET /todo error', error);
    });
}

function renderToDos(toDos) {
    console.log('in renderToDos');
    $('#notDone').empty();

    for(let toDo of toDos) {
        $('#notDone').append(`
        <tr>
            <td>${toDo.comment}</td>
            <td>
                <button data-id=${toDo.id} class=markToCompleteButton>Mark to Complete</button>
            </td>
            <td>
                <button data-id=${toDo.id} class="deleteButton">Delete</button>
            </td>
        </tr>
        `);
    }
}