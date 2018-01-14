package com.dev.degis.lacov.app;

import android.app.Activity;
import android.content.Context;
import android.support.multidex.MultiDexApplication;
import dagger.android.DispatchingAndroidInjector;
import dagger.android.HasActivityInjector;
import javax.inject.Inject;

public class LocavApp extends MultiDexApplication implements HasActivityInjector {

  @Inject
  DispatchingAndroidInjector<Activity> activityDispatchingAndroidInjector;

  @Override
  public void onCreate() {
    super.onCreate();
    DaggerAppComponent.builder()
        .appModule(new AppModule(this))
        .build().inject(this);
  }

  @Override
  public DispatchingAndroidInjector<Activity> activityInjector() {
    return activityDispatchingAndroidInjector;
  }

  @Override
  protected void attachBaseContext(Context base) {
    try {
      super.attachBaseContext(base);
    } catch (Exception e) {
      String vmName = System.getProperty("java.vm.name");
      if (!vmName.startsWith("Java") && !vmName.startsWith("OpenJDK")) {
        throw e;
      }
    }
  }

}