"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Scrollbar } from "swiper/modules";
import { ISong } from "@/lib/types/ISong";
import { UserPlaylist } from "./UserPlaylist";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import Link from "next/link";
import { IPlaylist } from "@/lib/types/IPlaylist";

interface Props {
  playlists: IPlaylist[];
  userId: string;
}

export function UserPlaylistsSlider({ playlists, userId }: Props) {
  const sliderRef = useRef<SwiperType>();
  const nextEl = useRef<HTMLButtonElement>(null);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slideNext();
  }, []);

  return (
    <div className="mt-20">
      <div className="mb-8 text-primary flex justify-between gap-2 items-center">
        <h2 className="text-4xl font-semibold">
          Your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            playlists
          </span>
        </h2>
        <Link
          className="text-slate-300 uppercase"
          href={`/dashboard/playlists`}
        >
          See all
        </Link>
      </div>
      <div className="flex items-stretch gap-2">
        <Swiper
          className="w-full"
          modules={[Scrollbar]}
          scrollbar={{
            draggable: true,
            hide: true,
          }}
          spaceBetween={50}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            sliderRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            if (swiper.isEnd) {
              nextEl.current?.setAttribute("disabled", "true");
            } else {
              nextEl.current?.removeAttribute("disabled");
            }
          }}
          breakpoints={{
            1900: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {playlists.map((playlist) => {
            return (
              <SwiperSlide key={playlist.id}>
                <UserPlaylist playlist={playlist} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="w-20 flex items-center justify-center">
          <Button
            ref={nextEl}
            className="rounded-full"
            size={"icon"}
            variant={"outline"}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
