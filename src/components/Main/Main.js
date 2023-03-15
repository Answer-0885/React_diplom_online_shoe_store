import Banner from "./Banner";

const Main = (props) => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default Main;
/**<HomePage /> */
