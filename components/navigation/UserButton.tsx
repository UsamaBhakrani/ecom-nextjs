"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Moon, Settings, Sun, TruckIcon, Pickaxe, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

const UserButton = ({ user, expires }: Session) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  const setSwitchState = () => {
    if (theme === "dark") return setChecked(true);
    if (theme === "light") return setChecked(false);
    if (theme === "system") return setChecked(false);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image && (
            <AvatarImage
              src={user.image}
              alt={user.name!}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          {!user?.image && (
            <AvatarFallback className="bg-primary/25">
              <div className="font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-6" align="end">
        <DropdownMenuItem className="mb-4 p-4 flex-col items-center bg-primary/10 rounded-lg">
          {user?.image! && (
            <Image
              src={user.image}
              alt={user.name!}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <p className="font-bold text-xs">{user?.name}</p>
          <span className="text-xs font-medium text-secondary-foreground">
            {user?.email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="group py-2 font-medium cursor-pointer transition-all duration-500"
        >
          <Pickaxe
            size={14}
            className="mr-2 group-hover:translate-x-1 transition-all duration-300"
          />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/orders")}
          className="group py-2 font-medium cursor-pointer transition-all duration-500"
        >
          <TruckIcon
            size={14}
            className="mr-2 group-hover:translate-x-1 transition-all duration-300"
          />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="group py-2 font-medium cursor-pointer transition-all duration-500"
        >
          <Settings
            size={14}
            className="mr-2 group-hover:translate-x-1 transition-all duration-300"
          />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="group py-2 font-medium cursor-pointer transition-all duration-500">
          <div
            className="group flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex mr-2">
              <Sun
                size={14}
                className="group-hover:text-yellow-600 dark:scale-0"
              />
              <Moon
                size={14}
                className="group-hover:text-blue-400 scale-0 dark:scale-100 absolute"
              />
            </div>
            <p className="dark:text-blue-400 text-secondary-foreground/25 font-bold text-xs text-yellow-400">
              {theme![0].toUpperCase() + theme?.slice(1)} Mode
            </p>
            <Switch
              className="scale-75 ml-4"
              checked={checked}
              onCheckedChange={(e) => {
                setChecked((prev) => !prev);
                if (e) setTheme("dark");
                if (!e) setTheme("light");
              }}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group py-2 focus:bg-destructive/25 font-medium cursor-pointer transition-all duration-500"
          onClick={() => signOut()}
        >
          <LogOut
            size={14}
            className="mr-2 group-hover:translate-x-1 transition-all duration-300"
          />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
