import Image from "next/image";
import Link from "next/link";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Save The Date",
  description: "Plan your next event and let your people know!",
};

const Home = async () => {
  const user = await getServerSession(authOptions);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <LargeHeading
            size="lg"
            className="three-d text-black dark:text-light-gold"
          >
            Event Your <br /> Life Today.
          </LargeHeading>

          <Paragraph className="max-w-xl lg:text-left">
            Plan. Invite. Rock 🎉
            <br />
            <Link
              href={user ? "/event" : "/login"}
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              Check it out
            </Link>
            
          </Paragraph>

          <div className="relative w-full max-w-xl lg:max-w-xl lg:left-1/2 aspect-square lg:absolute">
            <Image
              priority
              className="img-shadow"
              quality={100}
              style={{ objectFit: "contain" }}
              fill
              src="/oldwatch.png"
              alt="Old Timepiece Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
