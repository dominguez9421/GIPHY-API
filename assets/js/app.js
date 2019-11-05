$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea');
    console.log("Page Loaded");
})

var searchArray = ['Doge', 'Anime', 'Goku','Cat','Bird'];

// with this we will be able to use this function to add any buttons and then empty out and new buttons or else we will have copies 
function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]); 
        $(areaToAddTo).append(a);
    }
}

$(document).on('click','.searchButton',function(){
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=6yRATyDy6m7UbwtaHjKYkEEmlJr7zeMe&limit=10';
    $.ajax({url:queryURL,method:'GET'})
    .done(function(response){
        for(var i=0;i<response.data.length;i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: '+rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
            
        }
    })
})

// $(".gif").on("click", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });
// this will allow gifs to be animated as well as to be paused 
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    }  else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})
//making the search box add new buttons 
//eq is looking for an input and it is looking for the first version of an input 
// returining false is necessary because every time the submit button is pressed the page will reload

$('#addSearch').on('click',function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    $("#searches").empty()
    populateButtons(searchArray,'searchButton','#buttonsArea');
    return false; 
    
})

