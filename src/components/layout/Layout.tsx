import { ReactNode } from "react";
import GovHeader from "./GovHeader";
import GovNav from "./GovNav";
import GovFooter from "./GovFooter";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <GovHeader />
      <GovNav />
      <main className="flex-1">
        {children}
      </main>
      <GovFooter />
    </div>
  );
};

export default Layout;
