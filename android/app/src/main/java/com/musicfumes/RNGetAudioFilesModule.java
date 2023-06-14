package com.musicfumes;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

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

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


public class RNGetAudioFilesModule extends ReactContextBaseJavaModule {

    public String coverFolder = "/";
    public double coverResizeRatio = 1;
    public int coverSize = 0;


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
                songImage.compress(Bitmap.CompressFormat.JPEG, 25, fos);
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

    private void getCoverByPath(String pathToImg, String songPath, WritableMap items) throws IOException {
        MediaMetadataRetriever mmrr = new MediaMetadataRetriever();

        try {
            mmrr.setDataSource(songPath);
            byte[] albumImageData = mmrr.getEmbeddedPicture();

            if (albumImageData != null) {
                Bitmap songImage = BitmapFactory.decodeByteArray(albumImageData, 0, albumImageData.length);
                Bitmap resized = songImage;
                if (coverResizeRatio != 1 && coverSize == 0) {
                    resized = Bitmap.createScaledBitmap(songImage, (int) (songImage.getWidth() * coverResizeRatio),
                            (int) (songImage.getHeight() * coverResizeRatio), true);
                }

                if (coverSize != 0) {
                    resized = Bitmap.createScaledBitmap(songImage, coverSize, coverSize, true);
                }

                try {
                    String encoded = saveImageToStorageAndGetPath(pathToImg, resized);
                    items.putString("artwork", "file://" + encoded);

                } catch (Exception e) {
                    // Just let images empty
                    Log.e("error in saving artwork", e.getMessage());
                }

            }

        } catch (Exception e) {
            Log.e("embedImage", "No embed image" + e.getMessage());
        } finally {
            mmrr.release();
        }

    }

    private void coverCheck(String songPath, long songId, WritableMap items) throws IOException {
        ContextWrapper contextWrapper = new ContextWrapper(getReactApplicationContext());
        File musicDir = contextWrapper.getExternalFilesDir(Environment.DIRECTORY_MUSIC);
        File covers = new File(musicDir + File.separator + coverFolder + File.separator + "covers");
        if (!covers.exists() && !covers.mkdirs()) {
            Log.e("RNGetAudioFiles","Failed to create covers directory");
            return;
        }
        String pathToImg = covers.getAbsolutePath() + "/covers" + songId + ".jpg";
        File file = new File(pathToImg);
        if (!file.exists()) {
            getCoverByPath(pathToImg, songPath, items);
        } else {
            items.putString("artwork", "file://" + pathToImg);
        }

    }

    @ReactMethod
    public void getSong(final Callback successCallback, final Callback errorCallback) {
        WritableArray jsonArray = new WritableNativeArray();
        String[] projection = new String[]{
                MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.ARTIST, MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media._ID, MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.DATA, MediaStore.Audio.Media.MIME_TYPE
        };
        Uri songUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String selection = MediaStore.Audio.Media.IS_MUSIC + "!=0 AND " + MediaStore.Audio.Media.DURATION + " >= 10000 AND " + MediaStore.Audio.Media.ALBUM + " NOT LIKE 'WhatsApp Audio'";
        Cursor cursor = getCurrentActivity().getContentResolver().query(songUri, projection, selection, null, null);
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
                    item.putString("album", cursor.getString(albumColumn));
                    item.putString("artist", cursor.getString(artistColumn));
                    item.putString("title", cursor.getString(titleColumn));
                    item.putString("id", cursor.getString(idColumn));
                    item.putInt("duration", duration);
                    item.putString("url", "file://" + url);
                    item.putString("contentType", cursor.getString(mimeTypeColumn));

                    long id = cursor.getLong(idColumn);
//                    String songPath = cursor.getString(5);
                    coverCheck(url, id, item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());
            } else {
                String msg = "cursor is either null or empty ";
                Log.e("musicPlay error", msg);
            }
            successCallback.invoke(jsonArray);
        } catch (RuntimeException | IOException e) {
            errorCallback.invoke(e.toString());
        } finally {
            assert cursor != null;
            cursor.close();
        }
    }
}
