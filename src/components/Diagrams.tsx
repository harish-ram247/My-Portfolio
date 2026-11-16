// Authored schematics of how each system works. They illustrate the mechanism
// described in the resume and READMEs; they are not screenshots or measured data.
// Paths marked data-draw are drawn on scroll by CaseFiles.

type DiagramProps = { decorative?: boolean };

export function TraceDiagram({ decorative = false }: DiagramProps) {
  return (
    <svg
      className="dg"
      viewBox="0 0 760 430"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-labelledby": "trace-dg-t" })}
    >
      {!decorative && (
        <title id="trace-dg-t">
          Three versions of one documentation section laid on a timeline. A vertical marker at the
          date asked crosses only version 1, which is the one cited.
        </title>
      )}

      {/* time axis */}
      <path className="ln faint" d="M40 352H730" data-draw />
      {[40, 178, 316, 454, 592, 730].map((x) => (
        <path key={x} className="ln faint" d={`M${x} 346v12`} />
      ))}
      <text x="40" y="382" className="faint">Earlier</text>
      <text x="730" y="382" textAnchor="end" className="faint">Commit history →</text>

      {/* version bars: validity intervals */}
      <text x="40" y="74">Section, version 1</text>
      <path className="ln acc" d="M40 92H372" strokeWidth="10" style={{ strokeWidth: 10 }} data-draw />
      <text x="40" y="118" className="faint">Valid from first commit until it was edited</text>

      <text x="372" y="170" className="faint">Version 2</text>
      <path className="ln faint" d="M372 188H566" style={{ strokeWidth: 10 }} data-draw />

      <text x="566" y="254" className="faint">Version 3</text>
      <path className="ln faint" d="M566 272H730" style={{ strokeWidth: 10 }} data-draw />

      {/* as-of marker */}
      <path className="ln" d="M268 34V352" strokeDasharray="5 5" data-draw />
      <circle cx="268" cy="92" r="9" className="accf" />
      <circle cx="268" cy="92" r="16" className="ln acc" fill="none" />
      <text x="280" y="42">Date the question asks about</text>

      {/* answer line */}
      <path className="ln acc" d="M268 108C268 300 300 318 396 318" data-draw />
      <text x="406" y="314" className="big">Answer cites [S1]</text>
      <text x="406" y="334" className="faint">Every claim checked against it</text>

      {/* rejected */}
      <path className="ln" d="M459 178l14 20M473 178l-14 20" opacity="0.7" />
      <path className="ln" d="M641 262l14 20M655 262l-14 20" opacity="0.7" />
    </svg>
  );
}

