const FormHeading = ({ children, className = "" }) => {
  return (
    <h2 className={`text-2xl font-bold text-[#19355a] text-center ${className}`}>
      {children}
    </h2>
  );
};

export default FormHeading;
