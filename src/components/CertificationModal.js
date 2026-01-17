import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import ReactResizeDetector from "react-resize-detector";

pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js";

const CertificationModal = ({ show, onHide, pdfFile, title }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="certification-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <ReactResizeDetector handleWidth>
          {({ width, targetRef }) => (
            <div ref={targetRef} style={{ width: "100%" }}>
              <Document
                file={pdfFile}
                className="d-flex justify-content-center w-100"
                options={{
                  cMapUrl:
                    "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/",
                  cMapPacked: true,
                }}
              >
                <Page
                  pageNumber={1}
                  width={Math.max(300, Math.min(width || 700, 1000))}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          )}
        </ReactResizeDetector>
      </Modal.Body>
    </Modal>
  );
};

export default CertificationModal;
