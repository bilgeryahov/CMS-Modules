/**
 * @file contact_form.js
 *
 * ContactForm module controller.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 2.0.0
 * @copyright © 2017 Bilger Yahov, all rights reserved.
 */

const ContactForm = (function(){

    const Logic = {

        _cfNameElement        : {},
        _cfEmailElement       : {},
        _cfPhoneElement       : {},
        _cfSubjectElement     : {},
        _cfMessageElement     : {},

        _cfNameValue          : '',
        _cfEmailValue         : '',
        _cfPhoneValue         : '',
        _cfSubjectValue       : '',
        _cfMessageValue       : '',

        _cfSendButton         : {},

        /**
         * Initializes the main functionality.
         *
         * @return void
         */

        init(){

            const $self = this;
            if(!$self.getDomElements()){

                console.error('ContactForm.init(): DOM elements have not been fetched successfully!');
                return;
            }

            $self.attachDomElementEvents();
        },

        /**
         * Gets the elements from the page.
         *
         * @return {boolean}
         */

        getDomElements(){

            const $self = this;

            $self._cfNameElement = $('CFname');
            $self._cfEmailElement = $('CFemail');
            $self._cfPhoneElement = $('CFphone');
            $self._cfSubjectElement = $('CFsubject');
            $self._cfMessageElement = $('CFmessage');
            $self._cfSendButton = $('CFsendButton');

            return (
                $self._cfNameElement !== null
                && $self._cfEmailElement !== null
                && $self._cfPhoneElement !== null
                && $self._cfSubjectElement !== null
                && $self._cfMessageElement !== null
                && $self._cfSendButton !== null
            );
        },

        /**
         * Attaches the DOM element events.
         *
         * @return void
         */

        attachDomElementEvents(){

            const $self = this;

            $self._cfSendButton.addEvent('click', function () {

                $self.sendMailToCloudService();
            });
        },

        /**
         * Validates the input field values for correctness.
         *
         * @return {boolean}
         */

        validateInputCorrectness(){

            const $self = this;

            return (
                DevelopmentHelpers.validateCorrectness($self._cfNameValue, 'name')
                && DevelopmentHelpers.validateCorrectness($self._cfEmailValue, 'email')
                && DevelopmentHelpers.validateCorrectness($self._cfPhoneValue, 'phone')
                && DevelopmentHelpers.validateCorrectness($self._cfSubjectValue, 'subject')
                && DevelopmentHelpers.validateCorrectness($self._cfMessageValue, 'text')
            );
        },

        /**
         * Attempts to send the message to the
         * cloud service sendMail.
         *
         * @return void
         */

        sendMailToCloudService(){

            const $self = this;

            // Indicate that the send button has been triggered.
            DevelopmentHelpers.setButtonTriggeredState('CFsendButton', true);

            // Try to get reCAPTCHA user's response.
            let $reCAPTCHAresponse = grecaptcha.getResponse();
            if(!$reCAPTCHAresponse || $reCAPTCHAresponse === 'undefined' || $reCAPTCHAresponse === ''){

                // Indicate that the sending process has finished.
                DevelopmentHelpers.setButtonTriggeredState('CFsendButton', false);
                console.error('ContactForm.sendMailToCloudService(): reCAPTCHA skipped!');
                CustomMessage.showMessage('Отбележете, че не сте робот.');
                return;
            }

            $self._cfNameValue = $self._cfNameElement.value;
            $self._cfEmailValue = $self._cfEmailElement.value;
            $self._cfPhoneValue = $self._cfPhoneElement.value;
            $self._cfSubjectValue = $self._cfSubjectElement.value;
            $self._cfMessageValue = $self._cfMessageElement.value;

            if(!$self.validateInputCorrectness()){

                // Reset reCAPTCHA
                grecaptcha.reset();

                // Indicate that the sending process has finished.
                DevelopmentHelpers.setButtonTriggeredState('CFsendButton', false);
                console.error('ContactForm.sendMailToCloudService(): One of the input fields contains ' +
                    ' semantically not correct information');
                CustomMessage.showMessage('Въвели сте некоректна информация или символи.');
                return;
            }

            let $postData = {
                recaptcha_response: $reCAPTCHAresponse,
                name   : $self._cfNameValue,
                email  : $self._cfEmailValue,
                phone  : $self._cfPhoneValue,
                subject     : $self._cfSubjectValue,
                text        : $self._cfMessageValue
            };

            new Request({
                url: 'https://us-central1-' +
                     EnvironmentHelper.getFirebaseSettings().projectId +
                     '.cloudfunctions.net/sendMail',
                method: 'POST',
                data: $postData,
                onSuccess($data){

                    // Reset reCAPTCHA
                    grecaptcha.reset();
                    CustomMessage.showMessage('Съобщението е изпратено успешно.');
                    // Indicate that the sending process has finished.
                    DevelopmentHelpers.setButtonTriggeredState('CFsendButton', false);

                    // Data is usually a string. It should not contain sensitive info. Print it.
                    console.log('ContactForm.sendMailToCloudService(): ' + $data);
                },
                onFailure($xhr){

                    // Reset reCAPTCHA
                    grecaptcha.reset();
                    CustomMessage.showMessage('Проблем с изпращането на съобщението.');
                    // Indicate that the sending process has finished.
                    DevelopmentHelpers.setButtonTriggeredState('CFsendButton', false);

                    if($xhr){
                        console.error('ContactForm.sendMailToCloudService(): ');
                        console.error($xhr);
                    }
                }
            }).send();
        }
    };

    return{

        init(){

            Logic.init();
        }
    }
})();

document.addEvent('domready', function () {

    ContactForm.init();
});