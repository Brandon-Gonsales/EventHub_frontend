export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = "", hover = true }) => (
  <div
    className={`bg-white rounded-2xl shadow-lg ${
      hover ? "hover:shadow-2xl transition-shadow duration-300" : ""
    } ${className}`}
  >
    {children}
  </div>
);
