// https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/

import { createContext, useContext, useEffect, useState } from "react";

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    });

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
    return (
        <viewportContext.Provider value={{ width, height }}>
            {children}
        </viewportContext.Provider>
    );
};

export default ViewportProvider;

/* Pull the width and height values
   out of the context instead */
export const useViewport = () => {
    /* We can use the "useContext" Hook to access a context from within
        another Hook, remember, Hooks are composable! */
    const { width, height } = useContext(viewportContext);
    return { width, height };
}
