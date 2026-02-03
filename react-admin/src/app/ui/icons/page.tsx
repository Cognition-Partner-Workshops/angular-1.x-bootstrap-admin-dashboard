"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import {
  Home,
  User,
  Settings,
  Mail,
  Bell,
  Calendar,
  Search,
  Heart,
  Star,
  Bookmark,
  Download,
  Upload,
  Share2,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Shield,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Phone,
  Video,
  Camera,
  Image,
  File,
  Folder,
  FolderOpen,
  Copy,
  Clipboard,
  Link,
  ExternalLink,
  Globe,
  Map,
  MapPin,
  Navigation,
  Compass,
  Clock,
  Timer,
  Zap,
  Battery,
  Wifi,
  Bluetooth,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Thermometer,
  Droplet,
  Wind,
  Umbrella,
  Coffee,
  Gift,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  Activity,
  Target,
  Award,
  Flag,
  Bookmark as BookmarkIcon,
  Tag,
  Hash,
  AtSign,
  Send,
  Inbox,
  Archive,
  Printer,
  Save,
  RefreshCw,
  RotateCcw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Grid,
  List,
  Layout,
  Layers,
  Box,
  Package,
  Truck,
  Plane,
  Car,
  Bike,
  Anchor,
  Rocket,
  Terminal,
  Code,
  Database,
  Server,
  HardDrive,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Film,
  Music,
  Mic,
  Scissors,
  Paperclip,
  Feather,
  PenTool,
  Highlighter,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const iconGroups = [
  {
    title: "Navigation",
    icons: [
      { icon: Home, name: "Home" },
      { icon: Menu, name: "Menu" },
      { icon: ChevronLeft, name: "ChevronLeft" },
      { icon: ChevronRight, name: "ChevronRight" },
      { icon: ChevronUp, name: "ChevronUp" },
      { icon: ChevronDown, name: "ChevronDown" },
      { icon: ArrowLeft, name: "ArrowLeft" },
      { icon: ArrowRight, name: "ArrowRight" },
      { icon: ArrowUp, name: "ArrowUp" },
      { icon: ArrowDown, name: "ArrowDown" },
      { icon: ExternalLink, name: "ExternalLink" },
      { icon: Navigation, name: "Navigation" },
    ],
  },
  {
    title: "Actions",
    icons: [
      { icon: Search, name: "Search" },
      { icon: Plus, name: "Plus" },
      { icon: Minus, name: "Minus" },
      { icon: Check, name: "Check" },
      { icon: X, name: "X" },
      { icon: Edit, name: "Edit" },
      { icon: Trash2, name: "Trash" },
      { icon: Download, name: "Download" },
      { icon: Upload, name: "Upload" },
      { icon: Share2, name: "Share" },
      { icon: Copy, name: "Copy" },
      { icon: Save, name: "Save" },
    ],
  },
  {
    title: "Communication",
    icons: [
      { icon: Mail, name: "Mail" },
      { icon: MessageCircle, name: "MessageCircle" },
      { icon: MessageSquare, name: "MessageSquare" },
      { icon: Phone, name: "Phone" },
      { icon: Video, name: "Video" },
      { icon: Send, name: "Send" },
      { icon: Inbox, name: "Inbox" },
      { icon: Bell, name: "Bell" },
      { icon: AtSign, name: "AtSign" },
      { icon: Hash, name: "Hash" },
      { icon: Link, name: "Link" },
      { icon: Globe, name: "Globe" },
    ],
  },
  {
    title: "User & Security",
    icons: [
      { icon: User, name: "User" },
      { icon: Lock, name: "Lock" },
      { icon: Unlock, name: "Unlock" },
      { icon: Key, name: "Key" },
      { icon: Shield, name: "Shield" },
      { icon: Eye, name: "Eye" },
      { icon: EyeOff, name: "EyeOff" },
      { icon: Settings, name: "Settings" },
    ],
  },
  {
    title: "Status & Alerts",
    icons: [
      { icon: AlertCircle, name: "AlertCircle" },
      { icon: AlertTriangle, name: "AlertTriangle" },
      { icon: Info, name: "Info" },
      { icon: HelpCircle, name: "HelpCircle" },
      { icon: Check, name: "Check" },
      { icon: X, name: "X" },
    ],
  },
  {
    title: "Media",
    icons: [
      { icon: Play, name: "Play" },
      { icon: Pause, name: "Pause" },
      { icon: SkipBack, name: "SkipBack" },
      { icon: SkipForward, name: "SkipForward" },
      { icon: Volume2, name: "Volume" },
      { icon: VolumeX, name: "Mute" },
      { icon: Camera, name: "Camera" },
      { icon: Image, name: "Image" },
      { icon: Film, name: "Film" },
      { icon: Music, name: "Music" },
      { icon: Mic, name: "Mic" },
      { icon: Headphones, name: "Headphones" },
    ],
  },
  {
    title: "Files & Folders",
    icons: [
      { icon: File, name: "File" },
      { icon: Folder, name: "Folder" },
      { icon: FolderOpen, name: "FolderOpen" },
      { icon: Archive, name: "Archive" },
      { icon: Clipboard, name: "Clipboard" },
      { icon: Paperclip, name: "Paperclip" },
      { icon: Printer, name: "Printer" },
      { icon: Tag, name: "Tag" },
    ],
  },
  {
    title: "Charts & Data",
    icons: [
      { icon: BarChart2, name: "BarChart" },
      { icon: PieChart, name: "PieChart" },
      { icon: Activity, name: "Activity" },
      { icon: TrendingUp, name: "TrendingUp" },
      { icon: TrendingDown, name: "TrendingDown" },
      { icon: Target, name: "Target" },
      { icon: Database, name: "Database" },
      { icon: Server, name: "Server" },
    ],
  },
  {
    title: "E-commerce",
    icons: [
      { icon: ShoppingCart, name: "ShoppingCart" },
      { icon: ShoppingBag, name: "ShoppingBag" },
      { icon: CreditCard, name: "CreditCard" },
      { icon: DollarSign, name: "DollarSign" },
      { icon: Gift, name: "Gift" },
      { icon: Package, name: "Package" },
      { icon: Truck, name: "Truck" },
      { icon: Award, name: "Award" },
    ],
  },
  {
    title: "Weather",
    icons: [
      { icon: Sun, name: "Sun" },
      { icon: Moon, name: "Moon" },
      { icon: Cloud, name: "Cloud" },
      { icon: CloudRain, name: "CloudRain" },
      { icon: Thermometer, name: "Thermometer" },
      { icon: Droplet, name: "Droplet" },
      { icon: Wind, name: "Wind" },
      { icon: Umbrella, name: "Umbrella" },
    ],
  },
  {
    title: "Devices",
    icons: [
      { icon: Monitor, name: "Monitor" },
      { icon: Smartphone, name: "Smartphone" },
      { icon: Tablet, name: "Tablet" },
      { icon: Watch, name: "Watch" },
      { icon: Cpu, name: "Cpu" },
      { icon: HardDrive, name: "HardDrive" },
      { icon: Wifi, name: "Wifi" },
      { icon: Bluetooth, name: "Bluetooth" },
    ],
  },
  {
    title: "Development",
    icons: [
      { icon: Code, name: "Code" },
      { icon: Terminal, name: "Terminal" },
      { icon: Database, name: "Database" },
      { icon: Server, name: "Server" },
      { icon: Box, name: "Box" },
      { icon: Layers, name: "Layers" },
      { icon: Grid, name: "Grid" },
      { icon: Layout, name: "Layout" },
    ],
  },
];

