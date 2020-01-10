// #################################################################################
//                                                LOWER TABS - DELTA, TEXT AND HTML
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
        p.innerHTML = 'Size: ' + quill.getLength();
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
function isTabHidden(el) {
    if (!el) return true;
    return (el.offsetParent === null)
}

function getActiveTabContent() {
    let tabContents = document.querySelectorAll('.tab-content');
    for (let item of tabContents) {
        if (!isTabHidden(item)) {
            return item;
        }
    }
    return false;
}

// #################################################################################
//                                         SLIDER IMAGES - TOOLTIP, BLOT AND MODULE
// #################################################################################

// ############################
//  TOOLTIP
// ############################

class TooltipSliderImages {
    constructor(quill, toolbar) {
        this.fieldCounter = 1;  // Used to generate an id for the image field that is inserted and removed.
        this.embedCounter = 1;  // Used to generate an id for the embed to be inserted.
        this.quill = quill;
        this.toolbar = toolbar;

        this.container = this.buildContainer();
        this.header = this.buildHeader();
        this.tabs = this.buildTabs();
        this.config = this.buildConfig();
        this.images = this.buildImages();

        // For testing, I decided to expose these 6 images as an example. In 
        // the actual case of using this utility, the correct would be to remove 
        // the six lines of code, and leave only one empty image field without
        // any URL, as this is a user job.
        // this.addNewField(); // This line should be uncommented, while the others should be commented or removed.
        this.addNewField('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.QXhnTOozAbxufqcMjhhhagHaE7%26pid%3DApi&f=1');
        this.addNewField('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechfiddler.files.wordpress.com%2F2015%2F05%2Fjavascript_logo.png%3Fw%3D150%26h%3D150&f=1&nofb=1');
        this.addNewField('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fabbrigroup.com%2Fwp-content%2Fuploads%2F2017%2F04%2FCarousel-10-at-night.jpg&f=1&nofb=1');
        this.addNewField('https://danieleuergetes.com/wp-content/uploads/2013/02/quill-n-paper.gif');
        this.addNewField('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.brighton.ac.uk%2Fimages%2FCUPP%2Fearth-people-Cropped2-260x178.jpg&f=1&nofb=1');
        this.addNewField('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fe%2Fec%2FP_dove_peace.png%2F220px-P_dove_peace.png&f=1&nofb=1');

        // Joins structures.
        this.container.appendChild(this.header);
        this.container.appendChild(this.tabs);
        this.container.appendChild(this.config);
        // this.container.appendChild(this.images);

        // Adds mounted the tooltip as a Quill container element.
        // It will not appear yet because display has value none.
        quill.container.appendChild(this.container);
    }

    buildContainer() {
        // This type of trick is used in various places in the code 
        // where the this reference is lost.
        var thisTooltip = this;

        // Creates master / master container, the one that will be
        // revealed and hidden by pushing the button.
        var container = document.createElement('DIV');
        container.classList.add('tooltip-img-slider-container');

        // Hide tooltip by clicking outside of it.
        document.body.addEventListener('click', event => {
            // Was it clicked off?
            if (!hasClass(event.target, 'tooltip-img-slider-container')) {
                // Prevents tooltip from ever appearing if its button is clicked.
                if (hasClass(event.target, 'ql-slider-images') ||
                    event.target.closest('.ql-slider-images')) {
                    return;
                }

                thisTooltip.hide();
            }
        });

        // Prevents tooltip from being hidden if its content is clicked.
        container.addEventListener('click', event => {
            event.stopPropagation();
        });

        // Hide tooltip when typing text in the editor. Here the change is by keyboard.
        this.quill.on('text-change', function (delta, oldDelta, source) {
            if (source === 'user') {
                thisTooltip.hide();
            }
        });

        return container;
    }

