import React, {
  useMemo,
  useState
} from 'react';

import ReactFlow, {
  Background,
  Controls,
  MiniMap
} from 'reactflow';

import 'reactflow/dist/style.css';

import './App.css';

import treeData from './treeData';

import {
  generateTreeLayout
} from './layoutTree';

import CustomNode from './components/CustomNode';

const nodeTypes = {
  custom: CustomNode
};

function App() {

  const [collapsedNodes, setCollapsedNodes] =
    useState({});

  const { nodes, edges } = useMemo(() => {

    return generateTreeLayout(
      treeData,
      collapsedNodes
    );

  }, [collapsedNodes]);

  const handleNodeClick = (_, node) => {

    setCollapsedNodes((prev) => ({
      ...prev,

      [node.id]:
        !prev[node.id]
    }));
  };

  return (

    <div className="app-container">

      <h1>
        Tree Visualizer
      </h1>

      <div className="flow-container">

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          onNodeClick={handleNodeClick}
        >

          <Background />
          <Controls />
          <MiniMap />

        </ReactFlow>

      </div>

    </div>
  );
}

export default App;