import React from 'react';

const ResponsiveMessage = () => {
  return (
    <div className="z-50 fixed inset-0 bg-slate-50 flex items-center justify-center lg:hidden">
      <div className="text-center p-4">
        <p className="text-zinc-800 text-xl">This page looks better on Desktop</p>
        <p className="text-zinc-800 text-lg mt-4">Please view on a larger screen for the best experience.</p>
      </div>
    </div>
  );
};

export default ResponsiveMessage;