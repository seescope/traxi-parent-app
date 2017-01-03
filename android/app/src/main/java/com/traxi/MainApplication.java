package com.traxi;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import io.fixd.rctlocale.RCTLocalePackage;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.smore.RNSegmentIOAnalytics.RNSegmentIOAnalyticsPackage;
import com.microsoft.codepush.react.CodePush;
import com.amazonaws.reactnative.core.AWSRNCorePackage;
import com.amazonaws.reactnative.dynamodb.AWSRNDynamoDBPackage;
import com.smixx.fabric.FabricPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.RNSvgPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

// Facebook
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

// Custom packages.
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;
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
		FacebookSdk.sdkInitialize(getApplicationContext());
		AppEventsLogger.activateApp(this);
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
        new RNSmsAndroidPackage(),
        new VPNClientPackage(),
        new MainReactPackage(),
            new RCTLocalePackage(),
            new InAppBillingBridgePackage(),
            new RNSegmentIOAnalyticsPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new AWSRNCorePackage(),
            new AWSRNDynamoDBPackage(),
            new FabricPackage(),
            new RandomBytesPackage(),
            new ImagePickerPackage(),
            new RNSvgPackage(),
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
