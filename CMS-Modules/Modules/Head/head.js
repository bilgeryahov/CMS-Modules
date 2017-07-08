/**
 * @file head.js
 *
 * Head module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const Head = (function(){

    const Logic = {

        /**
         * Initializes the main functionality.
         *
         * @return void
         */

        init(){


        }
    };

    return{

        init(){

            Logic.init();
        }
    }
})();

document.addEvent('domready', function () {

    Head.init();
});