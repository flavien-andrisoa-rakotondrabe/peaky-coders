import Image from "next/image";

export default function Logo() {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Image
        src="/logo.png"
        alt="logo"
        width={44}
        height={44}
        className="object-cover"
      />

      <p className="font-bold text-2xl">
        Mada{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-b from-[#F20914] from-50% to-[#00803B] to-50%">
          Smart
        </span>
      </p>
    </label>
  );
}
