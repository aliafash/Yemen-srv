// Application Configuration
import { customFirebaseConfig } from "./lib/firebase-custom-config";

export const config = {
  appName: "WAM - كل خدمات اليمن",
  firebase: customFirebaseConfig,
  features: {
    chatEnabled: true,
    paymentsEnabled: true,
    notificationsEnabled: true,
    mapsEnabled: true
  }
};
