import React from "react";
import { Divider } from "antd";

const CommonDivider = ({ title }) => {
  return (
    <div>
      <Divider orientation="left" className="m-0 p-0 b-2 border-black">
        <h1 className="font-semibold text-base">{title}</h1>
      </Divider>
    </div>
  );
};

export default CommonDivider;
