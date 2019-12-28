# INTRO

This repository is designed to serve as an informational medium for anyone learning to use the rich text editor [Quill JS](https://quilljs.com/). Each existing folder represents a small project using Quill, all aimed at displaying a case study. A description of each one can be found below. All follow a very simple structure, where there are 3 files:

1.  index.html - Main page, and entry point. Open it to see the editor.
2.  app.js - The JavaScript source code.
3.  styles.css - CSS stylesheet for index.html page.

To take advantage, each source code file is commented out. Therefore, in the desire to understand how something works, please try to read.

**NOTE**: Not sure if I will be updating this. Therefore, do not expect future changes. This repository was created for display purposes only, to spread knowledge, and it was originated from a question I made in stackoverflow community:

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

# QUILL FAQ

Wishing to bring more information, I decided to create a FAQ section. I want to make it clear that the answers to all the questions listed were obtained from different locations over the internet. Its authors have not given me permission to exhibit here. If they wish so, I am open to remove any desired item. Likewise, the credit on them belongs to each one.

**001 - How can I add a letter / word counter?**  
**001 - How can I add a module to Quill?**

https://quilljs.com/guides/building-a-custom-module/

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

https://github.com/quilljs/delta

**005 - How can I use Parchment API?**

https://github.com/quilljs/parchment

**006 - How can I work with Undo and Redo?**

https://quilljs.com/docs/modules/history/

**007 - How can I use Syntax Highlight?**

https://quilljs.com/docs/modules/syntax/

**008 - How can I set Quill in read mode only?**

https://quilljs.com/docs/api/#enable

**009 - How can I set the font of the selected text?**

https://quilljs.com/playground/#custom-fonts

**010 - How can I change text color and text background?**

https://quilljs.com/playground/#class-vs-inline-style

**011 - How can I implement autosave feature?**

https://quilljs.com/playground/#autosave

**012 - How can I set editor height but using a scroll bar?**

https://quilljs.com/playground/#autogrow-height

**013 - How can I find the full featured version of Quill?**

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

See project 2, in particular, the following line of code:

https://github.com/loagit/Quill-Examples-and-FAQ/blob/master/Quill%20Project%20002%20-%20Centralized%20Video/app.js#L91
