import Image from "next/image";

const BulletLogo = () => {
  return (
    <Image
      src={"/icons/bulletListLogo.png"}
      alt="bullet logo"
      width={20}
      height={20}
    />
  );
};

export default BulletLogo;