    buildHeader() {
        var header = document.createElement('DIV');
        header.classList.add('tooltip-img-slider-header');

        var thisTooltip = this;

        var title = document.createElement('SPAN');
        title.id = 'title';
        title.classList.add('noselect');
        title.innerText = 'New Slider';

        var mover = document.createElement('SPAN');
        mover.id = 'mover';
        mover.classList.add('noselect');
        mover.innerText = 'Drag Tooltip';

        // See: https://www.kirupa.com/html5/drag.htm
        this.drag = {
            dragging: false,
            currentX: 0,
            currentY: 0,
            initialX: 0,
            initialY: 0,
            xOffset: 0,
            yOffset: 0
        };

        // DRAG START (I could have defined a dragStart method, but I would have to 
        // pass references to event and thisTooltip anyway ... So I thought better not)
        document.addEventListener("mousedown", event => {
            if (!thisTooltip.isVisible() || event.target !== mover) return;

            thisTooltip.drag.initialX = event.clientX - thisTooltip.drag.xOffset;
            thisTooltip.drag.initialY = event.clientY - thisTooltip.drag.yOffset;

            thisTooltip.drag.dragging = true;
        });
        // DRAG END (Same here...)
        document.addEventListener("mouseup", event => {
            if (!thisTooltip.isVisible()) return;

            thisTooltip.drag.initialX = thisTooltip.drag.currentX;
            thisTooltip.drag.initialY = thisTooltip.drag.currentY;

            thisTooltip.drag.dragging = false;
        });
        // DRAGGING / DRAG (And also here...)
        document.addEventListener("mousemove", event => {
            if (!thisTooltip.isVisible() || !thisTooltip.drag.dragging) return;

            event.preventDefault();

            thisTooltip.drag.currentX = event.clientX - thisTooltip.drag.initialX;
            thisTooltip.drag.currentY = event.clientY - thisTooltip.drag.initialY;

            thisTooltip.drag.xOffset = thisTooltip.drag.currentX;
            thisTooltip.drag.yOffset = thisTooltip.drag.currentY;

            thisTooltip.container.style.transform = 
                "translate3d(" + 
                    thisTooltip.drag.currentX + "px, " + 
                    thisTooltip.drag.currentY + "px, 0)";
        });

        var buttonOk = document.createElement('BUTTON');
        buttonOk.innerText = 'Insert';
        buttonOk.id = 'conclude';
        buttonOk.addEventListener('click', event => {
            thisTooltip.insertBlot();
        });

        // Adds everything to the header container.
        header.appendChild(title);
        header.appendChild(mover);
        header.appendChild(buttonOk);

        return header;
    }

    buildTabs() {
        var tabContainer = document.createElement('DIV');
        tabContainer.classList.add('tooltip-img-slider-tabs');
        var thisTooltip = this;

        var tabButtonConfig = document.createElement('BUTTON');
        tabButtonConfig.innerText = 'Config';
        tabButtonConfig.classList.add('active-tab');
        var tabButtonImages = document.createElement('BUTTON');
        tabButtonImages.innerText = 'Images';

        // Change lower tooltip content to config.
        tabButtonConfig.addEventListener('click', event => {
            if (hasClass(tabButtonConfig, 'active-tab')) return;

            thisTooltip.images.remove();
            thisTooltip.container.appendChild(thisTooltip.config);

            tabButtonConfig.classList.add('active-tab');
            tabButtonImages.classList.remove('active-tab');
        });

        // Change lower tooltip content to images.
        tabButtonImages.addEventListener('click', event => {
            if (hasClass(tabButtonImages, 'active-tab')) return;

            thisTooltip.config.remove();
            thisTooltip.container.appendChild(thisTooltip.images);

            tabButtonConfig.classList.remove('active-tab');
            tabButtonImages.classList.add('active-tab');
        });

        tabContainer.appendChild(tabButtonConfig);
        tabContainer.appendChild(tabButtonImages);

        return tabContainer;
    }

