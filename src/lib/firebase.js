import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Performance Monitoring (only in browser)
let performance = null;
if (typeof window !== "undefined") {
  performance = getPerformance(app);
}

export { app, analytics, performance };

// Analytics helper functions
export const logEvent = (eventName, parameters = {}) => {
  if (typeof window !== "undefined" && analytics) {
    import("firebase/analytics").then(({ logEvent: firebaseLogEvent }) => {
      firebaseLogEvent(analytics, eventName, parameters);
    });
  }
};

export const setUserProperties = (properties) => {
  if (typeof window !== "undefined" && analytics) {
    import("firebase/analytics").then(
      ({ setUserProperties: firebaseSetUserProperties }) => {
        firebaseSetUserProperties(analytics, properties);
      }
    );
  }
};

export const setUserId = (userId) => {
  if (typeof window !== "undefined" && analytics) {
    import("firebase/analytics").then(({ setUserId: firebaseSetUserId }) => {
      firebaseSetUserId(analytics, userId);
    });
  }
};

// Custom event tracking functions
export const trackPageView = (pageName, pageTitle) => {
  logEvent("page_view", {
    page_name: pageName,
    page_title: pageTitle,
    page_location: window.location.href,
  });
};

export const trackProjectView = (projectId, projectTitle, category) => {
  logEvent("view_item", {
    item_id: projectId,
    item_name: projectTitle,
    item_category: category,
    content_type: "project",
  });
};

export const trackServiceInquiry = (serviceId, serviceName, category) => {
  logEvent("generate_lead", {
    service_id: serviceId,
    service_name: serviceName,
    service_category: category,
    content_type: "service",
  });
};

export const trackContactForm = (formType, subject) => {
  logEvent("contact_form_submit", {
    form_type: formType,
    subject: subject,
  });
};

export const trackFileDownload = (fileId, fileName, fileType) => {
  logEvent("file_download", {
    file_id: fileId,
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackAccessRequestCreation = (requestId, requestType) => {
  logEvent("generate_lead", {
    request_id: requestId,
    request_type: requestType,
  });
};

export const trackBlogView = (blogId, blogTitle, category) => {
  logEvent("view_item", {
    item_id: blogId,
    item_name: blogTitle,
    item_category: category,
    content_type: "blog",
  });
};

export const trackSearch = (searchTerm, resultsCount) => {
  logEvent("search", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

export const trackAdminAction = (action, resource, resourceId) => {
  logEvent("admin_action", {
    action: action,
    resource: resource,
    resource_id: resourceId,
  });
};

// Performance monitoring helpers
export const startTrace = (traceName) => {
  if (typeof window !== "undefined" && performance) {
    import("firebase/performance").then(({ trace: firebaseTrace }) => {
      const trace = firebaseTrace(performance, traceName);
      trace.start();
      return trace;
    });
  }
  return null;
};

export const stopTrace = (trace) => {
  if (trace) {
    trace.stop();
  }
};

export const addTraceMetric = (trace, metricName, value) => {
  if (trace) {
    trace.putMetric(metricName, value);
  }
};

export const addTraceAttribute = (trace, attributeName, value) => {
  if (trace) {
    trace.putAttribute(attributeName, value);
  }
};
