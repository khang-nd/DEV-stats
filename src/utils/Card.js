const Chart = require("quickchart-js");

class Card {
  constructor(username, options) {
    this.options = {
      font: "'Segoe UI', sans-serif",
      background: "fff",
      primary: "000",
      secondary: "333",
      showBorder: "true",
      ...options,
    };
    this.offset = 40;
    this.x = 20;
    this.y = 40;
    this.width = 480;
    this.height = this.offset * 2;
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
    this.height += this.offset;
    return this;
  }

  async createChart(data) {
    const size = this.height - this.offset / 2;
    const chart = new Chart()
      .setWidth(300)
      .setBackgroundColor("transparent")
      .setConfig({
        type: "pie",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                "#c52259",
                "#ff7f00",
                "#ffb808",
                "#0ea6ab",
                "#bbbbbb",
              ],
            },
          ],
        },
        options: {
          legend: { labels: { fontSize: 14 } },
          plugins: {
            datalabels: {
              color: "#fff",
              font: { size: 20 },
            },
          },
        },
      });
    const chartData = await chart.toDataUrl();
    this.body += `<image
      href="${chartData}"
      width="${size}"
      height="${size}"
      transform="translate(${this.width / 2}, 8)" />`;
    return this;
  }

  render() {
    const { width, height } = this;
    const { font, background, primary, secondary, showBorder } = this.options;

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
      </style>
      <rect width="100%" height="100%"></rect>
      ${this.body}
    </svg>`;
  }
}

module.exports = Card;
