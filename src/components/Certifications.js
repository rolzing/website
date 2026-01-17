import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import ReactResizeDetector from "react-resize-detector";
import CertificationModal from "./CertificationModal";
import resumePdf from "../Assets/RicardoLH2.pdf";
import ScotiabankCert1 from "../Assets/ricardo-lopez-whitebelt-cert.pdf";

import "../scss/Certifications.scss";

pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const certifications = [
    { id: 1, title: "Certificación 1", pdf: ScotiabankCert1 }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1,
    );
  };

  const handleCertificationClick = (cert) => {
    setSelectedCertification(cert);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCertification(null);
  };

  return (
    <section id="certifications">
      <div
        className="col-md-12"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <Row className="justify-content-center">
          <Col xs="auto">
            <h1 className="section-title m-0">Certifications</h1>
          </Col>
        </Row>

        <Row className="justify-content-center" style={{ marginTop: "48px" }}>
          <Col xs={12} md={10} lg={8}>
            <div className="carousel-container">
              <button
                className="carousel-button carousel-button-prev"
                onClick={handlePrev}
              >
                &lt;
              </button>

              <div className="carousel-content">
                <ReactResizeDetector handleWidth>
                  {({ width, targetRef }) => (
                    <div ref={targetRef} className="certification-item">
                      <div
                        className="certification-preview"
                        onClick={() =>
                          handleCertificationClick(certifications[currentIndex])
                        }
                      >
                        <Document
                          file={certifications[currentIndex].pdf}
                          className="d-flex justify-content-center w-100 h-100"
                          options={{
                            cMapUrl:
                              "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/",
                            cMapPacked: true,
                          }}
                        >
                          <Page
                            pageNumber={1}
                            width={Math.max(280, Math.min(width || 500, 700))}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </Document>
                      </div>
                      <p className="certification-title">
                        {certifications[currentIndex].title}
                      </p>
                    </div>
                  )}
                </ReactResizeDetector>
              </div>

              <button
                className="carousel-button carousel-button-next"
                onClick={handleNext}
              >
                &gt;
              </button>
            </div>

            <div className="carousel-indicators" style={{ marginTop: "20px" }}>
              {certifications.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <CertificationModal
        show={showModal}
        onHide={handleCloseModal}
        pdfFile={selectedCertification?.pdf}
        title={selectedCertification?.title}
      />
    </section>
  );
};

export default Certifications;
