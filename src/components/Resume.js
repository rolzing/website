import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import ReactResizeDetector from "react-resize-detector";
import resumePdf from "../Assets/RicardoLH2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

const Resume = () => {
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
          <Col xs={12} md={10} lg={8}>
            <ReactResizeDetector handleWidth>
              {({ width, targetRef }) => (
                <div ref={targetRef}>
                  <Document
                    file={resumePdf}
                    className="d-flex justify-content-center w-100"
                    options={{
                      cMapUrl: "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/",
                      cMapPacked: true,
                    }}
                  >
                    <Page
                      pageNumber={1}
                      width={Math.max(280, Math.min(width || 600, 900))}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                </div>
              )}
            </ReactResizeDetector>
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
      </div>
    </section>
  );
};

export default Resume;