    // This part unfortunately got verbose. I apologize, but the structure must
    // be useful, and simple.
    buildConfig() {
        var container = document.createElement('DIV');
        container.classList.add('tooltip-img-slider-config');
        var thisTooltip = this;

        // Top - Default layout row.
        var top = document.createElement('DIV');
        top.classList.add('one-column-config');
        top.classList.add('config-container');

        // Middle - Autoplay row.
        var middle = document.createElement('DIV');
        middle.classList.add('one-column-config');
        middle.classList.add('config-container');

        // Bottom - Left and right columns (slides to show and slides to scroll).
        var bottom = document.createElement('DIV');
        bottom.classList.add('bottom-container');

        // Layout
        var labelLayout = document.createElement('SPAN');
        labelLayout.innerText = 'Default Layout:';

        var layoutSwitcher = document.createElement('LABEL');
        layoutSwitcher.classList.add('switcher');
        var layoutCheckBox = document.createElement('INPUT');
        layoutCheckBox.type = 'checkbox';
        layoutCheckBox.checked = false;
        var layoutSlider = document.createElement('SPAN');
        layoutSlider.classList.add('slider');

        layoutSwitcher.appendChild(layoutCheckBox);
        layoutSwitcher.appendChild(layoutSlider);

        this.defaultLayout = layoutCheckBox.checked;
        layoutCheckBox.addEventListener('click', event => {
            this.defaultLayout = layoutCheckBox.checked;
        });

        // Autoplay
        var labelAutoplay = document.createElement('SPAN');
        labelAutoplay.innerText = 'Autoplay:';

        var autoplaySwitcher = document.createElement('LABEL');
        autoplaySwitcher.classList.add('switcher');
        var autoplayCheckbox = document.createElement('INPUT');
        autoplayCheckbox.type = 'checkbox';
        autoplayCheckbox.checked = false;
        var autoplaySlider = document.createElement('SPAN');
        autoplaySlider.classList.add('slider');

        autoplaySwitcher.appendChild(autoplayCheckbox);
        autoplaySwitcher.appendChild(autoplaySlider);

        this.autoplay = autoplayCheckbox.checked;
        autoplayCheckbox.addEventListener('click', event => {
            this.autoplay = autoplayCheckbox.checked;
        });

        // Left Column
        var leftCol = document.createElement('DIV');
        leftCol.classList.add('two-column-config');
        leftCol.classList.add('config-container');
        var wrapperSlidesToShow = document.createElement('DIV');
        var labelSlidesToShow = document.createElement('SPAN');
        labelSlidesToShow.innerText = 'Slides to Show:';
        labelSlidesToShow.classList.add('config-title');
        var valueSlidesToShow = document.createElement('SPAN');
        valueSlidesToShow.innerText = '4';
        valueSlidesToShow.classList.add('config-value');
        var inputSlidesToShow = document.createElement('INPUT');
        inputSlidesToShow.type = 'range';
        inputSlidesToShow.min = 1;
        inputSlidesToShow.max = 6;
        inputSlidesToShow.value = valueSlidesToShow.innerText;
        this.slidesToShow = valueSlidesToShow.innerText;
        inputSlidesToShow.oninput = function () {
            valueSlidesToShow.innerText = inputSlidesToShow.value;
            thisTooltip.slidesToShow = valueSlidesToShow.innerText;
        }

        wrapperSlidesToShow.appendChild(labelSlidesToShow);
        wrapperSlidesToShow.appendChild(valueSlidesToShow);
        leftCol.appendChild(wrapperSlidesToShow);
        leftCol.appendChild(inputSlidesToShow);

        // Right Column
        var rightCol = document.createElement('DIV');
        rightCol.classList.add('two-column-config');
        rightCol.classList.add('config-container');
        var wrapperSlidesToScroll = document.createElement('DIV');
        var labelSlidesToScroll = document.createElement('SPAN');
        labelSlidesToScroll.innerText = 'Slides to Scroll:';
        labelSlidesToScroll.classList.add('config-title');
        var valueSlidesToScroll = document.createElement('SPAN');
        valueSlidesToScroll.innerText = '2';
        valueSlidesToScroll.classList.add('config-value');
        var inputSlidesToScroll = document.createElement('INPUT');
        inputSlidesToScroll.type = 'range';
        inputSlidesToScroll.min = 1;
        inputSlidesToScroll.max = 6;
        inputSlidesToScroll.value = valueSlidesToScroll.innerText;
        this.slidesToScroll = valueSlidesToScroll.innerText;
        inputSlidesToScroll.oninput = function () {
            valueSlidesToScroll.innerText = inputSlidesToScroll.value;
            thisTooltip.slidesToScroll = valueSlidesToScroll.innerText;
        }

        wrapperSlidesToScroll.appendChild(labelSlidesToScroll);
        wrapperSlidesToScroll.appendChild(valueSlidesToScroll);
        rightCol.appendChild(wrapperSlidesToScroll);
        rightCol.appendChild(inputSlidesToScroll);

        top.appendChild(labelLayout);
        top.appendChild(layoutSwitcher);

        middle.appendChild(labelAutoplay);
        middle.appendChild(autoplaySwitcher);

        bottom.appendChild(leftCol);
        bottom.appendChild(rightCol);

        // Addition of everything in configuration container.
        container.appendChild(top);
        container.appendChild(middle);
        container.appendChild(bottom);
        return container;
    }

