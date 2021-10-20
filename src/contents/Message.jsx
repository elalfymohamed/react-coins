import * as React from "react";
// Components
import { WatchListContext } from "../context/watchListContext";
// react icons
import { IoMdCheckmarkCircle, IoMdWarning } from "react-icons/io";
const Message = () => {
  // React hooks
  const { useContext } = React;
  // Context Hooks
  const { showMessageAdd, showMessageRemove } = useContext(WatchListContext);

  return (
    <>
      {showMessageAdd.show && (
        <div
          className="alert alert-success d-flex align-items-center show-alert"
          role="alert"
        >
          <IoMdCheckmarkCircle />
          <p className="m-0">
            Add item <strong>{showMessageAdd.coinName}</strong> in portfolio
          </p>
        </div>
      )}
      {showMessageRemove.show && (
        <div
          className="alert alert-danger d-flex align-items-center show-alert"
          role="alert"
        >
          <IoMdWarning />
          <p className="m-0">
            Remove item <strong>{showMessageRemove.coinName}</strong> in
            portfolio
          </p>
        </div>
      )}
    </>
  );
};

export default Message;
