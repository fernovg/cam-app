import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.android.cam.app',
  appName: 'CAM',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova:{},
  server:{
    androidScheme:"http",
    cleartext: true,
    allowNavigation:[
      "http://cam.enformobile.com.mx/*"
    ]
  }
};

/* const config: CapacitorConfig = {
  appId: 'com.android.cam.app',
  appName: 'CAM',
  webDir: 'www',
  bundledWebRuntime: true
};*/

export default config;
