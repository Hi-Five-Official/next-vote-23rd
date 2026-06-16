import ProfileIcon from "@/assets/icons/icon_profile_regular.svg";

interface ProfileProps {
  name: string;
  university: string;
}

const ProfileCard = ({ name, university }: ProfileProps) => {
  return (
    <div className="bg-purple-10 rounded-12 flex w-full items-center gap-3 border border-purple-50 px-2 py-2 md:px-3">
      <div>
        <ProfileIcon className="size-12 text-purple-50" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="text-caption1-sb md:text-body1-sb text-black">{name}</p>
        <p className="text-caption2-sb text-purple-60 md:text-body2-sb">{university}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
