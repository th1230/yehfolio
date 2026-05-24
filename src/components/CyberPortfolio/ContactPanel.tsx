'use client';

import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaLock,
} from 'react-icons/fa';

import { getTimestamp } from './utils';

import type { FormEvent } from 'react';

const CONTACT_LINKS = [
  {
    name: 'GITHUB',
    value: 'github.com/th1230',
    href: 'https://github.com/th1230',
    icon: FaGithub,
  },
  {
    name: 'LINKEDIN',
    value: 'linkedin.com/in/jtunn-yue-yeh',
    href: 'https://www.linkedin.com/in/jtunn-yue-yeh',
    icon: FaLinkedin,
  },
  {
    name: 'EMAIL',
    value: 'thomasyeayea@gmail.com',
    href: 'mailto:thomasyeayea@gmail.com',
    icon: FaEnvelope,
  },
] as const;

const CONNECTION_STATUS_ITEMS = [
  ['ENCRYPTION', 'AES-256'],
  ['PROTOCOL', 'TLS 1.3'],
  ['UPLINK', 'ACTIVE'],
  ['LATENCY', '< 1ms'],
] as const;

const CHANNEL_STATUS_ITEMS = [
  ['CHANNEL', 'MAILTO', true],
  ['RESUME', 'ON_REQUEST', false],
  ['STATUS', 'OPEN', true],
] as const;

