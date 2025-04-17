import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ISBNForm } from '../ISBNForm/ISBNForm';
import ManualForm from '../ManualForm';

const tabs = ['By ISBN', 'Manually'];

export default function Add() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className="flex flex-row gap-3 font-geist mb-5">
        {tabs.map((tab, index) => (
          <Tab
            className={`px-4 py-1 rounded-lg border-2 transition-colors duration-200 cursor-pointer
                ${
                  index === tabIndex
                    ? 'bg-gray-900 text-white border-gray-900 shadow'
                    : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
                }
                `}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
        <ISBNForm />
      </TabPanel>
      <TabPanel>
        <ManualForm />
      </TabPanel>
    </Tabs>
  );
}
