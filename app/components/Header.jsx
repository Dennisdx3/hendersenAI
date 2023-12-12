import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import logo from "../../public/logoH.svg";

const Header = async () => {
  const { userId } = auth();

  return (
    <div>
      <nav className="bg-gray-700 py-4 px-6 flex items-center justify-between mb-0 shadow-md shadow-slate-500">
        <div className="flex items-center">
          <Link href="https://www.hendersen.com">
            <Image
              src={logo}
              alt="Hendersen"
              width={28}
              className="mr-2 hover:opacity-80"
            />
          </Link>
          <Link href="/">
            <div className="text-sm flex items-center uppercase text-white mr-10 hover:text-slate-200">
              AI.Hendersen
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center uppercase text-slate-400 hover:text-white mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center uppercase text-slate-400 hover:text-white mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="text-white text-sm flex items-center">
          {!userId && (
            <>
              <Link
                href="sign-in"
                className="text-gray-300 hover:text-white mr-4 "
              >
                Sign In
              </Link>
              <Link
                href="sign-up"
                className="text-gray-300 hover:text-white mr-4 hidden sm:block"
              >
                Sign Up
              </Link>
            </>
          )}

          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </div>
  );
};
export default Header;
