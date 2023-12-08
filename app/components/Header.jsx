import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  console.log(auth());
  const { userId } = auth();

  return (
    <div>
      <nav className="bg-gray-700 py-4 px-6 flex items-center justify-between mb-5 shadow-md shadow-slate-500">
        <div className="flex item-center">
          <Link href="/">
            <div className="text log uppercase text-white">Hendersen AI</div>
          </Link>
        </div>
        <div className="text-white flex items-center">
          {!userId && (
            <>
              <Link
                href="sign-in"
                className="text-gray-300 hover:text-white mr-4"
              >
                Sign In
              </Link>
              <Link
                href="sign-up"
                className="text-gray-300 hover:text-white mr-4"
              >
                Sign Up
              </Link>
            </>
          )}
          <UserButton />
        </div>
      </nav>
    </div>
  );
};
export default Header;
