'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  Link as LinkIcon, 
  LogOut, 
  FileText, 
  Plus,
  Search,
  Mic,
  Settings,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#8ecae6]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8ecae6] rounded-lg flex items-center justify-center">
              <LinkIcon className="w-4 h-4 text-[#023047]" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight">CogniLink</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
          </h1>
          <p className="text-gray-400 text-lg">
            [SYSTEM_READY]: Your knowledge base is active and learning.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button className="bg-[#219ebc] hover:bg-[#8ecae6] hover:text-[#023047] p-6 rounded-2xl transition-all group text-left">
            <Plus className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Upload Document</h3>
            <p className="text-sm opacity-80">Add PDFs, notes, or images</p>
          </button>

          <button className="bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-2xl transition-all group text-left">
            <Search className="w-8 h-8 mb-4 text-[#8ecae6]" />
            <h3 className="font-bold text-lg mb-1">Search Knowledge</h3>
            <p className="text-sm text-gray-400">Query your documents</p>
          </button>

          <button className="bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-2xl transition-all group text-left">
            <Mic className="w-8 h-8 mb-4 text-[#8ecae6]" />
            <h3 className="font-bold text-lg mb-1">Voice Mode</h3>
            <p className="text-sm text-gray-400">Ask questions hands-free</p>
          </button>

          <button className="bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-2xl transition-all group text-left">
            <Settings className="w-8 h-8 mb-4 text-[#8ecae6]" />
            <h3 className="font-bold text-lg mb-1">Settings</h3>
            <p className="text-sm text-gray-400">Configure your workspace</p>
          </button>
        </div>

        {/* Documents Section */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Your Documents</h2>
            <button className="text-sm font-bold text-[#8ecae6] hover:text-white transition-colors">
              View all
            </button>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No documents yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Upload your first document to start building your knowledge graph.
            </p>
            <button className="bg-[#219ebc] hover:bg-[#8ecae6] hover:text-[#023047] px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Upload Document
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
