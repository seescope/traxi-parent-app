#!/bin/bash
set -e

NEW_VERSION=`cat package.json |grep version| egrep -o "\d{1,2}\.\d{1,2}\.\d{1,2}"`

CURRENT_GRADLE_VERSION_CODE=`cat android/app/build.gradle |grep versionCode |egrep -o '\d{3}$'`
CURRENT_GRADLE_VERSION_NAME=`cat android/app/build.gradle |grep versionName |egrep -o '\d{1,2}\.\d{1,2}\.\d{1,2}'`
NEW_VERSION_CODE=`echo -n $NEW_VERSION | sed 's/\.//g'`
NEW_SHORT_VERSION_STRING=`echo -n $NEW_VERSION | egrep -o '^\d{1,2}\.\d{1,2}'`
NEW_BUILD_NUMBER=`echo -n $NEW_VERSION | egrep -o '\d{1,2}$'`

fancy_echo() {
  local fmt="$1"; shift

  printf "\n$fmt\n" "$@"
}

version_bump() {
  sed -i '' "s/versionCode $CURRENT_GRADLE_VERSION_CODE/versionCode $NEW_VERSION_CODE/" android/app/build.gradle
  sed -i '' "s/versionName \"$CURRENT_GRADLE_VERSION_NAME\"/versionName \"$NEW_VERSION\"/" android/app/build.gradle

  /usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUILD_NUMBER" ios/traxi/Info.plist 
  /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $NEW_SHORT_VERSION_STRING" ios/traxi/Info.plist 
}

release_the_fucker() {
  fancy_echo "Releasing Android.."
  (cd android && fastlane deploy)

  # fancy_echo "Releasing iOS.."
  # (cd ios && fastlane release)
  # fancy_echo "You'll probably have to go submit the build to iTunes connect or w/e"
}

fancy_echo "Do you really want to release traxi version $NEW_VERSION? Bump the version in package.json if it's incorrect."
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) exit;;
    esac
done

fancy_echo "Running tests.."

yarn test

fancy_echo "Bumping Info.plist and build.gradle to $NEW_VERSION..."

version_bump

release_the_fucker
