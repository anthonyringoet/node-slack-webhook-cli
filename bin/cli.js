#!/usr/bin/env node

'use strict'

var yargs = require('yargs')
var assign = require('lodash.assign')
var pick = require('lodash.pick')
var slack = require('slack-notify')
var defaults = require('./defaults')
yargs
  .usage('Usage: $0 <command> [options]')
  .command('', null, function () {
    yargs.showHelp()
  })
  .command('setup', 'Verify your default settings', setup)
  .example('$0 setup')
  .command('send', 'Send a message to Slack', send)
  .example('$0 send -m "Hello slack"')
  .describe('m', 'Message')
  .alias('m', 'message')
  .describe('c', 'Channel')
  .alias('c', 'channel')
  .describe('u', 'Username to use')
  .alias('u', 'username')
  .describe('w', 'Webhook URL')
  .alias('w', 'webhook')
  .describe('e', 'Emoji icon')
  .alias('e', 'emoji')
  .help('h')
  .alias('h', 'help')
  .version(function () {
    return require('../package').version
  })
  .alias('v', 'version')
  .showHelpOnFail(false, 'Use --help for available options')
  .argv

function send (yargs) {
  var options = getDefaults(yargs.argv)
  var send = slack(options.url).extend(options)
  var message = yargs.argv.m

  console.log(yargs.argv)

  if (!message) {
    return console.log('Message is required')
  }

  console.log('Sending: "%s" to %s', message, options.channel)
  return send(message)
}

function setup (yargs) {
  var options = getDefaults(yargs.argv)
  console.log('\nWith the current input your resulting options are:')
  console.log(options)
}

function getDefaults (options) {
  var env = {
    url: process.env.SLACK_WEBHOOK_CLI_URL,
    channel: process.env.SLACK_WEBHOOK_CLI_CHANNEL,
    icon_emoji: process.env.SLACK_WEBHOOK_CLI_EMOJI,
    username: process.env.SLACK_WEBHOOK_CLI_USERNAME
  }
  var cliOptions = {
    url: options.url,
    channel: options.channel,
    icon_emoji: options.emoji,
    username: options.username
  }
  env = pick(env, function (n) {
    if (n) return true
  })
  cliOptions = pick(cliOptions, function (n) {
    if (n) return true
  })

  return assign(defaults, env, cliOptions)
}

yargs.showHelp()
