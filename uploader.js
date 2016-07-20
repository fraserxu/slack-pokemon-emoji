const hyperquest = require('hyperquest')
const through = require('through2')
const cheerio = require('cheerio')
const FormData = require('form-data')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

const team = '' // get team name
const headers = {
  'Cookie': '' // get cookie name
}

glob('./images/*.png', function (err, files) {
  getCrumb(function (err, crumb) {
    if (!err) {
      files.forEach(function (file) {
        uploadFile(crumb, file)
      })
    }
  })
})

function getCrumb (cb) {
  const request = hyperquest(`https://${team}.slack.com/customize/emoji`, {
    headers: headers
  })
  request.pipe(through(write, end))

  var data = ''
  function write (buf, enc, cb) { data += buf; cb() }
  function end () {
    var $ = cheerio.load(data)
    var crumb = $('input[name="crumb"]')[0].attribs.value
    cb(null, crumb)
  }
}

function uploadFile (crumb, file) {
  var name = path.parse(file).name
  var filename = path.parse(file).base

  var form = new FormData()
  form.append('add', 1)
  form.append('crumb', crumb)
  form.append('name', name)
  form.append('mode', 'data')

  form.append('img', fs.createReadStream(file), {
    filename: filename,
    contentType: 'image/png'
  })

  form.submit({
    protocol: 'https:',
    host: `${team}.slack.com`,
    path: '/customize/emoji',
    headers: headers
  }, function (err, res) {
    if (err) {
      console.log(`Upload file ${file} error: ${err}`)
    } else {
      console.log('Done')
    }
  })
}