    buildImages() {
        var container = document.createElement('DIV');
        container.classList.add('tooltip-img-slider-images');

        var buttons = document.createElement('DIV');
        buttons.classList.add('tooltip-img-slider-images-buttons');

        var thisTooltip = this;

        // Add the two buttons to the top.
        var buttonNewField = document.createElement('BUTTON');
        buttonNewField.innerText = 'New Field';
        buttonNewField.id = 'button-new-field';
        buttonNewField.addEventListener('click', () => {
            thisTooltip.addNewField();
        });

        var buttonClearFields = document.createElement('BUTTON');
        buttonClearFields.innerText = 'Clear Fields';
        buttonClearFields.id = 'button-clear-fields';
        buttonClearFields.addEventListener('click', () => {
            thisTooltip.clearFields();
        });

        // This container will have the list of fields with images. Each 
        // field is added via the addNewField() method.
        var fields = document.createElement('DIV');
        fields.classList.add('tooltip-img-slider-images-fields');

        buttons.appendChild(buttonNewField);
        buttons.appendChild(buttonClearFields);

        container.appendChild(buttons);
        container.appendChild(fields);

        this.fields = fields;

        return container;
    }

    addNewField(defaultValue) {
        // A wrapper for input and button, the image field.
        let field = document.createElement('div');
        // The text field.
        let input = document.createElement('input');
        // The "X" button.
        let button = document.createElement('button');
        // The "X" icon for the button.
        let svgIcon = this.getNewXIcon();
        // Class identifier.
        let fieldId = 'field-' + this.fieldCounter++;

        // Configure the field wrapper.
        field.classList.add('img-field');
        field.id = fieldId;

        // Configure text field.
        input.type = 'text';
        input.placeholder = 'Please, insert image URL...';
        input.value = defaultValue && defaultValue.length > 0 ? defaultValue : '';

        // Configure button.
        button.appendChild(svgIcon);
        button.value = fieldId;

        var thisTooltip = this;

        // Event handler on click.
        button.addEventListener('click', event => {
            // At least one field must remain present.
            if (thisTooltip.fields.children.length < 2) return;

            let fieldId = undefined;

            /* <BUTTON> -> <svg> -> <path> */
            // Was path cliced?
            if (event.target.tagName === 'path') {
                fieldId = event.target.parentElement.parentElement.value;
            }
            // svg?
            else if (event.target.tagName === 'svg') {
                fieldId = event.target.parentElement.value;
            }
            // Then it was the BUTTON itself.
            else {
                fieldId = event.target.value;
            }

            if (typeof fieldId === 'undefined') return;

            let field = thisTooltip.fields.querySelector('#' + fieldId);

            // Remove only if there is something to remove.
            if (field != null || typeof field !== 'undefined') {
                // Works either way...
                // field.parentElement.removeChild(field);
                field.remove();
            }
        });

        // Put everything together.
        field.appendChild(input);
        field.appendChild(button);
        this.fields.appendChild(field);
    }

    getNewXIcon() {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 38 38');
        svg.setAttribute('width', '10px');
        svg.classList.add('x-icon');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M8 37c-4 4-11-2-7-7l11-11-11-11c-4-4 3-11 7-7l11 11 11-11c5-4 11 3 7 7l-11 11 11 11c4 5-2 11-7 7l-11-11-11 11z');

        svg.appendChild(path);
        return svg;
    }

    // I know this method is called only by another that does the same check (if visible). 
    // But I decided not to remove it, as it can also be called alone if desired.
    show() {
        if (this.isVisible()) return;

        // Show the tooltip.
        this.container.style.display = 'block';

        // Calculate tooltip position.
        this.updatePositionFromButton();
    }

