interface SingleProductPageProps {
  params: {
    id: string;
  };
}

const SingleProductPage = ({ params: { id } }: SingleProductPageProps) => {
  return <div>SingleProductPage {id}</div>;
};

export default SingleProductPage;
