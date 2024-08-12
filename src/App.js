"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// third-party drawer component with its stylesheet
const react_modern_drawer_1 = __importDefault(require("react-modern-drawer"));
require("react-modern-drawer/dist/index.css");
// third-party accordian component with its stylesheet
const react_accessible_accordion_1 = require("react-accessible-accordion");
require("react-accessible-accordion/dist/fancy-example.css");
const ApiDetailsPage_1 = __importDefault(require("./ApiDetailsPage"));
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
// styled drawer component
const StyledDrawer = (0, styled_components_1.default)(react_modern_drawer_1.default) `
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
const StyledAccordion = (0, styled_components_1.default)(react_accessible_accordion_1.Accordion) `
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
const App = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const [providers, setProviders] = (0, react_1.useState)(null);
    const [apiList, setApiList] = (0, react_1.useState)(null);
    const [apiItemDetails, setApiItemDetails] = (0, react_1.useState)(null);
    const [showApiDetails, setShowApiDetails] = (0, react_1.useState)(false);
    const handleOnProviderClick = (providerName) => {
        setIsLoading(true);
        setApiList(null);
        fetch(`https://api.apis.guru/v2/${providerName}.json`)
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            let apidata = yield response.json();
            apidata = apidata.apis || null;
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (apidata && apidata.message) || response.statusText;
                return Promise.reject(error);
            }
            if (apidata) {
                const allApiKeys = Object.keys(apidata);
                let allApiDetails = [];
                allApiKeys.map((item) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                    if ((_a = apidata[item]) === null || _a === void 0 ? void 0 : _a.info) {
                        const apiName = (((_c = (_b = apidata[item]) === null || _b === void 0 ? void 0 : _b.info) === null || _c === void 0 ? void 0 : _c.title) && apidata[item].info.title) ||
                            null;
                        const contactName = (((_f = (_e = (_d = apidata[item]) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.contact) === null || _f === void 0 ? void 0 : _f.name) &&
                            apidata[item].info.contact.name) ||
                            null;
                        const contactEmail = (((_j = (_h = (_g = apidata[item]) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.contact) === null || _j === void 0 ? void 0 : _j.email) &&
                            apidata[item].info.contact.email) ||
                            null;
                        const contactUrl = (((_m = (_l = (_k = apidata[item]) === null || _k === void 0 ? void 0 : _k.info) === null || _l === void 0 ? void 0 : _l.contact) === null || _m === void 0 ? void 0 : _m.url) &&
                            apidata[item].info.contact.url) ||
                            null;
                        const swaggerUrl = (((_o = apidata[item]) === null || _o === void 0 ? void 0 : _o.swaggerUrl) && apidata[item].swaggerUrl) || null;
                        const description = (((_q = (_p = apidata[item]) === null || _p === void 0 ? void 0 : _p.info) === null || _q === void 0 ? void 0 : _q.description) &&
                            apidata[item].info.description) ||
                            null;
                        const logo = (((_s = (_r = apidata[item]) === null || _r === void 0 ? void 0 : _r.info) === null || _s === void 0 ? void 0 : _s['x-logo']) &&
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
        }))
            .catch((error) => {
            console.error('There was an error!', error);
            setIsLoading(false);
        });
    };
    const handleShowApiDetails = (item) => {
        setApiItemDetails(item);
        setIsOpen(false);
        setShowApiDetails(true);
    };
    (0, react_1.useEffect)(() => {
        fetch('https://api.apis.guru/v2/providers.json')
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setProviders(data.data || null);
        }))
            .catch((error) => {
            console.error('There was an error!', error);
        });
    }, []);
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(Button, { onClick: toggleDrawer }, "Explore web APIs"),
        react_1.default.createElement(StyledDrawer, { open: isOpen, onClose: toggleDrawer, direction: "right" },
            react_1.default.createElement("h6", null, "Select Provider"),
            react_1.default.createElement(StyledAccordion, { allowZeroExpanded: true }, providers &&
                providers.map((item, i) => (react_1.default.createElement(react_accessible_accordion_1.AccordionItem, { key: i },
                    react_1.default.createElement(react_accessible_accordion_1.AccordionItemHeading, null,
                        react_1.default.createElement(react_accessible_accordion_1.AccordionItemButton, null,
                            react_1.default.createElement("div", { onClick: () => {
                                    handleOnProviderClick(item);
                                } }, item))),
                    react_1.default.createElement(react_accessible_accordion_1.AccordionItemPanel, null, isLoading ? "loading..." :
                        (apiList &&
                            apiList.map((apiItem, index) => (react_1.default.createElement("div", { key: index, onClick: () => {
                                    handleShowApiDetails(apiItem);
                                } },
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement("img", { width: "20", src: apiItem.logo })),
                                ' ',
                                apiItem.apiName)))))))))),
        showApiDetails && apiItemDetails && (react_1.default.createElement(ApiDetailsPage_1.default, { apiItemDetails: apiItemDetails, toggleDrawer: toggleDrawer }))));
};
exports.default = App;
