$( function() {
    var apiUrl = "http://vfm.sigrd.com/api/fridges";
    var fridgeName = "alpha";
    var fridgeUrl = apiUrl + "/" + fridgeName;

    // Get the magnets from the named fridge
    getMagnets ( fridgeUrl, fridgeName );
});

/*************
 * Functions *
 ************/

    /******************************************************************************************************
     * getMagnets: periodically updates the local version of magnets found on the fridge at the input URL *
     *****************************************************************************************************/
    function getMagnets( fridgeUrl, fridgeName ) {
        var wordsUrl = fridgeUrl + "/words";
        var updateInterval = 2000; // How often the magnet locations should be checked.

        setInterval( function () {
            $( "#door" ).empty();
            $.ajax({
                type: 'GET',
                url: wordsUrl,
                success: function( fridge ){

                    var words = fridge.words;
                    drawWords( words, fridgeUrl );

                },
                // Alert the user if the fridge cannot be reached
                error: function(){
                    alert( "Error accessing " + fridgeName + " at " + apiUrl )
                }
            });
        }, updateInterval);

    }


    /***************************************************************************************************
    * drawWords: takes a wordsObject and creates matching magnets on the canvas.                       *
    * The words can be drag n'dropped, and update their location to the server when moved by the user. *
    *                                                                                                  *
    *  A wordsObject contains all the information about the words stored on this fridge:               *
    *                                                                                                  *
    *    .update_at = when the list was last updated                                                   *
    *    .total = the total number of words on this fridge                                             *
    *    .fridge = an array with the .name and .href of the fridge where these words are stored.       *
    *    .list = the list of words in an array, each of which has:                                     *
    *                                                                                                  *
    *      [.id = this word's id number                                                                *
    *      .txt = the text of this word                                                                *
    *      .x = the x location of this word                                                            *
    *      .y = the y location of this word]                                                           *
    ***************************************************************************************************/
    function drawWords ( wordsObject, fridgeUrl ){
        $.each( wordsObject.list, function( index, word ){
            // Using the word data, create a draggable magnet and give it an event listener for being dropped.
            makeDraggableDiv ( word, fridgeUrl );

            // Add the magnet to the fridge's canvas
                $( "#door" ).append( magnet );
        });
    }


    /***********************************************************************************
    * Makes a draggable div object out of the input word's id, text, and x,y location. *
    ***********************************************************************************/
    function makeDraggableDiv ( word, fridgeUrl ) {
        var $id = word.id,
            $text = word.txt,
            $x = word.x,
            $y = word.y;

        // Translate the word objects into html divs for display on the page
        magnet = $( '<div id = ' + $id + ' class = "magnet">' + $text + '</div>' );
        magnet.css( {id: $id, top: $y, left: $x, position: 'absolute'} );

        // Enable drag n'drop
        magnet.draggable({
            containment: "parent",
            scroll: false,
            stack: ".magnet"
        });

        // Pause updating locally while a magnet is being dragged
        magnet.on( "dragstart", function() {
            // DO SOMETHING (future implementation - pause updating while this magnet is being dragged)
        });

        // Update the server after a magnet has been moved
        magnet.on( "dragstop", function() {

            sendMagnet( $(this), fridgeUrl );
        });
    }


    /************************************************************
    * Updates the server with the new location of the magnet.   *
    * The magnet must be sent in the form: { "x":234, "y":345 } *
    * to http://vfm.sigrd.com/api/fridges/word/<wordID>         *
    ************************************************************/
    function sendMagnet( magnet, fridgeUrl ) {
        var $id = magnet.attr("id"),
            $text = magnet.text(),
            $x = magnet.position().left,
            $y = magnet.position().top;
        var magnetObject = { "x":$x, "y":$y };
        var magnetUrl = fridgeUrl + "/word/" + $id;
        console.log( fridgeUrl + "\n" + $id + " | " + $text + " @ " + $x + "," + $y ); // TEST

        $.ajax({
            type: 'PUT',
            data: magnetObject,
            url: magnetUrl,
            success: function(){

            },
            error: function(){
                alert('error moving magnet on server')
            }
        });
    }