'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState, useCallback } from 'react';

// Dynamically import ForceGraph2D with SSR disabled (it uses browser APIs)
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export interface GraphNode {
  id: number;
  name: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: number;
  target: number;
}

export interface ForceGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface NoSSRForceGraphProps {
  graphData: ForceGraphData;
}

/**
 * Adjacency-matrix → force-graph converter.
 * Call this on the client (or in the API) before passing data to <NoSSRForceGraph>.
 */
export function adjacencyMatrixToGraphData(
  n: number,
  labels: string[],
  adjacencyMatrix: number[][],
): ForceGraphData {
  const nodes: GraphNode[] = labels.map((name, i) => ({ id: i, name }));
  const links: GraphLink[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (adjacencyMatrix[i][j] === 1) {
        links.push({ source: i, target: j });
      }
    }
  }

  return { nodes, links };
}

export default function NoSSRForceGraph({ graphData }: NoSSRForceGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });

  // Keep graph dimensions in sync with container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setSize({ width, height });
    };
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeCanvasObject = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const r = 7;
      const fontSize = Math.max(12 / globalScale, 4);
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const label = node.name ?? '';

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = '#219ebc';
      ctx.fill();
      ctx.strokeStyle = '#8ecae6';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label below
      ctx.font = `bold ${fontSize}px "Ubuntu Mono", monospace`;
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y + r + fontSize + 2);
    },
    [],
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <ForceGraph2D
        graphData={graphData}
        width={size.width}
        height={size.height}
        backgroundColor="transparent"
        nodeColor={() => '#219ebc'}
        nodeRelSize={7}
        nodeLabel={(node: any) => node.name}
        linkColor={() => 'rgba(255,255,255,0.25)'}
        linkWidth={1.5}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
      />
    </div>
  );
}
