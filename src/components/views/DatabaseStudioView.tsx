import React, { useState, useEffect } from 'react';
import {
  Database,
  Play,
  Table,
  GitCommit,
  Sparkles,
  Link2,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Download,
  Trash2,
  Edit2,
  Server,
  ExternalLink,
  RefreshCw,
  FileUp,
  FileDown,
  Search,
  Check,
  Globe,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { DatabaseTable } from '../../types/droz';

interface DatabaseStudioViewProps {
  tables: DatabaseTable[];
  selectedTable: DatabaseTable | null;
  onSelectTable: (tbl: DatabaseTable) => void;
  onAnalyzeImpact: (changeDescription: string) => void;
}

export function DatabaseStudioView({
  tables,
  selectedTable,
  onSelectTable,
  onAnalyzeImpact
}: DatabaseStudioViewProps) {
  const [activeTab, setActiveTab] = useState<'sql' | 'erd' | 'table-designer' | 'migrations' | 'phpmyadmin'>('sql');
  const [dialect, setDialect] = useState<'mysql' | 'postgres' | 'sqlite' | 'mariadb'>('mysql');
  const [sqlQuery, setSqlQuery] = useState<string>(
    'SELECT s.admission_no, s.name, count(r.id) as total_exams, round(avg(r.score), 1) as gpa_average\nFROM students s\nLEFT JOIN results r ON s.id = r.student_id\nGROUP BY s.id, s.admission_no, s.name\nORDER BY gpa_average DESC;'
  );

  // Resizable Query Console vs Results Table
  const [consoleHeight, setConsoleHeight] = useState<number>(170);
  const [isDraggingConsole, setIsDraggingConsole] = useState<boolean>(false);

  // Interactive Live Data State
  const [queryRows, setQueryRows] = useState<any[]>([
    { id: 1, admission_no: 'SCH-2026-AB', name: 'Alexander Vance', total_exams: 8, gpa_average: 94.2 },
    { id: 2, admission_no: 'SCH-2026-CD', name: 'Elena Rostova', total_exams: 8, gpa_average: 91.5 },
    { id: 3, admission_no: 'SCH-2026-EF', name: 'Sophia Chen', total_exams: 6, gpa_average: 88.0 },
    { id: 4, admission_no: 'SCH-2026-GH', name: 'Marcus Thorne', total_exams: 4, gpa_average: 74.8 }
  ]);
  const [queryExecutionTime, setQueryExecutionTime] = useState<number>(2.4);
  const [filterText, setFilterText] = useState('');
  const [editingCell, setEditingCell] = useState<{ rowIdx: number; key: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [newRowData, setNewRowData] = useState<Record<string, string>>({
    admission_no: 'SCH-2026-KL',
    name: 'Droz Student',
    total_exams: '5',
    gpa_average: '90.0'
  });

  // phpMyAdmin Bridge State
  const [pmaConnected, setPmaConnected] = useState(true);
  const [isPingingPma, setIsPingingPma] = useState(false);
  const [pmaPingResult, setPmaPingResult] = useState<string>('Connected to MySQL 8.4 socket via PDO (1.2 ms)');
  const [pmaImportSuccess, setPmaImportSuccess] = useState(false);

  // Global mousemove/mouseup listener for console height resizing
  useEffect(() => {
    if (!isDraggingConsole) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Adjust console height relative to header
      const newHeight = Math.max(90, Math.min(480, e.clientY - 90));
      setConsoleHeight(newHeight);
    };
    const handleMouseUp = () => {
      setIsDraggingConsole(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingConsole]);

  const handleRunQuery = () => {
    setQueryExecutionTime(Number((Math.random() * 3 + 1.2).toFixed(1)));
    const q = sqlQuery.toLowerCase();
    if (q.includes('where score > 85')) {
      setQueryRows([
        { id: 1, admission_no: 'SCH-2026-AB', name: 'Alexander Vance', total_exams: 8, gpa_average: 94.2 },
        { id: 2, admission_no: 'SCH-2026-CD', name: 'Elena Rostova', total_exams: 8, gpa_average: 91.5 },
        { id: 3, admission_no: 'SCH-2026-EF', name: 'Sophia Chen', total_exams: 6, gpa_average: 88.0 }
      ]);
    } else if (q.includes('payments')) {
      setQueryRows([
        { id: 101, receipt_no: 'RCP-88921', student: 'Alexander Vance', amount: '$750.00', status: 'Settled' },
        { id: 102, receipt_no: 'RCP-88922', student: 'Elena Rostova', amount: '$1,200.00', status: 'Settled' }
      ]);
    } else {
      setQueryRows([
        { id: 1, admission_no: 'SCH-2026-AB', name: 'Alexander Vance', total_exams: 8, gpa_average: 94.2 },
        { id: 2, admission_no: 'SCH-2026-CD', name: 'Elena Rostova', total_exams: 8, gpa_average: 91.5 },
        { id: 3, admission_no: 'SCH-2026-EF', name: 'Sophia Chen', total_exams: 6, gpa_average: 88.0 },
        { id: 4, admission_no: 'SCH-2026-GH', name: 'Marcus Thorne', total_exams: 4, gpa_average: 74.8 }
      ]);
    }
  };

  const handleExportCSV = () => {
    if (queryRows.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(queryRows[0]).join(",") + "\n" +
      queryRows.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "droz_query_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPhpMyAdminSQL = () => {
    const sqlDump = `-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Host: 127.0.0.1:3306
-- Generation Time: ${new Date().toUTCString()}
-- Server version: 8.4.0 (Droz Unified Database Engine)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table \`students\`
--

CREATE TABLE IF NOT EXISTS \`students\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`admission_no\` varchar(32) NOT NULL,
  \`name\` varchar(128) NOT NULL,
  \`grade_level\` int(11) NOT NULL,
  \`status\` varchar(24) DEFAULT 'ACTIVE',
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`admission_no\` (\`admission_no\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table \`students\`
--

INSERT INTO \`students\` (\`id\`, \`admission_no\`, \`name\`, \`grade_level\`, \`status\`) VALUES
(1, 'SCH-2026-AB', 'Alexander Vance', 12, 'ACTIVE'),
(2, 'SCH-2026-CD', 'Elena Rostova', 12, 'ACTIVE'),
(3, 'SCH-2026-EF', 'Sophia Chen', 11, 'ACTIVE'),
(4, 'SCH-2026-GH', 'Marcus Thorne', 10, 'ACTIVE');

COMMIT;
`;
    const blob = new Blob([sqlDump], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schoolsphere_pma_export.sql';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPhpMyAdminDump = () => {
    setPmaImportSuccess(true);
    setQueryRows([
      { id: 1, admission_no: 'SCH-2026-AB', name: 'Alexander Vance', total_exams: 8, gpa_average: 94.2 },
      { id: 2, admission_no: 'SCH-2026-CD', name: 'Elena Rostova', total_exams: 8, gpa_average: 91.5 },
      { id: 3, admission_no: 'SCH-2026-EF', name: 'Sophia Chen', total_exams: 6, gpa_average: 88.0 },
      { id: 4, admission_no: 'SCH-2026-GH', name: 'Marcus Thorne', total_exams: 4, gpa_average: 74.8 },
      { id: 5, admission_no: 'SCH-2026-IJ', name: 'PMA Imported Student', total_exams: 9, gpa_average: 96.0 }
    ]);
    setTimeout(() => setPmaImportSuccess(false), 4000);
  };

  const handleTestPmaPing = () => {
    setIsPingingPma(true);
    setTimeout(() => {
      setIsPingingPma(false);
      setPmaPingResult(`Ping Successful! MySQL 8.4 Server responded in ${(Math.random() * 1.5 + 0.8).toFixed(1)} ms. Socket: /tmp/mysql.sock`);
    }, 450);
  };

  const handleSaveCellEdit = (rowIdx: number, key: string) => {
    setQueryRows(prev => prev.map((row, i) => i === rowIdx ? { ...row, [key]: editValue } : row));
    setEditingCell(null);
  };

  const handleInsertRow = () => {
    const newId = queryRows.length + 1;
    setQueryRows(prev => [...prev, { id: newId, ...newRowData }]);
    setShowInsertModal(false);
  };

  const handleDeleteRow = (rowIdx: number) => {
    setQueryRows(prev => prev.filter((_, i) => i !== rowIdx));
  };

  const filteredRows = queryRows.filter(row => {
    if (!filterText) return true;
    return Object.values(row).some(v => String(v).toLowerCase().includes(filterText.toLowerCase()));
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Studio Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <Database size={14} className="text-[#3DDC84]" />
            <span>Database Studio (DataGrip Engine)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Database Dialect Switcher */}
          <div className="flex items-center space-x-1 bg-[#1E1F22] border border-[#393B40] px-2 py-0.5 rounded text-[11px] font-mono">
            <span className="text-[#707278]">Dialect:</span>
            <select
              value={dialect}
              onChange={(e: any) => setDialect(e.target.value)}
              aria-label="Database Dialect"
              className="bg-transparent text-[#3DDC84] font-bold focus:outline-none cursor-pointer"
            >
              <option value="mysql" className="bg-[#2B2D30]">MySQL 8.4 (phpMyAdmin Bridge)</option>
              <option value="postgres" className="bg-[#2B2D30]">PostgreSQL 16 (Cloud SQL)</option>
              <option value="sqlite" className="bg-[#2B2D30]">SQLite 3.45 (Local / Android Room)</option>
              <option value="mariadb" className="bg-[#2B2D30]">MariaDB 11.2 (Enterprise)</option>
            </select>
          </div>

          {/* Studio Tabs */}
          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'sql' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              SQL Console
            </button>
            <button
              onClick={() => setActiveTab('erd')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'erd' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              ERD Schema Graph
            </button>
            <button
              onClick={() => setActiveTab('table-designer')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'table-designer' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Table Designer
            </button>
            <button
              onClick={() => setActiveTab('phpmyadmin')}
              className={`px-3 py-0.5 rounded transition flex items-center space-x-1 ${
                activeTab === 'phpmyadmin' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#e09f3e] hover:text-[#DFE1E5]'
              }`}
            >
              <Server size={12} />
              <span>phpMyAdmin & MySQL</span>
            </button>
            <button
              onClick={() => setActiveTab('migrations')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'migrations' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Migrations
            </button>
          </div>
        </div>

        {/* AI Schema Impact Trigger */}
        <button
          onClick={() => onAnalyzeImpact('Modifying student_id foreign key or adding graduation_date column')}
          className="flex items-center space-x-1 px-2.5 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#3DDC84] border border-[#393B40] rounded text-xs transition"
        >
          <Sparkles size={12} />
          <span>AI Schema Impact Check</span>
        </button>
      </div>

      {/* Main Studio Body */}
      <div className={`flex-1 flex overflow-hidden ${isDraggingConsole ? 'select-none' : ''}`}>
        {activeTab === 'sql' && (
          <div className="flex-1 flex flex-col h-full bg-[#1E1F22]">
            {/* SQL Query Console (Adjustable Height) */}
            <div
              style={{ height: `${consoleHeight}px` }}
              className="border-b border-[#393B40] p-3 flex flex-col bg-[#1E1F22] shrink-0"
            >
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[#DFE1E5] font-mono text-xs font-semibold">Query Console:</span>
                  {/* Preset Queries */}
                  <div className="flex space-x-1 text-[11px] font-mono">
                    <button
                      onClick={() => setSqlQuery('SELECT * FROM students LIMIT 10;')}
                      className="px-2 py-0.5 bg-[#2B2D30] hover:bg-[#393B40] text-[#BCBEC4] rounded border border-[#393B40]"
                    >
                      students
                    </button>
                    <button
                      onClick={() => setSqlQuery('SELECT * FROM results WHERE score > 85;')}
                      className="px-2 py-0.5 bg-[#2B2D30] hover:bg-[#393B40] text-[#BCBEC4] rounded border border-[#393B40]"
                    >
                      high scores
                    </button>
                    <button
                      onClick={() => setSqlQuery('SELECT * FROM payments;')}
                      className="px-2 py-0.5 bg-[#2B2D30] hover:bg-[#393B40] text-[#BCBEC4] rounded border border-[#393B40]"
                    >
                      payments
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
                  >
                    <Download size={11} />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleRunQuery}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm"
                  >
                    <Play size={11} className="fill-[#1E1F22]" />
                    <span>Execute (Ctrl+Enter)</span>
                  </button>
                </div>
              </div>

              <textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-[#18181A] border border-[#393B40] rounded p-2.5 font-mono text-xs text-[#6AAB73] focus:outline-none focus:border-[#3574F0] resize-none"
              />
            </div>

            {/* Draggable Divider Splitter between Query Console & Results Table */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingConsole(true);
              }}
              onDoubleClick={() => setConsoleHeight(170)}
              title="Drag up/down to adjust Query Console height (Double click to reset to 170px)"
              className={`h-1.5 hover:h-2 cursor-row-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
                isDraggingConsole ? 'bg-[#3574F0] h-2 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]'
              }`}
            >
              <div className="w-12 h-0.5 rounded-full bg-[#707278]/40 mx-auto" />
            </div>

            {/* Results Grid with Search, Inline Edit, and Add Row */}
            <div className="flex-1 overflow-auto p-4 bg-[#1E1F22] flex flex-col">
              <div className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-[#DFE1E5]">
                    Result: {filteredRows.length} rows retrieved
                  </span>
                  <span className="text-[#3DDC84] font-mono">{queryExecutionTime} ms</span>
                  <span className="text-[11px] text-[#707278]">
                    (Tip: Double click any cell to edit inline)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Search Filter */}
                  <div className="relative">
                    <Search size={11} className="absolute left-2 top-2 text-[#707278]" />
                    <input
                      type="text"
                      placeholder="Filter rows..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="bg-[#2B2D30] border border-[#393B40] rounded pl-6 pr-2 py-0.5 text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0] w-36 font-mono"
                    />
                  </div>

                  {/* Insert Row (phpMyAdmin style) */}
                  <button
                    onClick={() => setShowInsertModal(true)}
                    className="flex items-center space-x-1 px-2.5 py-0.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium transition"
                  >
                    <Plus size={11} />
                    <span>+ Insert Row</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="flex-1 bg-[#2B2D30] border border-[#393B40] rounded-md overflow-auto shadow-sm">
                <table className="w-full text-left text-xs text-[#BCBEC4]">
                  <thead className="bg-[#18181A] text-[#DFE1E5] font-mono text-[11px] border-b border-[#393B40] sticky top-0">
                    <tr>
                      <th className="p-2.5 w-10 text-center">#</th>
                      {Object.keys(queryRows[0] || {}).map((col, i) => (
                        <th key={i} className="p-2.5 font-semibold">{col}</th>
                      ))}
                      <th className="p-2.5 text-right w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#393B40] font-mono text-[11px]">
                    {filteredRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#393B40]/40 transition-colors group">
                        <td className="p-2.5 text-center text-[#707278]">{idx + 1}</td>
                        {Object.entries(row).map(([k, val]: any, cIdx: number) => {
                          const isEditing = editingCell?.rowIdx === idx && editingCell?.key === k;
                          return (
                            <td
                              key={cIdx}
                              onDoubleClick={() => {
                                setEditingCell({ rowIdx: idx, key: k });
                                setEditValue(String(val));
                              }}
                              className="p-2.5 cursor-pointer relative"
                            >
                              {isEditing ? (
                                <input
                                  type="text"
                                  autoFocus
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onBlur={() => handleSaveCellEdit(idx, k)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveCellEdit(idx, k);
                                    if (e.key === 'Escape') setEditingCell(null);
                                  }}
                                  className="bg-[#18181A] text-[#DFE1E5] border border-[#3574F0] px-1 py-0.5 rounded text-xs outline-none w-full"
                                />
                              ) : (
                                <span className={k === 'admission_no' ? 'text-[#3574F0] font-semibold' : ''}>
                                  {val}
                                </span>
                              )}
                            </td>
                          );
                        })}
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => handleDeleteRow(idx)}
                            className="p-1 hover:text-[#fa5252] text-[#707278] transition opacity-0 group-hover:opacity-100"
                            title="Delete row"
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Insert Row Modal */}
              {showInsertModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                  <div className="bg-[#2B2D30] border border-[#393B40] rounded-xl w-full max-w-md p-5 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-2 border-b border-[#393B40]">
                      <h3 className="font-bold text-[#DFE1E5] font-mono text-sm flex items-center space-x-1.5">
                        <Plus size={14} className="text-[#3574F0]" />
                        <span>Insert New Row (phpMyAdmin Style)</span>
                      </h3>
                      <button onClick={() => setShowInsertModal(false)} className="text-[#707278] hover:text-white">✕</button>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <label className="text-[#707278] block mb-1">admission_no</label>
                        <input
                          type="text"
                          value={newRowData.admission_no}
                          onChange={(e) => setNewRowData({ ...newRowData, admission_no: e.target.value })}
                          className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2 text-[#DFE1E5]"
                        />
                      </div>
                      <div>
                        <label className="text-[#707278] block mb-1">name</label>
                        <input
                          type="text"
                          value={newRowData.name}
                          onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
                          className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2 text-[#DFE1E5]"
                        />
                      </div>
                      <div>
                        <label className="text-[#707278] block mb-1">total_exams</label>
                        <input
                          type="number"
                          value={newRowData.total_exams}
                          onChange={(e) => setNewRowData({ ...newRowData, total_exams: e.target.value })}
                          className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2 text-[#DFE1E5]"
                        />
                      </div>
                      <div>
                        <label className="text-[#707278] block mb-1">gpa_average</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newRowData.gpa_average}
                          onChange={(e) => setNewRowData({ ...newRowData, gpa_average: e.target.value })}
                          className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2 text-[#DFE1E5]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => setShowInsertModal(false)}
                        className="px-3 py-1.5 bg-[#1E1F22] hover:bg-[#393B40] text-[#BCBEC4] rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleInsertRow}
                        className="px-4 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded font-medium"
                      >
                        Insert Record
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: phpMyAdmin & MySQL Integration Bridge */}
        {activeTab === 'phpmyadmin' && (
          <div className="flex-1 overflow-auto p-6 bg-[#18181A] space-y-6">
            {/* Header Banner */}
            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-[#e09f3e]/15 border border-[#e09f3e]/30 flex items-center justify-center text-[#e09f3e]">
                  <Server size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#DFE1E5] flex items-center space-x-2">
                    <span>phpMyAdmin & MySQL Architecture Hub</span>
                    <span className="text-[10px] bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]/30 px-2 py-0.5 rounded font-mono">
                      Active
                    </span>
                  </h3>
                  <p className="text-xs text-[#707278] mt-0.5">
                    Universal compatibility with MySQL 8.4, MariaDB 11, phpMyAdmin dumps, and native internal studio.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleTestPmaPing}
                  disabled={isPingingPma}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
                >
                  <RefreshCw size={12} className={isPingingPma ? 'animate-spin text-[#3574F0]' : ''} />
                  <span>Test Connection Ping</span>
                </button>
                <button
                  onClick={handleExportPhpMyAdminSQL}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium transition shadow-sm"
                >
                  <FileDown size={12} />
                  <span>Export phpMyAdmin SQL Dump</span>
                </button>
              </div>
            </div>

            {/* Ping Result Alert */}
            {pmaPingResult && (
              <div className="p-3 bg-[#1E1F22] border border-[#3574F0]/40 rounded-lg text-xs text-[#DFE1E5] flex items-center space-x-2 font-mono">
                <CheckCircle2 size={14} className="text-[#3DDC84] shrink-0" />
                <span>{pmaPingResult}</span>
              </div>
            )}

            {/* 3 Pillars of Database Usage in Droz Studio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Built-in Studio (Recommended) */}
              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-xl space-y-2.5">
                <div className="flex items-center space-x-2 text-[#3DDC84] font-semibold text-xs">
                  <Database size={15} />
                  <span>1. Droz Studio (Native Inspector)</span>
                </div>
                <p className="text-[11px] text-[#BCBEC4] leading-relaxed">
                  Developers <strong>do not need</strong> to install phpMyAdmin separately unless they want to. Droz Studio comes with an embedded Database Inspector (like DataGrip & TablePlus) that directly executes SQL, designs tables, and manages rows in-app.
                </p>
                <div className="text-[10px] text-[#707278] font-mono bg-[#1E1F22] p-2 rounded">
                  No Apache, PHP, or browser tab required. Zero RAM overhead.
                </div>
              </div>

              {/* Option 2: phpMyAdmin Bridge */}
              <div className="p-4 bg-[#2B2D30] border border-[#e09f3e]/40 rounded-xl space-y-2.5">
                <div className="flex items-center space-x-2 text-[#e09f3e] font-semibold text-xs">
                  <Server size={15} />
                  <span>2. phpMyAdmin External Access</span>
                </div>
                <p className="text-[11px] text-[#BCBEC4] leading-relaxed">
                  For developers accustomed to phpMyAdmin (e.g. XAMPP, WAMP, cPanel, or Laravel), they can point phpMyAdmin to the exact same MySQL database (<code>localhost:3306</code>) and view updates made in Droz Studio simultaneously!
                </p>
                <div className="text-[10px] text-[#707278] font-mono bg-[#1E1F22] p-2 rounded flex justify-between items-center">
                  <span>URL: http://localhost/phpmyadmin</span>
                  <ExternalLink size={10} />
                </div>
              </div>

              {/* Option 3: SQLite / Android Room */}
              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-xl space-y-2.5">
                <div className="flex items-center space-x-2 text-[#3574F0] font-semibold text-xs">
                  <FileCode size={15} />
                  <span>3. Android Studio SQLite (Room)</span>
                </div>
                <p className="text-[11px] text-[#BCBEC4] leading-relaxed">
                  Android mobile apps do not run phpMyAdmin on phones. Instead, Android apps use <strong>SQLite & Jetpack Room Database</strong>. Droz Studio includes the SQLite Room Inspector, matching Android Studio's App Inspection.
                </p>
                <div className="text-[10px] text-[#707278] font-mono bg-[#1E1F22] p-2 rounded">
                  Room DAO @Entity, @Query & Live Data inspection ready.
                </div>
              </div>
            </div>

            {/* Interactive phpMyAdmin SQL Dump Import / Export Section */}
            <div className="p-5 bg-[#2B2D30] border border-[#393B40] rounded-xl space-y-4">
              <h4 className="font-bold text-[#DFE1E5] text-xs font-mono flex items-center space-x-2">
                <FileCode size={14} className="text-[#3574F0]" />
                <span>phpMyAdmin .SQL Dumps & Interoperability</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Import Box */}
                <div className="p-4 bg-[#1E1F22] border border-[#393B40] rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#DFE1E5]">Import phpMyAdmin SQL Dump</span>
                    <FileUp size={14} className="text-[#3DDC84]" />
                  </div>
                  <p className="text-[11px] text-[#707278]">
                    Load standard MySQL dump generated from phpMyAdmin (includes <code>CREATE TABLE</code>, <code>INSERT INTO</code>, indexes).
                  </p>
                  <button
                    onClick={handleImportPhpMyAdminDump}
                    className="w-full py-2 bg-[#2B2D30] hover:bg-[#393B40] text-[#3DDC84] border border-[#3DDC84]/40 rounded font-medium text-xs transition"
                  >
                    Import Sample PMA School Schema (.sql)
                  </button>
                  {pmaImportSuccess && (
                    <div className="text-[11px] text-[#3DDC84] font-mono flex items-center space-x-1">
                      <Check size={12} />
                      <span>Schema & 5 records imported successfully into Droz Studio!</span>
                    </div>
                  )}
                </div>

                {/* Export Box */}
                <div className="p-4 bg-[#1E1F22] border border-[#393B40] rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#DFE1E5]">Export for phpMyAdmin</span>
                    <FileDown size={14} className="text-[#3574F0]" />
                  </div>
                  <p className="text-[11px] text-[#707278]">
                    Download an authentic <code>.sql</code> file formatted specifically for 1-click import into phpMyAdmin 5.x / 6.x.
                  </p>
                  <button
                    onClick={handleExportPhpMyAdminSQL}
                    className="w-full py-2 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded font-medium text-xs transition shadow-sm"
                  >
                    Download schoolsphere_pma_export.sql
                  </button>
                </div>
              </div>
            </div>

            {/* Connection Credentials Details */}
            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-xl space-y-3">
              <h4 className="font-semibold text-[#DFE1E5] text-xs font-mono">
                MySQL / phpMyAdmin Daemon Socket Configuration
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-2.5 bg-[#1E1F22] rounded border border-[#393B40]">
                  <span className="text-[10px] text-[#707278] block">Host / Socket:</span>
                  <span className="text-[#DFE1E5]">127.0.0.1:3306</span>
                </div>
                <div className="p-2.5 bg-[#1E1F22] rounded border border-[#393B40]">
                  <span className="text-[10px] text-[#707278] block">Database:</span>
                  <span className="text-[#3DDC84]">schoolsphere_db</span>
                </div>
                <div className="p-2.5 bg-[#1E1F22] rounded border border-[#393B40]">
                  <span className="text-[10px] text-[#707278] block">Default User:</span>
                  <span className="text-[#DFE1E5]">root</span>
                </div>
                <div className="p-2.5 bg-[#1E1F22] rounded border border-[#393B40]">
                  <span className="text-[10px] text-[#707278] block">PMA Compatibility:</span>
                  <span className="text-[#e09f3e]">v5.2.1 / UTF-8 mb4</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ERD Schema Graph */}
        {activeTab === 'erd' && (
          <div className="flex-1 overflow-auto p-6 bg-[#18181A] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tables.map(tbl => (
                <div
                  key={tbl.id}
                  onClick={() => onSelectTable(tbl)}
                  className={`bg-[#2B2D30] border rounded-lg p-3 shadow-md transition cursor-pointer ${
                    selectedTable?.id === tbl.id ? 'border-[#3574F0]' : 'border-[#393B40] hover:border-[#707278]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#393B40]">
                    <span className="font-bold text-[#DFE1E5] font-mono">{tbl.name}</span>
                    <span className="text-[10px] text-[#707278]">{tbl.rowCount} rows</span>
                  </div>

                  <div className="divide-y divide-[#393B40]/60 my-1 font-mono text-[11px]">
                    {tbl.fields.map(f => (
                      <div key={f.name} className="py-1.5 flex justify-between">
                        <span className={f.isPrimary ? 'text-[#e09f3e] font-semibold' : 'text-[#BCBEC4]'}>
                          {f.name} {f.isPrimary && '(PK)'}
                        </span>
                        <span className="text-[#707278] text-[10px]">{f.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg">
              <h4 className="font-semibold text-[#DFE1E5] mb-2 font-mono text-xs">Foreign Key Relational Graph</h4>
              <pre className="font-mono text-xs text-[#BCBEC4] leading-relaxed">
{`Students (Primary Entity)
   ├── Results      (1:N) References students(id) [CASCADE]
   ├── Payments     (1:N) References students(id) [RESTRICT]
   └── Attendance   (1:N) References students(id) [CASCADE]`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB: Table Designer */}
        {activeTab === 'table-designer' && (
          <div className="flex-1 p-6 overflow-auto bg-[#1E1F22] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#DFE1E5] font-mono">
                Table Designer: {selectedTable?.name || 'Students'}
              </h3>
              <span className="text-xs text-[#707278] font-mono">
                Storage Engine: InnoDB • Collation: utf8mb4_unicode_ci
              </span>
            </div>

            <div className="bg-[#2B2D30] border border-[#393B40] rounded-md overflow-hidden">
              <table className="w-full text-left text-xs text-[#BCBEC4]">
                <thead className="bg-[#18181A] text-[#DFE1E5] font-mono text-[11px]">
                  <tr>
                    <th className="p-2.5">Field Name</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Primary Key</th>
                    <th className="p-2.5">Nullable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#393B40] font-mono">
                  {(selectedTable || tables[0]).fields.map((f, i) => (
                    <tr key={i} className="hover:bg-[#393B40]/30">
                      <td className="p-2.5 text-[#DFE1E5] font-semibold">{f.name}</td>
                      <td className="p-2.5 text-[#3DDC84]">{f.type}</td>
                      <td className="p-2.5">{f.isPrimary ? 'YES' : 'NO'}</td>
                      <td className="p-2.5">{f.isNullable ? 'YES' : 'NO'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: Migrations */}
        {activeTab === 'migrations' && (
          <div className="flex-1 p-6 overflow-auto bg-[#1E1F22] space-y-3">
            <h3 className="text-sm font-bold text-[#DFE1E5] font-mono">Applied Migrations</h3>
            <div className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#DFE1E5] font-mono text-xs">001_initial_schema.sql</div>
                <div className="text-[11px] text-[#707278]">Created tables: students, results, payments, attendance</div>
              </div>
              <span className="text-[#3DDC84] font-mono text-xs">Applied ✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
