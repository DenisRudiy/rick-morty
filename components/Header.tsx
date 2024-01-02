import { useScreenWidth } from "@/pages/api/WindowWidthService";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const screenWidth = useScreenWidth();
  const [showBurger, setShowBurger] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // * calc width to show burger
  useEffect(() => {
    if (screenWidth !== null) {
      if (screenWidth <= 650) {
        setShowBurger(true);
      }
      if (screenWidth > 650) {
        setShowBurger(false);
      }
    } else {
      setShowBurger(false);
    }
  }, [screenWidth]);

  // * use body-scroll-lock lib to lock scroll when modal is shown
  useEffect(() => {
    if (showModal) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [showModal]);

  return (
    <div className={`header_body ${showModal ? "modalOpen" : ""}`}>
      {showModal ? (
        <div className="burger_modal">
          <div className="header">
            <img src="/logo-header.svg" alt="" />

            <div className="header_burger">
              <button
                className="header_button"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <img src="/Close-modal.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="header_burger_section">
            <Link
              href="/character"
              className="header_links"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Characters
            </Link>
            <Link
              href="/location"
              className="header_links"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Location
            </Link>
            <Link
              href="/episode"
              className="header_links"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Episodes
            </Link>
          </div>
        </div>
      ) : (
        <div className="header">
          <img src="/logo-header.svg" alt="" />

          {showBurger ? (
            <div className="header_burger">
              <button
                className="header_button"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <img src="/Header-burger.svg" alt="" />
              </button>
            </div>
          ) : (
            <div className="header_btn_section">
              <Link href="/character" className="header_links">
                Characters
              </Link>
              <Link href="/location" className="header_links">
                Location
              </Link>
              <Link href="/episode" className="header_links">
                Episodes
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
