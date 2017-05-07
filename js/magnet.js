$( createMagnets );

/*****************************************************************************
 * Dynamically populate the door with magnets from the backend API.          *
 * Magnets need to have a WORD and an (x,y) LOCATION, taken from the server. *
 *****************************************************************************/
function createMagnets() {
    var $door = $('#door');
        /* Send a request to the API ------------- !!! Actual data format to come, this is only for testing !!! */
    $.ajax({
            type: 'GET',
            url: 'test/test.json',
            success: function(words) {
                /* For each word on the server, create a temporary magnet with matching attributes,
                 * ie. WORD and (x,y) LOCATION */
                $.each(words, function(index, word) {
                    var $magnet = $('<div class = "magnet">' + word.word + '</div>');

                    /* Set the magnet's location according to the server. */
                    var y = word.y;
                    var x = word.x;
                    $magnet.css({top: y, left: x, position: 'absolute'});

                    /* Add the magnet to the fridge door in the UI. */
                    $door.append($magnet);
                });

                /* Make the magnets draggable objects and control how they can be moved around.
                *  For example, make sure that they:
                *    cannot leave the container (the door),
                *    move on top of other magnets when dragged,
                *    don't disappear when moving outside the visible window */
                $('.magnet').draggable({
                    containment: "parent",
                    scroll: false,
                    stack: ".magnet"
                })
            }
        });
}





