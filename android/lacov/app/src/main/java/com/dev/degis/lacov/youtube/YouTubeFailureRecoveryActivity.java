package com.dev.degis.lacov.youtube;

import com.dev.degis.lacov.R;
import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.Toast;

import javax.inject.Inject;

import dagger.android.AndroidInjection;

/**
 * An abstract activity which deals with recovering from errors which may occur during API
 * initialization, but can be corrected through user action.
 */
public abstract class YouTubeFailureRecoveryActivity extends YouTubeBaseActivity implements
    YouTubePlayer.OnInitializedListener {

  private static final int RECOVERY_DIALOG_REQUEST = 1;

  @Inject
  Context context;
  protected String YOUTUBE_API_KEY;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    AndroidInjection.inject(this);
    super.onCreate(savedInstanceState);
    YOUTUBE_API_KEY = context.getResources().getString(R.string.youtube_api_developer_key);
  }

  @Override
  public void onInitializationFailure(YouTubePlayer.Provider provider,
                                      YouTubeInitializationResult errorReason) {
    if (errorReason.isUserRecoverableError()) {
      errorReason.getErrorDialog(this, RECOVERY_DIALOG_REQUEST).show();
    } else {
      String errorMessage = String.format("Error: ", errorReason.toString());
      Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show();
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == RECOVERY_DIALOG_REQUEST) {
      // Retry initialization if user performed a recovery action
      getYouTubePlayerProvider().initialize(YOUTUBE_API_KEY, this);
    }
  }

  protected abstract YouTubePlayer.Provider getYouTubePlayerProvider();
}
