import {Utils} from './Utils';
import {Window} from '../helpers/Window';


const utils = new Utils();
const window = Window.getInstance();

export class Reminder{

  private words = [];
  private interval = null;

  public defaultRepeatTime = 10;
  public startImmediately = true;
  public pronounceWord = true;

  constructor(words){
    this.words = words;
  }

  public start() {
    if (!this.interval) {
      if (this.startImmediately) {
        this.createNotification(this.words[utils.getRandomFromRange(this.words.length)], this.pronounceWord);
      }
      this.interval = setInterval(() => {
        const currentWord = this.words[utils.getRandomFromRange(this.words.length)];
        this.createNotification(currentWord, this.pronounceWord);
      }, 1000 * this.defaultRepeatTime);
    }
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  public restart() {
    this.stop();
    this.start();
  }

  private createNotification(options, playSound) {
  if (playSound) {
    if (options.sound_url) {
      let audio = new Audio();
      audio.src = options.sound_url;
      audio.play();

    } else {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(options.word_value));
    }
  }

  new Notification(options.word_value, {
    tag: options.word_value,
    body: options.user_translates[0].translate_value,
    icon: 'http:' + options.picture_url
  });
}


}
