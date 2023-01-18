import React from "react";
import { useLocation } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { AppLayout } from "./components";
import { LandingPageNavigation, Navigation } from "./navigation";
import { useTheme } from "./hooks";

function App() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const { pathname } = useLocation();

  // routes for landing page
  if (pathname === "/" || pathname === "/teams")
    return <LandingPageNavigation />;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: "Inter",
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppLayout>
          <Navigation />
        </AppLayout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
