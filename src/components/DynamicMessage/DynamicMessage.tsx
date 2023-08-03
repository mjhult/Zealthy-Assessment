import { FC } from 'react';

// I chose to hide/show seperate elements depending on message for code readability. It makes it easier for me to skim.
const DynamicMessage: FC<{
  didError: boolean;
  noItem: boolean;
  errorMessage: string;
  noItemMessage: string;
}> = ({ didError, noItem, errorMessage, noItemMessage }) => (
  <>
    <p hidden={!didError} aria-hidden={!didError}>
      {errorMessage || 'An error occured.'}
    </p>
    <p hidden={noItem || didError} aria-hidden={noItem || didError}>
      {noItemMessage}
    </p>
  </>
);

export default DynamicMessage;
