import React from "react";
import { Button, Icon } from "antd";
import { Link } from "react-router-dom";

import MainLayout from "../../components/MainLayout";
import { StyledLandingPage } from "./styledComponents";

const LandingPage = () => {
  return (
    <MainLayout>
      <StyledLandingPage>
        <div className="landing-background">
          <div className="content-heading">execute.ly</div>
          <br />
          <div className="content-intro">
            ✔️ One Click execute handwritten code <br />
            ✔️ Upload and crop image to execute <br />
            ✔️ Run your code in a sandbox environment <br />
            ✔️ Auto detects your language <br /> <br />
            <Button type="primary" size="large" block>
              <Link to="/upload" style={{ color: "#FFF" }}>
                Get Started  <Icon type="double-right" />
              </Link>
            </Button>
          </div>
        </div>
      </StyledLandingPage>
    </MainLayout>
  );
};

export default LandingPage;
