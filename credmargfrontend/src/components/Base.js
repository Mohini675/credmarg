import { Button, Container } from "react-bootstrap";
import Footer from "./Footer";

const Base = ({
  title = "Page Title",
  description = null,
  children,
}) => {
  let styleContainer = {
    height: "100px",
    backgroundColor: '#34495e', 
  };

  return (
    <div>
      <Container
        fluid
        className=" p-5 text-white text-center d-flex justify-content-center align-items-center"
        style={styleContainer}
      >
        <div>
         <b> <h3 className="text-center">{title}</h3></b>
          <p className="text-center">{description && description}</p>
        </div>
      </Container>

      {children}

      <Footer />
    </div>
  );
};

export default Base;
