/* galaxy-bands.ts ------------------------------------------------------- */
/* 1. 型別定義 ----------------------------------------------------------- */
export interface Star {
  x: number;
  y: number;
  z?: number;
  size: number;
  opacity: number;
  color: string;
  distance: number;
}

export interface GalaxyBand {
  /* 繪製時的位移、旋轉、透明度 */
  x: number;
  y: number;
  z?: number; // 可選的 Z 軸，用於三維橢圓星系
  /* 寬高、旋轉角度 */
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  type: 'spiral' | 'bar' | 'irregular' | 'elliptical';
  particles: Star[];
}

/* 2. 通用工具 ----------------------------------------------------------- */
const TAU = Math.PI * 2;

/** 取指數盤半徑 I(R) = I0 · e^(−R/h)   :contentReference[oaicite:0]{index=0} */
function sampleExponentialRadius(Rmax: number, h: number) {
  const u = Math.random();
  return -h * Math.log(1 - u * (1 - Math.exp(-Rmax / h)));
}

/** 取 RGB Hex → Canvas 色碼 */
function hsl(h: number, s: number, l: number) {
  return `hsl(${h},${s}%,${l}%)`;
}

/* 3. 螺旋星系 ----------------------------------------------------------- */
function genSpiral({
  Rmax,
  starCount,
  arms,
  pitchDeg,
}: {
  Rmax: number;
  starCount: number;
  arms: number;
  pitchDeg: number;
}): Star[] {
  const h = 0.3 * Rmax;
  const k = 1 / Math.tan((pitchDeg * Math.PI) / 180); // θ = θ0 + k ln r  :contentReference[oaicite:1]{index=1}
  const out: Star[] = [];

  while (out.length < starCount) {
    const r = sampleExponentialRadius(Rmax, h);
    const arm = Math.floor(Math.random() * arms);
    const base = (arm * TAU) / arms;

    /* 對數螺旋角 + 微擾 */
    const θ =
      base +
      k * Math.log(r) +
      (Math.random() - 0.5) * (Math.PI / 60) + // 臂內隨機
      (r / Rmax) * (Math.PI / 2); // swirl

    /* 臂厚度高斯散佈 */
    const armW = 0.04 * r + 12;
    const off = armW * (Math.random() - 0.5);
    const x = Math.cos(θ) * r - Math.sin(θ) * off;
    const y = Math.sin(θ) * r + Math.cos(θ) * off;

    /* 色彩分區 */
    let color = '',
      size = 1,
      opacity = 1;
    if (r < 0.15 * Rmax) {
      color = hsl(45 + Math.random() * 10, 85, 60); // 黃心
      size = 1 + Math.random();
      opacity = Math.max(0.01, Math.min(1, 0.8 + Math.random() * 0.2));
    } else if (r < 0.7 * Rmax) {
      color = hsl(200 + Math.random() * 30, 80, 70); // 藍臂
      size = 0.4 + Math.random() * 0.6;
      opacity = Math.max(0.01, Math.min(1, 0.5 + Math.random() * 0.4));
    } else {
      color = hsl(5 + Math.random() * 20, 70, 70); // 紅暈
      size = 0.2 + Math.random() * 0.3;
      opacity = Math.max(0.01, Math.min(1, 0.2 + Math.random() * 0.3));
    }

    out.push({ x, y, size, opacity, color, distance: r });
  }
  return out;
}

