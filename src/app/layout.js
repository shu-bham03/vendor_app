import React from "react";
import Context from "../../context";
import "./global.css";
import { ConfigProvider } from "antd";

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "linear-gradient(135deg, #FF1493, #800080)",
            },
            components: {
              Button: {
                colorPrimary: "linear-gradient(135deg, #FF1493, #800080)",
              },
            },
          }}
        >
          <Context> {children} </Context>
        </ConfigProvider>
      </body>
    </html>
  );
};

export default layout;
