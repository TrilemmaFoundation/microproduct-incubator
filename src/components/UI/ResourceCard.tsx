import { memo } from "react";

interface ResourceCardProps {
  title: string;
  docUrl: string;
  readTimeMinutes: number;
}

const ResourceCard = memo<ResourceCardProps>(
  ({ title, docUrl, readTimeMinutes }) => {
    const handleCardClick = () => {
      window.open(docUrl, "_blank", "noopener,noreferrer");
    };

    return (
      <button
        type="button"
        className="flex flex-col items-center p-4 gap-2.5 m-0 mx-auto w-full max-w-full sm:max-w-[357px] rounded-[20px] flex-none order-0 self-stretch border border-white cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
        style={{
          background:
            "linear-gradient(180deg, rgba(61, 61, 122, 0.5) 0%, rgba(10, 10, 20, 0.5) 100%)",
        }}
        onClick={handleCardClick}
      >
        {/* Title */}
        <div className="flex flex-row justify-center items-center p-0 gap-2.5 w-full min-h-[28px] flex-none order-1 self-stretch">
          <h3 className="w-auto font-bold text-xl sm:text-2xl leading-7 text-white flex-none order-0 text-center">
            {title}
          </h3>
        </div>

        {/* Read Time Metadata */}
        <div className="flex flex-row justify-center items-center w-full flex-none order-2">
          <span className="text-white text-sm">{readTimeMinutes} min read</span>
        </div>
      </button>
    );
  },
);

ResourceCard.displayName = "ResourceCard";

export default ResourceCard;