/* 4. 棒旋星系（僅棒段） -------------------------------------------------- */
function genBarGalaxy({
  barA, // 棒的半長軸
  barB, // 棒的半短軸
  armCount = 2, // 旋臂數量，通常是2或4
  armTightness = 0.9, // 旋臂的緊密程度，越大越緊（建議0.8 - 1.2）
  armSpread = 0.04, // 旋臂的散佈程度（模擬旋臂寬度）
  diskRmax, // 盤面最大半徑，控制旋臂延伸範圍
  diskThickness = 30, // 盤面Z軸厚度
  starCount,
}: {
  barA: number;
  barB: number;
  armCount?: number;
  armTightness?: number;
  armSpread?: number;
  diskRmax: number;
  diskThickness?: number;
  starCount: number;
}): Star[] {
  const out: Star[] = [];
  const barStarsRatio = 0.35; // 棒段星星比例 (35%)
  const armStarsRatio = 0.6; // 旋臂星星比例 (60%)
  const haloStarsRatio = 0.05; // 光暈星星比例 (5%) - 模擬稀疏的球狀分佈

  const totalStarCount = starCount;
  const barStarCount = Math.floor(totalStarCount * barStarsRatio);
  const armStarCount = Math.floor(totalStarCount * armStarsRatio);
  const haloStarCount = Math.floor(totalStarCount * haloStarsRatio);

  // 1. 生成棒段核心 (更緊密且中心明亮)
  while (out.length < barStarCount) {
    // 使用橢圓分佈，但更強調中心，並沿 x 軸拉伸
    const r_dist = Math.random(); // 0-1 的隨機數
    const r = Math.sqrt(r_dist) * Math.max(barA, barB); // 讓星星更集中在中心
    const theta = Math.random() * TAU;

    let x = Math.cos(theta) * barA * (r / Math.max(barA, barB));
    let y = Math.sin(theta) * barB * (r / Math.max(barA, barB));

    // 沿著棒軸 (x 軸) 增加密度
    const densityFactor = Math.exp(-Math.abs(x) / (barA * 0.8)) * 0.8 + 0.2;
    if (Math.random() > densityFactor) continue;

    const distFromCenter = Math.hypot(x, y);
    if (distFromCenter > barA * 1.5) continue; // 超出棒段合理範圍則捨棄

    // Z 軸：棒段較厚，中心最厚
    const z =
      (Math.random() - 0.5) *
      diskThickness *
      (1 - (distFromCenter / barA) * 0.5);

    const size = 0.4 + Math.random() * 0.6; // 棒段星星可以大一點
    const opacity = Math.max(
      0,
      Math.min(1, (1 - distFromCenter / barA) * (0.6 + Math.random() * 0.4)),
    );
    out.push({
      x,
      y,
      z,
      size,
      opacity,
      color: hsl(40 + Math.random() * 10, 20, 80), // 棒段通常較黃/橙
      distance: distFromCenter,
    });
  }

  // 2. 生成旋臂 (對數螺旋線分佈)
  while (out.length < barStarCount + armStarCount) {
    const armIndex = Math.floor(Math.random() * armCount); // 選擇哪個旋臂
    const armStartAngle = (armIndex / armCount) * TAU; // 每個旋臂的起始角度

    // 半徑分佈：越往外越稀疏，但不能太快，從棒段末端開始延伸
    const r_rand = Math.random();
    // 讓旋臂從棒段末端附近開始，並向外擴展
    let r_base = barA + (diskRmax - barA) * Math.sqrt(r_rand); // 從 barA 外緣開始，隨機分佈到 Rmax

    // 計算基礎角度
    const baseTheta = Math.log(r_base / barA) * armTightness; // 讓旋臂從 barA 附近開始
    const thetaOffset = (Math.random() - 0.5) * TAU * armSpread; // 旋臂的隨機寬度
    const theta = baseTheta + armStartAngle + thetaOffset;

    let x = r_base * Math.cos(theta);
    let y = r_base * Math.sin(theta);

    // 限制在盤面最大半徑內
    const distFromCenter = Math.hypot(x, y);
    if (distFromCenter > diskRmax || distFromCenter < barA * 0.8) continue; // 不要與棒段重疊太多

    // 讓星星更傾向於在旋臂「內部」
    const keepOnArm = Math.exp(
      -Math.pow(thetaOffset / (TAU * armSpread * 0.5), 2) * 5,
    ); // 高斯分佈，中心密度高
    if (Math.random() > keepOnArm) continue;

    // Z 軸：旋臂在盤面內，比棒段薄
    const z =
      (Math.random() - 0.5) *
      diskThickness *
      0.6 *
      Math.exp(-distFromCenter / diskRmax); // 越遠越薄

    const size = 0.3 + Math.random() * 0.7; // 旋臂星星可以更亮、更大
    const opacity = Math.max(
      0.01,
      Math.min(
        1,
        (1 - distFromCenter / diskRmax) * (0.7 + Math.random() * 0.3),
      ),
    ); // 旋臂星星通常更顯眼
    out.push({
      x,
      y,
      z,
      size,
      opacity,
      color: hsl(200 + Math.random() * 30, 80, 70), // 旋臂通常有年輕的藍色星星
      distance: distFromCenter,
    });
  }

  // 3. 生成光暈 (Halo) 星星 (稀疏的球狀分佈)
  while (out.length < totalStarCount) {
    // 球形隨機分佈
    const r_halo = Math.random() * (diskRmax * 2); // 光暈範圍比盤面大
    const theta_halo = Math.random() * TAU;
    const phi_halo = Math.acos(Math.random() * 2 - 1); // 球面座標的 phi 角

    let x = r_halo * Math.sin(phi_halo) * Math.cos(theta_halo);
    let y = r_halo * Math.sin(phi_halo) * Math.sin(theta_halo);
    let z = r_halo * Math.cos(phi_halo);

    const distFromCenter = Math.hypot(x, y, z);
    if (distFromCenter > diskRmax * 2 || distFromCenter < diskRmax * 0.5)
      continue; // 光暈主要在盤面之外

    // 亮度衰減，越遠越暗，整體稀疏
    const keep = Math.exp(-distFromCenter / (diskRmax * 1.5)) * 0.5 + 0.05;
    if (Math.random() > keep) continue;

    const size = 0.1 + Math.random() * 0.2; // 光暈星星非常小且暗
    const opacity = Math.max(
      0.01,
      Math.min(
        1,
        (1 - distFromCenter / (diskRmax * 2)) * (0.1 + Math.random() * 0.1),
      ),
    );
    out.push({
      x,
      y,
      z,
      size,
      opacity,
      color: hsl(50 + Math.random() * 10, 15, 60), // 光暈通常是古老恆星，偏黃
      distance: distFromCenter,
    });
  }

  return out;
}

