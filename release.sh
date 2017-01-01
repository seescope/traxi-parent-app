#!/bin/bash

VERSION=`cat android/app/build.gradle |grep versionCode|head -n 1 |awk '{print $2}'`

set -euf -o pipefail

cd rust/traxi/ 
echo "[libtraxi] Building release library."
cargo build --target=arm-linux-androideabi --release
cp target/arm-linux-androideabi/release/libtraxi.so /Users/kanerogers/Development/traxi/traxi/android/app/src/main/libs/armeabi-v7a/

cd ../../android
echo "[traxi-app] Building app."
./gradlew assembleRelease

echo "[apk] Copying to onboarding directory"
cp app/build/outputs/apk/app-release.apk ~/Development/traxi/traxi-onboarding/public/traxi-$VERSION.apk && cd ~/Development/traxi/traxi-onboarding/
