import { Link } from "react-router-dom";
import { Paragraph, SubTitle } from "../title/title.component";
import { FooterSectionContainer } from "./footer.component.styles";

export function FooterSection() {
  return (
    <FooterSectionContainer>
      <div className="footer-content">
        <ul>
          <SubTitle className="footer-heading">About </SubTitle>
          <li>
            {" "}
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <a href="https://www.safient.io" target="_next">
              About Safient
            </a>
          </li>
        </ul>
        <ul>
          <SubTitle className="footer-heading"> Company</SubTitle>

          <li>
            <a href="https://careers.safient.io" target="_next">
              Career
            </a>
            <span>We&apos;re hiring!</span>
          </li>
          <li>
            <a href="mailto:hello@safient.io" target="_next">
              Contact
            </a>
          </li>
        </ul>
        <ul>
          <SubTitle className="footer-heading">Developer Resources</SubTitle>
          <li>
            <a href="https://github.com/safient" target="_next">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://docs.safient.io/" target="_next">
              Documentation
            </a>
          </li>
        </ul>

        <ul>
          <SubTitle className="footer-heading">Community</SubTitle>
          <li>
            <a href="https://twitter.com/safientio" target="_next">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://discord.safient.io/" target="_next">
              Discord
            </a>
          </li>
          <li>
            <a href="https://blog.safient.io/" target="_next">
              Blog
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copy">
        <Paragraph centered>
          {" "}
          &copy; {new Date().getFullYear()} - Built using Safient Protocol.{" "}
        </Paragraph>
      </div>
    </FooterSectionContainer>
  );
}
