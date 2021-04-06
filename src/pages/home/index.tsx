import { DateTime } from 'luxon';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import qs from 'querystring';
import React from 'react';
import Home from '~/components/pages/home/Home';
import { loadObjects } from '~/lib/api';
import { IJITData } from '~/lib/api/queries';

export type IHomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const queryDefault = {
  metric: 'memberTime',
  start: DateTime.local().startOf('year').toISODate(),
  end: DateTime.local().startOf('year').endOf('month').toISODate(),
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const requestQuery = { ...queryDefault, ...query };
  const queryParams = qs.stringify(requestQuery);

  const requestUrl = `http://localhost:3000/api/data?${queryParams}`;
  const data: IJITData = await fetch(requestUrl).then((response) => response.json());
  const objects = await loadObjects(data);

  return { props: { query: requestQuery, data, objects } };
};

const HomeRoute: React.FC<IHomePageProps> = (props) => <Home {...props} />;

export default HomeRoute;
