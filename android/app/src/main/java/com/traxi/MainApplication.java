package com.traxi;

import android.support.multidex.MultiDexApplication;
import android.util.Log;


import com.facebook.react.ReactApplication;
import io.fixd.rctlocale.RCTLocalePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.smore.RNSegmentIOAnalytics.RNSegmentIOAnalyticsPackage;
import com.microsoft.codepush.react.CodePush;
import com.smixx.fabric.FabricPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// Intercom
import io.intercom.android.sdk.Intercom;

// Facebook
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.CallbackManager;

// Custom packages.
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
	private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

	@Override
	public void onCreate() {
		super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
		FacebookSdk.sdkInitialize(getApplicationContext());
		AppEventsLogger.activateApp(this);
    Intercom.initialize(this, "android_sdk-e738f250b733dee699dc65b124ffb95e5a8a62d1", "bduhw6bc");
	}

	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RCTLocalePackage(),
            new FBSDKPackage(mCallbackManager),
            new InAppBillingBridgePackage(),
            new RNDeviceInfo(),
            new SvgPackage(),
            new ReactNativeOneSignalPackage(),
            new ReactNativeI18n(),
            new IntercomPackage(),
            new RNSegmentIOAnalyticsPackage("7FVcLGkqV6zCPqN4oiy4ZK8HjWoNafrW"),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new FabricPackage(),
            new RandomBytesPackage(),
            new ImagePickerPackage(),
            new ReactMaterialKitPackage(),
		        new VectorIconsPackage(),
		        new LinearGradientPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
