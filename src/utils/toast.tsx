import { NotificationProps, showNotification } from "@mantine/notifications";
import { ReactNode } from "react";
import { Check, X } from "tabler-icons-react";

const commonProps = {
  disallowClose: true,
  onClose: () => {},
  onOpen: () => {},
  style: {
    backgroundColor: "#4E4E4E",
  },
  sx: { backgroundColor: "#4E4E4E" },
  styles: {
    icon: {
      width: 20,
      height: 20,
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    root: {
      borderRadius: "12px",
      border: "1px solid #454545",
      padding: "16px 20px",
    },
    description: {
      fontSize: "16px !important",
      fontFamily: "DM Sans !important",
    },
  },
};

export const toast = {
  success: (message: ReactNode, options?: Partial<NotificationProps>) =>
    showNotification({
      ...commonProps,
      ...options,
      message,
      color: "green",
      icon: <Check size={20} />,
      autoClose: 3000,
    }),
  error: (message: ReactNode, options?: Partial<NotificationProps>) =>
    showNotification({
      ...commonProps,
      ...options,
      message,
      color: "red",
      icon: <X size={20} />,
      autoClose: 3000,
    }),
  loading: (message: ReactNode, options?: Partial<NotificationProps>) =>
    showNotification({
      ...commonProps,
      ...options,
      message,
      color: "blue",
      loading: true,
    }),
};
