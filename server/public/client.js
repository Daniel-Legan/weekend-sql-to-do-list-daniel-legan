console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    refreshToDos();
    clickHandlers();
}

function clickHandlers() {
    $('#submitButton').on('click', handleSubmit);
}

function handleSubmit() {
    console.log('in handleSubmit');
    let toDo = { comment: $('#todoIn').val() };
    console.log('the toDo collected', toDo);
    addToDo(toDo);
}

function addToDo(toDoToAdd) {
    $.ajax({
    type: 'POST',
    url: '/todo',
    data: toDoToAdd
    }).then(function (response) {
        console.log('POST /todo response from server', response);
        refreshToDos();
    }).catch(function (error) {
        console.log('POST /todo error from server', error)
    });
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