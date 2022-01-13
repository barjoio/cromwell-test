import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLogged(localStorage.getItem("logged") ? true : false);
  });

  return (
    <header>
      <div className="fixed top-0 w-full h-full pointer-events-none z-[1]">
        <nav className="pointer-events-auto bg-black h-[var(--nav-height)] text-white flex justify-end">
          <div
            className={
              "bg-zinc-900 sm:bg-black transition-[left] absolute h-full w-[var(--nav-width)] left-0 overflow-hidden p-10 text-2xl " +
              (open ? "left-0" : "-left-[var(--nav-width)]") +
              " sm:left-0 sm:p-0 sm:w-full sm:h-[var(--nav-height)] sm:text-base"
            }
          >
            <div className="h-full flex flex-col space-y-16 sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:space-y-0">
              <div>
                <Link href="/">Home</Link>
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                {logged ? (
                  <div>
                    <button
                      className="border-none"
                      onClick={async () => {
                        await fetch("/api/user/logout");
                        localStorage.setItem("logged", "");
                        router.push("/");
                      }}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="sm:mr-4">
                      <Link href="/login">Login</Link>
                    </div>
                    <div>
                      <Link href="/register">Register</Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pointer-events-auto w-[var(--nav-height)] h-[var(--nav-height)] flex items-center justify-center">
            <button onClick={() => setOpen(!open)}>
              <img src={open ? "close.svg" : "menu.svg"} alt="menu" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
