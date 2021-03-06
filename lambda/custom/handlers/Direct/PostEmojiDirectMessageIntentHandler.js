const { ri } = require('@jargon/alexa-skill-sdk');
const { replaceWhitespacesDots, emojiTranslateFunc, login, createDMSession, postDirectMessage } = require('../../helperFunctions');

const PostEmojiDirectMessageIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'PostEmojiDirectMessageIntent';
	},
	async handle(handlerInput) {
		try {
			const {
				accessToken,
			} = handlerInput.requestEnvelope.context.System.user;

			const messageData = handlerInput.requestEnvelope.request.intent.slots.directmessage.value;
			const userNameData = handlerInput.requestEnvelope.request.intent.slots.directmessageusername.value;
			const userName = replaceWhitespacesDots(userNameData);
			const emojiData = handlerInput.requestEnvelope.request.intent.slots.directmessageemojiname.value;
			const emoji = emojiTranslateFunc(emojiData);
			const message = messageData + emoji;

			const headers = await login(accessToken);
			const roomid = await createDMSession(userName, headers);
			const speechText = await postDirectMessage(message, roomid, headers);
			const repromptText = ri('GENERIC_REPROMPT');


			return handlerInput.jrb
				.speak(speechText)
				.speak(repromptText)
				.reprompt(repromptText)
				.withSimpleCard(ri('POST_MESSAGE.CARD_TITLE'), speechText)
				.getResponse();
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = {
	PostEmojiDirectMessageIntentHandler,
};
