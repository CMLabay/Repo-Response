'use strict'

let userName = '';

//display the results
function displayResults(resp){
    for(let i = 0; i < resp.length; i++){
        $("#results-list").append(`<li><h3>${resp[i].name}</h3>
        <a href="${resp[i].html_url}">${resp[i].html_url}</a></li>`);
    };
    $('#results').removeClass('hidden');
}
//get the results
function getResults(name){
    fetch(`https://api.github.com/users/${name}/repos`)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {$("#js-error").text(`Something went wrong: ${error.message}`);
            $('#results').removeClass('hidden');
        });
}
//handle click
function handleForm(){
    $('form').submit(event => {
        event.preventDefault();
        $('#results-list').empty();
        userName = $('#username').val();
        getResults(userName);
    });
}
//when page loads
$(function(){
    console.log('page is loaded');
    handleForm();
})
