// #################################################################################
//                                                                             TABS
// #################################################################################

/** See: https://www.w3schools.com/howto/howto_js_tabs.asp */
function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("abas-conteudo");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("abas-aba");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let tabContent = document.getElementById(cityName);
  tabContent.style.display = "block";
  evt.currentTarget.className += " active";

  updateDataOutput(tabContent);
}

/** See: https://stackoverflow.com/a/21696585 */
function isHidden(el) {
  if (!el) return true;
  return (el.offsetParent === null)
}

/** Retorna a contêiner da aba atualmente ativa. */
function getActiveTabContent() {
  let tabContents = document.querySelectorAll('.abas-conteudo');
  for (let item of tabContents) {
    if (!isHidden(item)) {
      return item;
    }
  }
  return false;
}

function updateDataOutput(tabContent) {
  // Null param? Lets see who's open...
  if (!tabContent) tabContent = getActiveTabContent();

  // Is content tab visible?
  if (isHidden(tabContent)) return false;

  // DELTA
  if (tabContent.id === 'content-delta') {
    // Set delta length (#content-delta > p)
    let p = tabContent.children[0];
    p.innerHTML = 'Tamanho Delta: ' + quill.getLength();
    p.style.padding = '4px 6px';

    // Set data (#content-delta > pre > code)
    let code = tabContent.children[1].children[0];
    code.innerHTML = JSON.stringify(quill.getContents(), null, 2);

    hljs.highlightBlock(code);
  }
  // TEXT
  if (tabContent.id === 'content-text') {
    // #content-text > pre > code
    let code = tabContent.children[0].children[0];
    code.innerHTML = getContentText();

    hljs.highlightBlock(code);
  }
  // HTML
  if (tabContent.id === 'content-html') {
    // #content-html > pre > code
    let code = tabContent.children[0].children[0];
    code.innerHTML = quill.root.innerHTML.replace(/</gi, '&lt;');

    hljs.highlightBlock(code);
  }
}

// #################################################################################
//                                                                            QUILL
// #################################################################################

let BlockEmbed = Quill.import('blots/block/embed');
// let Video = Quill.import('formats/video');

class CentralizedVideo extends BlockEmbed {
  static create({ src, width, height, fullscreen }) {
    // Get node from superclass.
    let node = super.create(src);

    // Is there any value for width and height?
    if (typeof width === 'undefined' ||
      typeof height === 'undefined') {
      width = 640;
      height = 480;
    }

    // Set width and height.
    node.width = width;
    node.height = height;

    // if(typeof src === 'undefined') src = 'https://www.youtube.com/watch?v=ZbDTIRvJjlY&';
    src = this.extractVideoUrl(src);

    node.setAttribute('src', src);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);

    console.log('src: ' + src);
    console.log('widht: ' + width);
    console.log('height: ' + height);

    return node;
  }

  static value(node){
    return node.getAttribute('src') || 'null';
  }

  // See: https://github.com/quilljs/quill/blob/develop/themes/base.js#L284
  static extractVideoUrl(url) {
    let match =
      url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/,) ||
      url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);

    if (match) {
      return `${match[1] || 'https'}://www.youtube.com/embed/${
        match[2]
      }?showinfo=0`;
    }
    // eslint-disable-next-line no-cond-assign
    if ((match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
      return `${match[1] || 'https'}://player.vimeo.com/video/${match[2]}/`;
    }

    return url;
  }
}

// CentralizedVideo.blotName = 'centralized-video';
// CentralizedVideo.className = 'ql-centralized-video';
// CentralizedVideo.tagName = 'IFRAME';

Quill.register(CentralizedVideo);

function getContentHTML() {
  return quill.root.innerHTML();
}

function getContentDelta() {
  return quill.getContents();
}

function getContentText() {
  return quill.getContents().ops.reduce((text, op) => {
    // Verifica se operação atual é texto puro, ou algum outro tipo.
    if (typeof op.insert === 'string') {
      return text + op.insert;
    }
    // Se não for string, o caractere de nova linha é posto, o qual possui
    // um tamanho de apenas 1 caractere.
    else {
      return text + '\n';
    }
  }, '');
}

/** Insert a video blot at caret position. If there is a selection range, then 
  * nothing happens. */
function insertVideo(value){
  const url = prompt('Please, insert video URL:' , '');
  let range = quill.getSelection();

  // Is there a selection?
  if (range && range.length == 0) {
    quill.insertEmbed(range.index, 'centralized-video', url);
  }
}

// #################################################################################
//                                                                             MAIN
// #################################################################################

$(document).ready(function () {
  var toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': null }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'color': [] }, { 'background': [] }],
      ['image', 'video'],
      ['clean']] , 
    handlers: {
      video: insertVideo
    }
  };  // Atenção! Clean também remove embed blots!
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    }
  });

  window.quill = quill;

  // Abra a aba padrão da aplicação.
  document.getElementById('default-tab').click();

  // Checkbox
  const checkRO = document.getElementById('input-check-readonly');
  checkRO.addEventListener("click", () => {
    quill.enable(!checkRO.checked);
  });

  // Alteração de conteúdo do quill
  quill.on('text-change', function (delta, oldDelta, source) {
    updateDataOutput();
  });
});