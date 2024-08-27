"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Moon, Settings, Sun, TruckIcon, Pickaxe } from "lucide-react";

const UserButton = ({ user, expires }: Session) => {
  return (
    <>
      <DropdownMenu>
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
          <DropdownMenuItem className="mb-4 p-4 flex-col items-center bg-primary/25 rounded-lg">
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
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <Pickaxe size={14} className="mr-1" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <TruckIcon size={14} className="mr-1" />
            My Orders
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <Settings size={14} className="mr-1" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <div className="flex items-center">
              <Sun size={14} />
              <Moon size={14} />
              <p>
                Theme <span>theme</span>{" "}
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
