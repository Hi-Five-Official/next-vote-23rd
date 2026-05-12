import Profile from "@/app/assets/icons/icon_profile.svg";

type ProfileProps = {
  name: string;
  university: string;
};

function ProfileCard({ name, university }: ProfileProps) {
  return (
    <div className="bg-purple-10 flex w-full items-center gap-3 rounded-[var(--radius-12)] border border-purple-50 px-2 py-2 md:px-3">
      <div>
        <Profile className="size-12 text-purple-50" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="text-caption1-sb md:text-body1-sb text-black">{name}</div>
        <div className="text-caption2-sb text-purple-60 md:text-body2-sb">{university}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
