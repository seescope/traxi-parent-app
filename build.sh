#!/bin/bash
set -euf -o pipefail

BUILD_MODE=$1
cd rust/traxi/ 

if [ $BUILD_MODE == 'release' ]; then
  echo "[libtraxi] Building release library."
  cargo build --target=arm-linux-androideabi --release
  cp target/arm-linux-androideabi/release/libtraxi.so /Users/kanerogers/Development/traxi/traxi/android/app/src/main/libs/armeabi-v7a/
else
  echo "[libtraxi] Building debug library."
  cargo build --target=arm-linux-androideabi 
  cp target/arm-linux-androideabi/debug/libtraxi.so /Users/kanerogers/Development/traxi/traxi/android/app/src/main/libs/armeabi-v7a/
fi

cd ../../
echo "Running on Android.."
react-native run-android
