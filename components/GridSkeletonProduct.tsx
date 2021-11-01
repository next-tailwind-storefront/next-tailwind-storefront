export default function GridSkeletonProduct() {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full animate-pulse">
      <a className="block relative h-48 rounded overflow-hidden">
        <div className="bg-gray-300 w-full h-full block" />
      </a>
      <div className="mt-4">
        <div className="w-16 bg-gray-300 h-3 rounded-sm mb-2"></div>
        <div className="w-52 bg-gray-300 h-6 rounded-sm mb-4"></div>
        <div className="w-24 bg-gray-300 h-4 rounded-sm"></div>
      </div>
    </div>
  );
}
