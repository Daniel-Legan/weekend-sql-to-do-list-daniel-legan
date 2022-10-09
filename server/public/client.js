console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    refreshToDos(); // refresh -> GET -> render
    clickHandlers();
}

function clickHandlers() {
    $('#submitButton').on('click', handleSubmit); // add entry
    $('ul').on('click', '.markToCompleteButton', markAsComplete); // switch from true/false to false/true
    $('ul').on('click', '.deleteButton', deleteToDo); // delete entry
}

function handleSubmit() {
    console.log('in handleSubmit');

    // prevent sending strings that start with white space
    let whatIsThis = $('#todoIn').val();

    // Stack Overflow
    // https://stackoverflow.com/a/5964427
    console.log('what is this?', whatIsThis);
    console.log('what is this length?', whatIsThis.length);
    console.log('what is this without whitespace', whatIsThis.replace(/\s/g,''));
    console.log('what is this length without whitespace', whatIsThis.replace(/\s/g,'').length);
    if(whatIsThis.replace(/\s/g,'').length === 0){
        return;
    }

    let str = $('#todoIn').val();
    let toDo = { comment: str.trim() }; // collect input from DOM, trim extra white space before and after text for database cleanliness
    // let toDo = { comment: $('#todoIn').val() };

    console.log('the toDo collected', toDo);

    addToDo(toDo); // object with matching parameters to database required
}

// GET
// get array from database
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

// POST
// post object to database
function addToDo(toDoToAdd) {
    $.ajax({
    type: 'POST',
    url: '/todo',
    data: toDoToAdd
    }).then(function (response) {
        console.log('POST /todo response from server', response);
        // response = Created/OKAY

        // clear input field
        $('#todoIn').val('');

        refreshToDos();

    }).catch(function (error) {
        console.log('POST /todo error from server', error)
    });
}

// PUT
// update from false/true to true/false
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

// DELETE
// delete entry
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

function renderToDos(toDos) {
    console.log('in renderToDos');

    $('ul').empty();
    
    // append to the unordered list each element of the array with its unique id
    // also, give each element a class "markToCompleteButton" and "true OR false"
    // "markToCompleteButton" will allow the user to swap complete status
    // "true" OR "false" class is used for CSS styling to convey the status of the element
    // the delete "button" is added to the end of each listed entry
    for(let toDo of toDos) {
        $('ul').append(`<li data-id=${toDo.id} class="markToCompleteButton ${toDo.complete}">${toDo.comment}<span data-id=${toDo.id} class="deleteButton">\u00D7</span></li>`);
    }
}