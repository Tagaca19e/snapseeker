import { React, useContext } from 'react';
import { AppContext } from '../../AppContextProvider';

export default function ProductListLoader() {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading && (
        <div>
          <div className="m-auto hidden w-full max-w-7xl rounded-md bg-white p-4 sm:block">
            <div className="m-auto flex animate-pulse flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
              <div>
                <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
                <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
          <div className="m-auto mt-10 flex flex-wrap gap-8 sm:hidden">
            <div className="m-auto">
              <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
              <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
            </div>
            <div className="m-auto">
              <div className="h-[300px] w-[300px] rounded-md bg-slate-200"></div>
              <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
              <div className="mt-2 h-2 w-40 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
