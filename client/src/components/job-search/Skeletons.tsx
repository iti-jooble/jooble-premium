export const JobListingSkeleton = () => (
  <div className="md:col-span-2">
    <div className="space-y-2 min-h-[80%] relative">
      {[...Array(6)].map((_, i) => (
        <div className="bg-white rounded-xl mb-3 shadow-sm animate-pulse">
          <div className="grid grid-cols-12 gap-4">
            {/* Job Content Skeleton */}
            <div className="col-span-9 p-6">
              {/* Company info and posted date skeleton */}
              <div className="flex items-center text-sm mb-2">
                <div className="w-10 h-10 rounded-lg mr-4 bg-gray/30"></div>
                <div className="flex flex-col">
                  <div className="h-4 w-24 bg-gray/40 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-gray/30 rounded"></div>
                </div>
              </div>
              {/* Job title skeleton */}
              <div className="h-5 w-[50%] bg-gray/40 rounded mb-3"></div>
              {/* Job details grid skeleton */}
              <div className="grid grid-cols-7 gap-x-4 gap-y-2 mt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                  flex items-center 
                  ${i === 0 ? "col-span-3 pr-2" : ""}
                  ${i === 1 ? "col-span-2 pr-2" : ""}
                  ${i === 2 ? "col-span-2" : ""}
                  ${i === 3 ? "col-span-3 pr-2" : ""}
                  ${i === 4 ? "col-span-2 pr-2" : ""}
                  ${i === 5 ? "col-span-2" : ""}
                `}
                  >
                    <div className="h-4 w-4 rounded bg-gray/30 mr-1 flex-shrink-0"></div>
                    <div className="h-3 w-20 bg-gray/30 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Match Score Skeleton */}
            <div className="col-span-3 flex justify-center items-center flex-col p-6 border-l border-gray-200">
              <div className="w-14 h-14 bg-gray/40 rounded-xl mb-4"></div>
              <div className="h-3 w-16 bg-gray/30 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
