/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import "RCTLinkingManager.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <Analytics/SEGAnalytics.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@import Firebase;
@import Intercom;

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;


#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"traxi"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"OrHTwtpRdZV1ZUDnYUSg3LsE8qKeJ6g9"];
  configuration.trackApplicationLifecycleEvents = YES;
  [SEGAnalytics setupWithConfiguration:configuration];

  // Firebase
  [FIROptions defaultOptions].deepLinkURLScheme = @"applinks:c7g74.app.goo.gl";
  [FIRApp configure];

  // Fabric
  [Fabric with:@[[Crashlytics class]]];

  // Initialize Intercom
  [Intercom setApiKey:@"ios_sdk-4eb45cee2ce0955571adcd238f912926f206fda5" forAppId:@"bduhw6bc"];

  // OneSignal
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions appId:@"d5fdb2cf-81c7-4dca-a33b-70dd9ab9fa35" settings:@{kOSSettingsKeyAutoPrompt: @false}];
  
  // Facebook SDK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
  {
    return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                          openURL:url
                                                sourceApplication:sourceApplication
                                                       annotation:annotation]
    || [RCTLinkingManager application:application
                              openURL:url
                    sourceApplication:sourceApplication
                           annotation:annotation];
  }
  
  - (void)applicationDidBecomeActive:(UIApplication *)application {
    [FBSDKAppEvents activateApp];
  }

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [Intercom setDeviceToken:deviceToken]; // For Intercom notification
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification {
  [RCTOneSignal didReceiveRemoteNotification:notification];
}
  



@end
