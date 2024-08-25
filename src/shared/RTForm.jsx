import { twMerge } from "tailwind-merge";

const RTForm = ({ className, children, onSubmit, ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(`grid  w-full`, className)}
      {...props}
    >
      {children}
    </form>
  );
};

export default RTForm;
