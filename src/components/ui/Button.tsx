export const Button: React.FC<{
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-light-secondary dark:bg-dark-secondary text-light-primary dark:text-dark-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline:
      "border border-light-fourth dark:border-dark-fourth text-light-black dark:text-dark-black",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
