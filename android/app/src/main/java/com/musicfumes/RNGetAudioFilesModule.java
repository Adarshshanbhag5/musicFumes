package com.musicfumes;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.palette.graphics.Palette;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.ContextWrapper;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import android.os.Environment;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


public class RNGetAudioFilesModule extends ReactContextBaseJavaModule {

    public String coverFolder = "/";


    public RNGetAudioFilesModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "RNGetAudioFiles";
    }

    private String saveImageToStorageAndGetPath(String pathToImg, Bitmap songImage) throws IOException {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(pathToImg, true);
            if (songImage != null) {
                songImage.compress(Bitmap.CompressFormat.JPEG, 50, fos);
                return pathToImg;
            }
        } catch (IOException e) {
            Log.e("Error saving Image", e.getMessage());
            throw e;
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    Log.e("Err closing FileO/P", e.getMessage());
                }
            }
        }
        return "";
    }

    private void getCoverByPath(String pathToImg, String songPath, WritableMap item) throws IOException {
        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
        try {
            retriever.setDataSource(songPath);
            byte[] albumImageData = retriever.getEmbeddedPicture();

            if (albumImageData != null) {
                Bitmap songImage = BitmapFactory.decodeByteArray(albumImageData, 0, albumImageData.length);
                String encoded = saveImageToStorageAndGetPath(pathToImg, songImage);
                item.putString("artwork", "file://" + encoded);
            }
            else{
                item.putNull("artwork");
            }
        } catch (Exception e) {
            Log.e("embedImage", "No embed image" + e.getMessage());
        } finally {
            retriever.release();
        }

    }

    private void coverCheck(String songPath, String songId, WritableMap item) throws IOException {
        ContextWrapper contextWrapper = new ContextWrapper(getReactApplicationContext());
        File musicDir = contextWrapper.getExternalFilesDir(Environment.DIRECTORY_MUSIC);
        File covers = new File(musicDir + File.separator + coverFolder + File.separator + ".covers");
        if (!covers.exists() && !covers.mkdirs()) {
            Log.e("RNGetAudioFiles", "Failed to create covers directory");
            return;
        }
        String pathToImg = covers.getAbsolutePath() + "/covers" + songId + ".jpg";
        File file = new File(pathToImg);
        if (!file.exists()) {
            getCoverByPath(pathToImg, songPath, item);
        } else {
            item.putString("artwork", "file://" + pathToImg);
        }

    }

    @ReactMethod
    public void getSong(ReadableMap mediaConfig, Promise promise) {
        WritableArray jsonArray = new WritableNativeArray();
        String[] projection = new String[]{
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.DATA,
                MediaStore.Audio.Media.MIME_TYPE
        };
        Uri songUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String selection = MediaStore.Audio.Media.IS_MUSIC + "!= ? AND " + MediaStore.Audio.Media.DURATION + " >= ?";
        String[] selectionArgs;
        String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";
        if (mediaConfig.getBoolean("excludeWhatsApp")) {
            selection += " AND " + MediaStore.Audio.Media.ALBUM + " NOT LIKE ?";
            selectionArgs = new String[]{"0", mediaConfig.getString("minDuration"), "%WhatsApp Audio%"};
        } else {
            selectionArgs = new String[]{"0", mediaConfig.getString("minDuration")};
        }
        Cursor cursor = getCurrentActivity().getContentResolver().query(songUri, projection, selection, selectionArgs, sortOrder);
        try {
            if (cursor != null && cursor.getCount() > 0) {
                int idColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID);
                int albumColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM);
                int artistColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST);
                int titleColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE);
                int durationColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION);
                int dataColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA);
                int mimeTypeColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.MIME_TYPE);
                cursor.moveToFirst();
                do {
                    WritableMap item = new WritableNativeMap();
                    int duration = (cursor.getString(durationColumn) == null ? 0 : (Integer.parseInt(cursor.getString(4), 10)) / 1000);
                    String url = cursor.getString(dataColumn);
                    String id = cursor.getString(idColumn);
                    File file = new File(url);

                    item.putString("directory", file.getParent());
                    item.putString("album", cursor.getString(albumColumn));
                    item.putString("artist", cursor.getString(artistColumn));
                    item.putString("title", cursor.getString(titleColumn));
                    item.putString("id", id);
                    item.putInt("duration", duration);
                    item.putString("url", "file://" + url);
                    item.putString("contentType", cursor.getString(mimeTypeColumn));

                    coverCheck(url, id, item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());

                promise.resolve(jsonArray);
            }
        } catch (RuntimeException | IOException e) {
            promise.reject("error in getting music:", e.toString());
        } finally {
            assert cursor != null;
            cursor.close();
        }
    }

    private String getHex(int rgb) {
        return String.format("#%06X", 0xFFFFFF & rgb);
    }

    @ReactMethod
    public void getPalette(String imageUrl, ReadableMap config, Promise promise) {
        try {
            Bitmap image = BitmapFactory.decodeFile(imageUrl);
            Palette.from(image).generate(palette -> {
                WritableMap colorPalette = Arguments.createMap();

                if (palette != null) {
                    Palette.Swatch dominant = palette.getDominantSwatch();
                    if (dominant != null) {
                        colorPalette.putString("rgb", getHex(dominant.getRgb()));
                        colorPalette.putString("titleTextColor", getHex(dominant.getTitleTextColor()));
                        colorPalette.putString("bodyTextColor", getHex(dominant.getBodyTextColor()));
                    } else {
                        colorPalette.putString("rgb", config.getString("rgb"));
                        colorPalette.putString("titleTextColor", config.getString("titleTextColor"));
                        colorPalette.putString("bodyTextColor", config.getString("bodyTextColor"));
                    }
                    colorPalette.putString("darkVibrant", getHex(palette.getDarkVibrantColor(1)));
                    colorPalette.putString("lightVibrant", getHex(palette.getLightVibrantColor(1)));
                    colorPalette.putString("darkMuted", getHex(palette.getDarkMutedColor(1)));
                    colorPalette.putString("lightMuted", getHex(palette.getLightMutedColor(1)));
                } else {
                    colorPalette.putString("darkMuted", config.getString("darkVibrant"));
                    colorPalette.putString("lightVibrant", config.getString("lightVibrant"));
                    colorPalette.putString("darkMuted", config.getString("darkMuted"));
                    colorPalette.putString("lightMuted", config.getString("lightMuted"));
                }
                promise.resolve(colorPalette);
            });
        } catch (RuntimeException e) {
            promise.reject("error", e.getMessage());
        }
    }
}
