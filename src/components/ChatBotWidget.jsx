import React, { useState } from 'react';

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 320,
            height: 420,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 600 }}>Chat Assistant</div>
          <div style={{ flex: 1, padding: 12, overflowY: 'auto', fontSize: 14, color: '#374151' }}>
            Hello! How can I help you find the right saree?
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
            <input
              style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8 }}
              placeholder="Type a message..."
            />
            <button
              style={{ padding: '8px 12px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: 999,
          padding: '12px 16px',
          boxShadow: '0 8px 20px rgba(239,68,68,0.4)',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
    </>
  );
}