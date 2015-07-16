# slack-webhook-cli

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> A command line interface to send messages to Slack by using their lightweight incoming webhooks API. You never need to authenticate as an actual Slack user to use this interface.

## Configuration
Configuration can be handled using environment variables or command line options.

From least to most heavy for overruling eachother:
- Internal defaults
- Environment variables
  - `SLACK_WEBHOOK_CLI_URL`
  - `SLACK_WEBHOOK_CLI_CHANNEL`
  - `SLACK_WEBHOOK_CLI_EMOJI`
  - `SLACK_WEBHOOK_CLI_USERNAME`
- Command line options
  - `-m`: message __required__
  - `-w`: webhook url
  - `-c`: channel
  - `-e`: emoji
  - `-u`: username

#### Setting environment variables

## Commands

### setup
Verifies your setup and shows your active options given your input.

```bash
$ slack-hook setup

# actual example
$ slack-hook setup -c "#foobar" -e ":panda_face:"

# With the current input your resulting options are:
# url: 'https://hooks.slack.com/services/sdfq51dsf1s251/561sdfq/sdf51q51sdf20sdf1ds1f5'
# channel: '#foobar'
# icon_emoji: ':panda_face:'
# username: 'slack-webhook-bot'
```

### send

```bash
$ slack-hook send -m "Something happened" -c "#beep"
# Sending: "Something happened" to #beep
```