export function CyberShieldDiagram() {
  return (
    <svg className="dg" viewBox="0 0 520 620" role="img" aria-labelledby="cs-dg-t" style={{ color: "#0c0b0a" }}>
      <title id="cs-dg-t">
        A complaint is filed anonymously or with a decentralized identifier, structured with AI
        assistance, verified on Polygon, and its evidence stored on IPFS.
      </title>

      <text x="24" y="40" className="big" style={{ fontSize: 26 }}>Complaint record</text>
      <path className="ln" d="M24 56H496" />

      <text x="24" y="92" opacity="0.6">Filed by</text>
      <text x="24" y="120" className="big">Anonymous</text>
      <text x="196" y="120" opacity="0.6">or</text>
      <text x="236" y="120" className="big">DID-based identity</text>
      {/* redaction bar over a name */}
      <rect x="24" y="138" width="210" height="16" fill="#0c0b0a" />
      <text x="244" y="150" opacity="0.6">Identity withheld</text>
      <path className="ln faint" d="M24 178H496" />

      <text x="24" y="214" opacity="0.6">Step 1</text>
      <text x="110" y="214" className="big">AI-assisted reporting</text>
      <path className="ln faint" d="M110 232H470M110 246H430M110 260H360" />

      <path className="ln" d="M60 270V320" data-draw />
      <path className="ln" d="M54 312l6 9 6-9" />

      <text x="24" y="356" opacity="0.6">Step 2</text>
      <text x="110" y="356" className="big">Complaint verification</text>
      <text x="110" y="378" opacity="0.6">Recorded on Polygon</text>

      <path className="ln" d="M60 392V442" data-draw />
      <path className="ln" d="M54 434l6 9 6-9" />

      <text x="24" y="478" opacity="0.6">Step 3</text>
      <text x="110" y="478" className="big">Evidence storage</text>
      <text x="110" y="500" opacity="0.6">Files held on IPFS</text>
      <path className="ln faint" d="M24 536H496" />
      <text x="24" y="570" opacity="0.6">Stack — React.js · Node.js · Express.js · MongoDB</text>

      {/* stamp */}
      <g transform="rotate(-11 392 400)" style={{ color: "#d63a22" }}>
        <path
          className="ln"
          style={{ strokeWidth: 2.4 }}
          d="M316 368C352 350 436 348 468 372c22 18 10 52-34 64-42 12-102 6-120-20-10-16-4-36 30-52"
          data-draw
        />
        <text x="392" y="408" textAnchor="middle" className="big" style={{ fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Verified
        </text>
      </g>
    </svg>
  );
}

export function IiotDiagram({ decorative = false }: DiagramProps) {
  const nodes = [70, 190, 310];
  return (
    <svg
      className="dg"
      viewBox="0 0 1180 380"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-labelledby": "iiot-dg-t" })}
    >
      {!decorative && (
        <title id="iiot-dg-t">
          Three ESP32 sensor nodes send model updates to a FedAvg aggregation step. The combined
          model updates are secured on a blockchain and results are shown on a cloud dashboard.
        </title>
      )}

      {/* ESP32 nodes with vibration traces */}
      {nodes.map((y, i) => (
        <g key={y}>
          <rect x="40" y={y - 34} width="150" height="68" className="ln" />
          <text x="54" y={y - 12}>ESP32 node {i + 1}</text>
          <path
            className="ln acc"
            d={`M54 ${y + 14}h14l6-12 8 22 8-26 8 30 7-20 6 10h14l6-8 7 12 6-8h18`}
            data-draw
          />
          <path className="ln" d={`M190 ${y}C300 ${y} 330 190 438 190`} data-draw />
        </g>
      ))}
      <text x="40" y="24" className="faint">MPU6050 sensor readings stay on each node</text>
      <text x="246" y="126" className="acc" style={{ fill: "var(--accent)" }}>Model updates</text>

      {/* FedAvg */}
      <circle cx="510" cy="190" r="72" className="ln acc" style={{ strokeWidth: 1.5 }} />
      <circle cx="510" cy="190" r="56" className="ln faint" />
      <text x="510" y="186" textAnchor="middle" className="big" style={{ fontSize: 26 }}>FedAvg</text>
      <text x="510" y="208" textAnchor="middle" className="faint">Distributed learning</text>

      <path className="ln" d="M582 190H688" data-draw />
      <path className="ln" d="M678 184l10 6-10 6" />

      {/* blockchain */}
      {[700, 778, 856].map((x, i) => (
        <g key={x}>
          <rect x={x} y="160" width="60" height="60" className="ln" />
          <path className="ln faint" d={`M${x + 12} 180h36M${x + 12} 192h28M${x + 12} 204h20`} />
          {i < 2 && <path className="ln acc" d={`M${x + 60} 190h18`} style={{ strokeWidth: 2 }} />}
        </g>
      ))}
      <text x="700" y="146">Blockchain-secured model updates</text>

      <path className="ln" d="M916 190H1002" data-draw />
      <path className="ln" d="M992 184l10 6-10 6" />

      {/* dashboard */}
      <rect x="1014" y="130" width="140" height="120" className="ln" />
      <path className="ln faint" d="M1014 154h140" />
      <path className="ln acc" d="M1028 226l22-26 18 12 24-38 20 22 28-34" data-draw />
      <text x="1014" y="276">Cloud dashboard</text>

      <text x="40" y="364" className="faint">Schematic of the system as described. Not measured data.</text>
    </svg>
  );
}