export default function IconsPage() {
  return (
    <div>
      <ContentTop title="Icons" />

      <div className="mb-6">
        <Panel title="About Icons">
          <p className="text-gray-600 mb-4">
            This admin dashboard uses <strong>Lucide React</strong> icons, a beautiful and consistent icon library
            with over 1000+ icons. Icons are available in various sizes and can be customized with colors.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Sizes:</span>
            <Home className="w-4 h-4 text-gray-600" />
            <Home className="w-5 h-5 text-gray-600" />
            <Home className="w-6 h-6 text-gray-600" />
            <Home className="w-8 h-8 text-gray-600" />
            <Home className="w-10 h-10 text-gray-600" />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-500">Colors:</span>
            <Home className="w-6 h-6 text-[#209e91]" />
            <Home className="w-6 h-6 text-[#2dacd1]" />
            <Home className="w-6 h-6 text-[#90b900]" />
            <Home className="w-6 h-6 text-[#dfb81c]" />
            <Home className="w-6 h-6 text-[#e85656]" />
          </div>
        </Panel>
      </div>

      <div className="space-y-6">
        {iconGroups.map((group) => (
          <Panel key={group.title} title={group.title}>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
              {group.icons.map(({ icon: Icon, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-[#209e91] transition-colors" />
                  <span className="text-xs text-gray-500 text-center truncate w-full">{name}</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
