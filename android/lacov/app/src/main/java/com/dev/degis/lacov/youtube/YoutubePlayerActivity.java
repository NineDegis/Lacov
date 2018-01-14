package com.dev.degis.lacov.youtube;

import android.databinding.DataBindingUtil;

import com.dev.degis.lacov.R;
import com.dev.degis.lacov.databinding.ActivityYoutubeplayerBinding;
import com.google.android.youtube.player.YouTubePlayer;

import android.os.Bundle;

public class YoutubePlayerActivity extends YouTubeFailureRecoveryActivity {
  private ActivityYoutubeplayerBinding binding;
  private YouTubePlayer player;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    binding = DataBindingUtil.setContentView(this, R.layout.activity_youtubeplayer);
    binding.youtubeView.initialize(YOUTUBE_API_KEY, this);
  }

  @Override
  public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player,
                                      boolean wasRestored) {
    this.player = player;
    if (!wasRestored) {
      player.cueVideo("A68EScjP8-I");
    }
  }

  @Override
  protected YouTubePlayer.Provider getYouTubePlayerProvider() {
    return binding.youtubeView;
  }
}