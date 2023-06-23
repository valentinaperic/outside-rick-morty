import React from 'react';

type HeaderProps = {
  totalRecords: number;
  name: string;
};

const Header: React.FC<HeaderProps> = ({ totalRecords, name }) => {
  return (
    <header>
      <h1>Rick and Morty</h1>
      {name && (
        <h2>{name}</h2>
      )}
      <p>Total Records: {totalRecords}</p>
    </header>
  );
};

export default Header;
