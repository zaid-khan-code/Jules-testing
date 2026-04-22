"use client"
import { useState } from 'react'
import { Scissors, Type, Mail, Hash, BookOpen, Youtube, List, Quote, FileText, Bell } from 'lucide-react'

export default function EnhancedDashboard({ content, onSave }: any) {
  const [data, setData] = useState(content)
  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1: Clips & LinkedIn */}
        <Panel icon={<Scissors size={20}/>} title="Suggested Clips" color="blue-600">
          <div className="space-y-2">
            {data.clips?.map((c: any, i: number) => (
              <div key={i} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <span className="font-medium text-sm">{c.Title || `Clip ${i+1}`}</span>
                <span className="text-xs text-gray-500">{c.Start}s - {c.End}s</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel icon={<Type size={20}/>} title="LinkedIn Post" color="blue-800">
          <textarea className="w-full h-full p-3 border rounded resize-none" value={data.linkedin} onChange={(e) => setData({...data, linkedin: e.target.value})}/>
        </Panel>

        {/* Row 2: Newsletter & Twitter */}
        <Panel icon={<Mail size={20}/>} title="Newsletter Section" color="red-600">
          <textarea className="w-full h-full p-3 border rounded resize-none" value={data.newsletter} onChange={(e) => setData({...data, newsletter: e.target.value})}/>
        </Panel>

        <Panel icon={<Hash size={20}/>} title="Twitter/X Thread" color="black">
          <div className="space-y-3">
            {data.twitter?.map((t: string, i: number) => (
              <div key={i} className="relative">
                <textarea className="w-full p-2 border rounded text-sm" value={t} rows={3}/>
                <span className="absolute bottom-1 right-2 text-[10px] text-gray-400">{t.length}/280</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Row 3: Blog & YouTube Description */}
        <Panel icon={<BookOpen size={20}/>} title="Blog Post Outline" color="emerald-600">
          <textarea className="w-full h-full p-3 border rounded resize-none" value={data.blog} />
        </Panel>

        <Panel icon={<Youtube size={20}/>} title="YouTube Description" color="red-700">
          <textarea className="w-full h-full p-3 border rounded resize-none" value={data.youtube} />
        </Panel>

        {/* Row 4: Chapters & Show Notes */}
        <Panel icon={<List size={20}/>} title="Chapter Markers" color="indigo-600">
          <div className="space-y-1">
            {data.chapters?.map((c: any, i: number) => (
               <div key={i} className="text-sm font-mono p-1 border-b">{c.time} - {c.title}</div>
            ))}
          </div>
        </Panel>

        <Panel icon={<FileText size={20}/>} title="Podcast Show Notes" color="purple-600">
          <textarea className="w-full h-full p-3 border rounded resize-none" value={data.notes} />
        </Panel>

        {/* Row 5: Quotes & TL;DR */}
        <Panel icon={<Quote size={20}/>} title="Key Quotes" color="amber-600">
          <div className="space-y-2">
            {data.quotes?.map((q: string, i: number) => (
              <div key={i} className="italic text-sm p-2 border-l-4 border-amber-200 bg-amber-50">"{q}"</div>
            ))}
          </div>
        </Panel>

        <Panel icon={<Bell size={20}/>} title="Summary (TL;DR)" color="slate-600">
           <ul className="list-disc pl-5 space-y-1 text-sm">
             {data.tldr?.map((item: string, i: number) => <li key={i}>{item}</li>)}
           </ul>
        </Panel>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-blue-900">Suggested Call to Action</h3>
          <p className="text-blue-800 italic">"{data.cta}"</p>
        </div>
        <button onClick={() => onSave(data)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Save All Edits</button>
      </div>
    </div>
  )
}

function Panel({ icon, title, color, children }: any) {
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white flex flex-col h-[400px]">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: 'var(--tw-text-opacity)' }} className={`text-${color}`}>{icon}</span>
        <h2 className="font-bold uppercase tracking-wider text-xs text-gray-600">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
