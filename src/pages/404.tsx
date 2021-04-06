import ErrorPage, { IErrorPageProps } from '~/components/ErrorPage';

const PageNotFound: React.FC<IErrorPageProps> = (props) => {
  return <ErrorPage {...props} />;
};

PageNotFound.defaultProps = {
  statusCode: 404,
  message: 'This page could not be found.',
};

export default PageNotFound;
