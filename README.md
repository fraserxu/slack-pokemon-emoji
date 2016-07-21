slack-pokemon-emoji
===================

A tool to upload all the pokemon to slack emoji.

![slack-pokemon-emoji](https://cloud.githubusercontent.com/assets/1183541/16988491/ea919e58-4ed3-11e6-95cd-312fd8f108a9.png)

### Installation

```sh
$ npm install slack-pokemon-emoji -g
```

### Requirement

* `team` Your team name.
* `cookie` Slack does not have an api to upload emoji, so we have to emulate a browser environment to pass the cookie to our request. You can find the cookie from the Chrome devtools **Networks** tab, and it's under **Header** tab of any request.

![cookie](https://cloud.githubusercontent.com/assets/1183541/17016371/3c1e1f46-4f72-11e6-8950-1a4750c0ce55.png)

### Usage

```sh
$ slack-pokemon-emoji TEAM "COOKIE"
# or
$ slack-pokemon-emoji -t TEAM -c "COOKIE"
# or
$ slack-pokemon-emoji team=TEAM cookie=COOKIE
```

### How it works?

#### Fetch pokemon images from http://www.pokemon.com/us/pokedex/

Do this in Chrome devtools and get all the pokemon indexs

```js
/**
 * Quick and dirty jQuery script to extract pokemon name and image url
 */
var pokemons = $($0).find('li').toArray().map(function(li) {
  return {
    imgSrc: $($(li).find('figure')[0]).find('img')[0].src,
    name: $($(li).find('.pokemon-info')[0]).find('h5')[0].innerHTML
  }
})
```

#### Download all the images to local and resize them to 128 * 128

```sh
$ node index.js
```

Resize all the images and rename it to pokemonname.png

```js
pokemons.forEach(function (pokemon) {
  var readStream = hyperquest.get(pokemon.imgSrc)
  gm(readStream)
    .resize('128', '128')
    .stream()
    .pipe(fs.createWriteStream(`./images/${pokemon.name.toLowerCase()}.png`))
})
```

#### Upload all images to slack

```sh
$ node uploader.js
```

### Tools

* `gm` A nodejs wrapper for imageMagick, used for resizing image
* `hyperquest` A nodejs stream based http request utils
* `cheerio` A nodejs module to parse html text on server side
* `form-data` A nodejs module to build form data and upload to slack

Slack does not provide a upload emoji api, and this tool is inspired by [slack-emojinator](https://github.com/smashwilson/slack-emojinator).

Some of the code here use ES6 syntax so you might need nodejs 4.*.* to run the code.

### License
MIT
