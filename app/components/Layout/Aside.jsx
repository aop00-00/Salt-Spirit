import {createContext, useContext, useEffect, useState} from 'react';

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay fixed inset-0 bg-black/20 z-[10000] transition-all duration-500 ease-in-out ${
        expanded
          ? 'expanded opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
      }`}
      role="dialog"
    >
      <button 
        className="absolute inset-0 w-full h-full bg-transparent border-none text-transparent cursor-default" 
        onClick={close} 
        aria-label="Close outside"
      />
      <aside 
        data-lenis-prevent
        className={`bg-[var(--color-light)] shadow-2xl h-[100dvh] w-full max-w-[400px] md:max-w-[450px] fixed top-0 right-0 z-50 transition-transform duration-[400ms] ease-in-out flex flex-col ${
          expanded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex-none flex items-center justify-between border-b border-gray-200 bg-white h-[70px] px-6 z-10">
          <h3 className="m-0 text-xl font-bold uppercase tracking-wide text-gray-900">{heading}</h3>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full font-bold opacity-80 hover:opacity-100 hover:bg-gray-100 transition-all bg-transparent border-none text-2xl leading-none cursor-pointer p-0 m-0" 
            onClick={close} 
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <main className="flex-1 overflow-hidden relative flex flex-col bg-[#F9F9F9]">{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */

/** @typedef {import('react').ReactNode} ReactNode */
