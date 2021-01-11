import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import CTA from "../styled/CTA";
import { Accent, StyledTitle } from "../styled/Random";

export default function Home() {
  const { user } = useAuth0();

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await getAccessTokenSilently();
  //     console.log(token);
  //   };
  //   if (isAuthenticated) {
  //     getToken();
  //   }
  // }, []);

  console.log("user", user);
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to="/game">
        Click or type '<Accent>s</Accent>' to start playing!
      </CTA>
    </div>
  );
}
