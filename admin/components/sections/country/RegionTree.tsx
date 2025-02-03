import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface SubRegion {
    _id: string;
    name: string;
  }
  
  interface Region {
    _id: string;
    region: string;
    subRegions: SubRegion[];
  }
  
  interface Country {
    _id: string;
    name: string;
    regions: Region[];
  }
  
  interface RegionTreeProps {
    countries: Country[];
  }
  
  const RegionTree: React.FC<RegionTreeProps> = ({ countries }) => {
    const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
    const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  
    const handleCountryToggle = (countryId: string) => {
      setExpandedCountries((prev) => {
        const newExpanded = new Set(prev);
        if (newExpanded.has(countryId)) {
          newExpanded.delete(countryId);
        } else {
          newExpanded.add(countryId);
        }
        return newExpanded;
      });
    };
  
    const handleRegionToggle = (regionId: string) => {
      setExpandedRegions((prev) => {
        const newExpanded = new Set(prev);
        if (newExpanded.has(regionId)) {
          newExpanded.delete(regionId);
        } else {
          newExpanded.add(regionId);
        }
        return newExpanded;
      });
    };
  
    return (
      <div>
        {countries.map((country) => (
          <div key={country._id}>
            {/* Country Name */}
            <div
              onClick={() => handleCountryToggle(country._id)}
              className="cursor-pointer font-semibold text-lg mt-2"
            >
              {expandedCountries.has(country._id) ? (
                <ChevronDownIcon className="w-5 h-5 inline-block mr-2" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 inline-block mr-2" />
              )}
              {country.name}
            </div>
  
            {/* Regions of the country */}
            <div
              className={`ml-4 transition-all duration-300 ${
                expandedCountries.has(country._id) ? 'block' : 'hidden'
              }`}
            >
              {country.regions.map((region) => (
                <div key={region._id}>
                  {/* Region Name */}
                  <div
                    onClick={() => handleRegionToggle(region._id)}
                    className="cursor-pointer flex items-center space-x-2"
                  >
                    {expandedRegions.has(region._id) ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                    <span>{region.region}</span>
                  </div>
  
                  {/* Subregions of the region */}
                  <div
                    className={`ml-4 space-y-2 transition-all duration-300 ${
                      expandedRegions.has(region._id) ? 'block' : 'hidden'
                    }`}
                  >
                    {region.subRegions.map((subRegion , index) => (
                      <div key={subRegion._id}>{"|     "}{index+ 1}. {subRegion.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default RegionTree;