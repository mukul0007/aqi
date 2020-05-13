import React from 'react';

import { Loader } from '../components/loader';
import { Title } from '../components/title';
import { ErrorTitle } from '../components/errorTitle';
import { ThemeSwitcher } from './themeSwitcher';

import { Map } from './map';
import { useMapData } from '../hooks/mapData';

export const Home = () => {
  const [loading, { data, updatedAt }, error] = useMapData();

  return (
    <>
      { 
        loading ? 
          <Loader /> :
            error ? <ErrorTitle /> : <Title updatedAt={updatedAt} />
      }
      <ThemeSwitcher />
      <Map data={data}/>
    </>
  );
};
