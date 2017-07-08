/**
 * @file navigation_bar.js
 *
 * NavigationBar module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const NavigationBar = (function(){

    const Logic = {

        _navDemo: null,
        _toggleNavigation: null,

        /**
         * Initialize the main functionality.
         *
         * @return void
         */

        init(){

            const $self = this;

            let $templateInfo = $self.determinePage();

            if(!$self.renderTemplate($templateInfo)){

                return;
            }

            if(!$self.getDomElements()){

                return;
            }

            $self.attachDomElementEvents();
        },

        /**
         * Gets the elements from the DOM.
         *
         * @return boolean
         */

        getDomElements(){

            const $self = this;

            $self._navDemo = $('NavDemo');
            if(!$self._navDemo){

                console.error('NavigationBar.getDomElements(): NavDemo is not found!');
                return false;
            }

            $self._toggleNavigation = $('ToggleNavigation');
            if(!$self._toggleNavigation){

                console.error('NavigationBar.getDomElements(): ToggleNavigation is not found!');
                return false;
            }
        },

        /**
         * Renders the template.
         *
         * @param $data
         *
         * @return {boolean}
         */

        renderTemplate($data){

            const $module = $('NavigationBarModule');
            const $template = $('NavigationBarTemplate');

            if(!$module || !$template){

                console.error('NavigationBar.renderTemplate(): NavigationBarModule or ' +
                    'NavigationBarTemplate is not found!');
                return false;
            }

            const $source = $template.get('html');
            const $compiled = Handlebars.compile($source);
            $module.set('html', $compiled( { pages : $data } ));

            return true;
        },

        /**
         * Attaches events to the DOM elements.
         *
         * @return void.
         */

        attachDomElementEvents(){

            const $self = this;

            $self._toggleNavigation.addEvent('click', function () {

               $self.toggleNavigationBar();
            });
        },

        /**
         * Determines which is the page the user is currently on.
         *
         * @return {Array}
         */

        determinePage(){

            const $path = window.location.pathname;

            let $templateInfo = [];

            switch ($path){

                case '/index.html':
                    $templateInfo = [
                        {name: 'Начало', path: 'index.html', current: true},
                        {name: 'Доставки', path: 'deliveries.html'},
                        {name: 'Контакти', path: 'contacts.html'},
                        {name: 'Продукти', path: 'products.html'}
                    ];
                    break;

                case '/deliveries.html':
                    $templateInfo = [
                        {name: 'Начало', path: 'index.html'},
                        {name: 'Доставки', path: 'deliveries.html', current: true},
                        {name: 'Контакти', path: 'contacts.html'},
                        {name: 'Продукти', path: 'products.html'}
                    ];
                    break;

                case '/contacts.html':
                    $templateInfo = [
                        {name: 'Начало', path: 'index.html'},
                        {name: 'Доставки', path: 'deliveries.html'},
                        {name: 'Контакти', path: 'contacts.html', current: true},
                        {name: 'Продукти', path: 'products.html'}
                    ];
                    break;

                case '/products.html':
                    $templateInfo = [
                        {name: 'Начало', path: 'index.html'},
                        {name: 'Доставки', path: 'deliveries.html'},
                        {name: 'Контакти', path: 'contacts.html'},
                        {name: 'Продукти', path: 'products.html', current: true}
                    ];
                    break;

                default:
                    $templateInfo = [
                        {name: 'Начало', path: 'index.html', current: true},
                        {name: 'Доставки', path: 'deliveries.html'},
                        {name: 'Контакти', path: 'contacts.html'},
                        {name: 'Продукти', path: 'products.html'}
                    ];
                    break;
            }

            return $templateInfo;
        },

        /**
         * Toggles the navigation bar.
         *
         * @return void
         */

        toggleNavigationBar(){

            const $self = this;

            if($self._navDemo.className.indexOf('w3-show') === -1){

                $self._navDemo.className += ' w3-show';
            }
            else{

                $self._navDemo.className = $self._navDemo.className.replace(' w3-show', '');
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

    NavigationBar.init();
});