"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
require("./App.css");
// styled tag
const Button = styled_components_1.default.button `
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
const StyledApiDetailsPage = styled_components_1.default.div `
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
const ApiDetailPage = ({ apiItemDetails, toggleDrawer }) => {
    // if (!apiItemDetails) return null; // Handle null case
    return (react_1.default.createElement(StyledApiDetailsPage, null,
        react_1.default.createElement("div", { className: "apiDetailsPageContainer" },
            react_1.default.createElement("div", { className: "apiDetailsPageHeading" },
                apiItemDetails.logo && (react_1.default.createElement("img", { alt: "logo", width: "80", src: apiItemDetails.logo })),
                react_1.default.createElement("h1", null, apiItemDetails.apiName)),
            react_1.default.createElement("h4", null, "Description"),
            react_1.default.createElement("p", null, apiItemDetails.description ? apiItemDetails.description : '-'),
            react_1.default.createElement("h4", null, "Swagger"),
            react_1.default.createElement("p", null, apiItemDetails.swaggerUrl ? apiItemDetails.swaggerUrl : '-'),
            react_1.default.createElement("h4", null, "Contact"),
            react_1.default.createElement("p", null,
                "Email:",
                ' ',
                apiItemDetails.contactEmail ? apiItemDetails.contactEmail : '-'),
            react_1.default.createElement("p", null,
                "Name:",
                ' ',
                apiItemDetails.contactName ? apiItemDetails.contactName : '-'),
            react_1.default.createElement("p", null,
                "Url: ",
                apiItemDetails.contactUrl ? apiItemDetails.contactUrl : '-')),
        react_1.default.createElement(Button, { onClick: toggleDrawer, style: { position: 'fixed', bottom: 20 } }, "Explore more APIs")));
};
exports.default = ApiDetailPage;
