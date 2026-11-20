import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CapsuleGeometry,
  Clock,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Euler,
  Group,
  HemisphereLight,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Quaternion,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type ExtensionLineMode = 'fiber' | 'wave' | 'helix' | 'blocks';

export interface PopupLineSceneState {
  mode: ExtensionLineMode;
  phase: 'ready' | 'testing' | 'complete';
  subPhase: 'idle' | 'download' | 'upload' | 'complete';
  theme: 'light' | 'dark';
  downloadRatio: number; // 0..1
  uploadRatio: number; // 0..1
  downloadMbps: number;
  uploadMbps: number;
}

export interface PopupLineSceneController {
  updateState: (partial: Partial<PopupLineSceneState>) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
}

const _mat4 = new Matrix4();
const _pos = new Vector3();
const _quat = new Quaternion();
const _euler = new Euler();
const _scale = new Vector3();
const _color = new Color();
const _dlColor = new Color();
const _ulColor = new Color();
const _dimColor = new Color();
const _brightColor = new Color();

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function createPopupLineScene(
  canvas: HTMLCanvasElement,
  initial?: Partial<PopupLineSceneState>
): PopupLineSceneController | null {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isSoftwareGl = detectSoftwareWebGL();
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch {
    return null;
  }

  const state: PopupLineSceneState = {
    mode: initial?.mode ?? 'fiber',
    phase: initial?.phase ?? 'ready',
    subPhase: initial?.subPhase ?? 'idle',
    theme: initial?.theme ?? 'light',
    downloadRatio: initial?.downloadRatio ?? 0,
    uploadRatio: initial?.uploadRatio ?? 0,
    downloadMbps: initial?.downloadMbps ?? 0,
    uploadMbps: initial?.uploadMbps ?? 0,
  };

  let curW = Math.max(120, canvas.clientWidth || canvas.width || 175);
  let curH = Math.max(28, canvas.clientHeight || canvas.height || 46);

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(curW, curH, false);

  const scene = new Scene();
  const isDarkInit = state.theme === 'dark';

  const pmrem = new PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  pmrem.dispose();

  const camera = new PerspectiveCamera(28, curW / curH, 0.1, 40);
  camera.position.set(0, 0.72, 6.3);
  camera.lookAt(0, 0, 0);

  const hemiLight = new HemisphereLight(
    isDarkInit ? 0x93c5fd : 0xe0f2fe,
    isDarkInit ? 0x0f172a : 0xcbd5e1,
    isDarkInit ? 1.05 : 1.25
  );
  scene.add(hemiLight);

  const keyLight = new DirectionalLight(0xfff5e4, 1.9);
  keyLight.position.set(3.5, 5.0, 5.2);
  scene.add(keyLight);

  const dlLight = new PointLight(0x38bdf8, 1.6, 8, 1.6);
  dlLight.position.set(0, 0.6, 1.5);
  scene.add(dlLight);

  const ulLight = new PointLight(0x4ade80, 1.6, 8, 1.6);
  ulLight.position.set(0, -0.6, 1.5);
  scene.add(ulLight);

  const TRACK_LEN = 8.4;
  const TRACK_HALF = TRACK_LEN / 2;
  const DL_Y = 0.52;
  const UL_Y = -0.52;

  const railMat = new MeshStandardMaterial({
    color: isDarkInit ? 0x1e293b : 0xdbe2ec,
    metalness: 0.45,
    roughness: 0.55,
  });
  const capMat = new MeshPhysicalMaterial({
    color: isDarkInit ? 0x475569 : 0xcbd5e1,
    metalness: 0.86,
    roughness: 0.24,
    clearcoat: 0.5,
  });
  const dlGlowMat = new MeshStandardMaterial({
    color: 0x0066cc,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.7,
    metalness: 0.45,
    roughness: 0.22,
  });
  const ulGlowMat = new MeshStandardMaterial({
    color: 0x16a34a,
    emissive: 0x22c55e,
    emissiveIntensity: 0.7,
    metalness: 0.45,
    roughness: 0.22,
  });
  const tubeGlassMat = new MeshPhysicalMaterial({
    color: isDarkInit ? 0xe0f2fe : 0x94a3b8,
    metalness: 0.1,
    roughness: 0.14,
    clearcoat: 0.9,
    transparent: true,
    opacity: isDarkInit ? 0.28 : 0.22,
    depthWrite: false,
  });

  // Base rails + metallic end-caps
  const baseRailGeo = new BoxGeometry(TRACK_LEN, 0.06, 0.36);
  const capGeo = new CylinderGeometry(0.22, 0.22, 0.2, 16);
  capGeo.rotateZ(Math.PI / 2);

  [DL_Y, UL_Y].forEach((laneY) => {
    const rail = new Mesh(baseRailGeo, railMat);
    rail.position.set(0, laneY - 0.19, 0);
    scene.add(rail);
    [-TRACK_HALF - 0.1, TRACK_HALF + 0.1].forEach((x) => {
      const cap = new Mesh(capGeo, capMat);
      cap.position.set(x, laneY, 0);
      scene.add(cap);
    });
  });

  // --- MODE 1: FIBER BEAM ---
  const fiberGroup = new Group();
  scene.add(fiberGroup);

  const outerTubeGeo = new CylinderGeometry(0.18, 0.18, TRACK_LEN, 14, 1, true);
  outerTubeGeo.rotateZ(Math.PI / 2);
  const coreGeo = new CylinderGeometry(0.1, 0.1, TRACK_LEN, 12);
  coreGeo.rotateZ(Math.PI / 2);
  const headGeo = new TorusGeometry(0.2, 0.035, 10, 20);
  headGeo.rotateY(Math.PI / 2);
  const photonGeo = new CapsuleGeometry(0.036, 0.32, 3, 6);
  photonGeo.rotateZ(Math.PI / 2);
  const photonMat = new MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.1,
  });

  const dlTube = new Mesh(outerTubeGeo, tubeGlassMat);
  dlTube.position.set(0, DL_Y, 0);
  const ulTube = new Mesh(outerTubeGeo, tubeGlassMat);
  ulTube.position.set(0, UL_Y, 0);

  const dlCore = new Mesh(coreGeo, dlGlowMat);
  const ulCore = new Mesh(coreGeo, ulGlowMat);
  const dlHead = new Mesh(headGeo, dlGlowMat);
  const ulHead = new Mesh(headGeo, ulGlowMat);

  const PHOTONS_PER_LANE = 16;
  const totalPhotons = PHOTONS_PER_LANE * 2;
  const photonMesh = new InstancedMesh(photonGeo, photonMat, totalPhotons);
  photonMesh.frustumCulled = false;

  const pOff = new Float32Array(totalPhotons);
  const pSpd = new Float32Array(totalPhotons);
  for (let i = 0; i < totalPhotons; i += 1) {
    pOff[i] = (i % PHOTONS_PER_LANE) / PHOTONS_PER_LANE;
    pSpd[i] = 0.75 + ((i * 29) % 100) / 100 * 0.65;
  }

  fiberGroup.add(dlTube, ulTube, dlCore, ulCore, dlHead, ulHead, photonMesh);

  // --- MODE 2: 3D WAVE ---
  const waveGroup = new Group();
  scene.add(waveGroup);

  const WAVE_PER_LANE = 28;
  const waveGeo = new BoxGeometry(0.2, 0.34, 0.28);
  const waveMat = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.52,
    clearcoat: 0.7,
  });
  const waveMesh = new InstancedMesh(waveGeo, waveMat, WAVE_PER_LANE * 2);
  waveMesh.frustumCulled = false;
  waveGroup.add(waveMesh);

  // --- MODE 3: DATA HELIX ---
  const helixGroup = new Group();
  scene.add(helixGroup);

  const HELIX_PER_LANE = 22;
  const helixGeo = new OctahedronGeometry(0.09, 1);
  const helixMat = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.18,
    metalness: 0.7,
    clearcoat: 0.85,
  });
  const helixMesh = new InstancedMesh(helixGeo, helixMat, HELIX_PER_LANE * 4);
  helixMesh.frustumCulled = false;
  helixGroup.add(helixMesh);

  // --- MODE 4: PULSE BLOCKS ---
  const blocksGroup = new Group();
  scene.add(blocksGroup);

  const BLOCKS_PER_LANE = 20;
  const blockGeo = new BoxGeometry(0.32, 0.26, 0.34);
  const blockMat = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.42,
    clearcoat: 0.85,
  });
  const blocksMesh = new InstancedMesh(blockGeo, blockMat, BLOCKS_PER_LANE * 2);
  blocksMesh.frustumCulled = false;
  blocksGroup.add(blocksMesh);

  let contextLost = false;
  const onContextLost = (e: Event) => {
    e.preventDefault();
    contextLost = true;
  };
  const onContextRestored = () => {
    contextLost = false;
  };
  canvas.addEventListener('webglcontextlost', onContextLost, false);
  canvas.addEventListener('webglcontextrestored', onContextRestored, false);

  let dlFill = 0.28;
  let ulFill = 0.18;
  let dlEnergy = 0.5;
  let ulEnergy = 0.4;
  let dlFlow = 0;
  let ulFlow = 0;
  let elapsed = 0;
  let lastTheme = state.theme;
  let disposed = false;
  let frameId = 0;
  const clock = new Clock();

  function applyTheme(dark: boolean) {
    railMat.color.setHex(dark ? 0x1e293b : 0xdbe2ec);
    capMat.color.setHex(dark ? 0x475569 : 0xcbd5e1);
    tubeGlassMat.color.setHex(dark ? 0xe0f2fe : 0x94a3b8);
    tubeGlassMat.opacity = dark ? 0.28 : 0.22;
    hemiLight.color.setHex(dark ? 0x93c5fd : 0xe0f2fe);
    hemiLight.groundColor.setHex(dark ? 0x0f172a : 0xcbd5e1);
  }

  function update(dt: number) {
    const isDark = state.theme === 'dark';
    if (state.theme !== lastTheme) {
      lastTheme = state.theme;
      applyTheme(isDark);
    }

    elapsed += dt;

    let tDl = 0.28 + Math.sin(elapsed * 1.1) * 0.06;
    let tUl = 0.2 + Math.cos(elapsed * 1.0) * 0.05;
    let tDlE = 0.55;
    let tUlE = 0.45;

    if (state.phase === 'testing') {
      const dlNorm = Math.min(1, Math.log10(Math.max(1, state.downloadMbps) + 1) / 2.8);
      const ulNorm = Math.min(1, Math.log10(Math.max(1, state.uploadMbps) + 1) / 2.8);
      tDl = Math.max(0.06, Math.min(1, state.downloadRatio));
      tUl = Math.max(0.03, Math.min(1, state.uploadRatio));
      tDlE = state.subPhase === 'download' ? 2.4 + dlNorm * 4.5 : 0.85;
      tUlE = state.subPhase === 'upload' ? 2.4 + ulNorm * 4.5 : 0.35;
    } else if (state.phase === 'complete') {
      tDl = 1.0;
      tUl = 1.0;
      tDlE = 0.9;
      tUlE = 0.9;
    }

    dlFill = MathUtils.damp(dlFill, tDl, 5.2, dt);
    ulFill = MathUtils.damp(ulFill, tUl, 5.2, dt);
    dlEnergy = MathUtils.damp(dlEnergy, tDlE, 4.0, dt);
    ulEnergy = MathUtils.damp(ulEnergy, tUlE, 4.0, dt);

    dlFlow += dt * (0.35 + dlEnergy * 0.55);
    ulFlow += dt * (0.35 + ulEnergy * 0.55);

    _dlColor.setHex(isDark ? 0x38bdf8 : 0x0066cc);
    _ulColor.setHex(isDark ? 0x4ade80 : 0x16a34a);
    _dimColor.setHex(isDark ? 0x1e293b : 0xcbd5e1);

    dlGlowMat.color.copy(_dlColor);
    dlGlowMat.emissive.copy(_dlColor);
    dlGlowMat.emissiveIntensity = (isDark ? 0.72 : 0.32) + Math.min(0.6, dlEnergy * 0.1);

    ulGlowMat.color.copy(_ulColor);
    ulGlowMat.emissive.copy(_ulColor);
    ulGlowMat.emissiveIntensity = (isDark ? 0.72 : 0.32) + Math.min(0.6, ulEnergy * 0.1);

    dlLight.color.copy(_dlColor);
    dlLight.position.x = -TRACK_HALF + dlFill * TRACK_LEN;
    ulLight.color.copy(_ulColor);
    ulLight.position.x = -TRACK_HALF + ulFill * TRACK_LEN;

    fiberGroup.visible = state.mode === 'fiber';
    waveGroup.visible = state.mode === 'wave';
    helixGroup.visible = state.mode === 'helix';
    blocksGroup.visible = state.mode === 'blocks';

    if (fiberGroup.visible) {
      const ds = Math.max(0.02, dlFill);
      dlCore.scale.set(ds, 1, 1);
      dlCore.position.set(-TRACK_HALF + (ds * TRACK_LEN) / 2, DL_Y, 0);
      dlHead.position.set(-TRACK_HALF + ds * TRACK_LEN, DL_Y, 0);
      dlHead.rotation.x += dt * (1.8 + dlEnergy);

      const us = Math.max(0.02, ulFill);
      ulCore.scale.set(us, 1, 1);
      ulCore.position.set(-TRACK_HALF + (us * TRACK_LEN) / 2, UL_Y, 0);
      ulHead.position.set(-TRACK_HALF + us * TRACK_LEN, UL_Y, 0);
      ulHead.rotation.x -= dt * (1.8 + ulEnergy);

      for (let i = 0; i < totalPhotons; i += 1) {
        const isUl = i >= PHOTONS_PER_LANE;
        const laneY = isUl ? UL_Y : DL_Y;
        const fill = isUl ? ulFill : dlFill;
        const flow = isUl ? ulFlow : dlFlow;
        const energy = isUl ? ulEnergy : dlEnergy;

        let frac = (pOff[i] + flow * 0.32 * pSpd[i]) % 1;
        if (isUl) frac = 1 - frac;

        const x = -TRACK_HALF + frac * TRACK_LEN;
        _pos.set(x, laneY + Math.sin(elapsed * 2.5 + i) * 0.055, Math.cos(elapsed * 2.5 + i) * 0.055);
        _euler.set(0, 0, 0);
        _quat.setFromEuler(_euler);
        const lit = frac <= fill + 0.06;
        _scale.set((lit ? 1.0 : 0.45) + Math.min(1.2, energy * 0.2), lit ? 1 : 0.6, lit ? 1 : 0.6);
        _mat4.compose(_pos, _quat, _scale);
        photonMesh.setMatrixAt(i, _mat4);
        photonMesh.setColorAt(
          i,
          lit ? _brightColor.copy(isUl ? _ulColor : _dlColor).lerp(_color.setHex(0xffffff), 0.25) : _dimColor
        );
      }
      photonMesh.instanceMatrix.needsUpdate = true;
      if (photonMesh.instanceColor) photonMesh.instanceColor.needsUpdate = true;
    }

    if (waveGroup.visible) {
      for (let lane = 0; lane < 2; lane += 1) {
        const isUl = lane === 1;
        const laneY = isUl ? UL_Y : DL_Y;
        const fill = isUl ? ulFill : dlFill;
        const flow = isUl ? -ulFlow : dlFlow;
        const energy = isUl ? ulEnergy : dlEnergy;
        const c = isUl ? _ulColor : _dlColor;

        for (let i = 0; i < WAVE_PER_LANE; i += 1) {
          const idx = lane * WAVE_PER_LANE + i;
          const frac = i / (WAVE_PER_LANE - 1);
          const x = -TRACK_HALF + frac * TRACK_LEN;
          const lit = frac <= fill;
          const wv = Math.sin(frac * 12 - flow * 3.8);
          const hScale = Math.max(0.3, (lit ? 0.9 : 0.36) + wv * (lit ? 0.32 + Math.min(0.45, energy * 0.09) : 0.05));
          _pos.set(x, laneY, lit ? wv * 0.08 : 0);
          _euler.set(lit ? wv * 0.35 : 0, 0, 0);
          _quat.setFromEuler(_euler);
          _scale.set(1, hScale, lit ? 1.1 : 0.72);
          _mat4.compose(_pos, _quat, _scale);
          waveMesh.setMatrixAt(idx, _mat4);
          waveMesh.setColorAt(
            idx,
            lit ? _brightColor.copy(c).lerp(_color.setHex(0xffffff), Math.max(0, wv) * 0.3) : _dimColor
          );
        }
      }
      waveMesh.instanceMatrix.needsUpdate = true;
      if (waveMesh.instanceColor) waveMesh.instanceColor.needsUpdate = true;
    }

    if (helixGroup.visible) {
      let cur = 0;
      for (let lane = 0; lane < 2; lane += 1) {
        const isUl = lane === 1;
        const laneY = isUl ? UL_Y : DL_Y;
        const fill = isUl ? ulFill : dlFill;
        const flow = isUl ? -ulFlow : dlFlow;
        const c = isUl ? _ulColor : _dlColor;

        for (let i = 0; i < HELIX_PER_LANE; i += 1) {
          const frac = i / (HELIX_PER_LANE - 1);
          const x = -TRACK_HALF + frac * TRACK_LEN;
          const lit = frac <= fill;
          const tw = frac * Math.PI * 4.5 - flow * 2.8;
          const r = lit ? 0.18 : 0.1;
          const dy = Math.sin(tw) * r;
          const dz = Math.cos(tw) * r;
          const sc = lit ? 1.05 : 0.6;

          _pos.set(x, laneY + dy, dz);
          _euler.set(tw, elapsed * 1.5, 0);
          _quat.setFromEuler(_euler);
          _scale.setScalar(sc);
          _mat4.compose(_pos, _quat, _scale);
          helixMesh.setMatrixAt(cur, _mat4);
          helixMesh.setColorAt(cur, lit ? c : _dimColor);
          cur += 1;

          _pos.set(x, laneY - dy, -dz);
          _euler.set(-tw, elapsed * 1.5, 0);
          _quat.setFromEuler(_euler);
          _scale.setScalar(sc);
          _mat4.compose(_pos, _quat, _scale);
          helixMesh.setMatrixAt(cur, _mat4);
          helixMesh.setColorAt(
            cur,
            lit ? _brightColor.copy(c).lerp(_color.setHex(0xffffff), 0.28) : _dimColor
          );
          cur += 1;
        }
      }
      helixMesh.instanceMatrix.needsUpdate = true;
      if (helixMesh.instanceColor) helixMesh.instanceColor.needsUpdate = true;
    }

    if (blocksGroup.visible) {
      for (let lane = 0; lane < 2; lane += 1) {
        const isUl = lane === 1;
        const laneY = isUl ? UL_Y : DL_Y;
        const fill = isUl ? ulFill : dlFill;
        const flow = isUl ? -ulFlow : dlFlow;
        const c = isUl ? _ulColor : _dlColor;
        const headIdx = fill * (BLOCKS_PER_LANE - 1);

        for (let i = 0; i < BLOCKS_PER_LANE; i += 1) {
          const idx = lane * BLOCKS_PER_LANE + i;
          const frac = i / (BLOCKS_PER_LANE - 1);
          const x = -TRACK_HALF + frac * TRACK_LEN;
          const lit = frac <= fill;
          const pop = lit ? Math.exp(-Math.abs(i - headIdx) * 0.55) * 0.45 : 0;
          const pulse = lit ? Math.sin(frac * 10 - flow * 3.2) * 0.16 : 0;
          const ys = (lit ? 1.1 : 0.46) + pop + Math.max(0, pulse);

          _pos.set(x, laneY + (ys - 0.8) * 0.06, lit ? 0.06 + pop * 0.12 : -0.02);
          _euler.set(lit ? -0.16 : 0, 0, 0);
          _quat.setFromEuler(_euler);
          _scale.set(1, ys, lit ? 1.1 : 0.78);
          _mat4.compose(_pos, _quat, _scale);
          blocksMesh.setMatrixAt(idx, _mat4);
          blocksMesh.setColorAt(
            idx,
            lit ? _brightColor.copy(c).lerp(_color.setHex(0xffffff), Math.min(0.45, pop * 0.85)) : _dimColor
          );
        }
      }
      blocksMesh.instanceMatrix.needsUpdate = true;
      if (blocksMesh.instanceColor) blocksMesh.instanceColor.needsUpdate = true;
    }
  }

  function afterDraw(cb: () => void) {
    if (disposed) return;
    const gl = renderer.getContext() as WebGL2RenderingContext;
    if (typeof gl.fenceSync === 'function') {
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    } else {
      frameId = window.setTimeout(cb, 100);
    }
  }

  function tick() {
    if (disposed) return;
    if (!contextLost && !document.hidden) {
      const dt = Math.min(0.05, Math.max(0.001, clock.getDelta()));
      update(dt);
      renderer.render(scene, camera);
    } else {
      clock.getDelta();
    }
    if (prefersReducedMotion) return;
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = window.requestAnimationFrame(tick);
    }
  }

  update(0.016);
  renderer.render(scene, camera);
  if (!prefersReducedMotion) {
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = window.requestAnimationFrame(tick);
    }
  }

  return {
    updateState(partial: Partial<PopupLineSceneState>) {
      if (partial.mode !== undefined) state.mode = partial.mode;
      if (partial.phase !== undefined) state.phase = partial.phase;
      if (partial.subPhase !== undefined) state.subPhase = partial.subPhase;
      if (partial.theme !== undefined) state.theme = partial.theme;
      if (partial.downloadRatio !== undefined) state.downloadRatio = partial.downloadRatio;
      if (partial.uploadRatio !== undefined) state.uploadRatio = partial.uploadRatio;
      if (partial.downloadMbps !== undefined) state.downloadMbps = partial.downloadMbps;
      if (partial.uploadMbps !== undefined) state.uploadMbps = partial.uploadMbps;
      if (prefersReducedMotion && !disposed && !contextLost) {
        update(0.016);
        renderer.render(scene, camera);
      }
    },
    resize(w: number, h: number) {
      curW = Math.max(120, Math.round(w));
      curH = Math.max(28, Math.round(h));
      camera.aspect = curW / curH;
      camera.updateProjectionMatrix();
      renderer.setSize(curW, curH, false);
    },
    dispose() {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      baseRailGeo.dispose();
      capGeo.dispose();
      outerTubeGeo.dispose();
      coreGeo.dispose();
      headGeo.dispose();
      photonGeo.dispose();
      waveGeo.dispose();
      helixGeo.dispose();
      blockGeo.dispose();
      railMat.dispose();
      capMat.dispose();
      dlGlowMat.dispose();
      ulGlowMat.dispose();
      tubeGlassMat.dispose();
      photonMat.dispose();
      waveMat.dispose();
      helixMat.dispose();
      blockMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    },
  };
}
