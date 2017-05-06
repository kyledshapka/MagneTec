$( init );

function init() {
    // Some test cases for adding magnets to the canvas - needs to be done dynamically from JSON data
    $("<div class='magnet'><p>This is some test text</p></div>").appendTo("#canvas");
    $("<div class='magnet'><p>A</p></div>").appendTo("#canvas");
    $("<div class='magnet'><p></p></div>").appendTo("#canvas");
    $("<div class='magnet'><p>This is some really really really " +
        "really really really really really really really really " +
        "really really really really really really really really " +
        "really really really really really really really really " +
        "really really really ridiculously long test text.</p></div>").appendTo("#canvas");

    // Make the magnet a draggable object and adjust other parameters for more realistic movement.
    $('.magnet').draggable({
        containment: "parent",
        scroll: false,
        stack: ".magnet"

        }
    );
}
