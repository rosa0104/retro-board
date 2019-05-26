export class ActionItem {
  id: string;
  title: string;
  assignee: string;

  constructor(title: string, assignee: string) {
    this.title = title;
    this.assignee = assignee;
  }
}
