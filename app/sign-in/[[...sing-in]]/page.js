import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen flex justify-center mt-10">
      <SignIn />
    </div>
  );
}
