import React, { useState } from 'react';

export const Secret: React.FC = () => {
    
    const [secret, setSecret] = useState<string>("No secret yet!");

    const getSecret = async () => {
        const response = await fetch('auth/secret');
        const json = await response.json();
        setSecret(json.message);
    }

    getSecret();

  return (
    <div>
      {secret}
    </div>
  );
};

export default Secret;
