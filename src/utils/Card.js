const Chart = require("quickchart-js");

class Card {
  constructor(username, options) {
    this.options = {
      font: "'Segoe UI', sans-serif",
      background: "fff",
      text: "000",
      chartColors: "dc67ab,dc67ce,a367dc,6771dc,67b7dc,fff",
      ...options,
    };
    this.offset = 40;
    this.x = 20;
    this.y = 40;
    this.width = 470;
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
    const { chartColors, text } = this.options;
    const colors = chartColors.split(",").map((c) => "#" + c);
    const chart = new Chart()
      .setFormat("svg")
      .setWidth(300)
      .setBackgroundColor("transparent")
      .setConfig({
        type: "pie",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: colors.slice(0, 5),
            },
          ],
        },
        options: {
          legend: {
            labels: { fontSize: 14, fontColor: "#" + text },
          },
          plugins: {
            datalabels: { color: colors.pop(), font: { size: 20 } },
          },
        },
      });
    const chartData = await chart.toDataUrl();
    this.body += `<image
      href="${chartData}"
      width="${size}"
      height="${size}"
      transform="translate(${this.width / 2}, 5)" />`;
    return this;
  }

  render() {
    const { width, height } = this;
    const { font, background, text } = this.options;

    return `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      <style>
        rect {
          fill: #${background};
        }
        text {
          font-family: ${font};
          font-size: 15px;
          fill: #${text};
        }
        .title {
          font-size: 22px;
          font-weight: bold;
        }
      </style>
      <rect width="100%" height="100%"></rect>
      ${this.body}
    </svg>`;
  }
}

module.exports = Card;
