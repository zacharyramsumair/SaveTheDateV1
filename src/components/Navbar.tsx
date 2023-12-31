import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Save The Date v1.0
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <ThemeToggle />

          {session ? (
            <>
              <div className="relative">
                <Image
                  priority
                  className="rounded-full"
                  quality={100}
                  width={40} // Set the desired width
                  height={40} // Set the desired height
                  alt="Profile Picture"
                  src={session?.user?.image || "placeholder"}
                />
                <div className="absolute inset-0 rounded-full" />
              </div>
              <SignOutButton />
            </>
          ) : (
            <>
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
