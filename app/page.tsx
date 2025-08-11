import React from 'react';
import {moreDists} from '@/temp/tempData';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full xl:p-20 lg:p-16 md:p-12 sm:p-8 p-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center'>
        {moreDists.map((item, index) => (
          <div key={index}
          className='max-w-[250px] p-5 bg-gray-200 rounded-lg'
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500">Created at: {new Date(item.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 max-h-20  overflow-hidden">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
