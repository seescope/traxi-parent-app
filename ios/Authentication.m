//
//  AuthenticationModule.m
//  traxi
//
//  Created by Kane Rogers on 4/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Authentication.h"
@import Firebase;

@implementation Authentication

// Rob's iPhone

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(authenticate,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  [[FIRAuth auth]
   signInAnonymouslyWithCompletion:^(FIRUser *_Nullable user, NSError *_Nullable error) {
     NSString *deviceName = [[UIDevice currentDevice] name];
     NSArray *split = [deviceName componentsSeparatedByString:@"'"];
     NSString *firstName = split[0];
     
     NSDictionary *profile = @{
                              @"name": firstName,
                              @"UUID": user.uid,
                              };
     
     resolve(profile);
   }];

}
@end
