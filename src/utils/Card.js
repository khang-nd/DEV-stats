class Card {
  constructor(username, options) {
    this.options = {
      font: "Segoe UI",
      background: "fff",
      primary: "000",
      secondary: "333",
      showBorder: "true",
      ...options,
    };
    this.rowCount = 1;
    this.offset = 40;
    this.x = 20;
    this.y = 40;
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

  createChart(data) {
    const parsedData = encodeURIComponent(
      JSON.stringify({
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
      })
    );
    const chartUrl = `https://quickchart.io/chart?w=300&amp;h=300&amp;c=${parsedData}`;
    const size = 220;
    this.body += `<image href="${chartUrl}" width="${size}" height="${size}" />`;
    return this;
  }

  render() {
    const { rowCount, offset } = this;
    const { font, background, primary, secondary, showBorder } = this.options;
    const width = 480;
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
          transform: translate(50%, 8px);
        }
      </style>
      <rect width="100%" height="100%"></rect>
      ${this.body}
    </svg>`;
  }
}

module.exports = Card;
