import React from 'react';

export { default as Home } from './Home';
export { default as AddBlog }  from './AddBlog';
export { default as Blog }  from './Blog';


export const About = React.lazy(() => import('./About'));
export const Contact = React.lazy(() => import('./Contact'));
export const NotFound = React.lazy(() => import('./NotFound'));
 
