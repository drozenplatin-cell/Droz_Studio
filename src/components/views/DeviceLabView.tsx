import React, { useState } from 'react';
import {
  Smartphone,
  Play,
  Download,
  Terminal,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  Power,
  Volume2,
  VolumeX,
  Camera,
  Circle,
  Square,
  ChevronLeft,
  Wifi,
  Battery,
  BatteryCharging,
  MapPin,
  Moon,
  Sun,
  ShieldCheck,
  Fingerprint
} from 'lucide-react';
import { ConnectedDevice, LogcatEntry } from '../../types/droz';
import { ToastType } from '../../types/toast';
import { INITIAL_LOGCAT_ENTRIES } from '../../data/initialProject';

interface DeviceLabViewProps {
  devices: ConnectedDevice[];
  selectedDevice: ConnectedDevice | null;
  onSelectDevice: (device: ConnectedDevice) => void;
  onRunOnDevice: (device: ConnectedDevice) => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function DeviceLabView({
  devices,
  selectedDevice,
  onSelectDevice,
  onRunOnDevice,
  onNotify
}: DeviceLabViewProps) {
  const currentDev = selectedDevice || devices[0];
  const [activeTab, setActiveTab] = useState<'mirror' | 'logcat' | 'adb-shell'>('mirror');
  const [isInstalling, setIsInstalling] = useState(false);
  const [adbCommand, setAdbCommand] = useState('');

  // Hardware emulation controls
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const [deviceVolume, setDeviceVolume] = useState(80);
  const [batteryLevel, setBatteryLevel] = useState(94);
  const [isCharging, setIsCharging] = useState(true);
  const [networkType, setNetworkType] = useState<'5G' | '4G' | '3G' | 'OFFLINE'>('5G');
  const [deviceTheme, setDeviceTheme] = useState<'dark' | 'light'>('dark');
  const [mockLocation, setMockLocation] = useState('Dar es Salaam (-6.7924, 39.2083)');
  const [showBiometricModal, setShowBiometricModal] = useState(false);

  // Live app state
  const [interactiveStudents, setInteractiveStudents] = useState([
    { name: 'Alexander Vance', status: 'Present', gpa: '3.9' },
    { name: 'Elena Rostova', status: 'Present', gpa: '3.8' },
    { name: 'Sophia Chen', status: 'Present', gpa: '4.0' }
  ]);
  const [newStudentName, setNewStudentName] = useState('');

  // Logcat stream
  const [logcatEntries, setLogcatEntries] = useState<string[]>([
    'I/ActivityTaskManager: START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=com.droz.schoolsphere/.MainActivity}',
    'D/DrozRuntime: Engine v2026.2 initialized on Android 15 (API 35)',
    'D/AndroidKeystore: Hardware enclave key validated',
    'I/DrozWebSocket: Connected to wss://gateway.droz.dev',
    'D/Compose: Recomposing StudentDashboard frame in 2.8ms'
  ]);

  const handleInstall = () => {
    setIsInstalling(true);
    setTimeout(() => {
      setIsInstalling(false);
      setLogcatEntries(prev => [
        ...prev,
        `I/PackageManager: Success: Installed package com.droz.schoolsphere on ${currentDev.name}`,
        'I/ActivityManager: Cold starting activity com.droz.schoolsphere/.MainActivity'
      ]);
      if (onNotify) {
        onNotify('APK Installed & Launched', `Package com.droz.schoolsphere running on ${currentDev.name} via ADB.`, 'success');
      }
    }, 1000);
  };

  const handleAddStudentOnPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    setInteractiveStudents(prev => [...prev, { name: newStudentName.trim(), status: 'Present', gpa: '3.7' }]);
    setLogcatEntries(prev => [...prev, `D/StudentRepository: Inserted record for '${newStudentName.trim()}' into local SQLite db.`]);
    setNewStudentName('');
  };

