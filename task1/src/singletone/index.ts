export class Singleton {
  private static instance: Singleton;

  private constructor() {
    if (Singleton.instance) {
      throw new Error(
        "Singleton instance already exists. Use getInstance() instead."
      );
    }
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
const obj1 = Singleton.getInstance();
console.log("obj1:", obj1);
// const obj2 = new Singleton();
// this line will cause an error because the constructor is private
