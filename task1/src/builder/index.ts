class StyledBuilder {
  private fontSize: string = "16px";
  private padding: string = "10px";
  private margin: string = "10px";
  private border: string = "1px solid black";
  private borderRadius: string = "5px";
  private backgroundColor: string = "white";
  private color: string = "black";

  font(size: string): this {
    this.fontSize = size;
    return this;
  }

  Padding(value: string): this {
    this.padding = value;
    return this;
  }

  Margin(value: string): this {
    this.margin = value;
    return this;
  }

  Border(value: string): this {
    this.border = value;
    return this;
  }

  BorderRadius(value: string): this {
    this.borderRadius = value;
    return this;
  }

  BackgroundColor(value: string): this {
    this.backgroundColor = value;
    return this;
  }

  Color(value: string): this {
    this.color = value;
    return this;
  }

  build(message: string): void {
    const style = `
      font-size: ${this.fontSize};
      padding: ${this.padding};
      margin: ${this.margin};
      border: ${this.border};
      border-radius: ${this.borderRadius};
      background-color: ${this.backgroundColor};
      color: ${this.color};
    `;
    console.log(`%c${message}`, style);
  }
}
const builder = new StyledBuilder();
builder
  .font("20px")
  .Padding("15px")
  .Margin("20px")
  .Border("2px solid blue")
  .BorderRadius("10px")
  .BackgroundColor("lightgray")
  .Color("darkblue")
  .build("Hello, this is a styled message!");
