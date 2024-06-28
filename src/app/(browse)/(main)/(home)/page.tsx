import Image from "next/image";
import { auth, currentUser } from "@/lib/services/auth.service";
import { LogoutButton } from "@/components/LogoutButton";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center justify-between p-24"></div>
  );
}
