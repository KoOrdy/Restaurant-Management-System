import clsx from "clsx";

const TableRow = ({ children, className = "", ...rest }) => {
  return (
    <div
      role="row"
      className={clsx(
        "border-b-2 lg:border-b-2 border-gray-300",
        "even:bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out",
        "flex flex-col lg:flex-row lg:items-center lg:justify-between",
        "lg:border-0 lg:even:bg-transparent lg:hover:bg-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TableRow;
