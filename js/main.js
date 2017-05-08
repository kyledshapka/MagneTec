$(function() {
    var $door = $('#door');

    /* Create a div of class "magnet" from an input magnet object which includes: id, word, x and y location.
    * Magnet divs are draggable and include an event listener for when they are dropped.
    * Finally, add the magnet to the #door div, which serves as our canvas and represents the fridge door. */
    function addMagnet(magnet){
        // Actual format unknown, must be updated once more API details are made available. !!!!!!!!!!!!!!!!!!!!!!!
        var $magnet = $('<div id = ' + magnet.id + ' class = "magnet">' + magnet.word + '</div>');
        var y = magnet.y;
        var x = magnet.x;
        $magnet.css({top: y, left: x, position: 'absolute'});

        // Make the magnet into a draggable object and give it an event listener for being dropped.
        $magnet.draggable({
            stop: function( event, ui, index ) {},
            containment: "parent",
            scroll: false,
            stack: ".magnet"
        });

        // Add the magnet onto the fridge door.
        $door.append($magnet);
    }
    // Ask the API for a list of the magnets with their words and locations.
    $.ajax({
            type: 'GET',
            url: 'test/test.json',
            success: function(magnets) {
                // Add all of the magnets to the fridge door.
                $.each(magnets, function(index, magnet) {
                    addMagnet(magnet);
                });

                // Record the magnet in the console for testing purposes.
                $('.magnet').on("dragstop", function(event, ui){
                    var magnet = $ ( this );
                    var word = magnet.text();
                    var x = magnet.position().left;
                    var y = magnet.position().top;
                    console.log( word + "| x: " + x + ", y: " + y );
                });
            },
            error: function(){
                alert('error getting magnets');
            }
    });
    $('.magnet').each(function(index) {
        console.log(index + ": " + $(this).text()); // for testing purposes
    });
});





