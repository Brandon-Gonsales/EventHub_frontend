export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}> = ({ children, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-purple-100 text-purple-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
