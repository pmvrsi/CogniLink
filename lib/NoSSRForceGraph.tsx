'use client';

import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-white/50">Loading graph...</div>,
});

interface GraphNode {
  id: string;
  label?: string;
  [key: string]: unknown;
}

interface GraphLink {
  source: string;
  target: string;
  [key: string]: unknown;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface NoSSRForceGraphProps {
  graphData: GraphData;
}

export default function NoSSRForceGraph({ graphData }: NoSSRForceGraphProps) {
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="label"
      nodeAutoColorBy="id"
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      backgroundColor="#023047"
    />
  );
}
