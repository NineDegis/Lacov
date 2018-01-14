package com.dev.degis.lacov.app;

import com.dev.degis.lacov.youtube.YoutubePlayerActivity;
import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class ActivityModule {

  @ActivityScope
  @ContributesAndroidInjector
  abstract MainActivity contributeMainActivityInjector();

  @ActivityScope
  @ContributesAndroidInjector
  abstract YoutubePlayerActivity contributeYoutubePlayerActivityInjector();
}
