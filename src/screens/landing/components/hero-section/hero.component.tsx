// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSectionContainer, useStyles } from "./hero.component.styles";
import HeroImage from "../../assets/images/hero.png";
import { StyledSpan } from "../common/span/span.component";
import { Button } from "../common/button/button.component";
import { WaitListForm } from "./mailchimp";
import { RoutePath } from "../../../../navigation/route-path";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 400px)");

  const navigate = useNavigate();

  return (
    <HeroSectionContainer>
      <div className="hero">
        <div className="hero-form">
          <h1>
            Gift <StyledSpan> Crypto </StyledSpan> with Safient
            <StyledSpan> Voucher</StyledSpan>{" "}
          </h1>
          <p className="sub-heading">
            Safest and convenient way to gift crypto 🎁
          </p>
          <div className="form-group">
            {/* <input
              type="text"
              placeholder="Enter an email where we can reach you ✉️"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "} */}
            <Button onClick={() => navigate(RoutePath.login)}>Get started now</Button>
            <Modal
              size={isMobile ? "350px" : "600px"}
              padding="40px"
              centered
              opened={opened}
              onClose={() => setOpened(false)}
              classNames={{
                modal: classes.modal,
                title: classes.title,
              }}
              withCloseButton={false}
            >
              <div className="waitlist-form">
                <WaitListForm email={email} />
              </div>
            </Modal>
            ;
          </div>
          <p>Start gifting crypto by creating a voucher now 🚀</p>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Person with voucher" />
        </div>
      </div>
    </HeroSectionContainer>
  );
}
