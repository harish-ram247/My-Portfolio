// Animated illustrations for the secondary project cards. They show what each
// project does (scraping metrics, CRUD on crop records, an offline phone app);
// they hold no numbers or screenshots, so nothing here claims real data.
// The resting (un-animated) state of every element is its finished look, so the
// art is complete when motion is reduced or the animation is paused.

type Props = { id: string };

// Two identical periods of a metric trace; the path slides left by one period.
const TRACE =
  "M22 112L46 98L70 106L94 82L118 94L142 72L166 90L190 102L214 78L238 96L262 86L286 104" +
  "L310 112L334 98L358 106L382 82L406 94L430 72L454 90L478 102L502 78L526 96L550 86L574 104" +
  "L598 112L622 98L646 106";

function KubernetesArt() {
  const pods = [30, 140, 250];
  return (
    <svg className="art" viewBox="0 0 360 300" fill="none">
      <defs>
        <clipPath id="art-k8s-clip">
          <rect x="22" y="44" width="316" height="98" />
        </clipPath>
      </defs>

      {/* Grafana panel with a streaming trace */}
      <rect className="a-ln" x="10" y="10" width="340" height="140" rx="10" />
      <text x="24" y="31">Grafana</text>
      <text x="300" y="31" textAnchor="end" className="a-dim">
        Live
      </text>
      <circle className="a-accf a-blink" cx="314" cy="27.5" r="4" />
      <path className="a-ln a-faint" d="M22 70H338M22 100H338M22 130H338" />
      <g clipPath="url(#art-k8s-clip)">
        <path className="a-acc a-stream" d={TRACE} strokeWidth="2" />
      </g>

      {/* scrape path: pods → Prometheus → Grafana */}
      <path className="a-acc a-flow" d="M180 172V150" />
      {pods.map((x) => (
        <path key={x} className="a-acc a-flow" d={`M${x + 40} 238C${x + 40} 218 180 222 180 202`} />
      ))}
      <rect className="a-ln a-card" x="116" y="172" width="128" height="30" rx="15" />
      <text x="180" y="191" textAnchor="middle">
        Prometheus
      </text>

      {pods.map((x, i) => (
        <g key={x}>
          <rect className="a-ln a-card" x={x} y="238" width="80" height="48" rx="7" />
          <text x={x + 10} y="258">
            Pod
          </text>
          <text x={x + 10} y="275" className="a-dim">
            /metrics
          </text>
          <circle
            className="a-accf a-pulse"
            cx={x + 66}
            cy="253"
            r="4"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

function UrbanFarmArt() {
  const plants = [70, 180, 290];
  const verbs = ["Create", "Read", "Update", "Delete"];
  return (
    <svg className="art" viewBox="0 0 360 300" fill="none">
      <text x="20" y="24">
        Crop &amp; farm data
      </text>
      <text x="340" y="24" textAnchor="end" className="a-dim">
        MongoDB
      </text>

      {/* crops growing from the soil line */}
      {plants.map((x, i) => (
        <g key={x} className="a-plant" style={{ animationDelay: `${i * 0.5}s` }}>
          <path
            className="a-ln a-stem"
            pathLength={1}
            d={`M${x} 142C${x} 122 ${x + 5} 104 ${x} 80`}
            strokeWidth="2"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <path
            className="a-leaf a-fill"
            d={`M${x} 112C${x + 14} 96 ${x + 32} 100 ${x + 34} 102C${x + 26} 116 ${x + 10} 118 ${x} 112Z`}
            style={{ transformOrigin: `${x}px 112px`, animationDelay: `${i * 0.5 + 0.7}s` }}
          />
          <path
            className="a-leaf a-fill"
            d={`M${x} 96C${x - 14} 80 ${x - 32} 84 ${x - 34} 86C${x - 26} 100 ${x - 10} 102 ${x} 96Z`}
            style={{ transformOrigin: `${x}px 96px`, animationDelay: `${i * 0.5 + 0.9}s` }}
          />
          <circle
            className="a-leaf a-ln a-card"
            cx={x}
            cy="78"
            r="5"
            style={{ transformOrigin: `${x}px 78px`, animationDelay: `${i * 0.5 + 1.1}s` }}
          />
        </g>
      ))}
      <path className="a-ln" d="M14 142H346" strokeWidth="1.5" />
      <path className="a-ln a-faint" d="M30 152h8M64 158h8M104 152h8M146 158h8M196 152h8M236 158h8M276 152h8M316 158h8" />

      {/* the record table, with the active operation stepping down the rows */}
      <rect className="a-acc a-row" x="12" y="176" width="336" height="26" rx="5" />
      {verbs.map((v, i) => {
        const y = 176 + i * 28;
        return (
          <g key={v}>
            <path className="a-ln a-faint" d={`M12 ${y + 27}H348`} />
            <text x="24" y={y + 17}>
              {v}
            </text>
            <rect className="a-fill-faint" x="120" y={y + 10} width={110 - i * 12} height="6" rx="3" />
            <rect className="a-fill-faint" x="256" y={y + 10} width={56 + i * 6} height="6" rx="3" />
          </g>
        );
      })}
    </svg>
  );
}

function PocketwiseArt() {
  const bars = [26, 40, 18, 48, 32, 22, 36];
  return (
    <svg className="art" viewBox="0 0 360 300" fill="none">
      {/* data stays on the phone */}
      <ellipse className="a-ln a-card" cx="56" cy="104" rx="32" ry="9" />
      <path className="a-ln" d="M24 104V164C24 169 38 174 56 174S88 169 88 164V104" />
      <path className="a-ln a-faint" d="M24 124C24 129 38 134 56 134S88 129 88 124M24 144C24 149 38 154 56 154S88 149 88 144" />
      <text x="56" y="194" textAnchor="middle">
        SQLite
      </text>
      <text x="56" y="210" textAnchor="middle" className="a-dim">
        On device
      </text>
      <path className="a-acc a-flow" d="M90 140H120" />

      {/* phone */}
      <rect className="a-ln a-card" x="122" y="8" width="150" height="286" rx="22" strokeWidth="1.5" />
      <rect className="a-fill-faint" x="174" y="18" width="46" height="5" rx="2.5" />

      <text x="138" y="50" className="a-dim">
        Balance
      </text>
      <rect className="a-fill" x="138" y="58" width="72" height="13" rx="2" />

      {/* budget ring */}
      <circle className="a-ln a-faint" cx="236" cy="70" r="18" strokeWidth="5" />
      <circle
        className="a-acc a-ring"
        cx="236"
        cy="70"
        r="18"
        strokeWidth="5"
        pathLength={100}
        transform="rotate(-90 236 70)"
      />

      {/* 7-day spending */}
      <text x="138" y="110" className="a-dim">
        7 days
      </text>
      {bars.map((h, i) => (
        <rect
          key={i}
          className="a-accf a-bar"
          x={140 + i * 17}
          y={184 - h}
          width="10"
          height={h}
          rx="2"
          style={{ animationDelay: `${i * 0.08}s` }}
        />
      ))}
      <path className="a-ln a-faint" d="M136 184H258" />

      {/* recent activity */}
      {[204, 232, 260].map((y, i) => (
        <g key={y} className="a-tx-row" style={{ animationDelay: `${0.9 + i * 0.18}s` }}>
          <circle className="a-ln" cx="146" cy={y + 3} r="7" />
          <rect className="a-fill-faint" x="160" y={y - 1} width={58 - i * 8} height="5" rx="2.5" />
          <rect className="a-fill-faint" x="160" y={y + 7} width="30" height="4" rx="2" />
          <rect className="a-fill" x="234" y={y} width="24" height="6" rx="3" />
        </g>
      ))}

      {/* no server, no network */}
      <path
        className="a-ln"
        d="M300 150a11 11 0 0 1 4-21 15 15 0 0 1 28-3 11 11 0 0 1 9 20Z"
        strokeWidth="1.5"
      />
      <path className="a-acc" d="M296 122L346 162" strokeWidth="2" />
      <text x="320" y="186" textAnchor="middle">
        No server
      </text>
    </svg>
  );
}

export function ProjectArt({ id }: Props) {
  if (id === "k8s") return <KubernetesArt />;
  if (id === "urban-farm") return <UrbanFarmArt />;
  if (id === "pocketwise") return <PocketwiseArt />;
  return null;
}
