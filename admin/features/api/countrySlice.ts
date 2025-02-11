import { metadata } from '@/app/layout';
import { apiSlice } from './apiSlice';

interface Country {
  name: string;
}

interface Region {
  region: string;
}

interface SubRegion {
  countryId: string;
  regionId: string;
  subRegion: string;
}

interface CountryUpdateData {
  id: string;
  name: string;
}

interface RegionUpdateData {
  id: string;
  region: string;
}

interface SubRegionUpdateData {
  id: string;
  name: string;
}

export const countrySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    countryCreate: builder.mutation<Country, Country>({
      query: (data) => ({
        url: '/country/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Country',"metaData"],
    }),

    countryUpdate: builder.mutation<Country, CountryUpdateData>({
      query: (data) => ({
        url: `/country/update/${data.id}`,
        method: 'PUT',
        body: { name: data.name },
      }),
      invalidatesTags: ['Country'],
    }),

    regionCreate: builder.mutation<Region, Region>({
      query: (data) => ({
        url: `/wineRegions/add/${data.region}`,
        method: 'POST',
        body: { region: data.region },
      }),
      invalidatesTags: ['Region'],
    }),

    regionUpdate: builder.mutation<Region, RegionUpdateData>({
      query: (data) => ({
        url: `/wineRegions/update/${data.id}`,
        method: 'PUT',
        body: { region: data.region },
      }),
      invalidatesTags: ['Region'],
    }),

    subRegionCreate: builder.mutation<SubRegion, SubRegion>({
      query: (data) => ({
        url: '/subRegions/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SubRegion'],
    }),

    subRegionUpdate: builder.mutation<SubRegion, SubRegionUpdateData>({
      query: (data) => ({
        url: `/subRegions/update/${data.id}`,
        method: 'PUT',
        body: { name: data.name },
      }),
      invalidatesTags: ['SubRegion'],
    }),
  }),
});

export const {
  useCountryCreateMutation,
  useCountryUpdateMutation,
  useRegionCreateMutation,
  useRegionUpdateMutation,
  useSubRegionCreateMutation,
  useSubRegionUpdateMutation,
} = countrySlice;
