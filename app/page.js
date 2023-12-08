import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>Welcome to Hendersen AI</div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
