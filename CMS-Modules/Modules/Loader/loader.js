/**
 * @file Loader.js
 *
 * Loader module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const Loader = (function(){

    const Logic = {

        _templatePath: './CMS-Modules/CMS-Modules/Modules/Loader/loader.html',
        _placeholderName: 'LoaderPlaceholder',
        _template: null,

        // Observer for Auth Display State
        _authAttemptDisplayObserver: {},

        /**
         * Initializes the main functionality.
         *
         * @return void
         */

        init(){

            const $self = this;
            $self.renderTemplate();

            // Create the Auth Attempt Display Observer.
            $self._authAttemptDisplayObserver = new Observer();

            // Set-up.
            $self._authAttemptDisplayObserver.getUpdate = function ($update) {

                switch ($update){

                    case 'LoginAttemptStart':
                        $self._template.makeVisible();
                        break;

                    case 'LoginAttemptFinish':
                        $self._template.makeInvisible();
                        break;
                }
            };

            // Add.
            FirebaseAuthenticationManager.getAuthAttemptDisplayObserverManager()
                .addObserver($self._authAttemptDisplayObserver);
        },

        /**
         * Renders the template.
         *
         * @return void
         */

        renderTemplate(){

            const $self = this;

            $self._template = new Template(
                $self._templatePath, $self._placeholderName, {}
            );

            $self._template.displayMain();
        }
    };

    return{

        init(){

            Logic.init();
        }
    }
})();

document.addEvent('domready', function () {

    Loader.init();
});