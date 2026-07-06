import { Header } from "@/components/dashboard/Header";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,100,168,0.3),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(79,209,197,0.11),_transparent_28%),linear-gradient(180deg,#0a1830_0%,#07111f_46%,#040812_100%)] text-console-text">
      <div className="mx-auto flex min-h-screen max-w-[880px] flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <DashboardClient />
      </div>
    </main>
  );
}