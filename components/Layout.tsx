import React from "react";

const Layout: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => {
  return (
    <>
      <div className={`content ${className}`}>{children}</div>
      <div className="text-center bg-white text-gray-300 py-4 cursor-default">
        Made with <span className="hover:text-red-400">♥</span> by{" "}
        <a
          className="hover:text-blue-200 focus:text-blue-200"
          href="https://aravindballa.com"
        >
          Aravind Balla
        </a>
      </div>
    </>
  );
};

export default Layout;
