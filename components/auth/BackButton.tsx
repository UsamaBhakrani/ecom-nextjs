"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const BackButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <div className="w-full">
      <Button variant="link" asChild className="font-medium w-full">
        <Link aria-label={label} href={href}>
          {label}
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
