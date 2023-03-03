/** @format */

import { getSvgIcon } from "@/svgUtils";
import { Tooltip } from "antd";
export default (props: { context: string }) => {
  const { context } = props;

  return (
    <Tooltip overlayClassName='custom-tooltip-wrap' title={context}>
      {getSvgIcon("tip")}
    </Tooltip>
  );
};
