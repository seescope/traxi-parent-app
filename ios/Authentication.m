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

     NSString *fullName = @"";
     if(deviceName.length > 0) {
       NSArray *names = [self nameFromDeviceName:deviceName];
       fullName = [names componentsJoinedByString:@" "];
     }

     NSDictionary *profile = @{
                              @"name": fullName,
                              @"UUID": user.uid,
                              };

     resolve(profile);
   }];

}

- (NSArray *) nameFromDeviceName: (NSString *) deviceName
{
  NSError * error;
  static NSString * expression = (@"^(?:iPhone|phone|iPad|iPod)\\s+(?:de\\s+)?|"
                                  "(\\S+?)(?:['’]?s)?(?:\\s+(?:iPhone|phone|iPad|iPod))?$|"
                                  "(\\S+?)(?:['’]?的)?(?:\\s*(?:iPhone|phone|iPad|iPod))?$|"
                                  "(\\S+)\\s+");
  static NSRange RangeNotFound = (NSRange){.location=NSNotFound, .length=0};
  NSRegularExpression * regex = [NSRegularExpression regularExpressionWithPattern:expression
                                                                          options:(NSRegularExpressionCaseInsensitive)
                                                                            error:&error];
  NSMutableArray * name = [NSMutableArray new];
  for (NSTextCheckingResult * result in [regex matchesInString:deviceName
                                                       options:0
                                                         range:NSMakeRange(0, deviceName.length)]) {
    for (int i = 1; i < result.numberOfRanges; i++) {
      if (! NSEqualRanges([result rangeAtIndex:i], RangeNotFound)) {
        [name addObject:[deviceName substringWithRange:[result rangeAtIndex:i]].capitalizedString];
      }
    }
  }
  return name;
}
@end
