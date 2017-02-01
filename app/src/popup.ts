import {Utils} from './modules/main/Utils';
import {Chrome} from './modules/helpers/Chrome';
import {Actions, Events} from './modules/helpers/Const';

const chrome = Chrome.getInstance();

const utils = new Utils();

chrome.runtime.onMessage.addListener((msg) => {
  switch (msg.action) {
    case Events.GOT_DEFAULTS:
      initPopup(msg.data);
      break;
  }
});

utils.dispatch(Actions.GET_DEFAULTS);

function initPopup(res){
  initDefaults(res.data);
  addActionListeners()
}

function initDefaults(data){
  const repeatTimeElement = document.getElementById('time');
  const startImmediately = document.getElementById('immediately');
  const pronounceWord = document.getElementById('pronounce');

  repeatTimeElement.value = data.defaultRepeatTime;
  startImmediately.checked = data.startImmediately;
  pronounceWord.checked = data.pronounceWord;
}

function addActionListeners() {
  [].slice.call(document.getElementsByClassName('popup-btn')).forEach((element) => {
    element.addEventListener('click', () => {
      utils.dispatch(Actions['REMINDER_' + element.id.toUpperCase()]);
    });
  });
}
