package com.traxi;

import android.util.Log;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.app.Activity;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.iid.FirebaseInstanceId;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.GoogleApiClient.*;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

import com.crashlytics.android.Crashlytics;

public class AuthenticationModule extends ReactContextBaseJavaModule 
  implements ActivityEventListener, ConnectionCallbacks, OnConnectionFailedListener {
  ReactApplicationContext context;
  private final String TAG = "AuthenticationModule";
  private final String CLIENT_ID = "204102393429-4rnbsfu1cmud7f9arktqrrn0n3k2o1jk.apps.googleusercontent.com";
  private GoogleApiClient mGoogleApiClient;
  private FirebaseAuth mAuth;
  private Activity mCurrentActivity;
  private static final int RC_SIGN_IN = 9001;

  private Promise mPromise;

  public AuthenticationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    context = reactContext;
    reactContext.addActivityEventListener(this);

    GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
      .requestIdToken(CLIENT_ID)
      .requestEmail()
      .build();

    mGoogleApiClient = new GoogleApiClient.Builder(context)
      .addConnectionCallbacks(this)
      .addOnConnectionFailedListener(this)
      .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
      .build();

    mGoogleApiClient.connect();

    mAuth = FirebaseAuth.getInstance();
  }

  // React Native
  @Override
    public String getName() {
      return "Authentication";
    }

  @Override
    public void onNewIntent(Intent intent) {
      // Do nothing.
    }

  // JS Entry Point
  @ReactMethod
    public void authenticate(Promise promise) {
      mPromise = promise;

      mCurrentActivity = getCurrentActivity();
      if (mCurrentActivity == null) {
        promise.reject("Activity does not exist!");
        return;
      }

      Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
      mCurrentActivity.startActivityForResult(signInIntent, RC_SIGN_IN);
    }

  // GoogleSignInApi result:
  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
    if (requestCode == RC_SIGN_IN) {
      Crashlytics.log(Log.DEBUG, TAG, "onActivityResult data:" + data);

      GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
      if (result == null) {
        Crashlytics.log(Log.ERROR, TAG, "getSignInResultFromIntent returned null!");
        mPromise.reject("[AuthenticationModule] Unable to authenticate: GoogleSignInResult was null!");
      }

      if (result.isSuccess()) {
        // Google Sign In was successful, authenticate with Firebase
        GoogleSignInAccount account = result.getSignInAccount();
        Crashlytics.log(Log.DEBUG, TAG, "onActivityResult Success:" + result);
        firebaseAuthWithGoogle(account);
      } else {
        int statusCode = result.getStatus().getStatusCode();
        mPromise.reject("[AuthenticationModule] Unable to authenticate with Google:" + statusCode);
      }
    }
  }


  // Convert from GoogleSignInAccount to FirebaseAuth.
  private void firebaseAuthWithGoogle(GoogleSignInAccount acct) {
    Crashlytics.log(Log.DEBUG, TAG, "firebaseAuthWithGoogle:" + acct.getId());

    AuthCredential credential = GoogleAuthProvider.getCredential(acct.getIdToken(), null);
    mAuth.signInWithCredential(credential)
      .addOnCompleteListener(mCurrentActivity, new OnCompleteListener<AuthResult>() {
        @Override
        public void onComplete(@NonNull Task<AuthResult> task) {
          if (!task.isSuccessful()) {
            Crashlytics.logException(task.getException());
          } else {
            Log.i(TAG, "[AuthenticationModule] Sign in success!");
            FirebaseUser firebaseUser = mAuth.getCurrentUser();
            Crashlytics.setUserIdentifier(firebaseUser.getUid());
            WritableMap profile = buildProfile(firebaseUser);

            mPromise.resolve(profile);
          }
        }
      });
  }

  private WritableMap buildProfile(FirebaseUser firebaseUser) {
    WritableMap profile = Arguments.createMap();
    profile.putString("name", firebaseUser.getDisplayName());
    profile.putString("UUID", firebaseUser.getUid());
    profile.putString("picture", firebaseUser.getPhotoUrl().toString());
    profile.putString("email", firebaseUser.getEmail());

    Crashlytics.log(Log.DEBUG, TAG, "Built profile for user with UUID: " + firebaseUser.getUid());

    return profile;
  }

  @Override
    public void onConnectionFailed(ConnectionResult result) {
      String errorMessage = "[AuthenticationModule] Unable to connect to GoogleAPI: " + result;
      if (mPromise != null) {
        mPromise.reject(errorMessage);
      }

      Exception e = new Exception(errorMessage);
      Crashlytics.logException(e);
    }

  @Override
    public void onConnectionSuspended(int something) {
      Log.e(TAG, "[AuthenticationModule] GoogleAPIConnection Suspended");
    }

  @Override
    public void onConnected(Bundle connectionHint) {
      Log.i(TAG, "[AuthenticationModule] Connected to GoogleAPI");
    }

}
