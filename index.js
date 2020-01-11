// (1)Alexa Skills Kit SDKを読み込み
const Alexa = require('ask-sdk-core');

// (2)リクエストハンドラーを定義する
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('挨拶スキルです。こんにちは、と言ってみてください。')
            .reprompt('挨拶スキルです。こんにちは、と言ってみてください。')
            .getResponse();
    },
};

const GreetingIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.requestEnvelope.intent.name === 'GreetingIntent';
    },
    handle(handlerInput) {
        const speechText = 'こんにちは';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('あいさつスキル', 'speechText')
            .getResponse;
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse;
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handle.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        const speechText = 'Goodbye';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse;
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
    },
    handle(handlerInput) {
        console.log('Session ended with reason: ${handlerInput.requestEnvelope.request.reason}');
        return handlerInput.responseBuilder.getResponse();
    },
};

// (3)エラーハンドラーを定義する
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput) {
        console.log('Error handled: ${error.message}');

        return handlerInput.responseBuilder
            .speak('うまく聞き取れませんでした')
            .reprompt('もう一度お願いします')
            .getResponse();
    },
};

// (4)Laqmbda関数ハンドラーを定義する
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandler(
        LaunchRequestHandler,
        GreetingIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandler(ErrorHandler)
    .lambda();