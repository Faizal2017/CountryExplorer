import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton loader for country cards during loading
function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <Skeleton height={208} /> {/* Flag placeholder */}
      <div className="p-6">
        <Skeleton width={150} height={24} className="mb-3" /> {/* Title */}
        <Skeleton count={3} height={16} className="mb-2" /> {/* Details */}
        <Skeleton width={120} height={40} /> {/* Button */}
      </div>
    </div>
  );
}

export default SkeletonCard;