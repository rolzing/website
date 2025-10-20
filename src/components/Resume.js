import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import resumePdf from "../Assets/RicardoLH2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

const Resume = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;

  return (
    <section id="resume">
      <div className="col-md-12" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
        <Row className="justify-content-center">
          <Col xs="auto">
            <h1 className="section-title m-0">Resume</h1>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: "24px" }}>
          <Col xs="auto">
            <Button
              as="a"
              variant="info"
              size="lg"
              rel="noopener noreferrer"
              target="_blank"
              href={resumePdf}
              className="px-4 py-3"
              style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "0.5px" }}
            >
              Download CV
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center" style={{ marginTop: "24px" }}>
          <Col xs="auto">
            <Document
              file={resumePdf}
              className="d-flex justify-content-center"
              options={{
                cMapUrl: "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/",
                cMapPacked: true,
              }}
            >
              <Page pageNumber={1} scale={width > 786 ? 1.4 : 0.8} />
            </Document>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              as="a"
              variant="info"
              size="lg"
              rel="noopener noreferrer"
              target="_blank"
              href={resumePdf}
              className="px-4 py-3"
              style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "0.5px" }}
            >
              Download CV
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Resume;
