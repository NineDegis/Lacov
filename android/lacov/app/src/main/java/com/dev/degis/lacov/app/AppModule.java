package com.dev.degis.lacov.app;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import dagger.Module;
import dagger.Provides;
import javax.inject.Singleton;

@Module
public class AppModule {

  private static final String SHARED_PREF_KEY = "com.dev.degis.lacov.app.sharedprefkey";

  private Application app;

  AppModule(Application app) {
    this.app = app;
  }

  @Provides
  @Singleton
  Context provideContext() {
    return app.getBaseContext();
  }

  @Provides
  @Singleton
  SharedPreferences providePreferences(Context context) {
    return context.getSharedPreferences(SHARED_PREF_KEY, Context.MODE_PRIVATE);
  }
}
