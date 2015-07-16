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
  .command('setup', 'Verify your active settings', setup)
  .example('$0 setup')
  .command('send', 'Send a message to Slack', send)
  .example('$0 send -m "Hello Slack"')
  .describe('m', 'Message')
  .describe('c', 'Channel')
  .describe('u', 'Username to use')
  .describe('w', 'Webhook URL')
  .describe('e', 'Emoji icon')
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

  if (!message) {
    return console.log('Message is required')
  }

  return send(message, function (err) {
    if (err) return console.log('Slack API refused to place message or no internet connection.')

    return console.log('Sent: "%s" to %s', message, options.channel)
  })
}

function setup (yargs) {
  var options = getDefaults(yargs.argv)
  var output = '\n'

  for (var item in options) {

    if (options.hasOwnProperty(item)) {
      var line = item + ': ' + options[item] + '\n'
      output += line
    }
  }

  return console.log(output)
}

function getDefaults (options) {
  var env = {
    url: process.env.SLACK_WEBHOOK_CLI_URL,
    channel: process.env.SLACK_WEBHOOK_CLI_CHANNEL,
    icon_emoji: process.env.SLACK_WEBHOOK_CLI_EMOJI,
    username: process.env.SLACK_WEBHOOK_CLI_USERNAME
  }
  var cliOptions = {
    url: options.w,
    channel: options.c,
    icon_emoji: options.e,
    username: options.u
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
