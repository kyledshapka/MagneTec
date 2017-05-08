$(function() {
    var $door = $('#door');
    var $root = "http://rest.learncode.academy/api/magneTec/magnet"; // http://vfm.sigrd.com or https://vfm.sigrd.com
    // var $poot = "test/test.json"; // this is just initializing some magnets for testing.

    /* Create a div of class "magnet" from an input magnet object which includes: id, word, x and y location.
    * Magnet divs are draggable and include an event listener for when they are dropped.
    * Finally, add the magnet to the #door div, which serves as our canvas and represents the fridge door. */
    function addMagnet(magnet){
        var $magnet = $('<div id = ' + magnet.id + ' class = "magnet">' + magnet.word + '</div>');
        var $y = parseInt(magnet.y);
        var $x = parseInt(magnet.x);
        $magnet.css({id: magnet.id, top: $y, left: $x, position: 'absolute'});

        // Make the magnet into a draggable object and give it an event listener for being dropped.
        $magnet.draggable({
            stop: function( event, ui) {},
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
            url: $root,
            success: function(magnets) {
                // Add all of the magnets to the fridge door.
                $.each(magnets, function(index, magnet) {
                    addMagnet(magnet);
                });

                // Record the magnet as an object appropriate for posting to the API
                $('.magnet').on("dragstop", function(event, ui){
                    var magnet = $ ( this );
                    var $id = magnet.attr("id");
                    var $word = magnet.text();
                    var xLoc = magnet.position().left;
                    var yLoc = magnet.position().top;
                    // The completed object
                    var magnetObject = {
                        word: $word,
                        x: xLoc,
                        y: yLoc,
                        id: $id
                    };

                    // Post that magnet data to the API
                    $.ajax({
                        type: 'PUT',
                        data: magnetObject,
                        url: $root + "/" + $id,
                        success: function(){
                            console.log( $word + " | x: " + xLoc + ", y: " + yLoc ); // TESTING
                        },
                        error: function(){
                            alert('error moving magnet on server')
                        }
                    });
                });
            },
            error: function(){
                alert('error getting magnets');
            }
    });
});





