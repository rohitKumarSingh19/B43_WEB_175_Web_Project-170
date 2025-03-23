import webpush from "web-push";

// ✅ Configure VAPID Keys (Generate using `web-push generate-vapid-keys`)
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// ✅ Send Push Notification
export const sendPushNotification = async (subscription, message) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify({ title: "Event Reminder", body: message }));
    console.log("🔔 Push notification sent");
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw new Error("Failed to send push notification");
  }
};
