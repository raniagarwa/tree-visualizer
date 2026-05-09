let currentX = 0;

const NODE_WIDTH = 140;
const LEVEL_HEIGHT = 140;

export function generateTreeLayout(
  root,
  collapsedNodes = {}
) {
  currentX = 0;

  const nodes = [];
  const edges = [];

  function traverse(node, depth = 0, parentId = null) {

    const children =
      collapsedNodes[node.id]
        ? []
        : node.children || [];

    let childPositions = [];

    for (const child of children) {

      const childPos = traverse(
        child,
        depth + 1,
        node.id
      );

      childPositions.push(childPos.x);
    }

    let x;

    if (childPositions.length > 0) {

      x =
        (
          Math.min(...childPositions) +
          Math.max(...childPositions)
        ) / 2;

    } else {

      x = currentX;
      currentX += NODE_WIDTH;
    }

    const y = depth * LEVEL_HEIGHT;

    nodes.push({
      id: node.id,
      type: 'custom',

      position: { x, y },

      data: {
        label: node.id,

        hasChildren:
          node.children &&
          node.children.length > 0,

        collapsed:
          collapsedNodes[node.id]
      }
    });

    if (parentId) {

      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
         type: 'smoothstep',
         animated: false
      });
    }

    return { x, y };
  }

  traverse(root);

  return { nodes, edges };
}