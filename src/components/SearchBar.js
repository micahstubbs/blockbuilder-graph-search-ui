import React from 'react';
import QueryForm from './QueryForm';
import SearchControls from './SearchControls';

export default function SearchBar(props) {
  const {
    results,
    defaultQuery,
    getGraphSearch,
    dispatchRenderGridLayout,
    dispatchRenderBoundedForceLayout,
    dispatchRenderSlippyCanvasLayout
  } = props;
  return (
    <div className="controls">
      <QueryForm defaultQuery={defaultQuery} getGraphSearch={getGraphSearch} />
      <SearchControls
        results={results}
        dispatchRenderGridLayout={dispatchRenderGridLayout}
        dispatchRenderBoundedForceLayout={dispatchRenderBoundedForceLayout}
        dispatchRenderSlippyCanvasLayout={dispatchRenderSlippyCanvasLayout}
      />
    </div>
  );
}
