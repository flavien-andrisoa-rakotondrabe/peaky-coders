import Image from "next/image";
import Link from "next/link";

export default function BigLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex flex-col gap-2 justify-center items-center mb-10 select-none">
        {/* <Logo /> */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-cover"
        />

        <p className="font-bold text-5xl cursor-default">
          Mada{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-b from-[#F20914] from-50% to-[#00803B] to-50%">
            Smart
          </span>
        </p>
      </div>
    </Link>
  );
}
