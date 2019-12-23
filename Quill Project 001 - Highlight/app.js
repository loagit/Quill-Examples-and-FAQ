// #################################################################################
//                                                                             TABS
// #################################################################################

/** See: https://www.w3schools.com/howto/howto_js_tabs.asp */
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tabButtons;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    let openTabContent = document.getElementById(tabName);
    openTabContent.style.display = "block";
    evt.currentTarget.className += " active";

    updateOpenTab(openTabContent);
}

function updateOpenTab(tabContent) {
    if (!tabContent) {
        if (!(tabContent = getActiveTabContent())) return false;
    }

    // DELTA
    if (tabContent.id === 'tab-content-delta') {
        // Set delta length (#tab-content-delta > p)
        let p = tabContent.children[0];
        p.innerHTML = 'Tamanho Delta: ' + quill.getLength();
        p.style.padding = '4px 6px';

        // Set data (#tab-content-delta > pre > code)
        let code = tabContent.children[1].children[0];
        code.innerHTML = JSON.stringify(getContentDelta(), null, 2);

        hljs.highlightBlock(code);
    }
    // TEXT
    if (tabContent.id === 'tab-content-text') {
        // #tab-contnet-text > pre > code
        let code = tabContent.children[0].children[0];
        code.innerHTML = getContentText();

        hljs.highlightBlock(code);
    }
    // HTML
    if (tabContent.id === 'tab-content-html') {
        // #tab-content-html > pre > code
        let code = tabContent.children[0].children[0];
        code.innerHTML = getContentHTML().replace(/</gi, '&lt;');

        hljs.highlightBlock(code);
    }
}

/** See: https://stackoverflow.com/a/21696585 */
function isHidden(el) {
    if (!el) return true;
    return (el.offsetParent === null)
}

function getActiveTabContent() {
    let tabContents = document.querySelectorAll('.tab-content');
    for (let item of tabContents) {
        if (!isHidden(item)) {
            return item;
        }
    }
    return false;
}

// #################################################################################
//                                                                            QUILL
// #################################################################################

let Inline = Quill.import('blots/inline');

/* Try using console.log(...) to find out the call order of each method. */
class TextHighlight extends Inline {

    // Remember, there is:
    // super.formats
    // super.domNode

    static create(value) {
        console.log('Texthighlight: static create(' + value + ')');

        /* I must be careful not passing false as a literal string here 
           because, if I'm not prepared, I may compromise this blot. 
           That's why I pass a false value to super.create. This removes
           any format related to this format (this blot). Do you want to
           check it out? Remove false and pass value as argument, then
           press the clear button (the last button on toolbar).*/
        if (!this.isValueUseful(value)) {
            return super.create(false);
        }

        let node = super.create(value);
        this.setNodeConfigurations(node, value);

        return node;
    }

    static formats(domNode) {
        console.log('Texthighlight: static formats(' + domNode.tagName + ')');
        let data = domNode.getAttribute('data-value');

        // Data is not useful
        if (!this.isValueUseful(data)) {
            return super.formats(domNode);
        }
        // Useful
        else {
            return data;
        }
    }

    /** See: https://github.com/quilljs/parchment#example */
    formats() {
        console.log('Texthighlight: formats()');
        let formats = super.formats();
        let value = TextHighlight.formats(this.domNode);

        // Only defined if the value is correct/acceptable.
        if (TextHighlight.isValueUseful(value)) {
            formats['texthighlight'] = TextHighlight.formats(this.domNode);
        }

        // Return this blot's formats
        return formats;
    }

    format(format, newValue) {
        console.log('Texthighlight: format(' + format + ' , ' + newValue + ')');
        let oldValue = TextHighlight.formats(this.domNode);

        // Remove
        if ((!format || format !== TextHighlight.blotName) ||
            (!TextHighlight.isValueUseful(newValue))) {
            // False = Remove this format
            super.format(format, false);
        }
        // Add
        else {
            let node = this.domNode;
            TextHighlight.setNodeConfigurations(node, newValue, oldValue);
        }
    }

    /* To prevent the node from accidentally being built in different ways. */
    static setNodeConfigurations(node, newValue, oldValue) {
        // Remove previous highlight.
        if (oldValue && this.isValueUseful(oldValue)) {
            node.classList.remove('ql-texthighlight-' + oldValue);
        }

        node.classList.add('ql-texthighlight-' + newValue);
        node.setAttribute('data-value', newValue);
    }

