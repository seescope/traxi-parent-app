package com.traxi;
import java.io.File;

public class TraxiService {
  static {
    System.loadLibrary("traxi");
  }

  public static native int start(int fd);
}
