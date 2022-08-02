export class Character {
  id: number;
  constructor(
    public url: string,
    public name: string,
    public gender: string,
    public culture: string,
    public playedBy: string
  ) {
    let urlSplit: string[] = this.url.split("/");
    this.id = parseInt(urlSplit[urlSplit.length - 1]);
  }
}
