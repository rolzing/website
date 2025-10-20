import React from "react";
import { Button, Row } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import resumePdf from "../Assets/RicardoLH2.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

const Resume = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;

  return (
    <section id="resume">
      <div className="col-md-12">
        <h1 className="section-title">Resume</h1>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            as="a"
            variant="primary"
            rel="noopener noreferrer"
            target="_blank"
            href={resumePdf}
            style={{ maxWidth: "250px" }}
          >
            &nbsp;Download CV
          </Button>
        </Row>
        <Row className="resume" style={{ justifyContent: "center" }}>
          <Document
            file={resumePdf}
            className="d-flex justify-content-center"
            options={{
              cMapUrl: "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/",
              cMapPacked: true,
            }}
            onLoadError={(err) => console.error("PDF load error:", err)}
            onSourceError={(err) => console.error("PDF source error:", err)}
          >
            <Page pageNumber={1} scale={width > 786 ? 1.4 : 0.8} />
          </Document>
        </Row>
      </div>
    </section>
  );
};

export default Resume;
