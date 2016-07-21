#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const upload = require('./uploader')

const team = argv._[0] || argv.t || argv.team
const cookie = argv._[1] || argv.c || argv.cookie

if (!team) {
  return console.error('Team name is required.')
}

if (!cookie) {
  return console.error('Cookie is required.')
}

upload(team, cookie)
