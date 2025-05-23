import React from "react";

export const JobDetailsSkeleton: React.FC<{}> = () => (
  <>
    <div className="flex items-start gap-4 animate-pulse">
      <div className="w-20 h-20 rounded-lg bg-gray/30 flex items-center justify-center"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray/30 rounded"></div>
        <div className="h-8 w-3/4 bg-gray/40 rounded"></div>
        <div className="h-3 w-16 bg-gray/30 rounded"></div>
      </div>
    </div>

    <div className="mb-3 mt-9 p-6 bg-primary-background rounded-lg overflow-hidden rounded-xl animate-pulse">
      <div className="flex flex-col">
        {/* Score and Title Skeleton */}
        <div className="flex items-center mb-5">
          {/* Score Block Skeleton */}
          <div className="bg-gray/40 rounded-lg w-14 h-14 flex items-center justify-center mr-4"></div>

          {/* Title and Subtitle Skeleton */}
          <div>
            <div className="h-6 w-32 bg-gray/40 rounded mb-2"></div>
            <div className="h-4 w-52 bg-gray/30 rounded"></div>
          </div>
        </div>

        {/* Criteria Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div className="flex items-start" key={i}>
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="h-6 w-6 bg-gray/40 rounded-full"></div>
                  </div>
                  <div>
                    <div className="h-4 w-28 bg-gray/40 rounded mb-1"></div>
                    <div className="h-3 w-20 bg-gray/30 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    <JobDescriptionSkeleton />
  </>
);

export const JobDescriptionSkeleton: React.FC<{}> = () => (
  <div>
    {/* Summary skeleton */}
    <div className="py-3 animate-pulse">
      <div className="h-5 my-1 w-24 bg-gray/40 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray/30 rounded"></div>
        <div className="h-4 w-3/4 bg-gray/30 rounded"></div>
        <div className="h-4 w-2/3 bg-gray/30 rounded"></div>
      </div>
    </div>

    {/* Toolstack/Skills skeleton */}
    <div className="py-3 animate-pulse">
      <div className="h-5 my-1 w-20 bg-gray/40 rounded mb-4"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2"
          >
            <div className="h-4 w-16 bg-gray/30 rounded"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="py-3 animate-pulse">
      <div className="h-5 w-40 bg-gray/40 rounded mb-4"></div>
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
        {[...Array(5)].map((_, i) => (
          <li key={i}>
            <div className="h-4 w-3/4 bg-gray/30 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
