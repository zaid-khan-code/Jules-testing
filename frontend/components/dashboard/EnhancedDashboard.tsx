"use client"
import { useState } from 'react'
import { Scissors, Type, Mail, Hash, BookOpen, Video, List, Quote, FileText, Bell, Copy, Check } from 'lucide-react'

interface DashboardContent {
  clips?: { Title?: string; Start: number; End: number }[];
  linkedin: string;
  newsletter: string;
  twitter?: string[];
  blog: string;
  youtube: string;
  chapters?: { time: string; title: string }[];
  notes: string;
  quotes?: string[];
  tldr?: string[];
  cta: string;
}

export default function EnhancedDashboard({ content, onSave }: { content: DashboardContent, onSave: (d: DashboardContent) => void }) {
  const [data, setData] = useState(content)
  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel icon={<Scissors size={20}/>} title="Suggested Clips" color="blue-600">
          <div className="space-y-2">
            {data.clips?.map((c, i) => (
              <div key={i} className="p-3 border rounded bg-gray-50 flex justify-between items-center text-sm">
                <span className="font-medium">{c.Title || `Clip ${i+1}`}</span>
                <span className="text-gray-500">{c.Start}s - {c.End}s</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel icon={<Type size={20}/>} title="LinkedIn Post" color="blue-800" onCopy={() => copy(data.linkedin)}>
          <textarea className="w-full h-full p-3 border rounded resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.linkedin} onChange={(e) => setData({...data, linkedin: e.target.value})} aria-label="LinkedIn Post"/>
        </Panel>

        <Panel icon={<Mail size={20}/>} title="Newsletter" color="red-600" onCopy={() => copy(data.newsletter)}>
          <textarea className="w-full h-full p-3 border rounded resize-none focus:ring-2 focus:ring-red-500 outline-none" value={data.newsletter} onChange={(e) => setData({...data, newsletter: e.target.value})} aria-label="Newsletter"/>
        </Panel>

        <Panel icon={<Hash size={20}/>} title="Twitter Thread" color="black" onCopy={() => copy(data.twitter?.join('\n\n') || '')}>
          <div className="space-y-3">
            {data.twitter?.map((t, i) => (
              <div key={i} className="relative">
                <textarea className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-gray-500 outline-none" value={t} rows={3} onChange={(e) => {
                  const nt = [...(data.twitter || [])]; nt[i] = e.target.value; setData({...data, twitter: nt})
                }} aria-label={`Tweet ${i+1}`}/>
                <span className="absolute bottom-1 right-2 text-[10px] text-gray-400">{t.length}/280</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel icon={<BookOpen size={20}/>} title="Blog Outline" color="emerald-600" onCopy={() => copy(data.blog)}>
          <textarea className="w-full h-full p-3 border rounded resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.blog} onChange={(e) => setData({...data, blog: e.target.value})} aria-label="Blog Outline"/>
        </Panel>

        <Panel icon={<Video size={20}/>} title="YouTube Desc" color="red-700" onCopy={() => copy(data.youtube)}>
          <textarea className="w-full h-full p-3 border rounded resize-none focus:ring-2 focus:ring-red-700 outline-none" value={data.youtube} onChange={(e) => setData({...data, youtube: e.target.value})} aria-label="YouTube Description"/>
        </Panel>

        <Panel icon={<List size={20}/>} title="Chapters" color="indigo-600">
          <div className="space-y-1">
            {data.chapters?.map((c, i) => <div key={i} className="text-sm font-mono p-1 border-b">{c.time} - {c.title}</div>)}
          </div>
        </Panel>

        <Panel icon={<FileText size={20}/>} title="Show Notes" color="purple-600" onCopy={() => copy(data.notes)}>
          <textarea className="w-full h-full p-3 border rounded resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={data.notes} onChange={(e) => setData({...data, notes: e.target.value})} aria-label="Show Notes"/>
        </Panel>

        <Panel icon={<Quote size={20}/>} title="Key Quotes" color="amber-600">
          <div className="space-y-2">
            {data.quotes?.map((q, i) => <div key={i} className="italic text-sm p-2 border-l-4 border-amber-200 bg-amber-50">&ldquo;{q}&rdquo;</div>)}
          </div>
        </Panel>

        <Panel icon={<Bell size={20}/>} title="Summary" color="slate-600">
           <ul className="list-disc pl-5 space-y-1 text-sm">{data.tldr?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </Panel>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-blue-900">Suggested Call to Action</h3>
          <p className="text-blue-800 italic">&ldquo;{data.cta}&rdquo;</p>
        </div>
        <button onClick={() => onSave(data)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Save All Edits</button>
      </div>
    </div>
  )
}

function Panel({ icon, title, color, children, onCopy }: { icon: React.ReactNode, title: string, color: string, children: React.ReactNode, onCopy?: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { if (onCopy) { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 2000) } }
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" style={{ color: 'var(--tw-text-opacity)' }} className={`text-${color}`}>{icon}</span>
          <h2 className="font-bold uppercase tracking-wider text-xs text-gray-600">{title}</h2>
        </div>
        {onCopy && (
          <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" aria-label={`Copy ${title}`}>
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
