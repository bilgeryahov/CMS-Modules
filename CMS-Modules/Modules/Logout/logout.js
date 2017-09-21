/**
 * @file logout.js
 *
 * Logout module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const Logout = (function(){

    const Logic = {

        // Logout's Auth Observer
        _authObserver: {},

        _logoutButton: null,

        /**
         * Initializes the main functionality.
         *
         * @return void
         */

        init(){

            const $self = this;

            if(!FirebaseAuthenticationManager){

                console.error('Logout.init() FirebaseAuthenticationManager is not present!');
                return;
            }

            if(!CustomMessage){

                console.error('Logout.init(): CustomMessage module is not present!');
                return;
            }

	        // Get the Logout form elements.
	        if(!$self.getLogoutFormElements()){

		        console.error('Logout.init(): Logout form elements are not present! Aborting.');
		        return;
	        }

	        $self.attachDomElementEvents();

            // Create a new Observer for the Auth state.
            $self._authObserver = new Observer();

            // Set-up my Auth update settings.
            $self._authObserver.getUpdate = function($update){

                if($update === 'USER 1'){

                    console.log('Logout: user is here ' + FirebaseAuthenticationManager.getCurrentUser().email);
                }
                else if($update === 'USER 0'){

                    // The user just logged out.
                    console.log('Logout: User is not here, redirecting...');
                    window.location.replace('./login.html');
                }
                else if($update === 'ERROR 1'){

                    // Problem while logging out!
                    console.error('Logout: ' + FirebaseAuthenticationManager.getAuthError());
                    CustomMessage.showMessage(FirebaseAuthenticationManager.getAuthError());
                }
            };

            // Add my Auth Observer as an observer to FirebaseAuthenticationManager's ObserverManager.
            FirebaseAuthenticationManager.getAuthObserverManager().addObserver($self._authObserver);
        },

	    /**
	     * Attaches the needed DOM events to the Logout Form Elements.
	     *
	     * @return void
	     */

	    attachDomElementEvents(){

		    const $self = this;

		    $self._logoutButton.addEvent('click', function () {

			    $self.attemptLogout();
		    });
	    },

	    /**
	     * Fetches all the Logout Form elements from the DOM.
	     * If something goes wrong, false is returned. Otherwise true.
	     *
	     * @return {boolean}
	     */

	    getLogoutFormElements(){

		    const $self = this;

		    $self._logoutButton = $('LogoutButton');

		    return (
			    $self._logoutButton !== null
		    );
	    },

	    /**
         * Try to logout the current user.
         *
         * @return void
         */

        attemptLogout(){

            FirebaseAuthenticationManager.logout();
        }
    };

    return{

        init(){

            Logic.init();
        }
    }
})();

document.addEvent('domready', function () {

    Logout.init();
});