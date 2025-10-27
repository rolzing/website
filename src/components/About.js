import React, { Component } from "react";
import { Icon } from "@iconify/react";
import angularIcon from "@iconify/icons-logos/angular-icon";
import reactIcon from "@iconify/icons-logos/react";
import nodejsIcon from "@iconify/icons-logos/nodejs";
import javascriptIcon from "@iconify/icons-logos/javascript";

class About extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }

    return (
      <section id="about">
        <div className="col-md-12">
          <h1 style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <img
                    src={(() => {
                      const imgField =
                        this.props.sharedBasicInfo?.image || "myProfile.png";
                      const normalized = imgField.startsWith("/")
                        ? imgField.replace(/^\/+/, "")
                        : imgField.startsWith("images/")
                        ? imgField
                        : `images/${imgField}`;
                      return `${
                        process.env.PUBLIC_URL || ""
                      }/${normalized}`.replace(/\/+/g, "/");
                    })()}
                    alt={
                      this.props.sharedBasicInfo?.name || "Avatar placeholder"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${
                        process.env.PUBLIC_URL || ""
                      }/placeholder.png`;
                      console.warn(
                        "Profile image failed to load, fallback used:",
                        e.target.src
                      );
                    }}
                  />
                  <Icon
                    icon={javascriptIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={angularIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={reactIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                </span>
              </div>
            </div>

            <div className="col-md-8 center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header">
                    <span
                      className="iconify"
                      data-icon="emojione:red-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:yellow-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:green-circle"
                      data-inline="false"
                    ></span>
                  </div>
                  <div
                    className="card-body font-trebuchet text-justify ml-3 mr-3"
                    style={{
                      height: "auto",
                      fontSize: "132%",
                      lineHeight: "200%",
                    }}
                  >
                    <br />
                    <span className="wave">{hello} :) </span>
                    <br />
                    <br />
                    {about}
                  </div>
                </div>
              </div>
            </div>
              <iframe
                  title="spotify-playlist-3wKPIh6l7maAf4RLZAzViY"
                  data-testid="embed-iframe"
                  src="https://open.spotify.com/embed/playlist/3wKPIh6l7maAf4RLZAzViY?utm_source=generator&theme=0"
                  width="85%"
                  height="400"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  allowFullScreen
                  style={{ borderRadius: 12, marginTop: 20 }}
              />
          </div>
        </div>
      </section>
    );
  }
}

export default About;
