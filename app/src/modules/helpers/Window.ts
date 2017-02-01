export class Window {
  private data: Object;
  private static instance = new Window().data;

  constructor () {
    this.data = window;
  }

  public static getInstance () {
    return this.instance;
  }
}
