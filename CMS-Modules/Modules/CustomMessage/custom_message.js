/**
 * @file custom_message.js
 *
 * CustomMessage module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 2.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const CustomMessage = (function(){

    const Logic = {

        // Object's attributes, since used in show and close message box.
        _module: null,
        _template: null,
        _source: null,
        _compiled: null,

        _customMessageCloseSpan: null,

        // Will put a flag if there is a problem with
        // initial rendering, so then message box
        // cannot be shown.
        _problemWhileRendering: false,

        /**
         * Initialize the main functionality.
         *
         * @return void
         */

        init(){

            const $self = this;
            if(!$self.renderTemplate('')){

                // Make sure no one can try to show a message.
                $self._problemWhileRendering = true;
                return;
            }

            if(!$self.getDomElements()){

                return;
            }

            $self.attachDomElementEvents();
        },

        /**
         * Renders the template.
         *
         * @param $data
         *
         * @return {boolean}
         */

        renderTemplate($data){

            const $self = this;

            $self._module = $('CustomMessageModule');
            $self._template = $('CustomMessageTemplate');

            if(!$self._module || !$self._template){

                console.error('CustomMessage.renderTemplate(): CustomMessageModule or ' +
                    'CustomMessageTemplate is not found!');
                return false;
            }

            $self._source = $self._template.get('html');
            $self._compiled = Handlebars.compile($self._source);
            $self._module.set('html',  $self._compiled( { message : $data } ));

            return true;
        },

        /**
         * Tries to fetch the DOM elements.
         *
         * @return {boolean}
         */

        getDomElements(){

            const $self = this;

            $self._customMessageCloseSpan = $('CustomMessageCloseSpan');
            if (!$self._customMessageCloseSpan) {

                console.error('CustomMessage.getDomElements(): CustomMessageCloseSpan is missing!');
                return false;
            }

            return true;
        },

        /**
         * Attaches the DOM element events.
         *
         * @return void
         */

        attachDomElementEvents(){

            const $self = this;
            $self._customMessageCloseSpan.addEvent('click', function () {

               $self.closeMessage();
            });
        },

        /**
         * Show a message to the user.
         *
         * @param $message
         *
         * @return void
         */

        showMessage($message){

            const $self  = this;
            if($self._problemWhileRendering){

                console.error('CustomMessage.showMessage(): Cannot display the Custom Message,' +
                    ' since the has been a problem while rendering the template initially.');
                return;
            }

            $self._module.set('html',  $self._compiled( { message : $message } ));

            /*
             * After setting the Module with the new content,
             * the events should be attached again.
             */

            if($self.getDomElements()){

                $self.attachDomElementEvents();
                $self._module.style.display = 'block';
            }
            else{

                console.error('CustomMessage.showMessage(): Something went wrong after trying ' +
                    'to show a message...');
            }
        },

        /**
         * Closes the message box.
         *
         * @return void
         */

        closeMessage(){

            const $self = this;
            $self._module.style.display = 'none';
        }
    };

    return{

        init(){

            Logic.init();
        },

        showMessage($message){

            Logic.showMessage($message);
        }
    }
})();

document.addEvent('domready', function () {

    CustomMessage.init();
});