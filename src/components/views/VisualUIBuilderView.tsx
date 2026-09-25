import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Code2,
  Sliders,
  Trash2,
  Copy,
  Check,
  TrendingUp,
  Download,
  Plus,
  RefreshCw,
  Layers,
  Sparkles,
  FolderTree,
  ChevronRight,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Maximize2,
  SlidersHorizontal,
  MoveHorizontal,
  RotateCcw
} from 'lucide-react';
import { UIComponentItem } from '../../types/droz';

interface VisualUIBuilderProps {
  canvasItems: UIComponentItem[];
  setCanvasItems: React.Dispatch<React.SetStateAction<UIComponentItem[]>>;
  onSaveToWorkspace: (generatedCode: string) => void;
}

export function VisualUIBuilderView({
  canvasItems,
  setCanvasItems,
  onSaveToWorkspace
}: VisualUIBuilderProps) {
  const [deviceViewport, setDeviceViewport] = useState<'android' | 'tablet' | 'desktop' | 'custom'>('android');
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');
  const [codeLanguage, setCodeLanguage] = useState<'compose' | 'react' | 'flutter' | 'swiftui' | 'winui'>('compose');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(canvasItems[0]?.id || null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showComponentTree, setShowComponentTree] = useState(true);

  // Dynamic Panel Resizers
  const [treeWidth, setTreeWidth] = useState<number>(220);
  const [isDraggingTree, setIsDraggingTree] = useState<boolean>(false);

  const [inspectorWidth, setInspectorWidth] = useState<number>(280);
  const [isDraggingInspector, setIsDraggingInspector] = useState<boolean>(false);

  // Zoom & Viewport Dimensions Adjusters
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [customCanvasWidth, setCustomCanvasWidth] = useState<number>(380);

  // Global mouse drag listener for Layout Inspector and Properties Inspector resizing
  useEffect(() => {
    if (!isDraggingTree && !isDraggingInspector) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingTree) {
        // e.clientX minus left margin (~300px based on ActivityBar + Sidebar)
        const newWidth = Math.max(160, Math.min(420, e.clientX - 280));
        setTreeWidth(newWidth);
      }
      if (isDraggingInspector) {
        const newWidth = Math.max(220, Math.min(500, window.innerWidth - e.clientX));
        setInspectorWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTree(false);
      setIsDraggingInspector(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingTree, isDraggingInspector]);

  const selectedItem = canvasItems.find(item => item.id === selectedItemId);

  const removeItem = (id: string) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const updateProp = (propKey: string, value: any) => {
    if (!selectedItemId) return;
    setCanvasItems(prev => prev.map(item => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          props: { ...item.props, [propKey]: value }
        };
      }
      return item;
    }));
  };

  // Generate real multi-platform source code according to selected language
  const generateCleanSourceCode = () => {
    if (codeLanguage === 'compose') {
      return `package com.droz.schoolsphere.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun StudentPortalScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Top App Header
        Text(
            text = "${canvasItems[0]?.props.title || 'Droz Education Portal'}",
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary
        )

        // Metrics Grid
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Card(modifier = Modifier.weight(1f)) {
                Column(Modifier.padding(12.dp)) {
                    Text("Total Students", style = MaterialTheme.typography.labelSmall)
                    Text("1,248", style = MaterialTheme.typography.titleLarge)
                }
            }
            Card(modifier = Modifier.weight(1f)) {
                Column(Modifier.padding(12.dp)) {
                    Text("Attendance", style = MaterialTheme.typography.labelSmall)
                    Text("98.4%", style = MaterialTheme.typography.titleLarge)
                }
            }
        }

        // Action Button
        Button(
            onClick = { /* Enroll student */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("+ Enroll New Student")
        }
    }
}`;
    }

    if (codeLanguage === 'winui') {
      return `<!-- Windows 11 WinUI 3 XAML Specification -->
<Page
    x:Class="SchoolSphere.Views.StudentPortalPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">

    <StackPanel Spacing="16" Margin="24">
        <!-- Header -->
        <TextBlock Text="${canvasItems[0]?.props.title || 'SchoolSphere Portal'}"
                   Style="{StaticResource TitleTextBlockStyle}"
                   Foreground="{ThemeResource AccentTextFillColorPrimaryBrush}" />

        <!-- Metrics Grid -->
        <Grid ColumnDefinitions="*,*">
            <Border Grid.Column="0" Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
                    CornerRadius="8" Padding="16" Margin="0,0,8,0">
                <StackPanel>
                    <TextBlock Text="Total Students" Style="{StaticResource CaptionTextBlockStyle}" />
                    <TextBlock Text="1,248" Style="{StaticResource SubtitleTextBlockStyle}" />
                </StackPanel>
            </Border>
            <Border Grid.Column="1" Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
                    CornerRadius="8" Padding="16" Margin="8,0,0,0">
                <StackPanel>
                    <TextBlock Text="Attendance" Style="{StaticResource CaptionTextBlockStyle}" />
                    <TextBlock Text="98.4%" Style="{StaticResource SubtitleTextBlockStyle}" Foreground="#3DDC84" />
                </StackPanel>
            </Border>
        </Grid>

        <!-- Primary Action -->
        <Button Content="+ Enroll New Student"
                Style="{StaticResource AccentButtonStyle}"
                HorizontalAlignment="Stretch" />
    </StackPanel>
</Page>`;
    }

    if (codeLanguage === 'flutter') {
      return `import 'package:flutter/material.dart';

class StudentPortalScreen extends StatelessWidget {
  const StudentPortalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("${canvasItems[0]?.props.title || 'Droz Portal'}")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(child: _buildMetric("Total Students", "1,248")),
                const SizedBox(width: 12),
                Expanded(child: _buildMetric("Attendance", "98.4%")),
              ],
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {},
              child: const Text("+ Enroll New Student"),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildMetric(String label, String value) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}`;
    }

    if (codeLanguage === 'swiftui') {
      return `import SwiftUI

struct StudentPortalView: View {
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 16) {
                Text("${canvasItems[0]?.props.title || 'Droz Portal'}")
                    .font(.largeTitle.bold())
                
                HStack {
                    StatBox(label: "Attendance", value: "98.4%")
                    StatBox(label: "Students", value: "1,248")
                }
                
                Button("+ Enroll New Student") {
                    // Action
                }
                .buttonStyle(.borderedProminent)
                
                Spacer()
            }
            .padding()
            .navigationTitle("Dashboard")
        }
    }
}`;
    }

    // Default: React + Tailwind CSS
    return `import React from 'react';

export default function StudentPortalDashboard() {
  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#DFE1E5] p-6 space-y-6 font-sans">
      <header className="flex justify-between items-center pb-4 border-b border-[#393B40]">
        <div>
          <h1 className="text-xl font-bold text-[#DFE1E5]">${canvasItems[0]?.props.title || 'Droz Portal'}</h1>
          <p className="text-xs text-[#707278]">Universal Software Application</p>
        </div>
        <button className="px-3 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium">
          + Enroll Student
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg">
          <span className="text-xs text-[#707278]">Total Students</span>
          <div className="text-xl font-bold mt-1 text-white">1,248</div>
        </div>
        <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg">
          <span className="text-xs text-[#707278]">Attendance Today</span>
          <div className="text-xl font-bold mt-1 text-[#3DDC84]">98.4%</div>
        </div>
      </div>
    </div>
  );
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCleanSourceCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs">
      {/* Top Controls Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none text-[#BCBEC4]">
        <div className="flex items-center space-x-3">
          {/* Visual Canvas vs Generated Code Tab */}
          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
                activeTab === 'visual' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Eye size={12} />
              <span>Design Surface</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
                activeTab === 'code' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Code2 size={12} />
              <span>Generated Code</span>
            </button>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Component Tree Toggle */}
          <button
            onClick={() => setShowComponentTree(!showComponentTree)}
            className={`flex items-center space-x-1 px-2 py-1 rounded border border-[#393B40] transition ${
              showComponentTree ? 'bg-[#1E1F22] text-[#3574F0]' : 'text-[#707278] hover:text-[#DFE1E5]'
            }`}
            title="Toggle Layout Inspector (Component Tree)"
          >
            <FolderTree size={12} />
            <span>Component Tree</span>
          </button>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Device Frame & Viewport Switcher */}
          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40]">
            <button
              onClick={() => {
                setDeviceViewport('android');
                setCustomCanvasWidth(380);
              }}
              title="Google Pixel 9 Pro (Android 15)"
              className={`p-1 rounded transition flex items-center space-x-1 text-xs px-2 ${
                deviceViewport === 'android' ? 'bg-[#2B2D30] text-[#3DDC84] font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Smartphone size={13} />
              <span>Pixel 9 (380px)</span>
            </button>
            <button
              onClick={() => {
                setDeviceViewport('tablet');
                setCustomCanvasWidth(720);
              }}
              title="Tablet / iPad Frame"
              className={`p-1 rounded transition flex items-center space-x-1 text-xs px-2 ${
                deviceViewport === 'tablet' ? 'bg-[#2B2D30] text-[#3574F0] font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Tablet size={13} />
              <span>Tablet (720px)</span>
            </button>
            <button
              onClick={() => {
                setDeviceViewport('desktop');
                setCustomCanvasWidth(960);
              }}
              title="Desktop / Web Viewport"
              className={`p-1 rounded transition flex items-center space-x-1 text-xs px-2 ${
                deviceViewport === 'desktop' ? 'bg-[#2B2D30] text-[#3574F0] font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Monitor size={13} />
              <span>Desktop (960px)</span>
            </button>
            <button
              onClick={() => setDeviceViewport('custom')}
              title="Adjust Custom Canvas Width"
              className={`p-1 rounded transition flex items-center space-x-1 text-xs px-2 ${
                deviceViewport === 'custom' ? 'bg-[#2B2D30] text-[#e09f3e] font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <MoveHorizontal size={13} />
              <span>Custom Adjust</span>
            </button>
          </div>

          {/* Interactive Width Adjuster (When Custom or needed) */}
          {deviceViewport === 'custom' && (
            <div className="flex items-center space-x-1.5 bg-[#1E1F22] border border-[#393B40] px-2 py-0.5 rounded text-xs">
              <span className="text-[#707278] text-[11px]">Width:</span>
              <input
                type="range"
                min="320"
                max="1100"
                step="10"
                value={customCanvasWidth}
                onChange={(e) => setCustomCanvasWidth(Number(e.target.value))}
                className="w-20 accent-[#3574F0] cursor-pointer h-1.5"
                title={`Adjust canvas width: ${customCanvasWidth}px`}
              />
              <span className="text-[#DFE1E5] font-mono text-[11px] font-semibold w-12 text-right">
                {customCanvasWidth}px
              </span>
            </div>
          )}

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Zoom Adjuster Controls (Android Studio Style Canvas Scaling) */}
          <div className="flex items-center space-x-1 bg-[#1E1F22] border border-[#393B40] px-1 py-0.5 rounded text-xs">
            <button
              onClick={() => setZoomScale(prev => Math.max(50, prev - 15))}
              className="p-1 hover:text-[#DFE1E5] text-[#707278] rounded hover:bg-[#2B2D30] transition"
              title="Zoom Out (-15%)"
            >
              <ZoomOut size={12} />
            </button>
            <select
              value={zoomScale}
              onChange={(e) => setZoomScale(Number(e.target.value))}
              aria-label="Canvas Zoom Scale"
              className="bg-transparent text-[#DFE1E5] font-mono text-[11px] focus:outline-none cursor-pointer px-1"
            >
              <option value={50} className="bg-[#2B2D30]">50%</option>
              <option value={75} className="bg-[#2B2D30]">75%</option>
              <option value={100} className="bg-[#2B2D30]">100% (Fit)</option>
              <option value={125} className="bg-[#2B2D30]">125%</option>
              <option value={150} className="bg-[#2B2D30]">150%</option>
            </select>
            <button
              onClick={() => setZoomScale(prev => Math.min(150, prev + 15))}
              className="p-1 hover:text-[#DFE1E5] text-[#707278] rounded hover:bg-[#2B2D30] transition"
              title="Zoom In (+15%)"
            >
              <ZoomIn size={12} />
            </button>
            {zoomScale !== 100 && (
              <button
                onClick={() => setZoomScale(100)}
                className="p-0.5 hover:text-[#3DDC84] text-[#707278] transition text-[10px]"
                title="Reset Zoom to 100%"
              >
                <RotateCcw size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center space-x-2">
          {activeTab === 'code' && (
            <div className="flex items-center space-x-1 bg-[#1E1F22] border border-[#393B40] px-2 py-0.5 rounded text-xs">
              <span className="text-[#707278]">Target Syntax:</span>
              <select
                value={codeLanguage}
                onChange={(e: any) => setCodeLanguage(e.target.value)}
                aria-label="Target Code Syntax"
                className="bg-transparent text-[#DFE1E5] font-mono focus:outline-none cursor-pointer"
              >
                <option value="compose" className="bg-[#2B2D30]">Jetpack Compose (Android)</option>
                <option value="winui" className="bg-[#2B2D30]">WinUI 3 / XAML (Windows 11)</option>
                <option value="swiftui" className="bg-[#2B2D30]">SwiftUI (iOS & macOS)</option>
                <option value="flutter" className="bg-[#2B2D30]">Flutter (Dart)</option>
                <option value="react" className="bg-[#2B2D30]">React + Tailwind (Web)</option>
              </select>
            </div>
          )}

          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
          >
            {copiedCode ? <Check size={12} className="text-[#3DDC84]" /> : <Copy size={12} />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={() => onSaveToWorkspace(generateCleanSourceCode())}
            className="flex items-center space-x-1 px-3 py-1 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium transition"
          >
            <span>Commit to /ui Workspace</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area: Layout Tree + Canvas or Code + Properties Inspector */}
      <div className={`flex-1 flex overflow-hidden ${isDraggingTree || isDraggingInspector ? 'select-none' : ''}`}>
        {/* Left: Component Tree (Layout Inspector) with Draggable Resizer */}
        {showComponentTree && activeTab === 'visual' && (
          <>
            <div
              style={{ width: `${treeWidth}px` }}
              className="bg-[#2B2D30] border-r border-[#393B40] flex flex-col select-none text-xs text-[#BCBEC4] shrink-0"
            >
              <div className="h-8 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 font-semibold text-[#DFE1E5]">
                <span className="flex items-center space-x-1.5">
                  <FolderTree size={13} className="text-[#3DDC84]" />
                  <span>Layout Hierarchy</span>
                </span>
                <span className="text-[10px] text-[#707278] font-mono">{canvasItems.length} nodes</span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#707278] px-2 py-1">
                  Root: Scaffold (Column)
                </div>
                {canvasItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? 'bg-[#3574F0] text-white font-medium shadow-sm'
                          : 'hover:bg-[#1E1F22] text-[#DFE1E5]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <ChevronRight size={11} className={isSelected ? 'text-white' : 'text-[#707278]'} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-1 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#1E1F22] text-[#707278]'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Draggable Divider Splitter for Tree */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingTree(true);
              }}
              onDoubleClick={() => setTreeWidth(220)}
              title="Drag to adjust hierarchy tree width (Double click to reset)"
              className={`w-1 hover:w-1.5 cursor-col-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
                isDraggingTree ? 'bg-[#3574F0] w-1.5 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]/40'
              }`}
            />
          </>
        )}

        {/* Middle: Canvas or Code with Zoom & Dimension Adjustments */}
        {activeTab === 'visual' ? (
          <div className="flex-1 overflow-auto bg-[#18181A] p-6 flex justify-center items-start">
            <div
              style={{
                transform: `scale(${zoomScale / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.12s ease-out'
              }}
            >
              {/* Authentic Device Frame */}
              {deviceViewport === 'android' ? (
                <div className="w-[380px] min-h-[720px] bg-[#1E1F22] border-[8px] border-[#2B2D30] rounded-[42px] shadow-2xl p-4 flex flex-col relative overflow-hidden ring-1 ring-[#393B40]">
                  {/* Android Status Bar */}
                  <div className="flex justify-between items-center px-3 py-1 text-[11px] text-[#DFE1E5] font-mono mb-2">
                    <span>9:41</span>
                    <div className="w-3 h-3 rounded-full bg-[#18181A]" />
                    <span>5G 100%</span>
                  </div>

                  {/* Canvas Render Area */}
                  <div className="flex-1 bg-[#18181A] rounded-2xl p-4 space-y-4 overflow-y-auto">
                    {canvasItems.map(item => {
                      const isSelected = selectedItemId === item.id;
                      const customPadding = item.props.padding !== undefined ? `${item.props.padding}px` : undefined;
                      const customRadius = item.props.borderRadius !== undefined ? `${item.props.borderRadius}px` : undefined;
                      const customFontSize = item.props.fontSize !== undefined ? `${item.props.fontSize}px` : undefined;
                      const customMarginBottom = item.props.marginBottom !== undefined ? `${item.props.marginBottom}px` : undefined;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItemId(item.id)}
                          style={{
                            padding: customPadding,
                            borderRadius: customRadius,
                            marginBottom: customMarginBottom
                          }}
                          className={`p-3 rounded-xl border-2 transition cursor-pointer relative group ${
                            isSelected
                              ? 'border-[#3574F0] bg-[#3574F0]/10 shadow-md ring-2 ring-[#3574F0]/20'
                              : 'border-transparent bg-[#2B2D30] hover:border-[#393B40]'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#393B40]">
                            <span className="font-semibold text-xs text-[#DFE1E5]">{item.name}</span>
                            <span className="text-[10px] text-[#3DDC84] font-mono">{item.type}</span>
                          </div>

                          {item.type === 'card' && (
                            <div className="space-y-1">
                              <h4 style={{ fontSize: customFontSize }} className="font-bold text-sm text-[#DFE1E5]">{item.props.title}</h4>
                              <p className="text-xs text-[#707278]">{item.props.subtitle}</p>
                            </div>
                          )}

                          {item.type === 'chart' && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {(item.props.cards || []).map((c: any, i: number) => (
                                <div key={i} className="p-2.5 bg-[#1E1F22] border border-[#393B40] rounded">
                                  <span className="text-[10px] text-[#707278]">{c.label}</span>
                                  <div className="text-base font-bold text-[#DFE1E5]">{c.value}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.type === 'table' && (
                            <div className="p-2 bg-[#1E1F22] border border-[#393B40] rounded space-y-1">
                              <span style={{ fontSize: customFontSize }} className="font-semibold text-xs text-[#DFE1E5]">{item.props.title}</span>
                              <div className="text-[11px] text-[#707278] font-mono">
                                Alexander Vance • Grade 12 (Active)
                              </div>
                            </div>
                          )}

                          {item.type === 'navigation' && (
                            <button
                              style={{ borderRadius: customRadius }}
                              className="w-full py-2 bg-[#3574F0] text-white rounded font-medium text-xs shadow-sm hover:bg-[#2B63D8] transition"
                            >
                              + Enroll New Student
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Android Navigation Gesture Pill */}
                  <div className="w-32 h-1 bg-[#707278] rounded-full mx-auto mt-4" />
                </div>
              ) : (
                /* Desktop / Tablet / Custom Viewport Frame */
                <div
                  style={{
                    width: deviceViewport === 'custom'
                      ? `${customCanvasWidth}px`
                      : deviceViewport === 'tablet'
                      ? '720px'
                      : '960px'
                  }}
                  className="bg-[#1E1F22] border border-[#393B40] rounded-xl shadow-xl p-6 space-y-6 transition-all"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#393B40] text-xs text-[#707278]">
                    <span className="font-mono font-medium text-[#DFE1E5]">
                      {deviceViewport === 'custom' ? `Custom Viewport (${customCanvasWidth}px)` : deviceViewport === 'tablet' ? 'Tablet (720px)' : 'Desktop Viewport (960px)'}
                    </span>
                    <span className="text-[11px] bg-[#2B2D30] px-2 py-0.5 rounded font-mono">
                      Scale: {zoomScale}%
                    </span>
                  </div>

                  {canvasItems.map(item => {
                    const isSelected = selectedItemId === item.id;
                    const customPadding = item.props.padding !== undefined ? `${item.props.padding}px` : undefined;
                    const customRadius = item.props.borderRadius !== undefined ? `${item.props.borderRadius}px` : undefined;
                    const customFontSize = item.props.fontSize !== undefined ? `${item.props.fontSize}px` : undefined;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        style={{
                          padding: customPadding,
                          borderRadius: customRadius
                        }}
                        className={`p-4 rounded-lg border transition cursor-pointer ${
                          isSelected ? 'border-[#3574F0] bg-[#3574F0]/10 shadow-sm ring-1 ring-[#3574F0]' : 'border-[#393B40] bg-[#2B2D30]'
                        }`}
                      >
                        <h3 style={{ fontSize: customFontSize }} className="font-bold text-[#DFE1E5]">{item.props.title || item.name}</h3>
                        <p className="text-xs text-[#707278] mt-1">{item.props.subtitle || 'Component element ready for cross-platform render.'}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Code View */
          <div className="flex-1 bg-[#1E1F22] p-4 overflow-auto font-mono text-xs text-[#BCBEC4] leading-relaxed whitespace-pre selection:bg-[#3574F0]/30">
            {generateCleanSourceCode()}
          </div>
        )}

        {/* Draggable Divider Splitter for Attributes Inspector */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingInspector(true);
          }}
          onDoubleClick={() => setInspectorWidth(280)}
          title="Drag to adjust inspector width (Double click to reset)"
          className={`w-1 hover:w-1.5 cursor-col-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
            isDraggingInspector ? 'bg-[#3574F0] w-1.5 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]/40'
          }`}
        />

        {/* Right-Hand Properties Inspector with Sliders and Adjusters */}
        <div
          style={{ width: `${inspectorWidth}px` }}
          className="bg-[#2B2D30] border-l border-[#393B40] flex flex-col select-none text-xs text-[#BCBEC4] shrink-0"
        >
          <div className="h-8 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 font-semibold text-[#DFE1E5]">
            <div className="flex items-center space-x-1.5">
              <Sliders size={13} className="text-[#3574F0]" />
              <span>Attributes Inspector</span>
            </div>
            {selectedItem && (
              <span className="text-[10px] bg-[#1E1F22] text-[#3DDC84] px-1.5 py-0.2 rounded font-mono">
                {selectedItem.type}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {selectedItem ? (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#707278] font-mono">Component Name</label>
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) => {
                      setCanvasItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, name: e.target.value } : item));
                    }}
                    className="w-full bg-[#1E1F22] border border-[#393B40] rounded px-2.5 py-1.5 text-[#DFE1E5] text-xs focus:outline-none focus:border-[#3574F0] font-mono"
                  />
                </div>

                {selectedItem.props.title !== undefined && (
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-[#707278] font-mono">Title Text</label>
                    <input
                      type="text"
                      value={selectedItem.props.title}
                      onChange={(e) => updateProp('title', e.target.value)}
                      className="w-full bg-[#1E1F22] border border-[#393B40] rounded px-2.5 py-1.5 text-[#DFE1E5] text-xs focus:outline-none focus:border-[#3574F0]"
                    />
                  </div>
                )}

                {selectedItem.props.subtitle !== undefined && (
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-[#707278] font-mono">Subtitle</label>
                    <input
                      type="text"
                      value={selectedItem.props.subtitle}
                      onChange={(e) => updateProp('subtitle', e.target.value)}
                      className="w-full bg-[#1E1F22] border border-[#393B40] rounded px-2.5 py-1.5 text-[#DFE1E5] text-xs focus:outline-none focus:border-[#3574F0]"
                    />
                  </div>
                )}

                {/* Interactive Visual Adjusters & Layout Sliders */}
                <div className="p-3 bg-[#1E1F22] rounded border border-[#393B40] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#3574F0] font-mono uppercase flex items-center space-x-1">
                      <SlidersHorizontal size={11} />
                      <span>Adjust Dimensions & Styles</span>
                    </span>
                  </div>

                  {/* Padding Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#BCBEC4]">Padding:</span>
                      <span className="text-[#DFE1E5] font-mono">{selectedItem.props.padding || 12}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="36"
                      value={selectedItem.props.padding !== undefined ? selectedItem.props.padding : 12}
                      onChange={(e) => updateProp('padding', Number(e.target.value))}
                      className="w-full accent-[#3574F0] cursor-pointer h-1.5 bg-[#2B2D30] rounded"
                    />
                  </div>

                  {/* Font Size Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#BCBEC4]">Font Size:</span>
                      <span className="text-[#DFE1E5] font-mono">{selectedItem.props.fontSize || 14}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="28"
                      value={selectedItem.props.fontSize !== undefined ? selectedItem.props.fontSize : 14}
                      onChange={(e) => updateProp('fontSize', Number(e.target.value))}
                      className="w-full accent-[#3DDC84] cursor-pointer h-1.5 bg-[#2B2D30] rounded"
                    />
                  </div>

                  {/* Border Radius Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#BCBEC4]">Border Radius:</span>
                      <span className="text-[#DFE1E5] font-mono">{selectedItem.props.borderRadius || 12}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="28"
                      value={selectedItem.props.borderRadius !== undefined ? selectedItem.props.borderRadius : 12}
                      onChange={(e) => updateProp('borderRadius', Number(e.target.value))}
                      className="w-full accent-[#e09f3e] cursor-pointer h-1.5 bg-[#2B2D30] rounded"
                    />
                  </div>

                  {/* Margin Bottom Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#BCBEC4]">Spacing Below:</span>
                      <span className="text-[#DFE1E5] font-mono">{selectedItem.props.marginBottom || 8}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={selectedItem.props.marginBottom !== undefined ? selectedItem.props.marginBottom : 8}
                      onChange={(e) => updateProp('marginBottom', Number(e.target.value))}
                      className="w-full accent-[#3574F0] cursor-pointer h-1.5 bg-[#2B2D30] rounded"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#1E1F22] rounded border border-[#393B40] space-y-1.5">
                  <span className="text-[10px] font-bold text-[#3DDC84] font-mono uppercase">Multi-Platform Transpiled</span>
                  <p className="text-[11px] text-[#707278]">
                    Droz UI automatically generates clean, zero-lockin Jetpack Compose (Android), WinUI 3 (Windows), SwiftUI (Apple), and React/Tailwind (Web) code simultaneously.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-[#707278]">
                Select any component to inspect and adjust its layout attributes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
