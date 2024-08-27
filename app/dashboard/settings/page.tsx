import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./SettingsCard";

const SettingsPage = async () => {
  const session = await auth();
  if (!session) redirect("/");
  if (session) return <SettingsCard />; 
};

export default SettingsPage;
