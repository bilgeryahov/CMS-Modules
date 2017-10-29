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

		_lastCreated: null,

		/**
		 * Initializes the main functionality.
		 */

		init(){

			const $self = this;

			if(!$self.getDomElements()){

				console.error('DatabaseActionPerformer.init(): Missing DOM element');
				return;
			}

			if(!FirebaseDatabaseClient){

				console.error('DatabaseActionPerformer.init(): Missing FirebaseDatabaseClient');
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

			let $pathNodes = ['products', 'categories_details'];
			let $path = DevelopmentHelpers.constructPath($pathNodes);
			let $extra = {};

			FirebaseDatabaseClient.firebaseGET($path, $extra, function ($error, $data) {

				if($error){

					console.error($error);
					return;
				}

				if($data){

					console.log($data);
					return;
				}
			});
		},

		/**
		 * Perform PUT request.
		 *
		 * @return void
		 */

		doPut(){

			const $self = this;

			let $pathNodes = ['products', 'categories_details', $self._lastCreated.name];
			let $path = DevelopmentHelpers.constructPath($pathNodes);
			let $putData = {
				display_name: 'DatabaseActionPerformer' + Math.random() + 'Changed'
			};

			FirebaseDatabaseClient.firebasePUT($path, $putData, function ($error, $data) {

				if($error){

					console.error($error);
					return;
				}

				if($data){

					console.log($data);
					return;
				}
			});
		},

		/**
		 * Perform POST request.
		 *
		 * @return void
		 */

		doPost(){

			const $self = this;

			let $pathNodes = ['products', 'categories_details'];
			let $path = DevelopmentHelpers.constructPath($pathNodes);
			let $postData = {
				display_name: 'DatabaseActionPerformer' + Math.random()
			};

			FirebaseDatabaseClient.firebasePOST($path, $postData, function ($error, $data) {

				if($error){

					console.error($error);
					return;
				}

				if($data){

					console.log($data);
					$self._lastCreated = JSON.decode($data);
					return;
				}
			});
		},

		/**
		 * Perform DELETE request.
		 *
		 * @return void
		 */

		doDelete(){

			const $self = this;

			let $pathNodes = ['products', 'categories_details', $self._lastCreated.name];
			let $path = DevelopmentHelpers.constructPath($pathNodes);

			FirebaseDatabaseClient.firebaseDELETE($path, function ($error, $data) {

				if($error){

					console.error($error);
					return;
				}

				if($data){

					console.log($data);
					return;
				}
			});
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