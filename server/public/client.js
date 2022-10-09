console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    refreshToDos();
    clickHandlers();
}

function clickHandlers() {
    $('#submitButton').on('click', handleSubmit);
    $('tbody').on('click', '.markToCompleteButton', markAsComplete);
    $('tbody').on('click', '.deleteButton', deleteToDo);
}

function markAsComplete() {
    // get the unique id of each entry
    console.log('in markAsComplete id', $(this).data('id'));
    let toDoID = $(this).data('id');

    $.ajax({
        method: 'PUT',
        url: `/todo/${toDoID}`
      }).then(function (response) {
        console.log('the toDo was updated!', response);
        refreshToDos();
      }).catch(function (error) {
        console.log('error on put', error);
      });
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

function deleteToDo() {
    console.log('in deleteToDo id', $(this).data('id'));
    let toDoID = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/todo/${toDoID}`
    }).then(function (response) {
        console.log('the toDo was deleted!', response);
        refreshToDos();
    }).catch(function (error) {
        console.log('error on delete', error);
    });
}

function refreshToDos() {
    console.log('in refreshToDos');
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        // console.log('GET /todo response', response);
        renderToDos(response);
    }).catch(function (error) {
        console.log('GET /todo error from server', error);
    });
}

function renderToDos(toDos) {
    console.log('in renderToDos');
    $('tbody').empty();
    // $('#done').empty();
    for(let toDo of toDos) {
            $('tbody').append(`
            <tr>
                <td data-id=${toDo.id} class=markToCompleteButton>${toDo.comment}</td>
                <td>${toDo.complete}</td>
                <td>
                    <button data-id=${toDo.id} class="deleteButton">Delete</button>
                </td>
            </tr>
            `);
    }
}