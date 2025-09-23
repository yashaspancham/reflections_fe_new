import Image from "next/image";


const AuthPagelayout = ({ children }: { children: React.ReactNode }) => {
    return     <div className="w-full min-h-[800px] h-full xl:p-20 lg:p-15 md:p-10 sm:p-5 p-2 flex flex-col items-center justify-center">
          <div className="bg-gray-100 rounded-lg p-8 flex gap-10 items-center justify-center">
            <div className="flex flex-col gap-2">
                {children}
            </div>
            <div className=" max-xl:hidden h-[600px] w-[500px] flex">
              <Image
                src={"/AuthPagesImg.png"}
                alt="Image for authPage"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
}

export default AuthPagelayout;