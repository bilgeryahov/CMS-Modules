/**
 * @file database_action_performer.js
 *
 * DatabaseActionPerformer module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const DatabaseActionPerformer = (function(){

	const Logic = {

		_getButton: null,
		_postButton: null,
		_putButton: null,
		_deleteButton: null,
		_multiLocationUpdateButton: null,

		/**
		 * Initializes the main functionality.
		 */

		init(){

			const $self = this;

			if(!$self.getDomElements()){

				console.error('DatabaseActionPerformer.init(): Missing DOM element');
				return;
			}

			$self.attachDomElementEvents();
		},

		/**
		 * Fetches the DOM elements.
		 *
		 * @return {boolean}
		 */

		getDomElements(){

			const $self = this;

			$self._getButton = $('GetButton');
			$self._putButton = $('PutButton');
			$self._postButton = $('PostButton');
			$self._deleteButton = $('DeleteButton');
			$self._multiLocationUpdateButton = $('MultiLocationUpdateButton');

			return (
				$self._getButton !== null &&
					$self._putButton !== null  &&
					$self._postButton !== null &&
					$self._deleteButton !== null &&
					$self._multiLocationUpdateButton !== null
			);
		},

		/**
		 * Attaches the corresponding click event to each button.
		 *
		 * @return void
		 */

		attachDomElementEvents(){

			const $self = this;

			$self._getButton.addEvent('click', function () {

				$self.doGet();
			});

			$self._putButton.addEvent('click', function () {

				$self.doPut();
			});

			$self._postButton.addEvent('click', function () {

				$self.doPost();
			});

			$self._deleteButton.addEvent('click', function () {

				$self.doDelete();
			});

			$self._multiLocationUpdateButton.addEvent('click', function () {

				$self.doMultiLocationUpdate();
			});
		},

		/**
		 * Perform GET request.
		 *
		 * @return void
		 */

		doGet(){

			alert('I do get');
		},

		/**
		 * Perform PUT request.
		 *
		 * @return void
		 */

		doPut(){

			alert('I do put');
		},

		/**
		 * Perform POST request.
		 *
		 * @return void
		 */

		doPost(){

			alert('I do post');
		},

		/**
		 * Perform DELETE request.
		 *
		 * @return void
		 */

		doDelete(){

			alert('I do delete');
		},

		/**
		 * Perform Multi Location Update request.
		 *
		 * @return void
		 */

		doMultiLocationUpdate(){

			alert('I do multi location update');
		}
	};

	return{

		init(){

			Logic.init();
		}
	}
})();

document.addEvent('domready', function () {

	DatabaseActionPerformer.init();
});