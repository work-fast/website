// A script to import the built React app and render it to a string to catch errors
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App';
import ErrorBoundary from './src/components/ErrorBoundary';

try {
    const html = renderToString(
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
    console.log("Successfully rendered HTML length:", html.length);
} catch (error) {
    console.error("Caught a render error!");
    console.error(error);
}
