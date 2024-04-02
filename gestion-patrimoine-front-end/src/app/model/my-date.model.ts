
export class MyDate {

  // static fromString(dateString: string): MyDate {
  //   // Logique pour créer un objet MyDate à partir de la chaîne de caractères dateString
  //   // Par exemple :
  //   const [year, month, day] = dateString.split('-').map(Number);
  //   return new MyDate(year, month, day /* autres paramètres si nécessaire */);
  // }

    public year: number;
    public month: number;
    public day: number;
  
    constructor(
      year = 0,
      month = 0,
      day = 0
    ) {
      this.year = year;
      this.month = month;
      this.day = day;
    }
  
}