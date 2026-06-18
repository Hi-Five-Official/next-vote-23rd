import Image from "next/image";
import Link from "next/link";

import { CONTRIBUTORS } from "@/constants/contributors";

const Page = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 md:mb-10">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60">CONTRIBUTORS</h1>
        <p className="text-body2-m md:text-body1-m text-gray-80 mt-1.5">TEAM. DITDA</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:gap-4">
        {CONTRIBUTORS.map(({ username, name, role }) => (
          <li key={username}>
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-purple-20 hover:border-purple-40 rounded-20 bg-purple-fade flex flex-col items-center gap-4 border px-4 py-6 transition-all duration-200 hover:shadow-lg md:py-8"
            >
              <div className="relative size-20 md:size-24">
                <Image
                  src={`https://github.com/${username}.png`}
                  alt={`${name} 프로필 이미지`}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="ring-purple-20 group-hover:ring-purple-40 rounded-full object-cover ring-2 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-body2-sb md:text-heading3-sb text-black">{name}</span>
                <span className="text-caption2-m md:text-caption1-m bg-purple-10 text-purple-60 rounded-50 px-3 py-0.5">
                  {role}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
