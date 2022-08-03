export class Character {
  id: number;
  age: number;
  constructor(
    public url: string,
    public name: string,
    public gender: string,
    public born: string,
    public died: string,
    public culture: string,
    public playedBy: string
  ) {
    let urlSplit: string[] = this.url.split("/");
    this.id = parseInt(urlSplit[urlSplit.length - 1]);

    this.age = this.getAge(this.born, this.died);
  }

  private getAge(born: string, died: string): number {
    if (born == "") {
      return 0;
    }
    let dob: Date = new Date(0);

    born.split(" ").forEach((str) => {
      if (!isNaN(Number(str))) {
        dob = new Date(Number(str));
      }
    });

    let death: Date = new Date();

    if (died == "") {
      death = new Date(2022);
    } else {
      died.split(" ").forEach((str) => {
        if (!isNaN(Number(str))) death = new Date(Number(str));
      });
    }

    return death.valueOf() - dob.valueOf();
  }
}