/* 5. 不規則 -------------------------------------------------------------- */
function genIrregular({
  Rmax,
  starCount,
}: {
  Rmax: number;
  starCount: number;
}): Star[] {
  const centers = [
    { x: 0, y: 0, w: 0.5 },
    { x: 60, y: -40, w: 0.25 },
    { x: -50, y: 80, w: 0.15 },
    { x: 80, y: 70, w: 0.1 },
  ];
  const cum = centers.map((c, i) =>
    centers.slice(0, i + 1).reduce((s, m) => s + m.w, 0),
  );
  const out: Star[] = [];

  while (out.length < starCount) {
    /* 抽中心 */
    const r = Math.random();
    const idx = cum.findIndex((c) => r <= c);
    const c = centers[idx];

    /* 極座標隨機 */
    const ang = Math.random() * TAU;
    const d = Math.random() * Rmax * (0.5 + Math.random() * 0.5);
    let x = c.x + Math.cos(ang) * d + (Math.random() - 0.5) * 40;
    let y = c.y + Math.sin(ang) * d + (Math.random() - 0.5) * 40;

    if (Math.hypot(x, y) > Rmax) continue;

    const dist = Math.hypot(x, y) / Rmax;
    const size = 0.2 + Math.random() * 0.7;
    const opacity = Math.max(
      0.01,
      Math.min(1, (1 - dist) * (0.3 + Math.random() * 0.5)),
    );

    out.push({
      x,
      y,
      size,
      opacity,
      color: hsl(30 + Math.random() * 30, 40, 80),
      distance: dist,
    });
  }
  return out;
}

