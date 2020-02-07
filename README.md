# Drum Machine

## 1 Setup

Create a barebones index.html style.css and index.js file. Link the js file and the css file into the html.

## 2 Pad Grid

Create a 3 by 3 grid of clickable pads for the individual drum samples.
Every pad should have a label as the inner html.
Also give every pad an appropriate data-key and data-sample attribute

```
<div class=".pad" data-key="q" data-sample="kick">Kick</div>
```

## 3 Audio HTML elements

For every sample in the samples folder create an audio html tag. Use an id that's matching one of the data-sample attributes you have used for the pads. USetse the preload attribute to auto to suggest to the browser to load all audio files together with the page

```
<audio src="samples/kick.wav" id="kick" preload="auto">
```

## 4 playSample function

Create a javascript function playSample, that takes the name of a sample (e.g. "kick") as an argument and plays the corresponding sample.
First use document.getElementById to get the audio html element.
Then on the html element call the .play() method.

Note: To reset the playback position before play is called you can set the property `currentTime` to 0

## 5 Install click handlers to play sounds when the pad is clicked

Add an event listener for the 'click' event on every pad element. In the event Handler callback call the playSample function you created in the previous step and pass the data-sample attribute.

Note: the data- attributes given in html can be accessed in javascript through a property called `dataset`, e.g. data-myAttribute would be accessed as `myElement.dataset.myAttribute`

## 6 Install a key handler to play the drums with keyboard keyas

Add an event listener on the whole document for the 'keydown' event, which is triggered when ever a keyboard key is pressed by the user.
In the event handler the event argument has some information about the key pressed. You can use a console.log to inspect what the properties of the event object are.
The goal is to use the information given in the event listener to decide which sample has to be played and to call the playSample function accordingly.

Tip: You can iterate over the pad html elements to create a javascript object that maps the data-key attributes to the data-sample attributes. This object can then be used inside the key handler.

## 7 Add transitions

If we hit a key the corresponding drum sound should now already be triggered. Additionally we want the pads to pop up a little bit whenever a drum is played. For that we adjust the playSample function. Whenever a sound is played we use a querySelector to find the pad with the corresponding data-sample attribute that matches the sample name.
Once we have access to that element we use its classList property and its method addClass to add the class "playing" to the element.
In our css we can now define a transform on the element and we add a transition property to the pad itself

```
.pad {
  ...
  transition: transform 0.05s;
}

.playing {
  transform: scale(1.1);
}
```

The last part missing is to remove the class 'playing' from the element once the transition is completed.
For that we add another eventListener for the 'transitionend' event to every pad element.
In the eventHandler make sure to only respond to events with the propertyName "transform" and remove the class again from the classList

```
element.addEventListener("transitionend", (e) => {
  if (e.propertyName != "transform") return;
  element.classList.remove("playing");
})
```
