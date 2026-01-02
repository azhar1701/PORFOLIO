
import React from 'react';
import type { Credential } from '../types';

const CredentialLogo: React.FC<{ name: string }> = ({ name }) => (
    <div className="flex items-center justify-center h-16 w-48 bg-slate-800/50 rounded-md border border-slate-700">
        <p className="text-slate-400 font-semibold tracking-wider">{name}</p>
    </div>
);

const CredentialsBar: React.FC<{ credentials: Credential[] }> = ({ credentials }) => {
  // Duplicate the array for a seamless loop
  const displayCredentials = credentials.concat(credentials);
  
  return (
    <div className="bg-slate-900/70 py-12 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {displayCredentials.map((credential, index) => (
            <div key={index} className="mx-4">
              <CredentialLogo name={credential.name} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CredentialsBar;
