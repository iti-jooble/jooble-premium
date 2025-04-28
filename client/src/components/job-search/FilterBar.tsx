import { useTranslation } from "react-i18next";

export const FilterBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-72 ml-6">
      <h2 className="text-xl font-semibold mb-5">Filters</h2>
      
      {/* Simple list of filter items */}
      <div className="flex flex-col gap-4">
        {/* Location Filter */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-medium">Location</h3>
        </div>
        
        {/* Experience Level */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-medium">Experience Level</h3>
        </div>
        
        {/* Job Type */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-medium">Job Type</h3>
        </div>
      </div>
    </div>
  );
};