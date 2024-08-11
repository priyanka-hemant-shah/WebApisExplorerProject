import React, { useState, useEffect } from 'react';

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
const ApiDetailsPage = styled.div`
  &.apiDetailsPage {
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
    & .apiDetailsPage__container {
      width: 60%;
      & .apiDetailsPage__heading {
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
  }
`;

function ApiDetailPage({ apiItemDetails, toggleDrawer }) {
  return (
    <ApiDetailsPage className="apiDetailsPage">
      <div className="apiDetailsPage__container">
        <div className="apiDetailsPage__heading">
          {apiItemDetails.logo && <img width="80" src={apiItemDetails.logo} />}
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
    </ApiDetailsPage>
  );
}

export default ApiDetailPage;
