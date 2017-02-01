export class Chrome {
  private data: Object;
  private static instance = new Chrome().data;

  constructor () {
    this.data = chrome;
  }

  public static getInstance () {
    return this.instance;
  }
}
