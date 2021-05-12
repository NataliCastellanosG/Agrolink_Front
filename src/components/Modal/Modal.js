import React from "react";
import { Modal as ModalAntd } from "antd";

export default function Modal(props) {
  const { children, title, isVisible, setIsVisible, ...other } = props;
  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      footer={false}
      onOk={handleOk}
      onCancel={handleCancel}
      {...other}
    >
      {children}
    </ModalAntd>
  );
}
