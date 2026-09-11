import React, { useState } from 'react';
import './CodeLab.css';

type TabKey = 'workflow' | 'proposal' | 'matrix';

interface FileTab {
    key: TabKey;
    filename: string;
    icon: string;
    content: string;
    language: string;
}

const fileTabs: FileTab[] = [
    {
        key: 'workflow',
        filename: 'gsoc_contribute.sh',
        icon: '⚡',
        language: 'bash',
        content: `#!/usr/bin/env bash
# 🚀 GSoC Innovators Club: First Pull Request Workflow
echo "Initializing open-source development pipeline..."

git clone https://github.com/gsoc-innovators/open-devkit.git
cd open-devkit && git checkout -b feat/gsoc-2026-integration

# Run tests and verify architecture
npm install && npm run verify:standards
git commit -m "feat(gsoc): implement high-performance async processor"

# Push and create milestone Pull Request
git push origin feat/gsoc-2026-integration
echo "✔ Pull request successfully submitted for peer code review!"`
    },
    {
        key: 'proposal',
        filename: 'proposal_draft.md',
        icon: '📝',
        language: 'markdown',
        content: `# Project: Next-Gen Open Distributed Tooling
**Organization**: Google Summer of Code (GSoC)
**Author**: Community Contributor • VIT Bhopal

### Abstract & Core Deliverables
- [x] Phase 1: High-throughput async scheduler architecture
- [x] Phase 2: Open-source CLI tooling with zero-latency streaming
- [x] Phase 3: Comprehensive automated benchmark test suite
- [x] Phase 4: Community documentation & interactive demos`
    },
    {
        key: 'matrix',
        filename: 'club_manifest.json',
        icon: '✨',
        language: 'json',
        content: `{
  "community": "GSoC Innovators Club",
  "university": "VIT Bhopal University",
  "activeContributors": 100,
  "flagshipEvents": 4,
  "mentorshipFocus": [
    "Google Summer of Code (GSoC)",
    "Open-Source Architecture",
    "Hackathons & Production Engineering"
  ],
  "status": "Ready to build"
}`
    }
];

export const CodeLab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('workflow');
    const [copied, setCopied] = useState(false);

    const currentFile = fileTabs.find((t) => t.key === activeTab) || fileTabs[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(currentFile.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="codelab-window">
            {/* Window Glow */}
            <div className="codelab-glow" />

            {/* Window Header / Title Bar */}
            <div className="codelab-header">
                <div className="codelab-window-controls">
                    <span className="window-dot dot-red" />
                    <span className="window-dot dot-yellow" />
                    <span className="window-dot dot-green" />
                </div>

                {/* File Tabs */}
                <div className="codelab-tabs">
                    {fileTabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`codelab-tab ${activeTab === tab.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-name">{tab.filename}</span>
                        </button>
                    ))}
                </div>

                {/* Copy Action */}
                <button className="codelab-copy-btn" onClick={handleCopy} title="Copy code">
                    {copied ? (
                        <span className="copy-copied">✓ Copied</span>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Editor Area */}
            <div className="codelab-editor">
                <pre className="codelab-code-block">
                    <code>
                        {currentFile.content.split('\n').map((line, idx) => (
                            <div key={idx} className="codelab-line">
                                <span className="line-number">{idx + 1}</span>
                                <span className="line-content">{line}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>

            {/* Window Footer Status Bar */}
            <div className="codelab-statusbar">
                <div className="status-left">
                    <span className="status-indicator" />
                    <span>branch: <strong>main</strong></span>
                    <span className="status-sep">|</span>
                    <span>UTF-8</span>
                </div>
                <div className="status-right">
                    <span>GSoC Ready</span>
                </div>
            </div>
        </div>
    );
};

export default CodeLab;
