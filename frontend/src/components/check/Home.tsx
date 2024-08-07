import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col text-center gap-8 items-center text-white">
      <div className="hidden md:block">
        <Image
          src="/home.svg"
          width={350}
          height={0}
          alt="people searching for something"
        />
      </div>
      <h1 className="font-bold uppercase text-3xl tracking-wider">
        The best Web App for
        <span className="text-secondary"> Website Monitoring</span>
      </h1>

      <div className="md:w-1/2">
        Welcome to our website which allows you to check your different urls,
        you can do a free url check or sign up for free to the application to
        get more features:
      </div>
    </div>
  );
}
