const BlobBackground = ({ children }: any) => {
  return (
    <div className="blob-container">
      {children}
      <div className="shape-blob"></div>
      <div className="shape-blob one"></div>
      <div className="shape-blob two"></div>
    </div>
  );
};

export default BlobBackground;
