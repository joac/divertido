$(function () {
    "use strict";
    var utils, Element, elementContainer, root,
        $div = $(".div"),
        $workspace = $("#workspace"),
        $elements = $(".element"),
        $output = $("#output"),

    /**
     * utility functions
     */
    utils = {
        logArgs: function (text) {
            return function () {
            console.log(text + "-----", arguments);
            };
        },
        /**
         * Add active class to target element
         */
        active: function (evt) {
            $(evt.target).addClass('active');
            return evt;
        },
        inactive: function (evt) {
            $(evt.target).removeClass('active');
            return evt;
        },
        startDrag: function (evt) {
            evt.originalEvent.dataTransfer.setData(
                "text/plain", $(evt.target).text());
        },
        draggingHelper: function ($el) {
            $el.on('dragenter', this.active);
            $el.on('dragleave', this.inactive);
        },
        preventDefault: function (evt) {
            evt.preventDefault();
        },
        updateJSON: function () {
            console.log(root);
            $output.text(JSON.stringify(root));
            console.log(elementContainer);
        }
    };

    elementContainer = {};


    Element = function (tag, name, element) {
        this.name = name;
        this.tag = tag;
        this.parent = null;
        this.children = [];
        this.bind(element);

    };

    Element.prototype = {
        append: function (element) {
        //    element.parent = this;
            this.children.push(element);
        },
        /**
         * Attachs a dom element to current data
         */
        bind: function (element) {
            var $el = $(element);
            elementContainer[this.name] = this;
            $el.on('keyup',
                function (evt) {
                    console.log($el);
                    this.name = $el.justtext();
                    console.log($el.justtext());
                    utils.updateJSON();
                }.bind(this));
        }
    };

    /**
     * Addings to jquery
     */
    jQuery.fn.justtext = function() {
        return $(this)
            .clone()
            .children()
            .remove()
            .end()
            .text();
    };

    /**
     * Initializations
     */

    root = null;

    $elements.on('dragstart', utils.startDrag);
    $workspace.on('dragover', utils.preventDefault);
    $workspace.on('drop', function (evt) {
        var element, $element, className, parentElement,
            tagKind = evt.originalEvent.dataTransfer.getData('text/plain'),
            $parent = $(evt.target);
        switch (tagKind) {
            case "img":
                element = document.createElement('img');
                element.src = "http://baconmockup.com/50/50";
                break;
            default:
                element = document.createElement("div");
        };
        element.className = "divertido-inner-element";
        element.contentEditable = true;
        console.log($workspace);
        console.log($parent);
        className = $parent.justtext() + "-child-" + ($parent.children().length + 1);
        if ($parent.attr('id') == "workspace"){
            className = "root";
            root = new Element(tagKind, className, element);
        } else {
            parentElement = elementContainer[$parent.attr('id')];
            parentElement.append(new Element(tagKind, className, element));
        }
        element.textContent = className;
        element.id = className;
        $parent.append(element);
        //Trigger inactive
        utils.inactive(evt);
        utils.draggingHelper($(element));
        utils.updateJSON();
    });
});
