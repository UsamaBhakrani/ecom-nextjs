"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  allLinks: { icon: JSX.Element; label: string; path: string }[];
}

const DashboardNav = ({ allLinks }: DashboardNavProps) => {
  const pathName = usePathname();

  return (
    <nav className="py-2 overflow">
      <ul className="flex gap-6 text-sm font-semibold">
        <AnimatePresence>
          {allLinks.map(({ icon, label, path }) => {
            return (
              <motion.li whileTap={{ scale: 0.95 }} key={label}>
                <Link
                  href={path}
                  className={cn(
                    "flex gap-1 flex-col items-center relative",
                    pathName === path && "text-purple-500"
                  )}
                >
                  {icon}
                  {label}
                  {pathName === path ? (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 35 }}
                      layoutId="underline"
                      className="h-[2px] w-full rounded-full absolute bg-purple-500 z-0 left-0 -bottom-1"
                    />
                  ) : null}
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default DashboardNav;
