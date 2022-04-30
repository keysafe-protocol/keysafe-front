import Notification from "rc-notification";
import {
  NoticeContent,
  NotificationInstance,
} from "rc-notification/es/Notification";

let notification: NotificationInstance | null = null;
Notification.newInstance(
  {
    maxCount: 5,
  },
  (n) => {
    notification = n;
  }
);

const message = (props: NoticeContent) => {
  notification?.notice(props);
};
export default message;
