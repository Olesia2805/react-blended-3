import { Container, CountryList, Heading, Loader, SearchForm, Section } from 'components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/countryApi.js';


export const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchByRegion(region);
        setCountries(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  fetchData();
}, [searchParams]);

  const onSubmit = (region) => {
    setSearchParams({ region });
  }
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit}/>
        <Heading title="SearchCountry" bottom />
        {loading && <Loader />}
        <CountryList countries={countries} />
        {error && <Heading title={error} bottom />}
      </Container>
    </Section>
  );
};
