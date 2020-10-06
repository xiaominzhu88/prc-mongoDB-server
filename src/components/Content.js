import React from "react";
import Info from "./Info.js";
import { useHistory, Link, Switch, Route } from "react-router-dom";

const Content = ({ content }) => {
  const [type, setType] = React.useState(0);
  const history = useHistory();

  return (
    <div>
      <ul>
        {type === 0 ? (
          content.map((item, i) => {
            const path = `/posts/${item._id}`;
            return (
              <li
                key={i}
                onClick={() => {
                  history.push(path);
                  setType(1);
                }}
              >
                <Link to={path}>
                  Title:{item.title} Text: {item.text}
                </Link>
                <Switch>
                  <Route path={path}>
                    <Info content={content} />
                  </Route>
                </Switch>
              </li>
            );
          })
        ) : (
          <Info content={content} />
        )}
      </ul>
    </div>
  );
};
export default Content;
