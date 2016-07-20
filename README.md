slack-pokemon-emoji
===================

A tool to upload all the pokemon to slack emoji.

![slack-pokemon-emoji](https://cloud.githubusercontent.com/assets/1183541/16988491/ea919e58-4ed3-11e6-95cd-312fd8f108a9.png)

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

Note that you will need to input slack **team name** and paste your **browser cookies** to the file.

A cli tool will coming soon.


### Tools

* `gm` A nodejs wrapper for imageMagick, used for resizing image
* `hyperquest` A nodejs stream based http request utils
* `cheerio` A nodejs module to parse html text on server side
* `form-data` A nodejs module to build form data and upload to slack

Slack does not provide a upload emoji api, and this tool is inspired by [slack-emojinator](https://github.com/smashwilson/slack-emojinator).

Some of the code here use ES6 syntax so you might need nodejs 4.*.* to run the code.

### License
MIT
