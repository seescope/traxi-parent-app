//
//  NotificationManager.m
//  traxi
//
//  Created by Kane Rogers on 4/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NotificationManager.h"
@import Firebase;

@implementation NotificationManager

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(register,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  NSString *token = [[FIRInstanceID instanceID] token];
  
  // For Simulator
  if (token == NULL) {
    token = @"abc123";
  }
  
  resolve(token);
  
}
@end

