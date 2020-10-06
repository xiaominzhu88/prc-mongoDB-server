import React from "react";
import Info from "./Info.js";
import { useHistory, Link, Switch, Route } from "react-router-dom";

const Content = ({ content }) => {
  const history = useHistory();

  return (
    <div>
      <ul>
        {content.map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                history.push(`/posts/${item._id}`);
              }}
            >
              <Link to={`/posts/${item._id}`}>
                Title:{item.title} Text: {item.text}
              </Link>
              <Switch>
                <Route path={`/posts/${item._id}`}>
                  <Info content={content} />
                </Route>
              </Switch>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Content;
