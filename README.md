# traxi-parent-app

## Table of Contents

- [Introduction](#introduction)
- [Developer Environment](#developer-environment)
- [Implementation Details](#implementation-details)

## Introduction

This is where our users first meet traxi. By following an ad, or being referred by a friend, they install `traxi-parent-app` on their device, hoping to start monitoring their children.

The parent app serves two primary purposes:

### 1. Setting up their child's device

![Setup1](https://github.com/traxicorp/traxi-parent-app/blob/master/Artwork/setup1.png?raw=true)
![Setup3](https://github.com/traxicorp/traxi-parent-app/blob/master/Artwork/setup3.png?raw=true)

The first thing a user (or *parent*, as we'll refer to them from now on) does after installing traxi is to set up their child's device. This is a bit of a complex process that involves a couple of different steps:

1. Entering in their child's name and picture
2. Getting their child's device, then navigating to www.mytraxi.com
3. Entering in a PIN that we specify in the app
4. Following instructions given to them in the app
5. Celebrating, now that their child's device is monitored

So how does the setup process actually work? We'll get in to that later.

### 2. Monitoring their child's device

![Monitoring 2](https://github.com/traxicorp/traxi-parent-app/blob/master/Artwork/monitoring2.png?raw=true)
![Monitoring 3](https://github.com/traxicorp/traxi-parent-app/blob/master/Artwork/monitoring3.png?raw=true)


Once a parent has succesfully set up their device, they can now begin monitoring their child's activity using `traxi-parent-app` (or just simply *the Parent App*).

By tapping on the picture of their child and then the day of the week they're interested, a parent can see what we refer to as the *DayView*. This page shows the parent:

- How much time their child has used their device late at night
- How much time their child has used their device that day
- How much time their child has spent on Social Media that day

And **most importantly**

- What apps their child used during the day

## Developer Environment

`traxi-parent-app` is a [React Native](https://facebook.github.io/react-native/) app. It is primarily written in JavaScript with some portions of Java and Objective-C for the Android and iOS versions of the app, respectively.

For an overview of React Native, here are some good "getting-started" resources:

- [Christopher Chedeau's Talk](https://www.youtube.com/watch?v=7rDsRXj9-cU)
- [React Native Fundamentals](https://egghead.io/courses/react-native-fundamentals)
 - A little outdated, but good nonetheless. Message @kanerogers for an Egghead login.
- [Build the Facebook F8 App Tutorial](http://makeitopen.com/tutorials/building-the-f8-app/planning/)

### Before You Begin

To build the app on iOS, you will need a Mac computer an a copy of XCode. If you don't have either of these, let @kanerogers know.

Before you begin, you'll need to install a couple of tools **TODO - write a script**

- **Homebrew**: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- **node**: `brew install node`
- **yarn**: `brew install yarn`
- **watchman**: `brew install watchman`
- **react-native-cli**: `yarn global add react-native-cli`

Then, clone the repo:

`git clone https://github.com/traxicorp/traxi-parent-app`

### Building the App on iOS

![ios](http://vignette2.wikia.nocookie.net/logopedia/images/6/63/IOS_logo_2012.png/revision/latest?cb=20160329193433)

1. Make sure you have [Cocoapods](https://cocoapods.org/) installed.
2. Open `ios/traxi.xcworkspace` in XCode
3. Follow steps 1 and 2 in [this guide](http://imgur.com/a/KUOQC), but only delete `$(SRCROOT)/../node_modules/react-native/React`
4. Run `cd ios/ && pod install` to update the Pods again
5. Completely close XCode
6. Open `ios/traxi.xcworkspace` in XCode
7. Hit the "Play" button in the top left hand corner

And the app should start. If you run into issues, try:

- Cleaning the project (Command-Shift-K)
- Closing XCode, re-opening again (trust me :smirk:)
- Building just the React target
 - Click the "traxi" logo in the top left
 - Select "React", then a device (eg. iPhone 7)
 - Press the "Play" button again

### Building the App on Android

![android](http://files.softicons.com/download/computer-icons/android-smartphones-icons-by-abhi-aravind/png/256x256/Android%20Logo.png)

1. Install the Android SDK with `brew install android-sdk`
2. Run the **Android SDK Manager** by running `android` in a terminal.
3. Under Android 6.0 (Marshmellow), make sure "Google APIs" is checked, along with the SDK.
4. Select "SDK Tools" and check the box next to "Show Package Details". Look for and expand the "Android SDK Build Tools" entry, then make sure that Android SDK Build-Tools 23.0.1.
5. Set some environment variables (add this to your ~/.zshrc or whatever):
```bash
export ANDROID_HOME=/usr/local/opt/android-sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
```
6. Install [Genymotion](https://www.genymotion.com/). You don't need a license.
7. Start an emulator in Genymotion
8. Run the app with `react-native run-android`


### Tests

`traxi-parent-app` has a reasonably extensive suite of tests using [Jest](http://facebook.github.io/jest/). Running them is as easy as:

```bash
yarn test
```

Tests can be found in `Test/*/*.test.js`. Tests that do not end in ".test.js" are legacy and need to be either ported to Jest, or removed altogether.

### Notes

- Once upon a time, `traxi-parent-app` also contained `traxi-child-app`. This is why you may see references to things like "ParentApp" or "ChildApp". This will be fixed some day :laughing:
- The directory structure is a little odd and could use some fixing. This isn't a high priority yet, and can be left alone for now.
- There are a number of dependencies that have been forked due to compatibility or functionality issues. At some point, these changes should probably be merged upstream.

## Implementation Details

### App Structure
For the most part, `traxi-parent-app` is reasonably straightforward. It uses [Redux](http://redux.js.org/docs/introduction/)
to handle state and [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) for navigation. This isn't current best practice, and we should instead be moving to [React Navigation](https://reactnavigation.org/docs/intro/) to get better navigations and a more fluent API.

### Components
**TODO** Overview of dumb components smart containers, redux etc.

### User Authentication
**TODO** Overview of profiles, Firebase, etc.

### Setup Implementation
**TODO** Explain how devices are setup

### Reports Implementation
**TODO** Explain how reports are fetched
