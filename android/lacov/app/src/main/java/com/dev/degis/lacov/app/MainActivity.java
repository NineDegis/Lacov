package com.dev.degis.lacov.app;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.view.View;
import com.dev.degis.lacov.R;
import com.dev.degis.lacov.databinding.ActivityMainBinding;
import com.dev.degis.lacov.ui.BaseActivity;
import com.dev.degis.lacov.youtube.YoutubePlayerActivity;

public class MainActivity extends BaseActivity implements View.OnClickListener{

  private ActivityMainBinding binding;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
    binding.youtubeButton.setOnClickListener(this);
  }

  @Override
  public void onClick(View view) {
    if (view == binding.youtubeButton) {
      startActivity(new Intent(this, YoutubePlayerActivity.class));
      return;
    }
    throw new RuntimeException("Invalid view: " + view);
  }
}
