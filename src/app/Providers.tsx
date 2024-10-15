"use client";

// import { store } from "@/store/index";
import { store } from "@/store/index";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ChakraProvider>{children}</ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
