export interface IErrorPageProps {
  statusCode?: number;
  message?: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({ statusCode, message }) => {
  return (
    <section className="h-48 my-24 flex flex-row justify-center items-center font-light">
      {statusCode && <h2 className="p-12 text-7xl">{statusCode}</h2>}
      {statusCode && message && <div className="h-full border-l border-gray-500"></div>}
      {message && <h1 className="p-12 light text-xl">{message}</h1>}
    </section>
  );
};

export default ErrorPage;
