import { twMerge } from "tailwind-merge";

const RTGrid = ({ children, className }) => {
  return <div className={twMerge(`col-span`, className)}>{children}</div>;
};

export default RTGrid;
