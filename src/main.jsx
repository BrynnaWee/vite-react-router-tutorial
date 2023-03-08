import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Contact, { loader as contactLoader }from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import {action as destroyAction} from './routes/destroy';
import ErrorPage from './routes/error-page'
import './index.css'
import Etc from './routes/etc';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path:"etc",
        element: <Etc />
      },{
        path:"contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },{
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },{
        path: "contacts/:contactId/destory",
        action: destroyAction,
        errorElement:  <div>삭제 대상이 주소록에 없어요~ㅠㅠ</div>,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);