    hide() {
        if (!this.isVisible()) return;

        // Get tooltip element.
        this.container.style.display = 'none';

        // Resets drag.
        this.drag.currentX = 0;
        this.drag.currentY = 0;
        this.drag.initialX = 0;
        this.drag.initialY = 0;
        this.drag.xOffset = 0;
        this.drag.yOffset = 0;
        this.drag.dragging = false;
        this.container.style.transform = 'translate3d(0px, 0px, 0)';
    }

    /** Called to check if tooltip should disappear or appear. */
    toolbarButtonPressed() {
        if (!this.isVisible()) {
            this.show();
            return;
        }

        this.hide();
    }

    isVisible() {
        return this.container.style.display !== 'none';
    }

    /** Equals horizontal toolbar center with its horizontal button center.
      * 
      * For this we need to take into account the X coordinate of the toolbar 
      * button, but also the padding that is given to the toolbar controls/buttons.
      * Also, we don't want the right edge of the toolbar to cross the right
      * edge of the browser.
      * 
      * It is important to note that if the tooltip display is none, it will 
      * have no coordinate and dimension values.
      */
    updatePositionFromButton() {
        var button = this.toolbar.querySelector('.ql-slider-images');

        // Unfortunately I had to use jQuery here, as I don't know how to get
        // this value any other way.
        // About the logic: https://stackoverflow.com/a/11634823/2910546
        let x =
            $(this.toolbar).css('padding-left').replace('px', '') - // Toolbar padding
            (this.container.offsetWidth / 2) +                      // This tooltip size / 2
            button.offsetLeft - this.toolbar.offsetLeft;            // X of toolbar button
        let widthX = x + this.container.offsetWidth;

        // See: http://javascript.info/coordinates
        let leftBorderLimit = this.toolbar.getBoundingClientRect().left;
        let rightBorderLimit = this.toolbar.getBoundingClientRect().right;

        // Corrects right edge.
        if (widthX > rightBorderLimit) {
            x = x - (widthX - rightBorderLimit);
        }
        // Corrects left edge.
        if ((x * -1) > leftBorderLimit) {
            x = x + ((x * -1) - leftBorderLimit);
        }

        // Based on all the information collected, we can finally effectively define
        // the tooltip position.
        this.container.style.top = 6 + 'px';
        this.container.style.left = x + 'px';
    }

    /** Get tooltip images as a vector of URLs. In this example this method is not called. */
    getImagesAsURLs() {
        // Get all the input elements inside #tooltip-img-fields.
        var urls = [];
        const inputs = this.fields.querySelectorAll('input');

        // Pushes its values to the returned array, but only if a value is present.
        inputs.forEach((currentValue, currentIndex, listObj) => {
            let value = currentValue.value;
            if (typeof value !== 'undefined' && value !== "") urls.push(value);
        });

        return urls;
    }

    /** Get tooltip images as <img> element array. */
    getImagesAsElements() {
        // Get all the input elements inside #tooltip-img-fields.
        var elements = [];
        const inputs = this.fields.querySelectorAll('input');

        // Pushes its values to the returned array, but only if a value is present.
        inputs.forEach((currentValue, currentIndex, listObj) => {
            let value = currentValue.value;
            if (typeof value !== 'undefined' && value !== "") {
                let img = document.createElement('IMG');
                img.setAttribute('src', value);
                elements.push(img);
            }
        });

        return elements;
    }

    /** Of all text fields present, this method clears the contents of each one.
      * This is a utility made for convenience only. */
    clearFields() {
        const inputs = this.fields.querySelectorAll('input');

        inputs.forEach((currentValue, currentIndex, listObj) => {
            currentValue.value = '';
        });
    }

