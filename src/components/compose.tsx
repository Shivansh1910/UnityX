import React, { ReactNode } from "react";

export interface IComposeProps {
  providers: (
    | [React.JSXElementConstructor<React.PropsWithChildren<any>>, any]
    | null
  )[];
}

const Compose: React.FC<
  IComposeProps & { children?: ReactNode | undefined }
> = (props) => {
  const { providers = [], children } = props;

  return (
    <>
      {providers.reduceRight((acc, provider) => {
        if (provider == null) {
          return acc;
        }

        const [Component, providerProps] = provider;

        return <Component {...(providerProps ?? {})}>{acc}</Component>;
      }, children)}
    </>
  );
};

export default Compose;
