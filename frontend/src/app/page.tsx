'use client';

import Image from "next/image";
import Dashboard from "@/components/Dashboard";
import {cn} from "@/lib/utils";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/*<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">*/}
      {/*  <Dashboard/>*/}
      {/*</main>*/}
      <main
        className={cn(
          ''
          // 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#202404] to-[#e3dfd9]',
          // font.className
        )}
      >
        {/*<Navbar/>*/}
        {/*<Hero/>*/}
        {/*<Dashboard/>*/}
        {/*<PopupWidget />*/}
      </main>
    </div>
  );
}
