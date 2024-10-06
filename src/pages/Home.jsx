import { Container, CountryList, Heading, Loader, Section } from 'components';
import { getCountries } from '../service/countryApi';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCountries();
        setCountries(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {loading && <Loader />}
        <CountryList countries={countries} />
        {error && <Heading title={error} bottom />}
      </Container>
    </Section>
  );
};
