# DEV Stats

[![DEV-stats](https://dev-stats-khangnd.herokuapp.com?background=f9f9f9)](https://dev.to/khangnd)

👆 That's mine, want yours? It's easy! Follow these steps:

* Star this repo (optional, but it makes me 🙂)
* Select one below to deploy this repo to your platform of choice

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/third-party?s=https://github.com/khang-nd/DEV-stats)
  [![Deploy with Heroku](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy)
* Generate your [DEV API key](https://docs.forem.com/api/#section/Authentication/api_key)
* Add it as an environment variable named `API_KEY` (for Heroku you need to configure this variable in the settings after deployed)
* Deploy and enjoy the result!

## Options

The service accepts these query parameters as inputs to customize the stat card:

* `lang=en` - localize the card. Add your language in [i18n.json](./src/i18n.json)
* `background=fff` - set the card's background color
* `text=000` - set the card's text color
* `chartColors=dc67ab,dc67ce,a367dc,6771dc,67b7dc,fff` - set the chart colors, the last one is the labels' color

**Examples**:

Dark theme:

```markdown
![](https://dev-stats-khangnd.herokuapp.com?background=19252f&text=fff)
```

![DEV stats dark theme](https://dev-stats-khangnd.herokuapp.com?background=19252f&text=fff)

Customized chart colors:

```markdown
![](https://dev-stats-khangnd.herokuapp.com?chartColors=3bf5c6,28d8ab,23bf97,1ca280,23886e,333)
```

![DEV stats customized chart](https://dev-stats-khangnd.herokuapp.com?chartColors=3bf5c6,28d8ab,23bf97,1ca280,23886e,333)

## Contributing

I would appreciate it, feel free to open pull requests to contribute if you like it and have more amazing ideas for further features.
