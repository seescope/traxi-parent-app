package com.traxi;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.amazonaws.reactnative.sns.AWSRNSNSPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.smore.RNSegmentIOAnalytics.RNSegmentIOAnalyticsPackage;
import com.microsoft.codepush.react.CodePush;
import com.smixx.fabric.FabricPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
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

// Custom packages.
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
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
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new NotificationManagerPackage(),
        new VPNClientPackage(),
        new MainReactPackage(),
            new ReactNativeOneSignalPackage(),
            new AWSRNSNSPackage(),
            new ReactNativeI18n(),
            new IntercomPackage(),
            new InAppBillingBridgePackage(),
            new RNSegmentIOAnalyticsPackage("7FVcLGkqV6zCPqN4oiy4ZK8HjWoNafrW"),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new FabricPackage(),
            new RandomBytesPackage(),
            new ImagePickerPackage(),
            new SvgPackage(),
            new ReactMaterialKitPackage(),
        new ReactNativeContacts(),
        new VectorIconsPackage(),
        new LinearGradientPackage(),
        new AuthenticationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
