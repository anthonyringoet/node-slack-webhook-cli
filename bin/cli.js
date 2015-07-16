#!/usr/bin/env node

'use strict'

var yargs = require('yargs')
var assign = require('lodash.assign')
var pick = require('lodash.pick')
var slack = require('slack-notify')
var defaults = require('./defaults')
yargs
  .usage('Usage: $0 <command> [options]')
  .command('setup', 'Verify your default settings', setup)
  .example('$0 setup')
  .command('send', 'Send a message to Slack', send)
  .example('$0 send -m "Hello slack"')
  .demand('m')
  .alias('m', 'message')
  .describe('m', 'Message contents')
  .help('h')
  .alias('h', 'help')
  .version(function () {
    return require('../package').version
  })
  .alias('v', 'version')
  .argv

function send (yargs) {
  var options = getDefaults()
  var send = slack(options.url).extend(options)
  var message = yargs.argv.m

  if (!message) {
    return 'Message is required'
  }

  console.log('Sending: "%s" to %s', message, options.channel)
  return send(message)
}

function setup () {
  var def = getDefaults()
  console.log('With the current options your defaults are: \n')
  console.log(def)
}

function getDefaults () {
  var env = {
    url: process.env.SLACK_WEBHOOK_CLI_URL,
    channel: process.env.SLACK_WEBHOOK_CLI_CHANNEL,
    icon_emoji: process.env.SLACK_WEBHOOK_CLI_EMOJI,
    username: process.env.SLACK_WEBHOOK_CLI_USERNAME
  }
  env = pick(env, function (n) {
    if (n) return true
  })

  return assign(defaults, env)
}
