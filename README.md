# Web Radio - Visualizer

[![groupImg](http://img.youtube.com/vi/R1F3-LB_oAk/0.jpg)](http://www.youtube.com/watch?v=R1F3-LB_oAk)

A simple javascript web radio (visualizer).

Listen [here](https://victorribeiro.com/radio).

## About

This repo is a ongoing project that I've always wanted to do; some nice visualizations accompanied of good music. Growing up playing with computers I always loved [demo scenes](https://en.wikipedia.org/wiki/Demoscene) and this is nothing but a homage to that era.

## Radios 

[BoxUK](https://boxuk.danceradiouk.com)

[Classic Rock Florida](https://www.classicrockflorida.com)

Do you have a web radio? Join the project!

## How to contribute an animation

Before submitting a animation, think about how it will look on many devices (mobile, desktop, tablet...) and account for it. If you need to make a multiplication or division, think about if you have to do it every frame or just one time; if just one time, do it on the constructor method, instead of doing it everytime on the show method.

There are a set of varibles pre defined to draw.

* c - The canvas context where you will be drawing
* radio.analyser.fftSize - Sets how much data you want from the audio
* radio.data - Array that contains the audio's frequency (fft) to interact with
* w - Screen's width
* w2 - Half of screen's width - center of screen in the x axis
* h - Screen's height
* h2 - Half of screen's height - center of screen in the y axis

Update: since I added the WebGL support, you now have to define what kind of context your animation needs - 2d or webgl.

This is the template for a animation class, you must implement the show method. Feel free to create any other auxiliary methods.
```javascript
class Animation {

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
  this.context = '2d'; // or 'webgl' if you want to write a shader animation.
  radio.analyser.fftSize = 32;
  radio.update(); // very import to call update after altering a radio's attribue.
}
```

That's all you need to get the data you want to draw with. After that, just make your animation at the show method. Don't forget to clear the canvas right at the beggining of the method, otherwise it will draw on top of the last screen (you can use that to create cool effects, if you want).
```javascript
show(){

  c.clearRect(0,0,w,h); /* clear the screen, from (0,0) to (w,h) */
  
  for(let i = 0; i < radio.data.length; i++){
    /* draw n boxes increment it's x position by 20 */
    /* with their height defined by the radio.data[i] */
    c.fillRect( 20 * i, h2 , 10, radio.data[i] );
  }
}
```

If you need to update any aspect of your animation, I suggest creating a update method in your Animation class and calling it at the end of your show method
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

~~Add support to webgl - I don't know how to program shaders, but as soon as someone submit one, I'll add support to it. Each Animation class should have a context attribute, specifying the context it should be rendered.~~

Migrate it to its own server with its own domain


## Thanks

BigWings - [https://www.shadertoy.com/view/MdfBRX](https://www.shadertoy.com/view/MdfBRX)


