import {Config} from './modules/main/Config';
import {LingualeoAPI} from './modules/main/LingualeoAPI';
import {Reminder} from './modules/main/Reminder';
import {Chrome} from './modules/helpers/Chrome';
import {Actions, Events} from './modules/helpers/Const';
import {Utils} from './modules/main/Utils';

const config = Config.getInstance();
const chrome = Chrome.getInstance();

const utils = new Utils();

let lingualeoAPI, reminder;

config
  .init()
  .then(() => {
    lingualeoAPI = new LingualeoAPI();
    return lingualeoAPI.login({})
  })
  .then(user => {
    const requestsCount = Math.ceil(user['words_cnt'] / 100);
    const promises = [];

    for (let i = 1; i <= requestsCount; i++) {
      promises.push(getWords(i))
    }
    return Promise.all(promises);
  })
  .then(data => {
    return data.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue.userdict3[0].words)
    }, []);
  })
  .then(words => {
    reminder = new Reminder(words)
  })
  .catch(console.warn);

chrome.runtime.onMessage.addListener((msg) => {
  switch (msg.action) {
    case Actions.GET_DEFAULTS:
      utils.dispatch(Events.GOT_DEFAULTS, {data: reminder});
      break;
    case Actions.REMINDER_START:
      reminder.start();
      break;
    case Actions.REMINDER_STOP:
      reminder.stop();
      break;
    case Actions.REMINDER_RESTART:
      reminder.restart();
      break;

  }
});

function getWords (group) {
  return lingualeoAPI.getWords(group)
}

