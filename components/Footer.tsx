import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Footer = ({ children }: Props) => (
  <footer className="w-full leading-[var(--nav-height)] px-8 bg-zinc-300 border-t border-zinc-400 text-zinc-600">{children}</footer>
);

export default Footer;
