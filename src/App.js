import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Resume from "./components/Resume";

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            foo: "bar",
            resumeData: {},
            sharedData: {},
        };
        this.cursorLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.cursorCleanup = null;
    }

    applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
        this.swapCurrentlyActiveLanguage(oppositeLangIconId);
        document.documentElement.lang = pickedLanguage;
        var resumePath =
            document.documentElement.lang === window.$primaryLanguage
                ? `res_primaryLanguage.json`
                : `res_secondaryLanguage.json`;
        this.loadResumeFromPath(resumePath);
    }

    swapCurrentlyActiveLanguage(oppositeLangIconId) {
        var pickedLangIconId =
            oppositeLangIconId === window.$primaryLanguageIconId
                ? window.$secondaryLanguageIconId
                : window.$primaryLanguageIconId;
        document
            .getElementById(oppositeLangIconId)
            .removeAttribute("filter", "brightness(40%)");
        document
            .getElementById(pickedLangIconId)
            .setAttribute("filter", "brightness(40%)");
    }

    componentDidMount() {
        this.loadSharedData();
        this.applyPickedLanguage(
            window.$primaryLanguage,
            window.$secondaryLanguageIconId
        );
        this.cursorCleanup = this.initCursorLettersEffect();
    }

    componentWillUnmount() {
        if (this.cursorCleanup) this.cursorCleanup();
    }

    initCursorLettersEffect() {
        const root = document.body;
        const letters = this.cursorLetters.split("");
        const activeNodes = new Set();
        let lastX = 0,
            lastY = 0;

        const createLetter = (x, y) => {
            const el = document.createElement("span");
            el.className = "cursor-letter";
            el.textContent = letters[(Math.random() * letters.length) | 0];
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            const scaleFrom = 0.6 + Math.random() * 0.6; // 0.6–1.2
            const scaleTo = 0.2 + Math.random() * 0.4; // 0.2–0.6
            el.style.setProperty("--scale-from", String(scaleFrom));
            el.style.setProperty("--scale-to", String(scaleTo));
            root.appendChild(el);
            activeNodes.add(el);
            el.addEventListener("animationend", () => {
                activeNodes.delete(el);
                el.remove();
            });
        };

        const onMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const dx = x - lastX;
            const dy = y - lastY;
            if (dx * dx + dy * dy < 80) return; // distancia mínima para throttling
            lastX = x;
            lastY = y;
            const count = 1 + (Math.random() > 0.6 ? 1 : 0);
            for (let i = 0; i < count; i++) {
                const jitterX = x + (Math.random() * 16 - 8);
                const jitterY = y + (Math.random() * 16 - 8);
                createLetter(jitterX, jitterY);
            }
        };

        const onScroll = () => {
            // opcional: pequeñas chispas en scroll
            const vw = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );
            const jitterX = (Math.random() * vw) | 0;
            const jitterY = (window.scrollY + 40 + Math.random() * 40) | 0;
            createLetter(jitterX, jitterY);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
            activeNodes.forEach((n) => n.remove());
            activeNodes.clear();
        };
    }

    loadResumeFromPath(path) {
        $.ajax({
            url: path,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({ resumeData: data });
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }

    loadSharedData() {
        $.ajax({
            url: `portfolio_shared_data.json`,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({ sharedData: data });
                document.title = `${this.state.sharedData.basic_info.name}`;
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }

    render() {
        return (
            <div>
                <Header sharedData={this.state.sharedData.basic_info} />
                <div className="col-md-12 mx-auto text-center language">
                    <div
                        onClick={() =>
                            this.applyPickedLanguage(
                                window.$primaryLanguage,
                                window.$secondaryLanguageIconId
                            )
                        }
                        style={{ display: "inline" }}
                    >
            <span
                className="iconify language-icon mr-5"
                data-icon="twemoji-flag-for-flag-united-states"
                data-inline="false"
                id={window.$primaryLanguageIconId}
            ></span>
                    </div>
                    <div
                        onClick={() =>
                            this.applyPickedLanguage(
                                window.$secondaryLanguage,
                                window.$primaryLanguageIconId
                            )
                        }
                        style={{ display: "inline" }}
                    >
            <span
                className="iconify language-icon"
                data-icon="twemoji-flag-for-flag-mexico"
                data-inline="false"
                id={window.$secondaryLanguageIconId}
            ></span>
                    </div>
                </div>
                <About
                    resumeBasicInfo={this.state.resumeData.basic_info}
                    sharedBasicInfo={this.state.sharedData.basic_info}
                />
                <Skills
                    sharedSkills={this.state.sharedData.skills}
                    resumeBasicInfo={this.state.resumeData.basic_info}
                />
                <Experience
                    resumeExperience={this.state.state?.resumeData?.experience || this.state.resumeData.experience}
                    resumeBasicInfo={this.state.resumeData.basic_info}
                />
                <Resume />
                <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
            </div>
        );
    }
}

export default App;