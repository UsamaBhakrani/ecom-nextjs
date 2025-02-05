import { auth } from "@/server/auth";
import Logo from "./Logo";
import UserButton from "./UserButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
const Nav = async () => {
  const session = await auth();
  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between gap-2 items-center md:gap-8 md:flex-row">
          <li className="flex flex-1">
            <Link href="/" aria-label="Ecom logo">
              <Logo />
            </Link>
          </li>
          <li className="relative flex items-center hover:bg-muted">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild className="flex gap-1">
                <Link href="/auth/login">
                  <LogIn size={12} />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton user={session?.user} expires={session?.expires!} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
