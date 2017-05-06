# MagneTec

Challenge:
We are going to do a web-based game-esque thing. Specifically, we are going to emulate a fridge door. With poetry magnets on it. In a web browser. Over the Internet. Anyone can play.

# Objective:
It ends up being a multi-user interactive fridge door with poetry magnets on it, over the web.
* Make a 2000x2000 or so pixel canvas in the browser, and on that canvas, 
* Create little draggable boxes with words in them (magnets). 
* The text for the words and their (x,y) locations will come from a webserver, encoded in JSON format (spec to follow).
* When a magnet is dragged to a new location on the canvas in a client’s web browser, it’s new location is sent to the server.
* Clients can poll the server to get the list of words and their locations, and 
* Update with new locations as sent to the server by other clients.
 
# Implementation:
## Server-side:
* I am going to provide you a simple REST API. It will be at http://vfm.sigrd.com or https://vfm.sigrd.com and data queries will only respond with JSON, not xml. More details to follow. I’ll document the API on github or something, we’ll see. Don’t wait for this API, it is really only half of the system, the other half is rendering magnets and making them movable.
* I will make sure that the server implements CORS so that your browser will touch the API without yelling at you. If you have no idea what I am talking about, don’t even worry about this bullet.
## Client side:
* You will provide the user interface to the API, in the form of a web application that renders “magnets” (tiles with words in them as pictured above) on a canvas (mentioned above) that are click and draggable.
## Do:
* Consume the REST API in a web browser, presumably using AJAX.
* Render magnets in a browser window.
* Make the magnets draggable.
* Make the behavior such that when a magnet is dragged and placed, it sends an update to the server for that magnet. (API details for you will follow this email).
* Ensure the page polls the location of the magnets from the server periodically, and if a change of place is detected for a magnet, it’s position on screen is updated to reflect the change. This means when another client changes the position of a magnet, the change in position is eventually shown to other clients on site.
## Do not:
* Find another app and copy its code. I may have written it.
# Concepts demonstrated:
## HTML5
* Use DIVs or similar elements
* Use the Canvas element if you go crazy (I do not recommend this, make it work with DIVs first)
## CSS
* Pick a framework (I recommend Bootstrap) so that your css is uniform across all browsers
## Javascript
* Pick a framework (I recommend jQuery because that is what we use here) so that
 * your scripts work across most browsers from the start
 * dealing with elements is way easier
 * dealing with AJAX requests is way easier
## Compatibility
* Make sure it works in Google Chrome and/or Mozilla Firefox. IE compatibility for this doesn’t matter.
## Development environment
* Take advantage of (near) instant development environments as detailed below
## Git
* Use git to manage your code. Check it in periodically. Use branching if/where you deem appropriate.
# Additional details
You can get as fancy as you like with organizing your code or you can just make flat js, the former is not expected. Please use git to manage your code, and publish it to github periodically, particularly if you want to ask me a question about something. Maybe there is a bug in the REST API, or maybe you want to know an implementation detail. Your commit history may be evaluated. Commit when it feels best during your development process.
 
If you need to get a hosting environment up fast on your computer in order to serve your html and javascript files to your browser during development, I recommend installing Virtualbox, and Vagrant. Then use vagrant to install Homestead, a ready-to-go web development hosting box. This video explains how to set it up and how it works, if I recall correctly. Use what you like for an IDE. I used to use Aptana, an eclipse based web development IDE, but now we use PHPStorm which is an amazing IDE (there is a 30 day free trial). If you use phpstorm try putting your cursor on a function you are calling, and hit ctrl-b. Your life will change.
 
You may email me or telegram me (particularly over the weekend if you are working on it then) with questions about anything, I’m here to help. The questions asked (or lack thereof) and the distance you go are all part of the challenge, but don’t fret, just get as far as you can using the resources at your disposal. I am a resource.
 
If you manage to do the whole client before you come here, I will get you to attempt to write a matching server-side REST API in PHP so you can host your own server. If you somehow manage all of that in short order, I will get you to attempt to wrap the whole thing up in a Docker container. If you simply read up on Docker for the interview, that would be bonus points regardless.
 
Technically, you do not have to accept this challenge, you may choose to provide some other example code if you wish. We would prefer to discuss your experience with the challenge in your interview though, but we’re flexible. That said, we think you are the kind of person that would like to bite into this challenge anyway, given your resume. Any code you write for this challenge is yours of course, with the intention that you may wish to share it with everyone and anyone you like in the future, regardless of its progress or outcome. We aren’t selling any of this of course, the challenge is just a chance for you to show yourself off.
