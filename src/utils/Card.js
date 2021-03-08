class Card {
  constructor(username, options) {
    this.options = {
      font: "Segoe UI",
      background: "fff",
      primary: "000",
      secondary: "333",
      showIcons: "false",
      showBorder: "true",
      ...options,
    };
    this.rowCount = 1;
    this.offset = 30;
    this.x = 20;
    this.y = 35;
    this.body = `<text
      x="${this.x}"
      y="${this.y}"
      class="title"
    >
      ${username}'s DEV stats
    </text>`;
  }

  createRow(label, number) {
    this.body += `
    <g transform="translate(${this.x}, ${(this.y += this.offset)})">
      <text>${label}</text>
      <text transform="translate(160, 0)">${number}</text>
    </g>`;
    this.rowCount++;
    return this;
  }

  render() {
    const { rowCount, offset } = this;
    const {
      font,
      background,
      primary,
      secondary,
      image,
      showIcons,
      showBorder,
    } = this.options;
    const width = 380;
    const height = rowCount * offset + offset;

    return `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      <style>
        rect {
          ${showBorder === "true" && "stroke: #ccc;"}
          fill: #${background};
        }
        text {
          font-family: ${font};
          font-size: 15px;
          color: #${secondary};
        }
        .title {
          font-size: 22px;
          font-weight: bold;
          fill: #${primary};
        }
        image {
          transform: translate(70%, calc(50% - 50px));
        }
      </style>
      <rect width="100%" height="100%"></rect>
      ${this.body}
      <image href="${image}" width="100" height="100" />
    </svg>`;
  }
}

module.exports = Card;
