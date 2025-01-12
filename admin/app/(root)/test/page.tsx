'use client';

import DropDownForm from '@/components/form/dropDownForm';
import InputForm from '@/components/form/InputForm';
import React from 'react';

import { Option } from '@/components/ui/multiselect';
import MultiSelectForm from '@/components/form/multiSelectForm';
const frameworks: Option[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js', disable: true },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'ember', label: 'Ember.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'eleventy', label: 'Eleventy', disable: true },
  { value: 'solid', label: 'SolidJS' },
  { value: 'preact', label: 'Preact' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'alpine', label: 'Alpine.js' },
  { value: 'lit', label: 'Lit' },
];

const productsPage = () => {
  return (
    <div className="w-full p-5 grid grid-cols-2 gap-4 h-full">
      <div className="w-full h-full">
        <MultiSelectForm
          className="custom-class"
          title="Select Frameworks"
          placeholder="Choose frameworks"
          defaultOptions={frameworks}
          defaultValue={[frameworks[0], frameworks[1]]}
          onChange={(selectedOptions) =>
            console.log('Selected options:', selectedOptions)
          }
          hideClearAllButton
          hidePlaceholderWhenSelected
          required
        />

        <InputForm
          className="custom-class"
          title="Email Address"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => console.log(e.target.value)}
        />

        <InputForm
          className="custom-class"
          title="Email Address"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => console.log(e.target.value)}
          defaultValue="example@example.com"
          error={true}
          errorMessage="This field is required"
        />

        <DropDownForm
          required={true}
          className="w-full"
          title="Choose an option"
          options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
          onChange={(value) => console.log('Selected option:', value)}
        />
      </div>
    </div>
  );
};

export default productsPage;
