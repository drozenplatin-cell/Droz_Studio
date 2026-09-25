import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { DROZ_TEMPLATES } from '../../data/templates';
import { ProjectTemplate } from '../../types/droz';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTemplate: (template: ProjectTemplate) => void;
  onGenerateFromPrompt: (promptText: string) => void;
}

export function NewProjectModal({
  isOpen,
  onClose,
  onLoadTemplate,
  onGenerateFromPrompt
}: NewProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'prompt'>('templates');
  const [promptText, setPromptText] = useState(
    'Create a responsive hospital website with patient registration, appointment booking, staff login and an administrator dashboard.'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-3xl bg-[#2B2D30] border border-[#393B40] rounded-lg shadow-2xl overflow-hidden font-sans text-xs text-[#BCBEC4] flex flex-col max-h-[85vh]">
        {/* Android Studio Wizard Header */}
        <div className="p-3.5 border-b border-[#393B40] flex items-center justify-between bg-[#1E1F22]">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-[#3DDC84] flex items-center justify-center text-[#1E1F22] font-black text-xs">
              DZ
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#DFE1E5]">New Universal Project Wizard</h2>
              <p className="text-[11px] text-[#707278]">Select a project template or generate with Droz AI Engine</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 hover:bg-[#393B40] rounded text-[#707278]">
            <X size={15} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#393B40] bg-[#2B2D30] px-4 text-xs">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 border-b-2 font-medium transition ${
              activeTab === 'templates' ? 'border-[#3574F0] text-[#DFE1E5]' : 'border-transparent text-[#707278] hover:text-[#DFE1E5]'
            }`}
          >
            Project Templates
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2 border-b-2 font-medium transition ${
              activeTab === 'prompt' ? 'border-[#3574F0] text-[#DFE1E5]' : 'border-transparent text-[#707278] hover:text-[#DFE1E5]'
            }`}
          >
            Natural Language Generator
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1E1F22]">
          {activeTab === 'templates' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DROZ_TEMPLATES.map(tpl => (
                <div
                  key={tpl.id}
                  onClick={() => { onLoadTemplate(tpl); onClose(); }}
                  className="p-3.5 bg-[#2B2D30] border border-[#393B40] hover:border-[#3574F0] rounded-lg cursor-pointer transition group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#1E1F22] text-[#3DDC84] border border-[#393B40]">
                        {tpl.category}
                      </span>
                      <span className="text-[10px] text-[#707278] font-mono uppercase">
                        {tpl.platforms.join(' • ')}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#DFE1E5] group-hover:text-[#3574F0] transition">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-[#707278]">{tpl.tagline}</p>

                    <div className="space-y-0.5 pt-1">
                      {tpl.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center space-x-1 text-[11px] text-[#BCBEC4]">
                          <CheckCircle2 size={11} className="text-[#3DDC84] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#393B40] flex items-center justify-between text-xs text-[#3574F0] font-medium">
                    <span>Configure & Initialize</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-[#2B2D30] rounded-lg border border-[#393B40] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#3DDC84] font-mono">
                  Natural Language Project Specification
                </span>
                <p className="text-xs text-[#BCBEC4]">
                  Describe your application requirements. Droz AI will design the database schema, API contracts, backend logic, and responsive UI layouts across Android, iOS, Windows, macOS, and Web.
                </p>

                <textarea
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                  rows={4}
                  className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2.5 text-[#DFE1E5] text-xs focus:outline-none focus:border-[#3574F0] leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => { onGenerateFromPrompt(promptText); onClose(); }}
                  className="px-4 py-2 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded font-semibold text-xs transition"
                >
                  Generate Project & Launch Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
