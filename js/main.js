$(function() {
    // The URL of the server which will store the magnets
    var $root = "http://rest.learncode.academy/api/magneTec/magnet"; // http://vfm.sigrd.com or https://vfm.sigrd.com
    var $poot = "test/test.json"; // Useful for initializing some magnets during testing when server has been cleared.

    // Populate the local door from the API.
    $(function(){
        getMagnets();
    });

    // Displays the list of words and their locations when the poll button is clicked.
    $("#pollButton").click(function(){
        var result = [];
        $.get($root, function(data){
            $.each(data, function(index, magnet){
                var $word = magnet.word;
                var $y = magnet.y;
                var $x = magnet.x;
                var $id = magnet.id;
                var $entry = ("(" + $x + ", " + $y + ") : " + $word + "\n\n");
                result.push($entry);
            });
            alert("The following are stored on the server along with their (x,y) locations:\n\n" + result.join(""));
        });
    });


    /******************************************************************************************************************
     * Requests the list of magnets from the server and places them in the appropriate location on the "fridge door". *
     *****************************************************************************************************************/
    timer = setInterval( getMagnets, 5000);
    function getMagnets(){
        $("#door").empty();
        $.get($root, function(data){
            $.each(data, function(index, magnet){
                var $magnet = $('<div id = ' + magnet.id + ' class = "magnet">' + magnet.word + '</div>');
                var $y = parseInt(magnet.y);
                var $x = parseInt(magnet.x);
                $magnet.css({id: magnet.id, top: $y, left: $x, position: 'absolute'});

                // Make the magnet into a draggable object and give it an event listener for being dropped.
                $magnet.draggable({
                    start: function(event, ui) {},
                    stop: function( event, ui ) {},
                    containment: "parent",
                    scroll: false,
                    stack: ".magnet"
                });
                $magnet.on("dragstart", function(event, ui) {
                    clearInterval(timer);
                });
                $magnet.on("dragstop", function( event, ui) {
                    timer = setInterval( getMagnets, 5000);
                    sendMagnet($magnet);
                });
                console.log($magnet); // for testing
                $("#door").append($magnet);
            });
        });
    }


    /*******************************************************************
     * Updates the server copy of a magnet from the local information. *
     ******************************************************************/
    function sendMagnet(magnet) {
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
    }
});
