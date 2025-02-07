'use client';
import {cn} from "@/lib/utils";

export default function Home() {
  return (
    <div
      className="h-[100vh] flex items-center justify-center">
      <main
        className={cn('')}
      >
        Wellcome to the home page!
        Click here to go to the <a className={'text-blue-500'} href="/dashboard">dashboard</a>
      </main>
    </div>
  );
}