/* 6. 橢圓 --------------------------------------------------------------- */
function genEllipticalGalaxy({
  a, // 半長軸
  b, // 半短軸
  starCount,
  zThickness = 60, // 橢圓星系的 Z 軸厚度
}: {
  a: number;
  b: number;
  starCount: number;
  zThickness?: number;
}): Star[] {
  const out: Star[] = [];
  while (out.length < starCount) {
    const θ = Math.random() * TAU;
    const r_sample = Math.random();
    // 使用更偏向中心的分佈，例如 Math.sqrt(Math.sqrt(Math.random()))
    // 這會讓更多星星集中在核心，模擬橢圓星系的亮度分佈
    const r_scaled = Math.sqrt(Math.sqrt(r_sample)) * Math.max(a, b);

    const x = Math.cos(θ) * a * (r_scaled / Math.max(a, b));
    const y = Math.sin(θ) * b * (r_scaled / Math.max(a, b));

    // Z 軸：橢圓星系通常是三維橢球體，Z 軸分佈類似 X/Y
    const z_scaled = Math.sqrt(Math.sqrt(Math.random())) * zThickness;
    const z = (Math.random() < 0.5 ? 1 : -1) * z_scaled; // 上下對稱分佈

    const distEllipse = Math.sqrt((x / a) ** 2 + (y / b) ** 2);
    const distFromCenter = Math.hypot(x, y, z); // 考慮 Z 軸的真實距離
    const maxDist = Math.hypot(a, b, zThickness); // 定義一個最大可能距離來歸一化

    if (distEllipse > 1.1) continue; // 稍微超出橢圓邊界給點餘裕，但主要仍集中在內部

    // 亮度衰減函數：越遠越暗，中心最亮。使用更陡峭的指數衰減
    // 這裡使用考慮 z 軸的 distFromCenter
    const keep = Math.exp(-distFromCenter / (maxDist * 0.4)) * 0.95 + 0.05; // 讓中心亮度更集中，衰減更快
    if (Math.random() > keep) continue;

    const size = 0.2 + Math.random() * 0.3; // 橢圓星系星星普遍較小且均勻
    const opacity = Math.max(
      0.01,
      Math.min(1, (1 - distFromCenter / maxDist) * (0.3 + Math.random() * 0.4)),
    ); // 整體透明度可以更低，模擬更稀疏

    out.push({
      x,
      y,
      z,
      size,
      opacity,
      color: hsl(30 + Math.random() * 15, 25, 70), // 橢圓星系通常是老恆星，偏黃紅色
      distance: distFromCenter, // 這裡的 distance 依然可以是相對距離，用於排序或渲染
    });
  }
  return out;
}

/* 7. 主出口：建立隨機銀河群 ----------------------------------------- */
export function createGalaxyBands(): GalaxyBand[] {
  const galaxies: GalaxyBand[] = [];

  // 隨機產生 10 - 13 個銀河
  const galaxyCount = Math.floor(Math.random() * 10) + 3;

  for (let i = 0; i < galaxyCount; i++) {
    // 隨機選擇銀河類型
    const types = ['bar', 'irregular', 'elliptical'] as const;
    const type = types[Math.floor(Math.random() * types.length)];

    // 隨機位置 (避免重疊，在較大範圍內分布)
    const x = (Math.random() - 0.5) * 1200;
    const y = (Math.random() - 0.5) * 1200;

    // 隨機旋轉角度
    const rotation = Math.random() * TAU;

    // 隨機透明度 (保持可見性)
    const opacity = 0.4 + Math.random() * 0.6;

    let galaxy: GalaxyBand;

    switch (type) {
      case 'bar': {
        // 隨機棒旋參數
        const a = 200 + Math.random() * 600; // 半長軸 200-500
        const b = 50 + Math.random() * 150; // 半短軸 50-200
        const starCount = 10000 + Math.random() * 4000; // 2000-6000

        galaxy = {
          x,
          y,
          width: a * 2.5,
          height: b * 4,
          rotation,
          opacity,
          type,
          particles: genBarGalaxy({
            barA: a,
            barB: b,
            starCount,
            diskRmax: a * 2.5, // 盤面最大半徑
          }),
        };
        break;
      }

      case 'irregular': {
        // 隨機不規則參數
        const Rmax = 120 + Math.random() * 280; // 120-400
        const starCount = 10000 + Math.random() * 5000; // 2500-7500
        const size = Rmax * 2.5;

        galaxy = {
          x,
          y,
          width: size,
          height: size,
          rotation,
          opacity,
          type,
          particles: genIrregular({ Rmax, starCount }),
        };
        break;
      }

      case 'elliptical': {
        // 隨機橢圓參數
        const a = 80 + Math.random() * 150; // 半長軸 80-230
        const b = 60 + Math.random() * 120; // 半短軸 60-180
        const starCount = 10000 + Math.random() * 4500; // 2000-6500

        galaxy = {
          x,
          y,
          width: a * 3,
          height: b * 3.5,
          rotation,
          opacity,
          type,
          particles: genEllipticalGalaxy({ a, b, starCount }),
        };
        break;
      }
    }

    galaxies.push(galaxy);
  }

  return galaxies;
}
