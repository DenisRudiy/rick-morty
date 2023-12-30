import Link from "next/link";

export function Header() {
  return (
    <div className="header">
      <img src="/logo-header.svg" alt="" />
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
    </div>
  );
}
