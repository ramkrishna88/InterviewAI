// permissions.js
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const permissions = {
  microphone: Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  }),
  photoLibrary: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }),
};

const requestPermission = async permission => {
  try {
    const result = await request(permission);
    return result;
  } catch (err) {
    console.warn(err);
    return RESULTS.UNAVAILABLE; // Handle error case
  }
};

const checkPermission = async permission => {
  try {
    const result = await check(permission);
    return result;
  } catch (err) {
    console.warn(err);
    return RESULTS.UNAVAILABLE; // Handle error case
  }
};

// Request functions that return the status of the permission
const requestMicrophonePermission = async () => {
  const result = await requestPermission(permissions.microphone);
  return result;
};

const requestPhotoLibraryPermission = async () => {
  const result = await requestPermission(permissions.photoLibrary);
  return result;
};

// Check functions
const checkMicrophonePermission = async () => {
  return await checkPermission(permissions.microphone);
};

const checkPhotoLibraryPermission = async () => {
  return await checkPermission(permissions.photoLibrary);
};

// Exporting functions
export {
  checkMicrophonePermission,
  requestMicrophonePermission,
  checkPhotoLibraryPermission,
  requestPhotoLibraryPermission,
  // Export other request functions as needed
};
