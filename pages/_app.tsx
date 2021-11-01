import { ApolloProvider } from "@apollo/client";
import { DevelopmentProvider } from "contexts/development";
import { useShopifyClient } from "hooks";
import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  const client = useShopifyClient();
  return (
    <ApolloProvider client={client}>
      <DevelopmentProvider>
        <Component {...pageProps} />;
      </DevelopmentProvider>
    </ApolloProvider>
  );
}

export default App;
