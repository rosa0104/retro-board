export class RetroItem {
  id: string;
  title: string;
  type: string;
  done: boolean;

  constructor(title: string, type: string) {
    this.title = title;
    this.type = type;
    this.done = false;
  }
}
