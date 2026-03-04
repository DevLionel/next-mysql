import React, { useEffect, useState } from "react";

type AlertProps = {
  message: string;
  type?: "success" | "danger" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  message,
  type = "success",
  duration = 10000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
      style={{
        margin: "10px auto 40px auto",
        maxWidth: "600px", // center & fit nicely
      }}
    >
      {message}
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;