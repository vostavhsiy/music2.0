"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { INotification } from "@/lib/types/INotification";
import { FC, useState } from "react";
import Link from "next/link";

interface Props {
  notifications: INotification[];
}

export const Notifications: FC<Props> = ({ notifications }) => {
  const [open, setOpen] = useState(false);

  return (
		<Popover
			defaultOpen={open}
			open={open}
			onOpenChange={value => setOpen(value)}
		>
			<PopoverTrigger asChild>
				<Button
					size={'icon'}
					className={
						'relative h-[52px] aspect-square w-auto rounded-full bg-background text-primary hover:text-background'
					}
				>
					<Bell />
					{!!notifications.length && (
						<span
							className={
								'absolute top-0 right-0  block w-[25%] aspect-square rounded-full bg-gradient-to-r from-amber-500 to-pink-500'
							}
						></span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='min-w-96 mb:max-md:min-w-60 mr-3 h-[260px] overflow-hidden'>
				{!!notifications.length ? (
					<div className='p-1 flex flex-col gap-8 h-full overflow-auto'>
						{notifications.map(not => {
							return (
								<Link
									className={'w-max font-semibold hover:underline'}
									href={not.link || '/'}
									key={not.id}
									onClick={() => setOpen(false)}
								>
									{not.text}
								</Link>
							)
						})}
					</div>
				) : (
					<h2 className={'text-destructive'}>No messages!</h2>
				)}
			</PopoverContent>
		</Popover>
	)
};
