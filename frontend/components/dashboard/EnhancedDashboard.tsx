"use client"
import { useState } from 'react'
import { Scissors, Type, Mail, Hash, BookOpen, Video, List, Share2, MessageSquare, Send, HelpCircle, Book, Zap, ShieldCheck, Settings, Globe, Copy, Check } from 'lucide-react'

interface DashboardContent {
  clips?: { Title?: string; Start: number; End: number; Score?: number }[];
  linkedin?: string;
  twitter?: string[];
  instagram?: string;
  facebook?: string;
  reddit?: string;
  blog?: string;
  newsletter?: string;
  cold_email?: string;
  seo?: { title?: string; description?: string };
  hashtags?: string[];
  hook?: string[];
  chapters?: { time: string; title: string }[];
  faq?: { q: string; a: string }[];
  glossary?: { term: string; definition: string }[];
}

export default function EnhancedDashboard({ content, onSave }: { content: DashboardContent, onSave: (d: DashboardContent) => void }) {
  const [data, setData] = useState(content)
  const [activeTab, setActiveTab] = useState('outputs')
  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4">
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button onClick={() => setActiveTab('outputs')} className={`px-6 py-3 font-bold text-sm uppercase tracking-wider focus:ring-2 focus:ring-blue-500 outline-none ${activeTab === 'outputs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Content Outputs</button>
        <button onClick={() => setActiveTab('brand')} className={`px-6 py-3 font-bold text-sm uppercase tracking-wider focus:ring-2 focus:ring-blue-500 outline-none ${activeTab === 'brand' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Brand Voice</button>
        <button onClick={() => setActiveTab('publishing')} className={`px-6 py-3 font-bold text-sm uppercase tracking-wider focus:ring-2 focus:ring-blue-500 outline-none ${activeTab === 'publishing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Publishing</button>
      </div>

      {activeTab === 'outputs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Panel icon={<Scissors size={20}/>} title="Suggested Clips" color="blue-600">
            <div className="space-y-2">
              {data.clips?.map((c, i) => (
                <div key={i} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                  <span className="font-medium text-sm">{c.Title || `Clip ${i+1}`}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Score: {c.Score}</span>
                    <span className="text-xs text-gray-500">{c.Start}s - {c.End}s</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Type size={20}/>} title="LinkedIn Post" color="blue-800" onCopy={() => copy(data.linkedin || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.linkedin || ''} onChange={(e) => setData({...data, linkedin: e.target.value})} aria-label="LinkedIn Post"/>
          </Panel>

          <Panel icon={<Hash size={20}/>} title="Twitter/X Thread" color="black" onCopy={() => copy(data.twitter?.join('\n\n') || '')}>
            <div className="space-y-3">
              {data.twitter?.map((t, i) => (
                <div key={i} className="relative">
                  <textarea className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-gray-500 outline-none" value={t} rows={3} onChange={(e) => {
                    const newTwitter = [...(data.twitter || [])]
                    newTwitter[i] = e.target.value
                    setData({...data, twitter: newTwitter})
                  }} aria-label={`Tweet ${i+1}`}/>
                  <span className="absolute bottom-1 right-2 text-[10px] text-gray-400">{t.length}/280</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Video size={20}/>} title="Instagram Caption" color="pink-600" onCopy={() => copy(data.instagram || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={data.instagram || ''} onChange={(e) => setData({...data, instagram: e.target.value})} aria-label="Instagram Caption"/>
          </Panel>

          <Panel icon={<Share2 size={20}/>} title="Facebook Post" color="blue-700" onCopy={() => copy(data.facebook || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.facebook || ''} onChange={(e) => setData({...data, facebook: e.target.value})} aria-label="Facebook Post"/>
          </Panel>

          <Panel icon={<MessageSquare size={20}/>} title="Reddit Post" color="orange-600" onCopy={() => copy(data.reddit || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-orange-500 outline-none" value={data.reddit || ''} onChange={(e) => setData({...data, reddit: e.target.value})} aria-label="Reddit Post"/>
          </Panel>

          <Panel icon={<BookOpen size={20}/>} title="Blog Post Outline" color="emerald-600" onCopy={() => copy(data.blog || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-emerald-500 outline-none" value={data.blog || ''} onChange={(e) => setData({...data, blog: e.target.value})} aria-label="Blog Post Outline"/>
          </Panel>

          <Panel icon={<Mail size={20}/>} title="Newsletter Section" color="red-600" onCopy={() => copy(data.newsletter || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-red-500 outline-none" value={data.newsletter || ''} onChange={(e) => setData({...data, newsletter: e.target.value})} aria-label="Newsletter Section"/>
          </Panel>

          <Panel icon={<Send size={20}/>} title="Cold Outreach Email" color="indigo-600" onCopy={() => copy(data.cold_email || '')}>
            <textarea className="w-full h-full p-3 border rounded resize-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={data.cold_email || ''} onChange={(e) => setData({...data, cold_email: e.target.value})} aria-label="Cold Outreach Email"/>
          </Panel>

          <Panel icon={<Globe size={20}/>} title="SEO Metadata" color="cyan-600" onCopy={() => copy(`${data.seo?.title || ''}\n\n${data.seo?.description || ''}`)}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400">Title Tag</label>
                <input className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-cyan-500 outline-none" value={data.seo?.title || ''} onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })} aria-label="SEO Title Tag"/>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400">Meta Description</label>
                <textarea className="w-full p-2 border rounded text-sm h-24 focus:ring-2 focus:ring-cyan-500 outline-none" value={data.seo?.description || ''} onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })} aria-label="SEO Meta Description"/>
              </div>
            </div>
          </Panel>

          <Panel icon={<Hash size={20}/>} title="Suggested Hashtags" color="slate-700">
             <div className="flex flex-wrap gap-2">
               {data.hashtags?.map((h, i) => (
                 <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{h}</span>
               ))}
             </div>
          </Panel>

          <Panel icon={<Zap size={20}/>} title="Engagement Hooks" color="yellow-600">
            <div className="space-y-2">
              {data.hook?.map((h, i) => (
                <div key={i} className="p-3 border-l-4 border-yellow-400 bg-yellow-50 text-sm italic">&ldquo;{h}&rdquo;</div>
              ))}
            </div>
          </Panel>

          <Panel icon={<List size={20}/>} title="Chapter Markers" color="indigo-600">
            <div className="space-y-1">
              {data.chapters?.map((c, i) => (
                <div key={i} className="text-sm font-mono p-1 border-b flex justify-between">
                  <span>{c.time}</span>
                  <span className="text-gray-600">{c.title}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<HelpCircle size={20}/>} title="FAQ Section" color="purple-600">
            <div className="space-y-4">
              {data.faq?.map((f, i) => (
                <div key={i}>
                  <p className="text-sm font-bold">Q: {f.q}</p>
                  <p className="text-sm text-gray-600 italic">A: {f.a}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Book size={20}/>} title="Key Terms Glossary" color="teal-600">
            <div className="space-y-3">
              {data.glossary?.map((g, i) => (
                <div key={i} className="text-sm">
                  <span className="font-bold border-b border-teal-200">{g.term}:</span> {g.definition}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {activeTab === 'brand' && (
        <div className="bg-white border rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={24}/> Brand Voice Profile</h2>
           <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tone Settings</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Professional', 'Casual', 'Educational', 'Entertaining', 'Inspirational'].map(t => (
                    <button key={t} className={`p-3 border rounded text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none ${t === 'Professional' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand Vocabulary (Always/Never use)</label>
                <textarea className="w-full p-4 border rounded text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="List key terms to prioritize or avoid..." aria-label="Brand Vocabulary"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience Persona</label>
                <input className="w-full p-4 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. CTOs at early stage startups..." aria-label="Target Audience Persona"/>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'publishing' && (
        <div className="bg-white border rounded-xl p-8 shadow-sm">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck size={24}/> Platform Connectivity</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'LinkedIn', icon: <Type size={20}/>, status: 'Connected' },
                { name: 'Twitter / X', icon: <Hash size={20}/>, status: 'Not Connected' },
                { name: 'Instagram', icon: <Video size={20}/>, status: 'Connected' },
                { name: 'Facebook', icon: <Share2 size={20}/>, status: 'Connected' },
                { name: 'YouTube', icon: <Video size={20}/>, status: 'Not Connected' },
                { name: 'TikTok', icon: <Scissors size={20}/>, status: 'Not Connected' }
              ].map(p => (
                <div key={p.name} className="p-6 border rounded-xl flex flex-col items-center gap-4 text-center">
                  <div aria-hidden="true" className={`p-4 rounded-full ${p.status === 'Connected' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{p.icon}</div>
                  <h3 className="font-bold">{p.name}</h3>
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${p.status === 'Connected' ? 'text-green-600' : 'text-gray-400'}`}>{p.status}</span>
                  <button className={`mt-2 px-6 py-2 rounded-lg text-sm font-bold transition-all focus:ring-2 focus:ring-blue-500 outline-none ${p.status === 'Connected' ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {p.status === 'Connected' ? 'Disconnect' : 'Connect Account'}
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex justify-between items-center mt-12 shadow-md">
        <div>
          <h3 className="font-bold text-blue-900 text-lg">One-Click Repurpose Now</h3>
          <p className="text-blue-800 italic text-sm">&ldquo;Scale your reach across 15+ platforms instantly.&rdquo;</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => onSave(data)} className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-500 outline-none">Save Drafts</button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-all focus:ring-2 focus:ring-blue-500 outline-none">Schedule Everything</button>
        </div>
      </div>
    </div>
  )
}

function Panel({ icon, title, color, children, onCopy }: { icon: React.ReactNode, title: string, color: string, children: React.ReactNode, onCopy?: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { if (onCopy) { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 2000) } }

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col h-[450px] transition-all hover:shadow-md border-gray-100">
      <div className="flex items-center justify-between gap-2 mb-4 border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className={`text-${color}`}>{icon}</span>
          <h2 className="font-bold uppercase tracking-widest text-[10px] text-gray-500">{title}</h2>
        </div>
        {onCopy && (
          <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" aria-label={`Copy ${title}`}>
            {copied ? <Check size={16} className="text-green-500" aria-hidden="true"/> : <Copy size={16} aria-hidden="true"/>}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  )
}
