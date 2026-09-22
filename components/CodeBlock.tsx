/** Static syntax-highlighted snippet — brand palette only, no external highlighter. */
export function CodeBlock() {
  return (
    <pre className="overflow-x-auto rounded-xl border border-lab-accent/20 bg-[#081b34] p-6 font-mono text-[13px] leading-7 sm:text-sm">
      <code>
        <span className="text-lab-ice/45">1</span>{"  "}
        <span className="text-[#c586c0]">const</span> <span className="text-[#DCEAF7]">product</span>{" "}
        <span className="text-lab-ice/60">=</span> <span className="text-[#c586c0]">await</span>{" "}
        <span className="text-[#5B9BD5]">softwarelabs</span>
        <span className="text-lab-ice/60">.</span>
        <span className="text-[#dcdcaa]">build</span>
        <span className="text-lab-ice/60">({"{"}</span>
        {"\n"}
        <span className="text-lab-ice/45">2</span>{"      "}
        <span className="text-[#9cdcfe]">architecture</span>
        <span className="text-lab-ice/60">:</span> <span className="text-[#ce9178]">&quot;scalable&quot;</span>
        <span className="text-lab-ice/60">,</span>
        {"\n"}
        <span className="text-lab-ice/45">3</span>{"      "}
        <span className="text-[#9cdcfe]">performance</span>
        <span className="text-lab-ice/60">:</span> <span className="text-[#ce9178]">&quot;production&quot;</span>
        <span className="text-lab-ice/60">,</span>
        {"\n"}
        <span className="text-lab-ice/45">4</span>{"      "}
        <span className="text-[#9cdcfe]">experience</span>
        <span className="text-lab-ice/60">:</span> <span className="text-[#ce9178]">&quot;developer-first&quot;</span>
        {"\n"}
        <span className="text-lab-ice/45">5</span>{"  "}
        <span className="text-lab-ice/60">{"});"}</span>
        {"\n\n"}
        <span className="text-lab-ice/45">6</span>{"  "}
        <span className="text-[#c586c0]">return</span> <span className="text-[#dcdcaa]">ship</span>
        <span className="text-lab-ice/60">(</span>
        <span className="text-[#DCEAF7]">product</span>
        <span className="text-lab-ice/60">);</span>
      </code>
    </pre>
  );
}
