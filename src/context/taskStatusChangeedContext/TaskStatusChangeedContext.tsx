import React, {
  createContext,
  FC,
  ReactElement,
  PropsWithChildren,
  useState,
} from 'react';

export const TaskStatusChangeedContext = createContext({
  updated: false,
  toggle: () => {
    console.log('assign a function');
  },
});

export const TaskStatusChangeedContextProvider: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const [updated, setUpdated] = useState(false);
  function toggleHandler() {
    updated ? setUpdated(false) : setUpdated(true);
  }
  return (
    <TaskStatusChangeedContext.Provider
      value={{
        updated,
        toggle: toggleHandler,
      }}
    >
      {props.children}
    </TaskStatusChangeedContext.Provider>
  );
};
