import { createContext, useEffect, useState, useRef } from 'react';

export const AppContext = createContext();

const StoreContext = ({ children }) => {
  const [Plan, setPlan] = useState(
    JSON.parse(localStorage.getItem('Plan')) || []
  );
  const [Process, setProcess] = useState(
    JSON.parse(localStorage.getItem('Process')) || []
  );
  const [Complete, setComplete] = useState(
    JSON.parse(localStorage.getItem('Complete')) || []
  );

  const [metaUpdate, setMetaUpdate] = useState();
  const [showCardModal, setShowCardModal] = useState(false);
  const dragging = useRef(null);

  useEffect(() => {
    localStorage.setItem('Plan', JSON.stringify(Plan));
  }, [Plan]);
  useEffect(() => {
    localStorage.setItem('Process', JSON.stringify(Process));
  }, [Process]);
  useEffect(() => {
    localStorage.setItem('Complete', JSON.stringify(Complete));
  }, [Complete]);

  return (
    <AppContext.Provider
      value={{
        Plan,
        setPlan,
        Process,
        setProcess,
        Complete,
        setComplete,
        metaUpdate,
        setMetaUpdate,
        showCardModal,
        setShowCardModal,
        dragging,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default StoreContext;
