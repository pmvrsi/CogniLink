'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import NoSSRForceGraph, { adjacencyMatrixToGraphData, type ForceGraphData } from '@/lib/NoSSRForceGraph';
import { Brain, Loader2 } from 'lucide-react';

interface GraphData {
  n: number;
  labels: string[];
  label_summary: string[];
  adjacencyMatrix: number[][];
}

export default function SharePage() {
  const { id } = useParams<{ id: string }>();
  const [graphData, setGraphData]   = useState<GraphData | null>(null);
  const [forceGraph, setForceGraph] = useState<ForceGraphData | null>(null);
  const [selected, setSelected]     = useState<number | null>(null);
  const [notFound, setNotFound]     = useState(false);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data, error } = await supabase
        .from('shared_graphs')
        .select('graph_data')
        .eq('id', id)
        .single();

      if (error || !data) { setNotFound(true); return; }

      const gd = data.graph_data as GraphData;
      setGraphData(gd);
      setForceGraph(adjacencyMatrixToGraphData(gd.n, gd.labels, gd.adjacencyMatrix));
    })();
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#010b13] flex items-center justify-center text-white/40 text-sm">
        Graph not found.
      </div>
    );
  }

  if (!graphData || !forceGraph) {
    return (
      <div className="min-h-screen bg-[#010b13] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#219ebc]" />
      </div>
    );
  }

  const selectedTopic = selected !== null ? graphData.labels[selected] : null;
  const selectedSummary = selected !== null ? graphData.label_summary[selected] : null;

  return (
    <div className="min-h-screen bg-[#010b13] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center gap-3">
        <Brain className="w-5 h-5 text-[#219ebc]" />
        <span className="font-bold text-sm tracking-wide">CogniLink</span>
        <span className="text-white/20 text-xs ml-2">Shared Graph</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Graph */}
        <div className="flex-1 relative">
          <NoSSRForceGraph
            graphData={forceGraph}
            onNodeClick={(nodeId) => setSelected(prev => prev === nodeId ? null : nodeId)}
          />
        </div>

        {/* Sidebar */}
        <aside className="w-72 border-l border-white/5 bg-white/[0.01] flex flex-col overflow-y-auto p-5 gap-4">
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3">Topics</p>
            <div className="space-y-1">
              {graphData.labels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(prev => prev === i ? null : i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    selected === i
                      ? 'bg-[#219ebc]/20 border border-[#219ebc]/40 text-[#8ecae6]'
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {selectedTopic && (
            <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Topic</p>
              <p className="text-sm font-bold text-[#8ecae6] mb-2">{selectedTopic}</p>
              <p className="text-xs text-white/60 leading-relaxed">{selectedSummary}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
