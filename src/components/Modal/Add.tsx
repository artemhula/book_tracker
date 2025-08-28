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
            className={`${
              index === tabIndex ? 'bg-gray-900 text-white ' : ''
            } border-gray-900 border-2 rounded-lg px-3 py-0.5 transition-colors duration-300 cursor-pointer`}
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