export default function ContactPanel() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([
      `${getTimestamp()} [SYS] TRANSMIT_PROTOCOL STANDBY...`,
      `${getTimestamp()} [NET] SECURE_CHANNEL INITIALIZED`,
      `${getTimestamp()} [ENC] AES-256-GCM CIPHER READY`,
    ]);
  }, []);

  const submitMail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Guest'}`);
    const body = encodeURIComponent(message);

    setLogs(current => [
      ...current.slice(-4),
      `${getTimestamp()} [MAIL] OPENING_CLIENT_ROUTE...`,
      `${getTimestamp()} [SYS] RESUME_POLICY AVAILABLE_ON_REQUEST`,
    ]);

    window.location.href = `mailto:thomasyeayea@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid min-w-0 gap-6 overflow-hidden xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] xl:gap-12">
      <div className="min-w-0 space-y-5">
        <div className="grid grid-cols-4 gap-2">
          {CONNECTION_STATUS_ITEMS.map(([label, value], index) => (
            <div
              key={label}
              className="border-cyber/18 bg-cyber/[0.02] relative overflow-hidden border px-3 py-2.5 font-mono"
            >
              <div className="text-[8px] tracking-[0.2em] text-white/28">{label}</div>
              <div className="text-cyber mt-1.5 flex items-center gap-2 text-[10px] font-bold tracking-widest">
                <span
                  className="bg-cyber h-1.5 w-1.5 animate-[contact-pulse_1.8s_ease-in-out_infinite] shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                  style={{ animationDelay: `${index * 220}ms` }}
                />
                {value}
              </div>
            </div>
          ))}
        </div>

        <section className="group/secure relative overflow-hidden border border-white/10 bg-black/45 p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 animate-[contact-scan_6s_linear_infinite] bg-[linear-gradient(transparent_40%,rgba(204,255,0,0.04)_50%,transparent_60%)]" />
          <div className="border-cyber/70 pointer-events-none absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2" />
          <div className="border-cyber/70 pointer-events-none absolute right-0 bottom-0 h-12 w-12 border-r-2 border-b-2" />

          <div className="relative mb-5 flex items-center gap-4">
            <span className="border-cyber/50 bg-cyber/8 text-cyber grid h-11 w-11 animate-[contact-lock-glow_3s_ease-in-out_infinite] place-items-center border">
              <FaLock size={16} />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-widest uppercase sm:text-2xl">
                Secure_Channel
              </h3>
              <div className="text-cyber/50 mt-0.5 font-mono text-[8px] tracking-[0.3em]">
                ENCRYPTED_TRANSMISSION_READY
              </div>
            </div>
          </div>
          <p className="relative max-w-2xl text-sm leading-relaxed break-words text-white/65 sm:text-base">
            這是靜態作品集版本，表單會打包內容並開啟郵件客戶端。完整履歷含個資，不開放直接下載；若職缺或合作需要，可透過這裡索取，我會再提供適合該情境的版本。
          </p>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
            {CHANNEL_STATUS_ITEMS.map(([label, value, active]) => (
              <div
                key={label}
                className="group/stat border-cyber/20 bg-cyber/5 hover:bg-cyber/10 relative overflow-hidden border p-3 font-mono transition-colors"
              >
                <div className="text-[9px] tracking-widest text-white/35">{label}</div>
                <div className="text-cyber mt-2 flex items-center gap-2 text-xs font-bold tracking-widest">
                  {active && (
                    <span className="bg-cyber h-1.5 w-1.5 animate-[contact-pulse_1.8s_ease-in-out_infinite] rounded-full shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                  )}
                  {value}
                </div>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(204,255,0,0.08),transparent)] transition-transform duration-700 group-hover/secure:translate-x-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border border-white/10 bg-black/30 p-5 sm:p-6">
          <div className="border-cyber/40 pointer-events-none absolute top-0 right-0 h-8 w-8 border-t border-r" />
          <div className="border-cyber/40 pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l" />

          <h4 className="mb-4 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-sm">
            <span className="text-cyber">DIRECT_LINKS //</span>
            <span className="text-[9px] tracking-widest text-white/28">
              {CONTACT_LINKS.length} CHANNELS
            </span>
          </h4>
          <div className="grid gap-3">
            {CONTACT_LINKS.map(link => {
              const Icon = link.icon;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group/link hover:border-cyber/60 hover:bg-cyber/[0.04] relative grid min-w-0 cursor-pointer gap-2 overflow-hidden border border-white/10 bg-white/[0.025] p-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.06)] sm:flex sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="bg-cyber pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 shadow-[0_0_8px_rgba(204,255,0,0.6)] transition-transform duration-500 group-hover/link:scale-y-100" />
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(204,255,0,0.05),transparent)] transition-transform duration-700 group-hover/link:translate-x-full" />

                  <span className="relative flex min-w-0 items-center gap-3 font-mono text-xs text-white/45">
                    <span className="text-cyber group-hover/link:border-cyber group-hover/link:bg-cyber/10 flex h-8 w-8 items-center justify-center border border-white/10 transition-all duration-300 group-hover/link:shadow-[0_0_14px_rgba(204,255,0,0.25)]">
                      <Icon size={15} />
                    </span>
                    [{link.name}]
                  </span>
                  <span className="group-hover/link:text-cyber relative flex min-w-0 items-center gap-2 font-mono text-sm text-white transition-colors">
                    <span className="min-w-0 break-all sm:truncate">{link.value}</span>
                    <FaExternalLinkAlt
                      size={13}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <div className="min-w-0 space-y-4">
        <div className="border-cyber/25 relative flex min-h-28 flex-col justify-end overflow-hidden border bg-black p-3 font-mono text-[10px] text-white/50">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-[0.15]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(204,255,0,0.04)]" />
          <div className="bg-cyber absolute top-0 right-0 z-10 px-2 py-0.5 font-bold text-black">
            TERMINAL_LOG
          </div>
          {logs.map((log, index) => (
            <div
              key={`${log}-${index}`}
              className={`relative ${index === logs.length - 1 ? 'text-cyber' : ''}`}
            >
              {log}
              {index === logs.length - 1 && <span className="bios-caret" />}
            </div>
          ))}
        </div>

        <form
          onSubmit={submitMail}
          className="group/form border-cyber/30 relative overflow-hidden border bg-[#111] p-5 shadow-[inset_0_0_36px_rgba(204,255,0,0.035)] sm:p-6 xl:p-8"
        >
          <div className="bg-cyber absolute top-0 left-0 h-1 w-full shadow-[0_0_20px_rgba(204,255,0,0.35)]" />
          <div className="border-cyber/30 pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r" />
          <div className="border-cyber/30 pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l" />

          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-sm">
            <span className="text-cyber">&gt;_ mailto@yehfolio.sh</span>
            <span className="text-[9px] tracking-widest text-white/25">MAIL_CLIENT_READY</span>
          </div>

          <p className="mb-5 font-mono text-xs leading-relaxed text-white/45">
            MAILTO_ROUTE // 送出後會開啟你的郵件軟體，確認內容後寄給 Thomas。
          </p>

          <div className="space-y-5 font-mono text-sm">
            <label className="block">
              <span className="mb-2 block text-xs text-white/50">
                &gt; YOUR_NAME / 怎麼稱呼你 :
              </span>
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                className="focus:border-cyber w-full min-w-0 border border-white/10 bg-black/50 p-3 text-white transition-all duration-300 focus:shadow-[0_0_16px_rgba(204,255,0,0.12),inset_0_0_16px_rgba(204,255,0,0.04)]"
                placeholder="例如：王小明 / HR / Project Owner"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs text-white/50">&gt; MESSAGE / 想聊的內容 :</span>
              <textarea
                required
                value={message}
                onChange={event => setMessage(event.target.value)}
                className="focus:border-cyber min-h-44 w-full min-w-0 resize-none border border-white/10 bg-black/50 p-4 text-white transition-all duration-300 focus:shadow-[0_0_16px_rgba(204,255,0,0.12),inset_0_0_16px_rgba(204,255,0,0.04)]"
                placeholder="請簡單說明職缺、合作需求，或想了解的作品集內容..."
              />
            </label>

            <button
              type="submit"
              className="group/btn border-cyber bg-cyber/10 text-cyber hover:bg-cyber relative flex w-full items-center justify-center gap-2 overflow-hidden border py-4 font-bold tracking-[0.2em] transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_rgba(204,255,0,0.25)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-transform duration-600 group-hover/btn:translate-x-full" />
              <span className="relative">OPEN_EMAIL_CLIENT</span>
              <FaArrowRight className="relative transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
