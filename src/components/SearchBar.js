import React from 'react';
import QueryForm from './QueryForm';
import SearchControls from './SearchControls';

export default function SearchBar(props) {
  const {
    defaultQuery,
    getGraphSearch,
    dispatchRenderGridLayout,
    dispatchRenderBoundedForceLayout,
    dispatchRenderSlippyCanvasLayout,
  } = props;
  return (
    <div className="controls">
      <QueryForm defaultQuery={defaultQuery} getGraphSearch={getGraphSearch} />
      <SearchControls
        dispatchRenderGridLayout={dispatchRenderGridLayout}
        dispatchRenderBoundedForceLayout={dispatchRenderBoundedForceLayout}
        dispatchRenderSlippyCanvasLayout={dispatchRenderSlippyCanvasLayout}
      />
    </div>
  );
}
