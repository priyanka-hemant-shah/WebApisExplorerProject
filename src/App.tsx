import React, { FC, useState, useEffect } from 'react';

import styled from 'styled-components';
// third-party drawer component with its stylesheet
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
// third-party accordian component with its stylesheet
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import ApiDetailPage from './ApiDetailsPage';

import './App.css';

interface ApiItem {
  logo: string;
  apiName: string;
  description?: string;
  swaggerUrl?: string;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
}

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
// styled drawer component
const StyledDrawer = styled(Drawer)`
  & h6 {
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: 500;
    margin: 10px;
  }
  background: #3f5f7a !important;
  border-left: 3px solid #049dd2;
  width: 340px !important;
  overflow-y: auto;
  overflow-x: hidden;
`;
// styled accordion component
const StyledAccordion = styled(Accordion)`
  width: 320px;
  .accordion__button {
    position: relative;
    background-color: transparent;
    color: white;
    padding: 10px 18px;
    &:hover {
      background-color: transparent;
    }
    &:before {
      position: absolute;
      top: 20px;
      right: 40px;
    }
  }
  & .accordion__panel {
    color: white;
    & div {
      display: flex;
      align-items: center;
      font-size: 14px;
      & img {
        margin-right: 10px;
      }
    }
  }
`;

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [providers, setProviders] = useState<string[] | null>(null);
  const [apiList, setApiList] = useState<ApiItem[] | null>(null);
  const [apiItemDetails, setApiItemDetails] = useState<ApiItem | null>(null);
  const [showApiDetails, setShowApiDetails] = useState(false);

  const handleOnProviderClick = (providerName: string) => {
    setIsLoading(true);
    setApiList(null)
    fetch(`https://api.apis.guru/v2/${providerName}.json`)
      .then(async (response) => {
        let apidata = await response.json();
        apidata = apidata.apis || null;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (apidata && apidata.message) || response.statusText;
          return Promise.reject(error);
        }

        if (apidata) {
          const allApiKeys = Object.keys(apidata);
          let allApiDetails: ApiItem[] = [];
          allApiKeys.map((item) => {
            if (apidata[item]?.info) {
              const apiName =
                (apidata[item]?.info?.title && apidata[item].info.title) ||
                null;
              const contactName =
                (apidata[item]?.info?.contact?.name &&
                  apidata[item].info.contact.name) ||
                null;
              const contactEmail =
                (apidata[item]?.info?.contact?.email &&
                  apidata[item].info.contact.email) ||
                null;
              const contactUrl =
                (apidata[item]?.info?.contact?.url &&
                  apidata[item].info.contact.url) ||
                null;
              const swaggerUrl =
                (apidata[item]?.swaggerUrl && apidata[item].swaggerUrl) || null;
              const description =
                (apidata[item]?.info?.description &&
                  apidata[item].info.description) ||
                null;
              const logo =
                (apidata[item]?.info?.['x-logo'] &&
                  apidata[item].info['x-logo'].url) ||
                null;

              allApiDetails.push({
                apiName,
                description,
                swaggerUrl,
                contactName,
                contactEmail,
                contactUrl,
                logo,
              });
            }
          });

          setApiList(allApiDetails);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setIsLoading(false);
      });

  };

  const handleShowApiDetails = (item: ApiItem) => {
    setApiItemDetails(item);
    setIsOpen(false)
    setShowApiDetails(true);
  };

  useEffect(() => {
    fetch('https://api.apis.guru/v2/providers.json')
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setProviders(data.data || null);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="App">
      <Button onClick={toggleDrawer}>Explore web APIs</Button>
      <StyledDrawer open={isOpen} onClose={toggleDrawer} direction="right">
        <h6>Select Provider</h6>
        <StyledAccordion allowZeroExpanded>
          {providers &&
            providers.map((item, i) => (
              <AccordionItem key={i}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div
                      onClick={() => {
                        handleOnProviderClick(item);
                      }}
                    >
                      {item}
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {isLoading ? "loading..." :
                    (apiList &&
                      apiList.map((apiItem, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleShowApiDetails(apiItem);
                          }}
                        >
                          <span>
                            <img width="20" src={apiItem.logo} />
                          </span>{' '}
                          {apiItem.apiName}
                        </div>
                      ))
                    )
                  }
                </AccordionItemPanel>
              </AccordionItem>
            ))}
        </StyledAccordion>
      </StyledDrawer>
      {showApiDetails && apiItemDetails && (
        <ApiDetailPage apiItemDetails={apiItemDetails} toggleDrawer={toggleDrawer} />
      )}
    </div>
  );
}

export default App;