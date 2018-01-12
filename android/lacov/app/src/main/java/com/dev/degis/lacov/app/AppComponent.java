package com.dev.degis.lacov.app;

import dagger.Component;
import javax.inject.Singleton;


@Singleton
@Component(modules = {ActivityModule.class, AppModule.class })
public interface AppComponent {
  void inject(LocavApp app);
}