  const handleRunAdbCmd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adbCommand.trim()) return;
    const cmd = adbCommand.trim();
    setAdbCommand('');
    setLogcatEntries(prev => [...prev, `$ adb ${cmd}`]);

    if (cmd === 'devices') {
      setLogcatEntries(prev => [
        ...prev,
        'List of devices attached',
        'redmi_15_usb       device product:redmi_15 model:Redmi_15 device:redmi',
        'pixel_9_emu_5554   device product:sdk_gphone64_arm64 model:Pixel_9'
      ]);
    } else if (cmd.includes('logcat')) {
      setLogcatEntries(prev => [...prev, '--------- beginning of main', 'I/DrozCore: Logcat stream active']);
    } else if (cmd.includes('shell pm list packages')) {
      setLogcatEntries(prev => [
        ...prev,
        'package:com.android.systemui',
        'package:com.android.settings',
        'package:com.droz.schoolsphere'
      ]);
    } else {
      setLogcatEntries(prev => [...prev, `[ADB] Executed: ${cmd} on ${currentDev.name} (exit 0)`]);
    }
  };

  const captureScreenshot = () => {
    if (onNotify) {
      onNotify('Device Screenshot Captured', `Saved ${currentDev.name}_snapshot_${Date.now()}.png to captures.`, 'success');
    }
  };

  const triggerBiometricScan = () => {
    setShowBiometricModal(true);
    setTimeout(() => {
      setShowBiometricModal(false);
      setLogcatEntries(prev => [
        ...prev,
        'D/BiometricPrompt: Fingerprint sensor authenticated via Android Keystore hardware enclave.'
      ]);
      if (onNotify) {
        onNotify('Biometric Authenticated', 'Hardware Fingerprint Sensor verified identity.', 'success');
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Device Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <Smartphone size={14} className="text-[#3DDC84]" />
            <span>Device Manager & Virtual ADB Emulator</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex items-center space-x-2 bg-[#1E1F22] px-2 py-0.5 rounded border border-[#393B40] font-mono text-[11px]">
            <span className="text-[#707278]">Active Target:</span>
            <strong className="text-[#DFE1E5]">{currentDev.name}</strong>
            <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onRunOnDevice(currentDev)}
            className="flex items-center space-x-1 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition"
          >
            <Play size={11} className="fill-[#1E1F22]" />
            <span>Run on Device (Shift+F10)</span>
          </button>

          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex items-center space-x-1 px-3 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
          >
            <Download size={11} />
            <span>{isInstalling ? 'Installing APK...' : 'Install APK'}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Device List & Mock Telemetry Controls */}
        <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-3 space-y-4 overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#707278] font-mono block mb-2">
              CONNECTED DEVICES & AVD:
            </span>

            <div className="space-y-2">
              {devices.map(dev => {
                const isSelected = currentDev.id === dev.id;
                return (
                  <div
                    key={dev.id}
                    onClick={() => onSelectDevice(dev)}
                    className={`p-2.5 rounded-lg cursor-pointer transition border ${
                      isSelected
                        ? 'bg-[#1E1F22] border-[#3574F0] shadow-sm'
                        : 'bg-[#1E1F22]/60 border-[#393B40] hover:border-[#707278]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#DFE1E5]">{dev.name}</span>
                      <span className="text-[10px] text-[#3DDC84] font-mono flex items-center space-x-1">
                        <CheckCircle2 size={11} />
                        <span>Online</span>
                      </span>
                    </div>

                    <div className="text-[11px] text-[#707278] font-mono mt-1">
                      {dev.osVersion} • {dev.connectionType}
                    </div>

                    <div className="text-[10px] text-[#707278] font-mono mt-0.5">
                      Res: {dev.screenResolution}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Android Studio Emulator Extended Controls */}
          <div className="pt-3 border-t border-[#393B40] space-y-3">
            <span className="text-[10px] uppercase font-bold text-[#707278] font-mono block">
              EMULATOR SENSORS & ENVIRONMENT:
            </span>

            {/* Battery Slider */}
            <div className="bg-[#1E1F22] p-2 rounded border border-[#393B40] space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#BCBEC4] flex items-center space-x-1">
                  {isCharging ? <BatteryCharging size={12} className="text-[#3DDC84]" /> : <Battery size={12} className="text-[#e09f3e]" />}
                  <span>Battery Level</span>
                </span>
                <span className="font-mono text-[#DFE1E5]">{batteryLevel}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={batteryLevel}
                onChange={e => setBatteryLevel(Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={() => setIsCharging(!isCharging)}
                  className={`text-[10px] px-2 py-0.5 rounded transition ${
                    isCharging ? 'bg-[#3DDC84]/20 text-[#3DDC84]' : 'bg-[#2B2D30] text-[#707278]'
                  }`}
                >
                  {isCharging ? 'AC Charger Connected' : 'On Battery'}
                </button>
              </div>
            </div>

            {/* Network Condition Throttler */}
            <div className="bg-[#1E1F22] p-2 rounded border border-[#393B40] space-y-1">
              <span className="text-[11px] text-[#BCBEC4] flex items-center space-x-1">
                <Wifi size={12} className="text-[#3574F0]" />
                <span>Network Profile</span>
              </span>
              <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[10px]">
                {(['5G', '4G', '3G', 'OFFLINE'] as const).map(net => (
                  <button
                    key={net}
                    onClick={() => setNetworkType(net)}
                    className={`py-1 rounded text-center transition ${
                      networkType === net ? 'bg-[#3574F0] text-white font-bold' : 'bg-[#2B2D30] text-[#707278] hover:text-[#DFE1E5]'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock GPS Location */}
            <div className="bg-[#1E1F22] p-2 rounded border border-[#393B40] space-y-1">
              <span className="text-[11px] text-[#BCBEC4] flex items-center space-x-1">
                <MapPin size={12} className="text-[#e09f3e]" />
                <span>Mock GPS Location</span>
              </span>
              <select
                value={mockLocation}
                onChange={e => setMockLocation(e.target.value)}
                className="w-full bg-[#2B2D30] border border-[#393B40] rounded px-1.5 py-1 text-[10px] text-[#DFE1E5]"
                aria-label="Mock GPS Location"
              >
                <option value="Dar es Salaam (-6.7924, 39.2083)">Dar es Salaam, Tanzania</option>
                <option value="Nairobi (-1.286389, 36.817223)">Nairobi, Kenya</option>
                <option value="London (51.5074, -0.1278)">London, UK</option>
                <option value="San Francisco (37.7749, -122.4194)">San Francisco, USA</option>
                <option value="Tokyo (35.6762, 139.6503)">Tokyo, Japan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Interactive Screen Mirror & Logcat */}
        <div className="flex-1 flex flex-col bg-[#1E1F22] overflow-hidden">
          {/* Subtabs */}
          <div className="flex border-b border-[#393B40] bg-[#2B2D30] px-3 select-none text-xs">
            <button
              onClick={() => setActiveTab('mirror')}
              className={`px-3 py-1.5 border-b-2 font-medium transition ${
                activeTab === 'mirror' ? 'border-[#3574F0] text-[#DFE1E5]' : 'border-transparent text-[#707278] hover:text-[#BCBEC4]'
              }`}
            >
              Interactive Screen Mirror ({currentDev.name})
            </button>
            <button
              onClick={() => setActiveTab('logcat')}
              className={`px-3 py-1.5 border-b-2 font-medium transition ${
                activeTab === 'logcat' ? 'border-[#3574F0] text-[#DFE1E5]' : 'border-transparent text-[#707278] hover:text-[#BCBEC4]'
              }`}
            >
              Logcat Stream ({currentDev.name})
            </button>
            <button
              onClick={() => setActiveTab('adb-shell')}
              className={`px-3 py-1.5 border-b-2 font-medium transition ${
                activeTab === 'adb-shell' ? 'border-[#3574F0] text-[#DFE1E5]' : 'border-transparent text-[#707278] hover:text-[#BCBEC4]'
              }`}
            >
              Interactive ADB Shell
            </button>
          </div>

          {/* Body */}
          {activeTab === 'mirror' ? (
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#18181A] relative">
              {/* Device Mirroring Quick Toolbar on Side */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#2B2D30] border border-[#393B40] rounded-xl p-1.5 flex flex-col space-y-2 shadow-2xl z-20">
                <button
                  onClick={() => setIsScreenOn(!isScreenOn)}
                  className={`p-2 rounded-lg transition ${isScreenOn ? 'hover:bg-[#393B40] text-[#DFE1E5]' : 'bg-[#fa5252]/20 text-[#fa5252]'}`}
                  title="Power Button (Screen On / Off)"
                >
                  <Power size={14} />
                </button>
                <button
                  onClick={() => {
                    setDeviceVolume(prev => Math.min(100, prev + 10));
                    if (onNotify) onNotify('Volume Up', `Media volume: ${Math.min(100, deviceVolume + 10)}%`, 'info');
                  }}
                  className="p-2 hover:bg-[#393B40] text-[#DFE1E5] rounded-lg transition"
                  title="Volume Up"
                >
                  <Volume2 size={14} />
                </button>
                <button
                  onClick={() => {
                    setDeviceVolume(prev => Math.max(0, prev - 10));
                    if (onNotify) onNotify('Volume Down', `Media volume: ${Math.max(0, deviceVolume - 10)}%`, 'info');
                  }}
                  className="p-2 hover:bg-[#393B40] text-[#DFE1E5] rounded-lg transition"
                  title="Volume Down"
                >
                  <VolumeX size={14} />
                </button>
                <button
                  onClick={() => setIsLandscape(!isLandscape)}
                  className={`p-2 rounded-lg transition ${isLandscape ? 'bg-[#3574F0] text-white' : 'hover:bg-[#393B40] text-[#DFE1E5]'}`}
                  title="Rotate Device (Portrait / Landscape)"
                >
                  <RotateCw size={14} />
                </button>
                <button
                  onClick={captureScreenshot}
                  className="p-2 hover:bg-[#393B40] text-[#DFE1E5] rounded-lg transition"
                  title="Capture Screenshot"
                >
                  <Camera size={14} />
                </button>
                <button
                  onClick={() => setDeviceTheme(deviceTheme === 'dark' ? 'light' : 'dark')}
                  className="p-2 hover:bg-[#393B40] text-[#e09f3e] rounded-lg transition"
                  title="Toggle Device Dark/Light Theme"
                >
                  {deviceTheme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                </button>
                <button
                  onClick={triggerBiometricScan}
                  className="p-2 hover:bg-[#393B40] text-[#3DDC84] rounded-lg transition"
                  title="Simulate Fingerprint Biometric Sensor"
                >
                  <Fingerprint size={14} />
                </button>
              </div>

              {/* Phone Device Frame */}
              <div
                style={{
                  width: isLandscape ? '600px' : '340px',
                  height: isLandscape ? '340px' : '620px'
                }}
                className="bg-[#1E1F22] border-[7px] border-[#2B2D30] rounded-[42px] shadow-2xl p-4 flex flex-col relative overflow-hidden ring-1 ring-[#393B40] transition-all duration-300"
              >
                {/* Physical Notch / Camera */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#2B2D30] rounded-b-xl flex items-center justify-center space-x-2 z-30">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18181A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3574F0]/60" />
                </div>

                {/* Status Bar */}
                <div className="flex justify-between items-center px-3 pt-1 text-[10px] text-[#DFE1E5] font-mono select-none z-20">
                  <span>9:41 AM</span>
                  <div className="flex items-center space-x-1.5 text-[10px]">
                    <span className="text-[#3574F0] font-bold">{networkType}</span>
                    <Wifi size={11} />
                    <span className="flex items-center space-x-0.5">
                      <span>{batteryLevel}%</span>
                      {isCharging && <BatteryCharging size={11} className="text-[#3DDC84]" />}
                    </span>
                  </div>
                </div>

                {/* Screen Content: Interactive Running App */}
                {isScreenOn ? (
                  <div className={`flex-1 ${deviceTheme === 'dark' ? 'bg-[#18181A] text-[#DFE1E5]' : 'bg-[#F4F5F8] text-[#1E1F22]'} rounded-2xl p-3 flex flex-col justify-between overflow-y-auto mt-2 transition-colors duration-200 relative`}>
                    {/* Simulated Biometric Dialog */}
                    {showBiometricModal && (
                      <div className="absolute inset-0 bg-black/80 rounded-2xl flex flex-col items-center justify-center p-4 z-40 text-center animate-fade-in">
                        <div className="w-14 h-14 rounded-full bg-[#3DDC84]/20 flex items-center justify-center text-[#3DDC84] mb-2 animate-pulse">
                          <Fingerprint size={32} />
                        </div>
                        <h4 className="font-bold text-white text-xs">Verify Identity</h4>
                        <p className="text-[10px] text-[#BCBEC4] mt-1">Touch the fingerprint sensor to authenticate with hardware keystore</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="pb-2 border-b border-[#393B40] flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs tracking-tight">SchoolSphere Mobile</h4>
                          <p className="text-[10px] opacity-70">Universal Kotlin Compose Runtime</p>
                        </div>
                        <span className="text-[9px] bg-[#3DDC84]/20 text-[#3DDC84] px-1.5 py-0.5 rounded font-mono font-bold">
                          v1.4.2
                        </span>
                      </div>

                      {/* Stat Tiles */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-[#2B2D30]/60 rounded-xl border border-[#393B40]">
                          <span className="text-[9px] text-[#707278]">Attendance Rate</span>
                          <div className="text-xs font-bold text-[#3DDC84]">98.4%</div>
                        </div>
                        <div className="p-2 bg-[#2B2D30]/60 rounded-xl border border-[#393B40]">
                          <span className="text-[9px] text-[#707278]">Enrolled Students</span>
                          <div className="text-xs font-bold">{1248 + interactiveStudents.length - 3}</div>
                        </div>
                      </div>

                      {/* Interactive Roster */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-[#707278] uppercase">
                          <span>Live Roster</span>
                          <span className="text-[#3574F0]">{interactiveStudents.length} Students</span>
                        </div>
                        {interactiveStudents.map((s, idx) => (
                          <div key={idx} className="p-1.5 bg-[#2B2D30]/50 rounded-lg flex justify-between items-center text-[11px] border border-[#393B40]/40">
                            <div>
                              <span className="font-medium">{s.name}</span>
                              <span className="text-[9px] text-[#707278] ml-1.5 font-mono">GPA {s.gpa}</span>
                            </div>
                            <span className="text-[#3DDC84] font-mono text-[10px] font-bold">{s.status}</span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Add Student Form right on the phone! */}
                      <form onSubmit={handleAddStudentOnPhone} className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Enroll student name on phone..."
                          value={newStudentName}
                          onChange={e => setNewStudentName(e.target.value)}
                          className="w-full bg-[#2B2D30] border border-[#393B40] rounded px-2 py-1 text-[11px] text-[#DFE1E5] focus:outline-none focus:border-[#3574F0]"
                        />
                        <button
                          type="submit"
                          className="w-full py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-[11px] font-bold transition shadow-sm"
                        >
                          + Enroll Student in DB
                        </button>
                      </form>
                    </div>

                    <div className="text-center text-[9px] text-[#707278] font-mono pt-2 border-t border-[#393B40]">
                      Hardware Keystore: Active • Vulkan 60 FPS
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 bg-black rounded-2xl flex items-center justify-center text-[#707278] text-xs">
                    Screen is Off (Press Power button)
                  </div>
                )}

                {/* Android Navigation Bar (Back, Home, Recents) */}
                <div className="h-6 flex items-center justify-center space-x-8 text-[#707278] pt-1">
                  <button
                    onClick={() => {
                      if (onNotify) onNotify('Back Pressed', 'Simulated Android Back navigation.', 'info');
                    }}
                    className="hover:text-white transition"
                    title="Back Button"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (onNotify) onNotify('Home Pressed', 'Returned to Android Launcher.', 'info');
                    }}
                    className="hover:text-white transition"
                    title="Home Button"
                  >
                    <Circle size={12} className="fill-current" />
                  </button>
                  <button
                    onClick={() => {
                      if (onNotify) onNotify('Recents Pressed', 'Opened Task Switcher.', 'info');
                    }}
                    className="hover:text-white transition"
                    title="Recent Apps"
                  >
                    <Square size={12} />
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'logcat' ? (
            <div className="flex-1 flex flex-col p-3 bg-[#18181A] font-mono text-xs overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-1 text-[#BCBEC4]">
                {logcatEntries.map((log, i) => (
                  <div key={i} className="leading-relaxed hover:bg-[#2B2D30]/40 px-1 py-0.5 rounded">
                    <span className="text-[#707278] mr-2">[{i + 1}]</span>
                    <span className={log.includes('I/') ? 'text-[#3574F0]' : log.includes('Success') || log.includes('D/') ? 'text-[#3DDC84]' : 'text-[#BCBEC4]'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-3 bg-[#18181A] font-mono text-xs overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-1 text-[#BCBEC4]">
                <div className="text-[#707278]">Droz ADB Terminal Shell connected to {currentDev.name}</div>
                <div className="text-[#707278]">Android Debug Bridge version 1.0.41</div>
                {logcatEntries.filter(l => l.startsWith('$ adb')).map((log, i) => (
                  <div key={i} className="text-[#3DDC84] font-bold">
                    {log}
                  </div>
                ))}
              </div>

              {/* ADB Shell Form */}
              <form onSubmit={handleRunAdbCmd} className="flex items-center space-x-2 pt-2 border-t border-[#393B40]">
                <span className="text-[#3DDC84] font-bold">$ adb</span>
                <input
                  type="text"
                  placeholder="Type ADB command (e.g. devices, shell pm list packages, logcat, install app.apk)..."
                  value={adbCommand}
                  onChange={e => setAdbCommand(e.target.value)}
                  className="flex-1 bg-transparent text-[#DFE1E5] focus:outline-none text-xs"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
