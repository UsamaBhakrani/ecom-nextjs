"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  allLinks: { icon: JSX.Element; label: string; path: string }[];
}

const DashboardNav = ({ allLinks }: DashboardNavProps) => {
  const pathName = usePathname();

  return (
    <nav className="py-2 overflow">
      <ul className="flex gap-6 text-sm font-bold">
        {allLinks.map(({ icon, label, path }) => {
          return (
            <motion.li whileTap={{ scale: 0.95 }} key={label}>
              <Link
                href={path}
                className={cn(
                  "flex gap-1 flex-col items-center",
                  pathName === path && "text-purple-500"
                  //   ?
                  //   (
                  // <motion.div className="h-[3px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1" />
                  //   ) : null
                )}
              >
                {icon}
                {label}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardNav;
