# QA Toolkit

This QA toolkit port is a Firefox add-on that is designed to help facilitate QA testing of Wren applications. 

## Installation
### Preliminary Setup

To install the application, firstly you will need a local copy. To do this, you will need to set up git and bitbucket.
See:
https://wrenkitchens.atlassian.net/wiki/spaces/DEV/pages/9226271/Set+Up+Git+Bitbucket
And
https://wrenkitchens.atlassian.net/wiki/spaces/DEV/pages/9233369/Setting+Up+Your+Dev+Environment

Further, you will need to install `pnpm`: https://pnpm.io/installation

### Getting the application running

Clone the repo from bitbucket.

Once it has successfully been cloned, open a terminal window and navigate into the qa-toolkit-firefox folder.
This is done via `cd ~/git/qa-toolkit-firefox` on Mac.

Once in the directory, run `pnpm i` then run `pnpm build`.

Once this has been done successfully, open Firefox, then about:addons
// Need to add extra steps once done

## Using the application

Once the application is built and loaded as an active addon, open a Wren application.
You should see a symbol on the right hand side of your browser displaying a spanner and a screwdriver.

Click this to open the overlay and menu for the application.
