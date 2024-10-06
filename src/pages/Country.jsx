import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByRegion, fetchCountry } from 'service/countryApi.js';

export const Country = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [country, setCountry] = useState(null);
  // console.log(params.countryId);
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchCountry(params.countryId);
        setCountry(response);
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
        {error && <Heading title={error} bottom />}
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};
