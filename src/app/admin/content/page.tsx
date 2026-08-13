'use client';

import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'work' | 'about'>('work');
  const [works, setWorks] = useState<any[]>([]);
  const [abouts, setAbouts] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content/work').then(res => res.json()).then(setWorks);
    fetch('/api/admin/content/about').then(res => res.json()).then(setAbouts);
  }, []);

  const handleSaveWork = async () => {
    setSaving(true);
    await fetch('/api/admin/content/work', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(works.map((w, i) => ({ ...w, order: i })))
    });
    setSaving(false);
    alert('Saved Work Section');
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    await fetch('/api/admin/content/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(abouts.map((a, i) => ({ ...a, order: i })))
    });
    setSaving(false);
    alert('Saved About Section');
  };

  const moveItem = (list: any[], setList: any, index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= list.length) return;
    const newItems = [...list];
    const temp = newItems[index];
    newItems[index] = newItems[index + direction];
    newItems[index + direction] = temp;
    setList(newItems);
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Content CMS</h1>
        <p className="text-foreground/70 mt-1">Manage dynamic content for the Homepage and About pages.</p>
      </div>

      <div className="flex border-b border-border/20 mb-8">
        <button 
          onClick={() => setActiveTab('work')}
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'work' ? 'text-accent border-b-2 border-accent' : 'text-foreground/70 hover:text-foreground'}`}
        >
          Homepage - Work/Portfolio
        </button>
        <button 
          onClick={() => setActiveTab('about')}
          className={`px-6 py-3 font-medium transition-colors ${activeTab === 'about' ? 'text-accent border-b-2 border-accent' : 'text-foreground/70 hover:text-foreground'}`}
        >
          About - What We Do
        </button>
      </div>

      {activeTab === 'work' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Portfolio Items</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setWorks([...works, { _id: Date.now().toString(), title: '', category: '', description: '', link: '', image: '' }])}
                className="flex items-center gap-2 px-4 py-2 bg-surface text-foreground font-bold rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
              <button 
                onClick={handleSaveWork} disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {works.map((item, idx) => (
              <div key={item._id} className="bg-surface border border-border/20 rounded-xl p-6 flex gap-6">
                <div className="flex flex-col gap-2 justify-center border-r border-border/20 pr-4">
                  <button onClick={() => moveItem(works, setWorks, idx, -1)} className="p-1 hover:text-accent"><ArrowUp className="w-5 h-5"/></button>
                  <button onClick={() => moveItem(works, setWorks, idx, 1)} className="p-1 hover:text-accent"><ArrowDown className="w-5 h-5"/></button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-foreground/50">Title</label><input value={item.title} onChange={e => { const w = [...works]; w[idx].title = e.target.value; setWorks(w); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div><label className="text-xs text-foreground/50">Category</label><input value={item.category} onChange={e => { const w = [...works]; w[idx].category = e.target.value; setWorks(w); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div className="col-span-2"><label className="text-xs text-foreground/50">Description</label><input value={item.description} onChange={e => { const w = [...works]; w[idx].description = e.target.value; setWorks(w); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div><label className="text-xs text-foreground/50">Link (e.g. /services/branding)</label><input value={item.link} onChange={e => { const w = [...works]; w[idx].link = e.target.value; setWorks(w); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div><label className="text-xs text-foreground/50">Image URL</label><input value={item.image} onChange={e => { const w = [...works]; w[idx].image = e.target.value; setWorks(w); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                </div>
                <div>
                  <button onClick={() => setWorks(works.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Service Cards (What We Do)</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setAbouts([...abouts, { _id: Date.now().toString(), title: '', description: '', icon: '' }])}
                className="flex items-center gap-2 px-4 py-2 bg-surface text-foreground font-bold rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
              <button 
                onClick={handleSaveAbout} disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {abouts.map((item, idx) => (
              <div key={item._id} className="bg-surface border border-border/20 rounded-xl p-6 flex gap-6">
                <div className="flex flex-col gap-2 justify-center border-r border-border/20 pr-4">
                  <button onClick={() => moveItem(abouts, setAbouts, idx, -1)} className="p-1 hover:text-accent"><ArrowUp className="w-5 h-5"/></button>
                  <button onClick={() => moveItem(abouts, setAbouts, idx, 1)} className="p-1 hover:text-accent"><ArrowDown className="w-5 h-5"/></button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-foreground/50">Title</label><input value={item.title} onChange={e => { const a = [...abouts]; a[idx].title = e.target.value; setAbouts(a); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div><label className="text-xs text-foreground/50">Icon Name (lucide-react e.g. MonitorPlay)</label><input value={item.icon} onChange={e => { const a = [...abouts]; a[idx].icon = e.target.value; setAbouts(a); }} className="w-full bg-background border border-border/20 rounded p-2" /></div>
                  <div className="col-span-2"><label className="text-xs text-foreground/50">Description</label><textarea value={item.description} onChange={e => { const a = [...abouts]; a[idx].description = e.target.value; setAbouts(a); }} className="w-full bg-background border border-border/20 rounded p-2 h-20" /></div>
                </div>
                <div>
                  <button onClick={() => setAbouts(abouts.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
