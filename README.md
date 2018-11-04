# Web Radio - Visualizer

[![groupImg](http://img.youtube.com/vi/R1F3-LB_oAk/0.jpg)](http://www.youtube.com/watch?v=R1F3-LB_oAk)

A simple javascript web radio (visualizer).

Listen [here](https://victorribeiro.com/radio).

## About

This repo is a ongoing project that I've always wanted to do; some nice visualizations accompanied of good music. Growing up playing with computers I always loved [demo scenes](https://en.wikipedia.org/wiki/Demoscene) and this is nothing but a homage to that era. It is important to me for you to know that I'm not the one supplying the radio aspect of the project, I'm using [SomaFM](http://somafm.com) services. Later I'll may be adding other web radio services, but that's not a priority right now. Please consider donating to SomaFm if you like the music they're streaming, to keep up the good service. [Donate here](http://somafm.com/support/).

## How to contribute an animation

There are a set of varibles pre defined to draw.

* c - The canvas context where you will be drawing
* radio.data - Array that contains the audio's frequency (fft) to interact with
* w - Screen's width
* w2 - Half of screen's width - center of screen in the x axis
* h - Screen's height
* h2 - Half of screen's height - center of screen in the y axis

This is the template for a animation class, you must implement the show method. Feel free to create any other auxiliary methods.
```javascript
class Animation() {

  constructor(){
  
  }
  
  show(){
  
  }

}
```
Inside the constructor you should define the size of the radio.analyser.fftSize. The value must be a power of 2 and between 32 and 2048. This is how much data you want from the audio, to create your animation. The result of the analyse will be stored in the radio.data attribute. If you choose a fftSize of 32, result.data will have a lenght of 32. You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize).

So, you constructor now will look like this:
```javascript
constructor() {
  radio.analyser.fftSize = 32;
  radio.update(); // very import to call update after altering a radio's attribue.
}
```

That's all you need to get the data you want to draw with. After that, just make your animation at the show method. Don't forget to clear the canvas right at the beggining of the method, otherwise it will draw on top of the last screen (you can use that to create cool effects, if you want).
```javascript
show(){

  c.clearRect(0,0,w,h); // clear the screen, from (0,0) to (w,h)
  
  for(let i = 0; i < radio.data.length; i++){
    // draw n boxes increment it's x position by 20 
    // with their height defined be the radio.data[i]
    c.fillRect( 20 * i, h2 , 10, radio.data[i] );
  }
}
```

If you need to update any aspect of your animation, I suggest creating a update method in your Animarion class and calling it at the end of your show method
```javascript
update() {
  //update code goes here 
}

show() {
  //animation code goes here
  this.update();
}
```

If you take a look at the other Animations you'll see it's pretty simple to implement your own. After you submit your animation, I'll add it to the main script, where it will be called along with the others. Right now they each got a 7 seconds screen time before a new one is called.

## To Do

Add more stations - I'll maybe add a option for anyone add their own stations ou audio - but the visualization part is the important one in this project

Add more visualizations - Like old school demo scenes, winamp plugins (rember those?)...

Add support to webgl - I don't know how to program shaders, but as soon as someone submit one, I'll add support to it. Each Animation class should have a context attribute, specifying the context it should be rendered.