    static isValueUseful(value) {
        if (typeof value === 'undefined' ||  // Must be something...
            value === 'false' ||             // Not false as literal string...
            value < 1 ||                     // Not smaller than 1 or...
            value > 5) {                     // Not bigger than 5.
            return false;
        }
        return true;
    }
}

TextHighlight.blotName = 'texthighlight';
TextHighlight.tagName = 'span';

Quill.register(TextHighlight);
// Does the same as above.
// Quill.register('formats/texthighlight' , TextHighlight);

/** See: https://quilljs.com/docs/api/#getcontents */
function getContentDelta() {
    return quill.getContents();
}

/** See: https://github.com/quilljs/quill/issues/2698 */
function getContentText() {
    return quill.getContents().ops.reduce((text, op) => {
        if (typeof op.insert === 'string') {
            return text + op.insert;
        }
        // If it is not a string, the newline character is set, which has
        // a length of only 1 character.
        else {
            return text + '\n';
        }
    }, '');
}

/** See: https://github.com/quilljs/quill/issues/903#issuecomment-243844178 */
function getContentHTML() {
    return quill.root.innerHTML;
}

// #################################################################################
//                                                                        HIGHLIGHT
// #################################################################################

function highlightSelectedText(hl) {
    // Is hl (highlight) a value between 0 and 5 (inclusive)?
    if (hl < 0 || hl > 5) return false;
    /* Filters which elements can be highlighted. There is a list that contains
       only the elements that can be highlighted. This check also allows highlights
       to be removed even when the selection contains elements that cannot be 
       highlighted (hl> 0, because 0 clears any highlight).*/
    // if (!isHighlightPermited() && hl > 0) return false;

    var range = quill.getSelection();

    // Check selection...
    if (range && range.length > 0) {
        // Add
        if (hl > 0) {
            console.log('ADD - [hl: ' + hl + ', in: ' + range.index + ', le: ' + range.length + ']');
            quill.format('texthighlight', hl);
        }
        // Remove
        else {
            console.log('REMOVE - [hl: ' + hl + ', in: ' + range.index + ', le: ' + range.length + ']');
            quill.format('texthighlight', false);
        }
    }
}

/** This is not currently working. Try to select 2 paragraphs. */
function isHighlightPermited() {
    let el = getSelectionTextAndContainerElement().containerElement;
    let whitelist = ['P', 'LI', 'A'];

    if (whitelist.indexOf(el.tagName) != -1) {
        return true;
    }

    return false;
}

/** See: https://stackoverflow.com/a/4637223/2910546 */
function getSelectionTextAndContainerElement() {
    var text = "", containerElement = null;
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var node = sel.getRangeAt(0).commonAncestorContainer;
            containerElement = node.nodeType == 1 ? node : node.parentNode;
            text = sel.toString();
        }
    }
    else if (typeof document.selection != "undefined" &&
        document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        containerElement = textRange.parentElement();
        text = textRange.text;
    }
    return {
        text: text,
        containerElement: containerElement
    };
}

// #################################################################################
//                                                                             MAIN
// #################################################################################

$(document).ready(function () {

    /* The toolbar module is responsible for adding a listener to the events of
       it's controls (buttons and selects). This means that it is responsible for
       calling the appropriate handler (if present), as well as passing the value
       of the argument. For buttons, the value of the argument is obtained through
       the value="..." attribute of the html <button> element. For select (dropdowns),
       the value will be the same as the selected="..." attribute defined in the html 
       <select> element.*/
    /*
    var toolbarOptions = {
        container: '#toolbar-container',
        handlers: {
            'texthighlight': function (value) {
                highlightSelectedText(value);
            }
        }
    };*/

    var quill = new Quill('#editor', {
        theme: 'bubble',
        modules: {
            toolbar: '#toolbar-container'
        }
    });

    window.quill = quill;

    // Open default tab. See: https://www.w3schools.com/howto/howto_js_tabs.asp
    const defualtTab = document.getElementById("default-tab-button");
    defualtTab.click();

    // Quill content alteration.
    quill.on('text-change', function (delta, oldDelta, source) {
        updateOpenTab();
    });
    
    // Checkbox
    const checkRO = document.getElementById('input-check-readonly');
    checkRO.addEventListener("click", () => {
        quill.enable(!checkRO.checked);
    });
});