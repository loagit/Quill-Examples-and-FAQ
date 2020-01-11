# INTRO

This repository is designed to serve as an informational medium for anyone learning to use the rich text editor [Quill JS](https://quilljs.com/). Each existing folder represents a small project using Quill, all aimed at displaying a case study. A description of each one can be found below. All of them follow a very simple structure, where there are 3 common files:

1.  index.html - Main page, and entry point. Open it to see the editor.
2.  app.js - The JavaScript source code.
3.  styles.css - CSS stylesheet for index.html page.

To take advantage, each source code file is commented out. Therefore, in the desire to understand how something works, please try to read.

#### CONTRIBUTING

Seeing how some people have already accessed this repository, in order to have better information for everyone I humbly come to ask: [Could someone help me improve Project 001 - Highlight?](https://stackoverflow.com/questions/59437258/in-quill-how-can-i-use-bubble-themed-toolbar-in-read-only-mode)

#### NOTE

Not sure if I will be updating this forever. Therefore, do not expect future changes. This repository was created for display purposes only, to spread knowledge, and it was originated from a question I made in stackoverflow community:

https://stackoverflow.com/q/59366868/2910546

### Quill Project 001 - Hightlight

Using the bubble theme, we have here a toolbar with highlight controls. With this tool you can add/remove different highlight types in any selected text snippet.

**Instructions:**

1.  Select any portion of text to appear on the toolbar.
2.  Use the options on the toolbar.


### Quill Project 002 - Centralized Video

This project demonstrates how you can extend an existing blot to slightly change it's settings. To show how the process is done, Quill's native [video](https://github.com/quilljs/quill/blob/develop/formats/video.js) blot has been extended, where its horizontal positioning is centered, and height and width are set at the outset.

**Instructions:**

1.  Hover over the editor and click anywhere you want to add the video.
2.  Click on the single visible toolbar button.
3.  A small inbox will appear. Enter any desired video URL.
4.  Press save and see the result.

### Quill Project 003 - Carousel

This project shows how you can create a new module to add interesting features to Quill. Here we see how we can create a button in toolbar which displays a small tooltip that serves as means to create a carousel of images. Besides the user can choose which images will be used, he/she can also define some extra settings.

For the implementation of the carousel of images, the [Slick JS](https://kenwheeler.github.io/slick/) library was used. For this reason, it is also possible to discover how to incorporate existing libraries/resources as new features to the editor.

This project was deeply inspired by [quill-emoji](https://github.com/contentco/quill-emoji), which I am truly grateful for.

**Instructions:**

1.  A new button is present on Quill toolbar. Click on it and a small tooltip window will appear. This window is divided into a header, and two tabs with their contents.
2.  Use the first tab to configure simple carousel settings.
3.  Use the second tab to set the image URLs that will appear on the carousel. For convenience, testing and presentation, some images have already been separated.
4.  When you are done, click the insert header button.
5.  When the carousel is inserted, click the navigation buttons (the arrows), or click and drag the images to change its content.

# QUILL FAQ

Wishing to bring more information, I decided to create a FAQ section. I want to make it clear that the answers to all the questions listed were obtained from different locations over the internet. Its authors have not given me permission to exhibit here, nor have they denied me. If they wish so, I am open to remove any desired item. Likewise, the credit on them belongs to each one.

**001 - How can I add a letter / word counter?**  
**001 - How can I add a module to Quill?**

https://quilljs.com/guides/building-a-custom-module/  
Also, take a look at [Quill Project 003 - Carousel](https://github.com/loagit/Quill-Examples-and-FAQ/tree/master/Quill%20Projeto%20003%20-%20Carousel).

**002 - How can I perform CRUD operations through Quill API?**  
**002 - How can I insert or remove content?**

https://quilljs.com/docs/api/#content

**003 - How can I change the look of Quill?**  
**003 - How can I style the editor with CSS?**

According to the documentation itself, you can see which classes are being used in Quill through the browser developer tool. Once these classes are discovered it is easy to add or override settings for them just by defining styles in CSS files.

For example, to change the padding given to editor content:

```css
.ql-editor{
   padding: 0px;
}
```

https://quilljs.com/docs/themes/#customization

**004 - How can I use Delta API?**  
**004 - Where can I find more about Delta API?**

https://github.com/quilljs/delta  
https://quilljs.com/docs/delta/  
https://quilljs.com/guides/designing-the-delta-format/

**005 - How can I use Parchment API?**  
**005 - Where can I find more about Parchment API?**

https://github.com/quilljs/parchment

**006 - How can I work with Undo and Redo?**

https://quilljs.com/docs/modules/history/

**007 - How can I use Syntax Highlight?**

https://quilljs.com/docs/modules/syntax/

**008 - How can I set Quill in read mode only?**

https://quilljs.com/docs/api/#enable

**009 - How can I set the font of the selected text?**  
**009 - How can I add custom fonts to the toolbar?**

https://quilljs.com/playground/#custom-fonts  
https://stackoverflow.com/questions/43728080/how-to-add-font-types-on-quill-js-with-toolbar-options

**010 - How can I change text color and text background?**

https://quilljs.com/playground/#class-vs-inline-style

**011 - How can I implement autosave feature?**

https://quilljs.com/playground/#autosave

**012 - How can I set editor height but using a scroll bar?**

https://quilljs.com/playground/#autogrow-height

**013 - How can I find the full featured version of Quill?**  
**013 - Where can I find a exxample of Quill with all it's features?**

https://quilljs.com/docs/formats/

**014 - How can I define a whitelist or blacklist of formats supported by Quill?**  
**014 - How can I filter content in Quill, excluding anything unwanted?**  
**014 - How can I prevent Quill from filtering content?**

https://stackoverflow.com/questions/59397115/why-does-quill-filter-its-content

**015 - How can I use Quill without the toolbar?**  
**015 - How can I remove Quill toolbar?**

```javascript
var config = {
  "theme": "snow",
  "modules": {
      "toolbar": false
  }
};
```

https://stackoverflow.com/questions/39456273/how-do-i-create-a-quill-editor-without-a-toolbar

**016 - How can I find a list of toolbar built with HTML?**  
**016 - How can I find a list of formats with their CSS names?**

https://stackoverflow.com/questions/40347908/list-of-recognized-quill-toolbar-classes

**017 - How can I create my own blot?**  
**017 - How can I create my own format?**  
**017 - How can I add new styles to Quill?**

Try taking a look at the projects in this repository. Their source code is all commented.

**018 - How can I set a toolbar like the one displayed on Quill page?**

https://stackoverflow.com/questions/34734750/how-to-create-a-quilljs-toolbar-exactly-as-shown-in-samples#

**019 - How can I extend an existing blot?**  
**019 - How can I create a blot from an existing one?**

See [Project 002 - Centralized Video](https://github.com/loagit/Quill-Examples-and-FAQ/tree/master/Quill%20Project%20002%20-%20Centralized%20Video), in particular, the following line of code:

https://github.com/loagit/Quill-Examples-and-FAQ/blob/master/Quill%20Project%20002%20-%20Centralized%20Video/app.js#L91

**020 - How can I use the toolbar?**  
**020 - How can I define my own custom toolbar?**  
**020 - What are the existing ways to work with the toolbar module?**

Quill's toolbar module allows the editor to have its toolbar configured in 3 different ways:

1.  Quill default configuration.
2.  Vector/Array of formats in JavaScript code.
3.  HTML Elements with format CSS classes in HTML code.

Out of curiosity, this can be seen at the beginning of the [toolbar module source code](https://github.com/quilljs/quill/blob/develop/modules/toolbar.js#L10). Where you can find:
```javascript
if(Array.isArray(this.options.container){ // ... }
else if(typeof this.options.container === 'string'){ // ... }
else{ // ... }
```
Basically, according to the listed items above, in **Nº1** you use the toolbar with the standard Quill buttons. Here you do not have to do any configuration, but you will only have a portion of the Quill buttons, as not all are set by default. 

In **Nº2**, you define which buttons are present by passing a array of formats, like so:
```javascript
// Example 1
var toolbarOptions1 = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

// Example 2
var toolbarOptions2 = ['bold', 'italic', 'underline', 'strike'];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions1 // For teaching use only
  }
});
```
**HINT / TIP:** To find all available native Quill formats, see questions 013 and 016.

In **Nº3**, you pass an HTML element that will be used as a toolbar. In it, `<button>` and `<select>` elements will be recognized as the toolbar controls (the buttons). These elements must have their CSS classes as formats they represent, which can be existing native Quill formats, or custom formats defined by the developer himself/herself.
   
Examples of how this is done can be found at the following links:

1.  [Quill page](https://quilljs.com/docs/modules/toolbar/#container)
2.  [Project 001 - Highlight](https://github.com/loagit/Quill-Examples-and-FAQ/blob/master/Quill%20Project%20001%20-%20Highlight/index.html#L28)
3.  [Quill Repo](https://github.com/quilljs/quill/blob/develop/docs/_includes/standalone/full.html)

**021 - How can I add icons to toolbar buttons?**  
**021 - How can I reflect the format applied to the editor content in relation to a toolbar button?**

**For native Quill buttons**, setting the correct CSS class on the button will automatically get it the desired icon and behavior. For example, let's say you have an HTML structure being used as a toolbar, and you want to add Quill's native bold button. You just need to set the CSS class with the name given to the bold blot. The detail here is that in order for Quill to recognize this button, the given CSS class name must be prefixed with `ql-`. Take a look:
```html
...
<div id="standalone-container">
  <div id="toolbar-container">
     <button class="ql-bold"></button>
  </div>
  <div id="editor">
    <p>Some text...</p>
  </div>
</div>
...
```
This will not only find the button as a toolbar component/control, but will also associate it with the icon and the behavior of the desired format (in this case bold). If you want to create an italic button, use the `ql-italic` CSS class, and so on.

**To define custom buttons that do not work with existing formats**, you'll of course need to create a new format (see question 017), and you can use SVG as the button icon. For the button to automatically call (and also reflect the state of) a custom format, you must define the button's CSS class with the blot name of the registered format.

Let's say you have created a `highlight` format, and you want to add an icon to the respective button. We can have the following HTML structure:
```html
...
<div id="standalone-container">
  <div id="toolbar-container">
     <button class="ql-highlight">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.4 15.4">
                        <path d="M14.1 2.5l-1.9-1.9c-0.7-0.7-1.9-0.7-2.7 0l-6.9 6.9C2 8 1.9 8.8 2.1 9.4l-1.4 3.9c-0.1 0.2 0.3 0.5 0.5 0.5l3.9-1.4c0.7 0.2 1.4 0.1 2-0.4l6.9-6.9C14.8 4.4 14.8 3.2 14.1 2.5zM12.6 4.8L7.4 9.9c-0.3 0.3-0.8 0.3-1.2 0L4.7 8.4C4.4 8 4.4 7.5 4.7 7.2l5.2-5.2c0.3-0.3 0.8-0.3 1.2 0l1.5 1.5C12.9 3.9 12.9 4.5 12.6 4.8z" />
                        <rect x="1.6" y="14.3" width="8.1" height="1.1" />
                    </svg>
     </button>
  </div>
  <div id="editor">
    <p>Some text...</p>
  </div>
</div>
...
```
Make it clear, though, that Quill's default buttons are set with SVG as well, but they use their own CSS classes to draw certain details (some drawn shapes). **If your button is looking weird**, like it's too thick or too thin, I suggest you look at the CSS classes that are applied to Quill's native buttons, more specifically, the elements within the SVG element, and try to hand-apply them to your code.

To do this, you can visit the quill homepage and, through the browser, right-click on one of the toolbar's present buttons. Select "inspect element" (or something similar) option, and see which CSS classes are being applied to the SVG elements. Try turning off styles, and note if the present class can help better shape the shapes of your button icon.

For Quill, SVG `path` elements use `ql-stroke` CSS class, while `rect` elements use `ql-fill`, and `line` use `ql-stroke` and `ql-thin`. But this is not a rule, and each case is a case.

You can also choose to create your styling by applying your own CSS classes. As an example of something already implemented and functional, [see Project 001 - Highlight](https://github.com/loagit/Quill-Examples-and-FAQ/tree/master/Quill%20Project%20001%20-%20Highlight).

**022 - How can I add custom font sizes to Quill toolbar?**

https://stackoverflow.com/a/43808486/2910546

**023 - How can I retrieve Quill content?**  
**023 - How can I get Quill data?**

https://stackoverflow.com/a/42541886/2910546

**024 - How can I add a video from my local machine?**  
**024 - How can I add a video from a file?**  
**024 - How can I create a video type that allows me to add video from my local machine?**  
**024 - How can I add video from a file on my server?**

Adding a video in Quill editor is the same as adding a video to an HTML page:

1.  [Embeds: Video, Audio and iFrame Elements](https://ilovecoding.org/lessons/embeds-video-audio-and-iframe-elements)
2.  [How to Embed Video using HTML5 with local file](https://stackoverflow.com/questions/18670728/how-to-embed-video-using-html5-with-local-file)

My suggestion for this is that the added element is not an `<iframe>` element, but `<video>`. We know that [Quill does not natively have in its video format this desired HTML element/tag](https://github.com/quilljs/quill/blob/develop/formats/video.js#L51).

Therefore, to add support to it and to take advantage of what is already implemented, we can simply extend the existing `video` format, but changing some of its settings. In particular, we have to change the tag given to the blot, its class, and the name so that there are no conflicts:
```javascript
let DefaultVideo = Quill.import('formats/video');
class LocalVideo extends DefaultVideo { ... }

LocalVideo.blotName = 'local-video';
LocalVideo.className = 'ql-local-video';
LocalVideo.tagName = 'VIDEO';

Quill.register(LocalVideo);
```
As a suggestion for implementing custom formats, take a look at the projects in this repository.

**025 - How can I add a custom attributor?**  
**025 - How can I define my own custom attributor?**

https://stackoverflow.com/a/59687860/2910546
https://stackoverflow.com/questions/44219124/creating-a-custom-class-attributer-in-quilljs  
https://www.scalablepath.com/blog/using-quill-js-build-wysiwyg-editor-website/  
https://github.com/quilljs/quill/issues/1036

**026 - How can I add a button to toolbar that has no relation to any format?**  
**026 - How can I add a new toolbar button that calls my custom function?**  
**026 - How can I add a toolbar button that calls a function?**

Looking at what was already presented in item (question) 020, it is possible to add a button in the toolbar with HTML Elements and format CSS classes in HTML code. For a button that has nothing to do with any registered format, you can add a event to it as usual. 

Assuming we have the following structure being used as a toolbar:
```javascript
<div id="standalone-container">
  <div id="toolbar-container">
    <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
      <button id="click-me-button">CLICK ME</button>
    </span>
  </div>
  <div id="editor-container"></div>
</div>
```
You can add an event to the CLICK ME button via JavaScript code such as:
```javascript
var clickMeButton = document.getElementById('click-me-button');
clickMeButton.addEventListener("click", event => {
   // Your logic here...
});
```
Or by setting the button element `onclick` attribute to call your desired function:
```html
<button onclick="clickMeFunction()">CLICK ME</button>
```
**027 - How can I override/change existing icons from toolbar buttons?**  
**027 - How can I change Quill native format icons?**

https://github.com/quilljs/quill/issues/1099#issuecomment-258560326  
https://stackoverflow.com/a/40385877/2910546  
https://stackoverflow.com/a/55181398/2910546

**028 - How can I display a tooltip when the mouse is over a toolbar button?**

https://quilljs.com/playground/#snow-toolbar-tooltips