    /** Uses all definid settings in the tooltip to create the final element that 
      * will be seen in the editor. */
    insertBlot() {
        let images = this.getImagesAsElements();

        // Is there any image that has been added?
        if (!images || images.length <= 0) {
            this.hide();
            return;
        }

        // Get range and correct it if not appropriate.
        let range = this.quill.getSelection();
        if (!range || range.index < 0) {
            range = {
                index: getContentText().length - 1,
                length: 0
            };
        }

        // Defines value that will be used for blot creation.
        let idPrefix = 'slider-images-';
        var value = {
            id: idPrefix + this.embedCounter++,
            images: images,
            slidesToShow: this.slidesToShow,
            slidesToScroll: this.slidesToScroll,
            defaultLayout: this.defaultLayout,
            autoplay: this.autoplay
        };

        // Inserts element into editor.
        this.quill.insertEmbed(
            range.index,
            'slider-images',
            value,
            'user');

        // Applies slick effect to inserted blot.
        $('#' + value.id).slick({
            slidesToShow: parseInt(this.slidesToShow),
            slidesToScroll: parseInt(this.slidesToScroll),
            infinite: true,
            autoplay: this.autoplay,
            autoplaySpeed: 2600,
        });

        // Applies imposed effect to default layout on tooltip.
        // This ensures that slides will have the same (or nearly
        // the same) height, and will be vertically centered.
        // See: https://stackoverflow.com/a/46762304
        if(!this.defaultLayout){
            let insertedEmbed = document.querySelector('#' + value.id);
            let slickTrack = insertedEmbed.querySelector('.slick-track');
            slickTrack.style.display = 'flex';
            let slides = insertedEmbed.querySelectorAll('.slick-slide');
            for (let i = 0; i < slides.length; i++) {
                let slickSlide = slides[i];
                slickSlide.style.height = 'auto';
                slickSlide.style.display = 'flex';
                slickSlide.style.justifyContent = 'center';
                slickSlide.style.alignItems = 'center';
            }
        }

        // The editor needs focus so that the slick can pass 
        // the slides by itself.
        this.quill.focus();
    }
}

// ############################
//  BLOT
// ############################

const BlockEmbed = Quill.import('blots/block/embed');
// const Embed = Quill.import('blots/embed');

class SliderImagesBlot extends BlockEmbed {

    static create(value) {
        let node = super.create(value);
        node.id = value.id;
        node.setAttribute('data-slides-to-show', value.slidesToShow);
        node.setAttribute('data-slides-to-scroll', value.slidesToScroll);
        node.setAttribute('data-default-layout', value.defaultLayout);
        node.setAttribute('data-auto-play', value.autoplay);

        // Loops through img elements vector.
        for (let i = 0; i < value.images.length; i++) {
            let image = value.images[i];

            if (image &&
                image.src &&
                image.src.length > 0) {
                node.appendChild(image);
            }
        }

        return node;
    }

    // This is how we define how we want delta to be structured. In this case, 
    // I want to receive blot characteristics as properties of an object.
    static value(node) {
        var result = [];
        var images = node.querySelectorAll('img');

        if (images) {
            for (let image of images.values()) {
                result.push(image.src);
            }
        }

        return {
            images: result,
            slidesToShow: node.getAttribute('data-slides-to-show'),
            slidesToScroll: node.getAttribute('data-slides-to-scroll'),
            defaultLayout: node.getAttribute('data-default-layout'),
            autoplay: node.getAttribute('data-auto-play')
        };
    }
}

SliderImagesBlot.blotName = 'slider-images';
SliderImagesBlot.className = 'ql-slider-images';
SliderImagesBlot.tagName = 'DIV';

// ############################
//  MODULE
// ############################

const Module = Quill.import('core/module');

class ToolbarSliderImages extends Module {
    constructor(quill, options) {
        super(quill, options);

        this.toolbar = quill.getModule('toolbar');
        this.tooltip = new TooltipSliderImages(
            quill,
            this.toolbar.container);

        var thisModule = this;

        // Adds a handler to be called with the same name as the blot.
        // I don't want the module to worry about details of how tooltip
        // works. He should just say: "hey, the button here has been 
        // clicked, okay?"
        if (typeof this.toolbar !== 'undefined') {
            this.toolbar.addHandler('slider-images', function () {
                thisModule.tooltip.toolbarButtonPressed();
            });
        }

        // This is where the button icon is set.
        this.toolbarButton = document.getElementsByClassName('ql-slider-images');
        if (this.toolbarButton) {
            // Cycles through found elements.
            [].slice.call(this.toolbarButton).forEach(function (slider) {
                // Changes the icon of the found button. The buttonIcon 
                // property is set just below.
                slider.innerHTML = options.buttonIcon;
            });
        }
    }
}

