import React from 'react';

import {
  Handle,
  Position
} from 'reactflow';

const CustomNode = ({ data }) => {

  return (

    <div
      style={{
        padding: '10px 20px',
        border: '2px solid #333',
        borderRadius: '10px',
        background: 'white',
        minWidth: '80px',
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}
    >

      <Handle
        type="target"
        position={Position.Top}
      />

      {data.label}

      {data.hasChildren && (

        <div
          style={{
            marginTop: '5px',
            fontSize: '12px'
          }}
        >
          {data.collapsed ? '+' : '-'}
        </div>

      )}

      <Handle
        type="source"
        position={Position.Bottom}
      />

    </div>
  );
};

export default CustomNode;