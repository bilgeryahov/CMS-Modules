/**
 * @file login.js
 *
 * Login module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 2.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const Login = (function(){

	const Logic = {

		// Login's form elements
		_inputEmail: null,
		_inputPassword: null,
		_loginButton: null,
		_loader: null,
		_loginModal: null,

		// Login's Auth Observer
		_authObserver: null,

		/**
		 * Initializes the main functionality.
		 *
		 * @return void
		 */

		init(){

			const $self = this;

			if(!FirebaseAuthenticationManager){

				console.error('Login.init() FirebaseAuthenticationManager is not present!');
				return;
			}

			if(!CustomMessage){

				console.error('Login.init(): CustomMessage module is not present!');
				return;
			}

			// Get the Login form elements.
            if(!$self.getLoginFormElements()){

	            console.error('Login.init(): Login form elements are not present! Aborting.');
	            return;
            }

            $self.attachDomElementEvents();

			// Create a new Observer for the Auth state.
			$self._authObserver = new Observer();

			// Set-up my Auth update settings.
			$self._authObserver.getUpdate = function($update){

				if($update === 'USER 1'){

					console.log('Login: User is here, redirecting....');
					window.location.replace('./administration.html');
				}
				else if($update === 'USER 0'){

					if($self._loginModal.hasClass('Hidden')){

						$self._loginModal.removeClass('Hidden');
					}

					if(!$self._loader.hasClass('Hidden')){

						$self._loader.addClass('Hidden');
					}

					console.log('Login: user is not here.');
				}
				else if($update === 'ERROR 1'){

					if($self._loginModal.hasClass('Hidden')){

						$self._loginModal.removeClass('Hidden');
					}

					if(!$self._loader.hasClass('Hidden')){

						$self._loader.addClass('Hidden');
					}

					// Problem while logging in!
					console.error('Login: ' + FirebaseAuthenticationManager.getAuthError());
					CustomMessage.showMessage(FirebaseAuthenticationManager.getAuthError());
				}
			};

			// Add my Auth Observer as an observer to FirebaseAuthenticationManager's ObserverManager.
			FirebaseAuthenticationManager.getAuthObserverManager().addObserver($self._authObserver);
		},

		/**
         * Attaches the needed DOM events to the Login Form Elements.
         *
         * @return void
		 */

		attachDomElementEvents(){

		    const $self = this;

		    $self._loginButton.addEvent('click', function () {

		        $self.attemptLogin();
		    });
        },

		/**
		 * Fetches all the Login Form elements from the DOM.
		 * If something goes wrong, false is returned. Otherwise true.
		 *
		 * @return {boolean}
		 */

		getLoginFormElements(){

			const $self = this;

			$self._loginButton   = $('LoginButton');
			$self._inputEmail    = $('InputEmail');
			$self._inputPassword = $('InputPassword');
			$self._loader        = $('Loader');
			$self._loginModal    = $('LoginModal');

			return (
				$self._loginButton !== null
				&& $self._inputEmail !== null
				&& $self._inputPassword !== null
				&& $self._loader !== null
				&& $self._loginModal !== null
			);
		},

		/**
		 * Starts the login process.
		 *
		 * @return void
		 */

		attemptLogin(){

			const $self = this;

			// Validate.
			if(
				DevelopmentHelpers.validateCorrectness($self._inputEmail.value, 'email')
				&& DevelopmentHelpers.validateCorrectness($self._inputPassword.value, 'password')
			)
			{
				if($self._loader.hasClass('Hidden')){

					$self._loader.removeClass('Hidden');
				}

				if(!$self._loginModal.hasClass('Hidden')){

					$self._loginModal.addClass('Hidden');
				}

				FirebaseAuthenticationManager.login($self._inputEmail.value, $self._inputPassword.value);
			}
			else{

				console.error('Login.attemptLogin(): Problem with validation of the input fields.');
				CustomMessage.showMessage('Въвели сте некоректна информация или символи.');
			}
		}
	};

	return{

		init(){

			Logic.init();
		}
	}
})();

document.addEvent('domready', function () {

	Login.init();
});