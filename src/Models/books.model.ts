export class Book {
  id: number;
  constructor(
    public url: string,
    public name: string,
    public authors: string[],
    public commentCount: number,
    public released: string
  ) {
    let urlSplit: string[] = this.url.split("/");
    this.id = parseInt(urlSplit[urlSplit.length - 1]);
  }
}
