import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, ShieldAlert, CheckCircle, ArrowRight, Lightbulb, AlertTriangle, HelpCircle, Copy, Check, Loader2 } from 'lucide-react';
import { DenialResult } from '../../types';

interface DenialCodeExplainerProps {
  onOpenAudit?: () => void;
}

export const DenialCodeExplainer: React.FC<DenialCodeExplainerProps> = ({ onOpenAudit }) => {
  const [code, setCode] = useState('CO-97');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DenialResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleCodes = ['CO-45', 'CO-97', 'PR-1', 'CO-16', 'CO-27', 'CO-197', 'CO-50'];

  const handleExplain = async (overrideCode?: string) => {
    const targetCode = (overrideCode || code).trim().toUpperCase();
    if (!targetCode) return;

    if (overrideCode) {
      setCode(overrideCode);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/explain-denial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: targetCode }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || 'Failed to explain denial code. Please check the code format.');
      }
    } catch (err: any) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Denial Code: ${result.code} - ${result.title}\nMeaning: ${result.plainExplanation}\nCauses:\n${result.commonCauses.map((c) => `- ${c}`).join('\n')}\nAction:\n${result.recommendedActions.map((a) => `- ${a}`).join('\n')}\nPro Tip: ${result.payerTip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-slate-900">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Gemini-Powered CARC / RARC Explainer</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading">
          Instant Denial Code Explainer
        </h3>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
          Enter any medical billing CARC, RARC, or remittance reason code (e.g. CO-45, CO-97, PR-1) to get plain-English root causes, clinical appeal tactics, and payer-specific resolution steps.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-slate-500 font-semibold mr-1">Popular Codes:</span>
        {sampleCodes.map((item) => (
          <button
            key={item}
            onClick={() => handleExplain(item)}
            className={`px-2.5 py-1 text-xs rounded-lg font-mono font-medium border transition cursor-pointer ${
              code === item
                ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExplain();
        }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code e.g. CO-97, PR-1, CO-16, OA-23..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl text-slate-900 placeholder-slate-400 font-mono text-sm uppercase transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Explain Denial</span>
            </>
          )}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm mb-6 flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            key={result.code}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative"
          >
            {/* Top Bar with Code & Group Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-teal-600 text-white rounded-lg font-mono font-bold text-lg shadow-xs">
                  {result.code}
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block">
                    {result.groupCode}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#0B1F3A] font-heading">
                    {result.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs flex items-center gap-1.5 transition border border-slate-200 cursor-pointer shadow-xs font-medium"
                title="Copy structured explanation"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            {/* Plain English Meaning */}
            <div className="mb-5">
              <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                Plain-English Translation for Practices
              </h5>
              <p className="text-sm text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                {result.plainExplanation}
              </p>
            </div>

            {/* Causes & Recommended Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Common Causes */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Common Root Causes
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  {result.commonCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Next Steps */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Recommended Biller Action Steps
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  {result.recommendedActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payer Tip */}
            <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-3 text-xs text-sky-900 mb-4">
              <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sky-800 font-semibold">Payer Insider Tip: </strong>
                <span>{result.payerTip}</span>
              </div>
            </div>

            {/* CTA action in result */}
            {onOpenAudit && (
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200">
                <span>Struggling with high volumes of this denial code in your practice?</span>
                <button
                  onClick={onOpenAudit}
                  className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  Request Denial Recovery Audit <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mandatory Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-teal-600 shrink-0" />
        <span>
          <strong>Disclaimer:</strong> Nexmedora AI is an informational tool for practice managers and billers. Never enter Protected Health Information (PHI). Payer policies and contract schedules govern actual claim adjudication.
        </span>
      </div>
    </div>
  );
};
