# QA Toolkit

The QA toolkit is a Chrome extension that are designed to help facilitate
QA testing of Wren applications. 

## Installation
### Preliminary Setup

To install the application, firstly you will need a local copy. To do this, you will need to set up git and bitbucket.
See:
https://wrenkitchens.atlassian.net/wiki/spaces/DEV/pages/9226271/Set+Up+Git+Bitbucket

Further, you will need to install `pnpm`: https://pnpm.io/installation

### Getting the application running

Clone the repo from bitbucket.

Once it has successfully been cloned, open a CLI window and navigate into the QA Toolkit folder.
This is done via the `cd` command on Mac/Linux; `dir` on Windows, followed by the folder path you're trying to follow on either system.

Once in the QA Toolkit directory, run `pnpm i` then run `pnpm build`.

Once this has been done successfully, open Chrome, then the manage plugins page.
Turn on developer mode and click `load unpacked`.
This will open your system's file explorer, select chrome-mv3-prod.

## Using the application

Once the application is built and loaded as an active plugin in Chrome, open a Wren application.
You should see a symbol on the right hand side of your browser displaying a spanner and a screwdriver.

Click this to open the overlay and menu for the application.
