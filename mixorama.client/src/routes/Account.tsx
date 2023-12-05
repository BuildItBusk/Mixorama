import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const { user, login, isAuthenticated } = useAuth() || {};

  if (!isAuthenticated && login) {
    login();
    return <div>Redirecting to login...</div>;
  }

  const renderClaimsTable = function (claims: { type: string; value: string }[]) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim =>
            <tr key={claim.type}>
              <td>{claim.type}</td>
              <td>{claim.value}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 id="tabelLabel">User claims</h1>
      <p>This component demonstrates fetching user identity claims from the server.</p>
      {renderClaimsTable(user || [])}
    </div>
  );
};

export default User;
