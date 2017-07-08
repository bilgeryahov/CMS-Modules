/**
 * @file quote_of_the_day.js
 *
 * QuoteOfTheDay module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const QuoteOfTheDay = (function(){

    const Logic = {

        _listOfQuotes: [],

        /**
         * Initializes the module.
         *
         * @return void
         */

        init(){

            const $self = this;

            $self._listOfQuotes = [
                'Опит е името, което даваме на грешките си.',
                'В днешно време хората знаят цената на всичко, но не знаят стойността на нищо.',
                'Модно е това, което носим самите ние. Не е модно онова, което носят другите хора.',
                'Винаги прощавайте на враговете си - за тях няма нищо по-дразнещо от това.',
                'Не е страшно, че грешим. Страшното е, че повтаряме грешките си.',
                'Нищо, което си струва да бъде научено, не може да бъде преподадено',
                'Истината рядко е чиста и никога проста.'
            ];
            const $quote = $self.getRandomQuote();

            if(!$self.renderTemplate($quote)){

                return;
            }
        },

        /**
         * Gets a random quote.
         *
         * @return string
         */

        getRandomQuote(){

            const $self = this;
            let $number = Math.floor((Math.random() * 7));
            return $self._listOfQuotes[$number];
        },

        /**
         * Renders the template.
         *
         * @param $data
         *
         * @return {boolean}
         */

        renderTemplate($data){

            const $module = $('QuoteOfTheDayModule');
            const $template = $('QuoteOfTheDayTemplate');

            if(!$module || !$template){

                console.error('QuoteOfTheDay.renderTemplate(): QuoteOfTheDayModule or ' +
                    'QuoteOfTheDayTemplate is not found!');
                return false;
            }

            const $source = $template.get('html');
            const $compiled = Handlebars.compile($source);
            $module.set('html', $compiled( { quote : $data } ));

            return true;
        }
    };

    return{

        init(){

            Logic.init();
        }
    }
})();

document.addEvent('domready', function () {

    QuoteOfTheDay.init();
});