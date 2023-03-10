import React, { useState } from "react";
import { useEffect } from "react";
import "./CardProfile.css";

export default function CardProfile({ card }) {
  const [download, setDownload] = useState();
  const [showLink1, setShowLink1] = useState(false);
  const [showLink2, setShowLink2] = useState(false);
  const [showLink3, setShowLink3] = useState(false);

  const activeLink1 = () => {
    setShowLink1(true);
    setShowLink2(false);
    setShowLink3(false);
  };
  const activeLink2 = () => {
    setShowLink1(false);
    setShowLink2(true);
    setShowLink3(false);
  };
  const activeLink3 = () => {
    setShowLink1(false);
    setShowLink2(false);
    setShowLink3(true);
  };

  function handleVcardDownload() {
    const test = URL.createObjectURL(
      new Blob(
        [
          `BEGIN:VCARD
VERSION:3.0
REV:2023-01-10T03:24:00Z
N;CHARSET=utf-8:${card?.name.toUpperCase()};;;;
FN;CHARSET=utf-8:${card?.name.toUpperCase()}
ORG;CHARSET=utf-8:${card?.company}
TITLE;CHARSET=utf-8:${card?.position}
ROLE;CHARSET=utf-8:${card?.position}
EMAIL;INTERNET:${card?.gmail}
TEL;PREF;WORK:${card?.phone}
TEL;WORK:
ADR;WORK;POSTAL;CHARSET=utf-8:${card?.address};;;;;;
URL;TYPE=Profile:${card?.brochure}
URL;TYPE=Website:${card?.website}
URL;TYPE=Website:
URL;TYPE=Facebook:${card?.facebook}

URL;TYPE=Zalo:https://zalo.me/${card?.zalo}
URL;TYPE=Viber:viber://chat?number=+84${card?.viber}
END:VCARD
      `,
        ],
        { type: "text/x-vcard" }
      )
    );
    console.log(test);
    return test;
  }
  useEffect(() => {
    if (card) setDownload(handleVcardDownload());
  }, [card]);

  return (
    <>
      <div className="card" data-state="#about">
        <div className="card-header mb-[70px]">
          <div className="card-cover"></div>
          <img className="card-avatar" src={card?.avatar} alt="avatar" />
          <h1 className="card-fullname">{card.name}</h1>
          <h2 className="card-company">{card.company}</h2>
          <h2 className="card-jobtitle">{card.position}</h2>
        </div>
        <div className="card-main">
          <div className="card-section is-active" id="about">
            {/* <div className="card-content">
              <div className="card-subtitle">{card.title}</div>
              <div className="content">
                <p className="card-desc">{card.description}</p>
              </div>
            </div> */}
            <div className="card-social">
              <a href={card?.facebook} target="_blank">
                <img src="/icons/facebook.png" alt="" />
              </a>
              <a href={`http://zalo.me/${card?.zalo}`} target="_blank">
                <img src="/icons/zalo.png" alt="" />
              </a>
              <a href={`viber://add?number=84${card?.viber}`}>
                <img src="/icons/viber.png" alt="" />
              </a>
              <a href={`mailto:${card?.youtube}`}>
                <img src="/icons/mail.png" alt="" />
              </a>
            </div>
          </div>
          <div className="card-buttons">
            {/* <button
              onClick={() => activeLink1(true)}
              data-section="#about"
              className={`${showLink1 ? "is-active" : ""}`}
            >
              ABOUT
            </button> */}
            <a
              onClick={() => activeLink1(true)}
              className={`${showLink1 ? "is-active" : ""}`}
              href={card?.services}
              target="_blank"
              data-section="#experience"
            >
              SERVICES
            </a>
            <a
              onClick={() => activeLink2(true)}
              className={`${showLink2 ? "is-active" : ""}`}
              href={card?.caseStudy}
              target="_blank"
              data-section="#experience"
            >
              CASE STUDY
            </a>
            <a
              onClick={() => activeLink3(true)}
              className={`${showLink3 ? "is-active" : ""}`}
              href={card?.brochure}
              target="_blank"
              data-section="#contact"
            >
              BROCHURE
            </a>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <a className="btn-download" href={download} download="card.vcf">
          L??u danh b???
        </a>
      </div>
    </>
  );
}
