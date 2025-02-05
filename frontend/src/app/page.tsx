'use client';
import {cn} from "@/lib/utils";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main
        className={cn('')}
      >
        Wellcome to the home page.
        Click here to go to the <a className={'text-blue-500'} href="/dashboard">dashboard</a>
      </main>
    </div>
  );
}
