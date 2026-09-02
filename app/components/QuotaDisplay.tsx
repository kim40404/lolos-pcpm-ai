"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Zap } from 'lucide-react';

export default function QuotaDisplay() {
  const { data: session } = useSession();
  const [quota, setQuota] = useState<number | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchQuota = async () => {
      try {
        const res = await fetch('/api/user/quota');
        if (res.ok) {
          const data = await res.json();
          setQuota(data.aiQuota);
        }
      } catch (err) {
        console.error("Failed to fetch quota", err);
      }
    };
    fetchQuota();
    
    // Poll every 30 seconds to update quota if it changes in another tab
    const interval = setInterval(fetchQuota, 30000);
    return () => clearInterval(interval);
  }, [session]);

  if (quota === null) return null;

  return (
    <div className="flex items-center gap-1.5 bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff2a85] text-xs font-bold px-3 py-1.5 rounded-full mr-2 shadow-[0_0_10px_rgba(255,42,133,0.2)]">
      <Zap size={14} className="animate-pulse" />
      <span>{quota} Token</span>
    </div>
  );
}
