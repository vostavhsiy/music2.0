import { Facebook, Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="bg-background py-10">
      <div className="flex flex-col gap-20 w-4/5 mx-auto">
        <div className="flex items-stretch gap-10 justify-between">
          <div className="w-1/3 flex flex-col justify-between gap-8">
            <div className="flex items-center gap-4">
              <Image
                src={"/sidebar-logo.png"}
                alt="logo"
                width={500}
                height={500}
                className="w-[50px] aspect-square rounded-lg"
              />
              <span className="font-semibold text-lg">Musichub</span>
            </div>
            <Link
              className="text-2xl font-bold underline"
              href={"tel: +7(951)7893502"}
            >
              +7 (951) 789 35 02
            </Link>
            <h3 className="text-base font-semibold">
              atoyanrobert21@gmail.com
            </h3>
          </div>
          <div className="mt-[14px] w-1/2 flex flex-col gap-12">
            <h3 className="font-semibold text-xl">Quick links</h3>
            <div className="grid grid-cols-2 gap-10 underline">
              <Link href={"/users/1"}>Home</Link>
              <Link href={"/songs/1"}>Audio</Link>
              <Link href={"/playlists/1"}>Playlists</Link>
              <Link href={"/users/1"}>Community</Link>
            </div>
          </div>
        </div>
        <div className="border-t-2 pt-10 border-foreground/50">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                className="flex items-center justify-center w-[50px] aspect-square border-[2px] rounded-full border-gray-600/50"
                href={"https://github.com/RockyAtoyan"}
              >
                <Github />
              </Link>
              <Link
                target="_blank"
                className="flex items-center justify-center w-[50px] aspect-square border-[2px] rounded-full border-gray-600/50"
                href={"https://www.instagram.com/rocky.atoyan"}
              >
                <Instagram />
              </Link>
              <Link
                target="_blank"
                className="flex items-center justify-center w-[50px] aspect-square border-[2px] rounded-full border-gray-600/50"
                href={"#"}
              >
                <Facebook />
              </Link>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
              The product of <span className="font-bold">Musichub</span>
            </div>
            <h3 className="text-lg font-semibold">
              © {new Date().getFullYear()} Musichub. All rights reserved
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
