import React from "react";
import Image from "next/image";
import Link from "next/link";

const Layout: React.FC<{
  className?: string;
  children: React.ReactNode;
  slug?: string;
}> = ({ className = "", children, slug = null }) => {
  return (
    <>
      {slug !== "/" && (
        <div className="full-width bg-pink-100 py-2 px-8 shadow">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src="/head.png"
              alt="Satya's Blog"
              width="90"
              height="60"
            />
          </Link>
        </div>
      )}
      <div className={`content ${className}`}>{children}</div>
      <div className="text-center bg-white text-gray-300 text-sm pt-4 cursor-default">
        © Satya Balla {new Date().getFullYear()}
      </div>
      <div className="text-center bg-white text-gray-300 text-xs pb-4 cursor-default">
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
