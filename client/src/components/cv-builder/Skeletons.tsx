export const CvSkeleton = () => (
  <div className="w-full mx-auto p-8 bg-white rounded-xl shadow animate-pulse">
    {/* Фото й ім'я */}
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-20 h-20 rounded-full bg-gray/30"></div>
      <div>
        <div className="h-6 w-40 bg-gray/40 rounded mb-2"></div>
        <div className="h-4 w-28 bg-gray/30 rounded"></div>
      </div>
    </div>

    {/* Контакти */}
    <div className="flex space-x-6 mb-6">
      <div className="h-3 w-16 bg-gray/30 rounded"></div>
      <div className="h-3 w-24 bg-gray/30 rounded"></div>
      <div className="h-3 w-20 bg-gray/30 rounded"></div>
    </div>

    {/* Summary */}
    <div className="mb-6">
      <div className="h-4 w-20 bg-gray/40 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray/30 rounded mb-1"></div>
      <div className="h-4 w-5/6 bg-gray/30 rounded"></div>
    </div>

    {/* Досвід роботи */}
    <div className="mb-6">
      <div className="h-4 w-32 bg-gray/40 rounded mb-3"></div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-4">
          <div className="h-4 w-40 bg-gray/30 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-100 rounded mb-1"></div>
          <div className="h-3 w-56 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>

    {/* Освіта */}
    <div className="mb-6">
      <div className="h-4 w-20 bg-gray/40 rounded mb-3"></div>
      <div className="h-4 w-36 bg-gray/30 rounded mb-2"></div>
      <div className="h-3 w-24 bg-gray-100 rounded"></div>
    </div>

    {/* Навички */}
    <div>
      <div className="h-4 w-20 bg-gray/40 rounded mb-3"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 w-16 bg-gray/30 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);
