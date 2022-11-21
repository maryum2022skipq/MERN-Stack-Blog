import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Posts />
        </Col>
        <Col sm={4}>
          <Sidebar />
        </Col>
      </Row>
    </Container>
  );
}
