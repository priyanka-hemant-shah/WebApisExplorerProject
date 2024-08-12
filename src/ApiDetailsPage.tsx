import React, {FC} from 'react';

import styled from 'styled-components';
import './App.css';

// styled tag
const Button = styled.button`
  background-color: #049dd2;
  color: #ffffff;
  font-size: 1em;
  margin: 1em;
  padding: 0.75em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

// styled API Details component
const StyledApiDetailsPage = styled.div`
    background-color: #3f5f7a;
    color: #fafbfc;
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    & h1 {
      margin-bottom: 10px;
      font-weight: 500;
      width: 60%;
    }
    & .apiDetailsPageContainer {
      width: 60%;
      & .apiDetailsPageHeading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 50px;
        & img {
        margin-right: 10px;
        }
      }
    }
    & h4 {
      margin-bottom: 5px;
      font-weight: 400;
      font-size
    }
    & p {
      margin: 5px 0;
      font-size: 14px;
    }
 
`;

interface ApiItemDetails {
  logo?: string;
  apiName: string;
  description?: string;
  swaggerUrl?: string;
  contactEmail?: string;
  contactName?: string;
  contactUrl?: string;
}

interface AppProps {
  apiItemDetails: ApiItemDetails;
  toggleDrawer: () => void;
}

const ApiDetailPage: FC<AppProps> = ({ apiItemDetails, toggleDrawer }) => {
  // if (!apiItemDetails) return null; // Handle null case
  return (
    <StyledApiDetailsPage>
      <div className="apiDetailsPageContainer">
        <div className="apiDetailsPageHeading">
          {apiItemDetails.logo && (<img alt="logo" width="80" src={apiItemDetails.logo} />)}
          <h1>{apiItemDetails.apiName}</h1>
        </div>
        <h4>Description</h4>
        <p>
          {apiItemDetails.description ? apiItemDetails.description : '-'}
        </p>

        <h4>Swagger</h4>
        <p>{apiItemDetails.swaggerUrl ? apiItemDetails.swaggerUrl : '-'}</p>

        <h4>Contact</h4>
        <p>
          Email:{' '}
          {apiItemDetails.contactEmail ? apiItemDetails.contactEmail : '-'}
        </p>
        <p>
          Name:{' '}
          {apiItemDetails.contactName ? apiItemDetails.contactName : '-'}
        </p>
        <p>
          Url: {apiItemDetails.contactUrl ? apiItemDetails.contactUrl : '-'}
        </p>
      </div>

      <Button onClick={toggleDrawer} style={{ position: 'fixed', bottom: 20 }}>Explore more APIs</Button>
    </StyledApiDetailsPage>
  );
}

export default ApiDetailPage;
