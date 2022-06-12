import React, { FC, PropsWithChildren, useState } from "react";
import Dialog from "rc-dialog";

type Props = {
  url: string;
} & PropsWithChildren<unknown>;
const OAuth: FC<Props> = ({ url, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        style={{ width: "100vw", height: "100vh" }}
      >
        <iframe src={url} />
      </Dialog>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            ...children.props,
            onClick: (...args: any[]) => {
              children.props?.onClick?.(...args);
              setVisible(true);
            },
          })
        : children}
    </>
  );
};
export default OAuth;
