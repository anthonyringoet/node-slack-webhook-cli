# slack-webhook-cli

> A command line interface to send messages to Slack by using their lightweight incoming webhooks API. You never need to authenticate as an actual Slack user to use this interface.

## Configuration
Configuration can be handled using environment variables or command line options.

From least to most heavy for overruling eachother:
- Internal defaults
- Environment variables
- Command line options

## Commands

### setup
Verifies your setup and shows your current options.

```bash
$ slack-hook setup
```

### send

```bash
$ slack-hook send -m "Something happened."
```
