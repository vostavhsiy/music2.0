import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const NotFound = () => {
  return (
		<div
			className={
				'h-screen flex mb:max-md:flex-col items-center justify-center gap-8'
			}
		>
			<Link href={'/'} className={'flex items-center gap-8'}>
				<Image
					src={'/sidebar-logo.png'}
					alt={'logo'}
					width={500}
					height={500}
					className={cn(
						'w-[100px] aspect-square object-cover object-center transition-all'
					)}
				/>
				<h1 className={cn('text-3xl font-semibold')}>Musichub</h1>
			</Link>
			<Separator
				orientation={'vertical'}
				className={'mb:max-md:h-[1px]  mb:max-md:w-3/4 h-40'}
			/>
			<h1
				className={
					'text-8xl font-semibold bg-gradient-to-bl from-teal-400 to-fuchsia-600 bg-clip-text text-transparent'
				}
			>
				404
			</h1>
		</div>
	)
};

export default NotFound;
