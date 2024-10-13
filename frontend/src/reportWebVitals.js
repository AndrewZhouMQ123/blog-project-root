// reportWebVitals.js

const reportWebVitals = (onPerfEntry) => {
  // Check if the callback is a function
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Dynamically import web-vitals to measure performance
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Report the various performance metrics
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
