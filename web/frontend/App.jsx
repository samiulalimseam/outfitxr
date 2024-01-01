import { NavigationMenu } from "@shopify/app-bridge-react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  


  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider  >
       
          <QueryProvider>
          <NavigationMenu
              navigationLinks={[
                {
                  label: ("Home"),
                  destination: "/",
                },{
                  label: ("Products"),
                  destination: "/products",
                },
                {
                  label: ("Settings"),
                  destination: "/settings",
                },
                
              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
         
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
