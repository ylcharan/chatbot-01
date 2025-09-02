import { Chat } from "@/components/Chat";
import PrevChat from "@/components/PrevChat";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <PrevChat />
      <Chat />
    </div>
  );
}
