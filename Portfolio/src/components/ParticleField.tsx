import { useEffect, useRef } from "react";
import * as THREE from "three";

const CREAM = new THREE.Color("#f3f0e8");
const WARM = new THREE.Color("#cfc9bb");
const ACCENT = new THREE.Color("#e10600");

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Calm 3D backdrop for the hero — a sparse field of soft glowing dust motes
 * drifting in the dark, with a few large, very dim wireframe solids rotating
 * slowly at the edges. No connection web, no bright accents: it stays quiet
 * behind the content and fades away as the hero scrolls out.
 */
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const group = new THREE.Group();
    scene.add(group);

    // ---- sparse dust motes ----
    const count = isMobile ? 300 : 600;
    const base = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4); // phase, amp, speedX, speedZ
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 16;
      base[i * 3 + 1] = (Math.random() - 0.5) * 9;
      base[i * 3 + 2] = -1.5 - Math.random() * 4.5;

      // mostly cream, a few warm, and only a tiny hint of accent
      const roll = Math.random();
      const c = roll < 0.04 ? ACCENT : roll < 0.45 ? WARM : CREAM;
      const bright = 0.3 + Math.random() * 0.4;
      colors[i * 3] = c.r * bright;
      colors[i * 3 + 1] = c.g * bright;
      colors[i * 3 + 2] = c.b * bright;

      seeds[i * 4] = Math.random() * Math.PI * 2; // phase
      seeds[i * 4 + 1] = 0.08 + Math.random() * 0.25; // amplitude
      seeds[i * 4 + 2] = 0.12 + Math.random() * 0.35; // speed x
      seeds[i * 4 + 3] = 0.12 + Math.random() * 0.35; // speed z
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pointMat = new THREE.PointsMaterial({
      size: isMobile ? 0.09 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    group.add(points);

    // ---- dim wireframe solids drifting at the edges ----
    type Solid = {
      mesh: THREE.Mesh;
      baseOpacity: number;
      baseY: number;
      phase: number;
      rx: number;
      ry: number;
    };

    const makeSolid = (geometry: THREE.BufferGeometry, color: THREE.Color, opacity: number) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return { mesh: new THREE.Mesh(geometry, material), material };
    };

    // [geometry, color, opacity, x, y, z, rotSpeedX, rotSpeedY]
    const specs: Array<[THREE.BufferGeometry, THREE.Color, number, number, number, number, number, number]> = [
      [new THREE.IcosahedronGeometry(1.7, 1), CREAM, isMobile ? 0.09 : 0.12, -6.4, 1.8, -3.5, 0.06, 0.1],
      [new THREE.OctahedronGeometry(1.35, 0), CREAM, isMobile ? 0.07 : 0.09, 6.6, -1.6, -4, -0.08, 0.07],
      [new THREE.DodecahedronGeometry(1.05, 0), WARM, isMobile ? 0.06 : 0.08, -5.6, -2.6, -4.5, 0.07, 0.06],
      [new THREE.TorusGeometry(1.15, 0.42, 8, 24), ACCENT, isMobile ? 0.035 : 0.045, 5.2, 2.7, -5, 0.05, -0.06],
    ];

    const solids: Solid[] = [];
    for (const [geo, color, opacity, x, y, z, rx, ry] of specs) {
      const { mesh, material } = makeSolid(geo, color, opacity);
      mesh.position.set(x, y, z);
      group.add(mesh);
      solids.push({ mesh, baseOpacity: opacity, baseY: y, phase: Math.random() * Math.PI * 2, rx, ry });
      void material;
    }

    const clock = new THREE.Clock();
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let fieldOpacity = 1;

    const updateScroll = () => {
      const hero = mount.closest("section");
      if (!hero) return;
      const vh = window.innerHeight;
      const rect = hero.getBoundingClientRect();
      fieldOpacity = clamp01((rect.bottom - vh * 0.2) / (vh * 0.6));
    };
    const onScroll = () => updateScroll();
    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateScroll();
    };
    const resizeObserver = new ResizeObserver(onResize);

    const renderStatic = () => {
      const posAttr = pointGeo.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3] = base[i * 3];
        pos[i * 3 + 1] = base[i * 3 + 1];
        pos[i * 3 + 2] = base[i * 3 + 2];
      }
      posAttr.needsUpdate = true;
      for (const s of solids) {
        s.mesh.rotation.x = 0.4;
        s.mesh.rotation.y = 0.6;
      }
      renderer.render(scene, camera);
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // gentle drift for the dust motes
      const posAttr = pointGeo.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const ph = seeds[i * 4];
        const amp = seeds[i * 4 + 1];
        const sx = seeds[i * 4 + 2];
        const sz = seeds[i * 4 + 3];
        pos[i * 3] = base[i * 3] + Math.sin(t * sx + ph) * amp;
        pos[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * sx * 0.8 + ph * 1.4) * amp * 0.7;
        pos[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * sz + ph * 0.6) * amp * 0.5;
      }
      posAttr.needsUpdate = true;

      // slow rotation + gentle bobbing for the wireframe solids
      for (const s of solids) {
        s.mesh.rotation.x += s.rx * 0.016;
        s.mesh.rotation.y += s.ry * 0.016;
        s.mesh.position.y = s.baseY + Math.sin(t * 0.25 + s.phase) * 0.25;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = s.baseOpacity * fieldOpacity;
      }

      // subtle parallax + a whisper of auto-rotation
      const targetRotY = mouseX * 0.1 + Math.sin(t * 0.05) * 0.05;
      const targetRotX = mouseY * 0.06 + Math.cos(t * 0.04) * 0.03;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.02;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.02;

      pointMat.opacity = 0.55 * fieldOpacity;

      renderer.render(scene, camera);
    };

    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      resizeObserver.observe(mount);
      updateScroll();
      animate();
    } else {
      renderStatic();
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      pointGeo.dispose();
      pointMat.dispose();
      for (const s of solids) {
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
