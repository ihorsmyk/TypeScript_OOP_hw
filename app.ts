interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}
type Role = "Admin" | "Moderator" | "User";
type AccessLevel = 1 | 2 | 3;

abstract class User implements IUser {
  firstName: string;
  lastName: string;
  email: string;
  /**інкапсуляція реалізована в приховуванні поля password від зовнішнього коду, окрім похідних класів,
   * бо це поле не може бути прямо доступним на об'єкті класу без відповідних методів реалізованих розробником класу
   */
  protected password: string;
  role: Role;

  protected constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  abstract editProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role
  ): void;

  abstract viewInfo(): string;
}

/**в даному випадку є реалізація наслідування,
 * тут клас Admin наслідує методи і властивості класу User,
 * як і наступний клас Moderator також його наслідує.
 * це зручно для того, щоб не створювати класи з одинаковими полями і методами*/
class Admin extends User {
  accessLevel: AccessLevel;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accessLevel: AccessLevel
  ) {
    super(firstName, lastName, email, password, "Admin");
    this.accessLevel = accessLevel;
  }

  public editProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  public viewInfo(): string {
    return `${this.role}\nName: ${this.firstName}\nSurname: ${this.lastName}\nEmail: ${this.email}\nPassword: **********`;
  }

  public setAccessLevel(accessLevel: AccessLevel): void {
    this.accessLevel = accessLevel;
  }

  public getAccessLevel(): AccessLevel {
    return this.accessLevel;
  }
}

class Moderator extends User {
  numberOfReports: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    numberOfReports: number
  ) {
    super(firstName, lastName, email, password, "Moderator");
    this.numberOfReports = numberOfReports;
  }

  /**в даному випадку реалізований поліморфізм,
   * коли похідний клас перевизначає методи батьківського класу,
   * як і в класі Moderator також перевизначені методи editProfile і viewInfo.
   */
  public editProfile(firstName: string, lastName: string, email: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public viewInfo(): string {
    return `${this.role}\nName: ${this.firstName}\nSurname: ${this.lastName}\nEmail: ${this.email}\nPassword: **********`;
  }

  public setNumberOfReports(numberOfReports: number): void {
    this.numberOfReports = numberOfReports;
  }

  public getNumberOfReports(): number {
    return this.numberOfReports;
  }
}

const admin = new Admin(
  "Diogenes",
  "Sinope",
  "diogenes111@gmail.com",
  "rUsNyAMuStDie",
  3
);
console.log(admin.viewInfo());
admin.setAccessLevel(2);
admin.editProfile(
  "George",
  "Washington",
  "washington777@gmail.com",
  "pUtInMuStDiE"
);
console.log(admin.viewInfo());

const moderator = new Moderator(
  "Isaac",
  "Newton",
  "isaac.newton@gmail.com",
  "rUsNyAMuStDie",
  5
);
console.log(moderator.viewInfo());
moderator.setNumberOfReports(10);
moderator.editProfile("Igor", "Smyk", "ismyk256@gmail.com");
console.log(moderator.viewInfo());