// Its the applied classes that cause the button to change color when the mouse is over.
ToolbarSliderImages.DEFAULTS = {
    buttonIcon: '<svg viewBox="0 0 218.2 218.2">' +
        '<path class="ql-fill" d="M214.3 27.3H3.9C1.7 27.3 0 29 0 31.2v27.3 77.9 50.7c0 2.2 1.7 3.9 3.9 3.9H214.3c2.2 0 3.9-1.7 3.9-3.9v-50.7V58.4 31.2C218.2 29 216.5 27.3 214.3 27.3zM7.8 62.3h35.1v70.1H7.8V62.3zM210.4 132.5h-11.7V62.3h11.7V132.5zM210.4 54.6h-15.6c-2.2 0-3.9 1.7-3.9 3.9v77.9c0 2.2 1.7 3.9 3.9 3.9h15.6v42.9H7.8v0 -42.9h39c2.2 0 3.9-1.7 3.9-3.9V58.4c0-2.2-1.7-3.9-3.9-3.9H7.8V35.1h202.6V54.6z"></path>' +
        '<circle class="ql-fill" cx="113" cy="163.7" r="7.8"></circle>' +
        '<path class="ql-fill" d="M66.2 140.3h109.1c2.2 0 3.9-1.7 3.9-3.9V58.4c0-2.2-1.7-3.9-3.9-3.9H66.2c-2.2 0-3.9 1.7-3.9 3.9v77.9C62.3 138.5 64.1 140.3 66.2 140.3zM70.1 62.3h101.3v70.1H70.1V62.3z"></path>' +
        '<rect class="ql-fill" x="66.2" y="159.8" width="11.7" height="7.8"></rect>' +
        '<rect class="ql-fill" x="85.7" y="159.8" width="11.7" height="7.8"></rect>' +
        '<rect class="ql-fill" x="128.6" y="159.8" width="11.7" height="7.8"></rect>' +
        '<rect class="ql-fill" x="148.1" y="159.8" width="11.7" height="7.8"></rect>' +
        '</svg>'
}

Quill.register({
    'formats/slider-images': SliderImagesBlot,
    'modules/slider-images-toolbar': ToolbarSliderImages
}, true);

// #################################################################################
//                                                                UTILITY FUNCTIONS
// #################################################################################

// See: https://stackoverflow.com/a/5085587
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

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
//                                                                             MAIN
// #################################################################################

$(document).ready(function () {
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['video', 'image', 'slider-images'],
        [{ 'size': ['small', false, 'large', 'huge']}],
        [{ 'align': [] }] ];

    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            'toolbar': toolbarOptions,
            'slider-images-toolbar': true // Yes, this needs to be here.
        }
    });

    // I am using this reference for some utility functions. That's why
    // I need to make it global.
    window.quill = quill;

    // Don't look at this...
    /*
    quill.on('selection-change', (range, oldRange, source) => {
        // console.log('range: ' + range.index);
        // console.log('oldRange: ' + oldRange != null ? range.index : 'null');

        if (!range) return;

        var deltaAntes = quill.getContents(range.index - 1, 1);
        // var deltaDepois = quill.getContents(range + 1 , 1);

        console.log('================================================  Exibindo ops...')
        for (let i = 0; i < deltaAntes.ops.length; i++) {
            let obj = deltaAntes.ops[i];
            console.log('OP-' + i + ': ... ');
            for (let prop1 in obj) {
                if (typeof obj[prop1] === 'object') {
                    for (let prop2 in obj[prop1]) {
                        console.log('[' + prop2 + ']: ' + obj[prop1][prop2]);
                    }
                }
                else {
                    console.log('[' + prop1 + ']: ' + obj[prop1]);
                }
            }
        }
        console.log('Fim de ops...');
    });
    */

    // Open default tab. See: https://www.w3schools.com/howto/howto_js_tabs.asp
    const defualtTab = document.getElementById("default-tab-button");
    defualtTab.click();

    // Quill content alteration.
    quill.on('text-change', function (delta, oldDelta, source) {
        updateOpenTab();
    });
});