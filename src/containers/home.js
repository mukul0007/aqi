import React, { Component } from 'react';

import { getAqiData } from '../services/aqiService';
import { getGeocodeData } from '../services/geocodeSevice';
import { Loader } from '../components/loader';
import { Title } from '../components/title';
import { ErrorTitle } from '../components/errorTitle';
import { ThemeSwitcher } from './themeSwitcher';

import { Map } from './map';

export class Home extends Component {
  state = {
    loading: false,
    data:[],
    error: false
  };

  componentDidMount() {
    //Fetch Data
    this.fetchAqiData();
  }

  async fetchAqiData() {
    this.setState({ loading : true});

    try {
      //Get Aqi data from gov api
      const aqiResponseData = await Promise.all([getAqiData(), getAqiData(1)]);
      const aqiData = [...aqiResponseData[0], ...aqiResponseData[1]];

      //Get geocodes and fill them in stations
      const result = await this.fetchAndFillCoordinateData(aqiData);

      this.setState({ data : result, updatedAt: result[0].updatedAt, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }

  fetchAndFillCoordinateData(aqiData) {
    const promises = aqiData.map(async ({address, ...others}) => { 
        try {
            const [longitude, latitude] = await getGeocodeData(address);
            return { address, longitude, latitude, ...others };
        } catch(e) {
            console.log('Error getting Lat Long ->', e);
        }
    });
    
    return Promise.all(promises);
  }

  render() {
    const { loading, data, updatedAt, error } = this.state;

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
  }
}
