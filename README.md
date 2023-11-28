# QA Toolkit

This QA Toolkit port is a Firefox add-on that is designed to help facilitate QA testing of Wren applications. 

## Installation
### Preliminary Setup

To install the application, firstly you will need a local copy. To do this, you will need to set up git and bitbucket.

See:
https://wrenkitchens.atlassian.net/wiki/spaces/DEV/pages/9226271/Set+Up+Git+Bitbucket

And:
https://wrenkitchens.atlassian.net/wiki/spaces/DEV/pages/9233369/Setting+Up+Your+Dev+Environment

Furthermore, you'll need to install `Homebrew`: https://brew.sh

Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

Then, you'll need to install `nvm`: `brew install nvm`

```
You should create NVM's working directory if it doesn't exist by running:
mkdir ~/.nvm

Add the following to your shell profile by running: nano ~/.zshrc:
    export NVM_DIR="$HOME/.nvm"
    [ -s "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" ] && \. "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" # This loads nvm
    [ -s "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
$HOMEBREW_CELLAR/nvm/0.39.5 will destroy any nvm-installed Node installations
upon upgrade/reinstall (recommended).
```

Lastly, you'll need to install Node.js. This is simple; just run `nvm install node`.


### Getting the application running

Clone the repo from bitbucket.

Once it has successfully been cloned, open a terminal window and navigate into the qa-toolkit-firefox folder.
This is done via `cd ~/git/qa-toolkit-firefox` on Mac.

Once in the directory, run `npm install` to install the necessary dependencies then run `plasmo build --target=firefox-mv2`.

Once this has been done successfully, open Firefox, then about:debugging. Click on 'This Firefox' and then 'Load Temporary Add-on...'
After that, in the file browser, load the `manifest.json` located at `/Users/your-name/git/qa-toolkit-firefox/build/firefox-mv2-prod`.


## Using the application

Once the application is built and loaded as a temporary add-on, open a Wren application.
You should see a symbol on the right hand side of your browser displaying a spanner and a screwdriver.
Click this to open the overlay and menu for the application.
