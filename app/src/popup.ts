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

getDefaults();

function initPopup(res){
  if(res.data){
    initDefaults(res.data);
    addActionListeners();
    document.body.classList.add('loaded');
  }else{
    getDefaults();
  }
}

function initDefaults(data){
  const repeatTimeElement = document.getElementById('time');
  const startImmediately = document.getElementById('immediately');
  const pronounceWord = document.getElementById('pronounce');

  repeatTimeElement.value = data.defaultRepeatTime;
  startImmediately.checked = data.startImmediately;
  pronounceWord.checked = data.pronounceWord;

  [repeatTimeElement, startImmediately, pronounceWord].forEach((element) => {
    element.addEventListener('change', () => {
      utils.dispatch(Actions['REMINDER_CHANGE_' + element.id.toUpperCase()], {value: element.type == 'checkbox' ? element.checked : parseInt(element.value)});
    });
  });
}

function addActionListeners() {
  [].slice.call(document.getElementsByClassName('popup-btn')).forEach((element) => {
    element.addEventListener('click', () => {
      utils.dispatch(Actions['REMINDER_' + element.id.toUpperCase()]);
    });
  });

}

function getDefaults(){
  utils.dispatch(Actions.GET_DEFAULTS);
}
