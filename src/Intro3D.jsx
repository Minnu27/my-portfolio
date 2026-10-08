import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Cinematic 3D intro, driven by a single timeline. One particle cloud morphs through
// a formation per resume chapter while the camera flies through the scene.
const PARTICLES = 7000
const CHAPTER_MS = 5600

const chapters = [
  { kicker: 'Hello, I am', title: 'Manish Chowdary Gorantla', sub: 'Data Scientist · Analytics Engineer · GenAI Builder', text: 'MANISH' },
  { kicker: 'Education', title: 'MS Data Science, Pace University', sub: 'New York · GPA 3.9 / 4.0 · Expected Dec 2026', text: 'DATA SCIENCE' },
  { kicker: 'Data engineering', title: '1M+ records through production pipelines', sub: 'Snowflake · SQL · AWS S3 · NoSQL · Cloud ETL validation', shape: 'helix' },
  { kicker: 'Machine learning', title: '+20% accuracy, −10% false positives', sub: 'Tuned models and 10+ Tableau / Power BI dashboards', shape: 'bars' },
  { kicker: 'GenAI & multi-agent systems', title: 'MAREN · Ted · MediTrace · HumanProof', sub: 'Two IEEE-bound papers on LLM behavior', shape: 'network' },
  { kicker: 'Next', title: "Let's build something together", sub: 'Scroll down to explore the work', text: "LET'S BUILD" }
]

const rand = (a, b) => a + Math.random() * (b - a)
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function textTargets(text, count) {
  const w = 900
  const h = 260
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')
  g.fillStyle = '#fff'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  let size = 120
  g.font = `900 ${size}px Inter, Arial, sans-serif`
  while (g.measureText(text).width > w - 40 && size > 40) {
    size -= 8
    g.font = `900 ${size}px Inter, Arial, sans-serif`
  }
  g.fillText(text, w / 2, h / 2)
  const data = g.getImageData(0, 0, w, h).data
  const pts = []
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push([(x - w / 2) / 56, (h / 2 - y) / 56])
    }
  }
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const p = pts[(Math.random() * pts.length) | 0] || [0, 0]
    out[i * 3] = p[0] + rand(-0.03, 0.03)
    out[i * 3 + 1] = p[1] + rand(-0.03, 0.03)
    out[i * 3 + 2] = rand(-0.6, 0.6)
  }
  return out
}

function helixTargets(count) {
  // Two data streams twisting around a pipeline axis, with a few "stage" rings.
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = Math.random()
    const x = (t - 0.5) * 18
    if (i % 9 === 0) {
      const stage = Math.floor(rand(0, 5)) * 4 - 8
      const a = rand(0, Math.PI * 2)
      out[i * 3] = stage + rand(-0.08, 0.08)
      out[i * 3 + 1] = Math.cos(a) * 2.6
      out[i * 3 + 2] = Math.sin(a) * 2.6
    } else {
      const strand = i % 2 ? 0 : Math.PI
      const a = t * Math.PI * 8 + strand
      const r = 1.5 + rand(-0.12, 0.12)
      out[i * 3] = x
      out[i * 3 + 1] = Math.cos(a) * r
      out[i * 3 + 2] = Math.sin(a) * r
    }
  }
  return out
}

function barTargets(count) {
  // A 3D bar chart rising out of a grid.
  const out = new Float32Array(count * 3)
  const cols = 7
  const rows = 5
  const heights = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) heights.push(1 + (c / cols) * 4 + Math.abs(Math.sin(r * 1.7 + c)) * 1.6)
  }
  for (let i = 0; i < count; i++) {
    const idx = (Math.random() * heights.length) | 0
    const c = idx % cols
    const r = (idx / cols) | 0
    const bw = 0.55
    out[i * 3] = (c - (cols - 1) / 2) * 1.5 + rand(-bw, bw)
    out[i * 3 + 1] = rand(0, heights[idx]) - 2.5
    out[i * 3 + 2] = (r - (rows - 1) / 2) * 1.5 + rand(-bw, bw)
  }
  return out
}

function networkTargets(count) {
  // Agents (nodes) on a sphere with points streaming along the edges between them.
  const nodes = []
  for (let i = 0; i < 26; i++) {
    const u = rand(-1, 1)
    const a = rand(0, Math.PI * 2)
    const s = Math.sqrt(1 - u * u)
    nodes.push([s * Math.cos(a) * 4, u * 4, s * Math.sin(a) * 4])
  }
  const edges = []
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => [j, (n[0] - m[0]) ** 2 + (n[1] - m[1]) ** 2 + (n[2] - m[2]) ** 2])
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1])
      .slice(0, 3)
    near.forEach(([j]) => edges.push([i, j]))
  })
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    if (i % 4 === 0) {
      const n = nodes[(Math.random() * nodes.length) | 0]
      const d = rand(0, 0.35)
      const a = rand(0, Math.PI * 2)
      const b = rand(0, Math.PI)
      out[i * 3] = n[0] + d * Math.sin(b) * Math.cos(a)
      out[i * 3 + 1] = n[1] + d * Math.cos(b)
      out[i * 3 + 2] = n[2] + d * Math.sin(b) * Math.sin(a)
    } else {
      const [p, q] = edges[(Math.random() * edges.length) | 0]
      const t = Math.random()
      out[i * 3] = nodes[p][0] + (nodes[q][0] - nodes[p][0]) * t
      out[i * 3 + 1] = nodes[p][1] + (nodes[q][1] - nodes[p][1]) * t
      out[i * 3 + 2] = nodes[p][2] + (nodes[q][2] - nodes[p][2]) * t
    }
  }
  return out
}

function buildTargets(ch) {
  if (ch.text) return textTargets(ch.text, PARTICLES)
  if (ch.shape === 'helix') return helixTargets(PARTICLES)
  if (ch.shape === 'bars') return barTargets(PARTICLES)
  return networkTargets(PARTICLES)
}

// Per-chapter camera positions (x, y, z) and the colour pair used for the formation.
const cameraKeys = [
  [0, 0, 11],
  [3, 1, 12],
  [-9, 2, 8],
  [7, 4, 10],
  [0, 3, 12],
  [0, 0, 11]
]
const palette = [
  ['#8b5cf6', '#06b6d4'],
  ['#06b6d4', '#a78bfa'],
  ['#22d3ee', '#f472b6'],
  ['#f472b6', '#8b5cf6'],
  ['#a78bfa', '#22d3ee'],
  ['#8b5cf6', '#f472b6']
]

function glowSprite() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

export default function Intro3D({ onDone }) {
  const mount = useRef(null)
  const [chapter, setChapter] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [finished, setFinished] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    const el = mount.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      doneRef.current()
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x030014, 0.035)
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 200)
    camera.position.set(...cameraKeys[0])

    // Morphing particle cloud
    const targets = chapters.map(buildTargets)
    const positions = new Float32Array(PARTICLES * 3)
    for (let i = 0; i < PARTICLES; i++) {
      positions[i * 3] = rand(-30, 30)
      positions[i * 3 + 1] = rand(-20, 20)
      positions[i * 3 + 2] = rand(-30, 10)
    }
    const colors = new Float32Array(PARTICLES * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.16,
      map: glowSprite(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    const cloud = new THREE.Points(geo, mat)
    scene.add(cloud)

    // Depth props: wireframe knot and orbital rings
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3.2, 0.03, 220, 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.25 })
    )
    knot.position.set(0, 0, -14)
    scene.add(knot)
    const rings = [0x06b6d4, 0xf472b6, 0x8b5cf6].map((color, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(9 + i * 3, 0.015, 8, 160),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 })
      )
      ring.position.z = -6 - i * 4
      ring.rotation.x = Math.PI / 2.4
      scene.add(ring)
      return ring
    })
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(Array.from({ length: 1500 }, () => rand(-50, 50))), 3)
      ),
      new THREE.PointsMaterial({ size: 0.05, color: 0x9ca3af, transparent: true, opacity: 0.5 })
    )
    scene.add(dust)

    const colA = new THREE.Color()
    const colB = new THREE.Color()
    const mouse = { x: 0, y: 0 }
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)
    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight)
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const start = performance.now()
    const total = CHAPTER_MS * chapters.length
    let raf
    let lastChapter = -1
    const look = new THREE.Vector3()
    const camTarget = new THREE.Vector3()

    let prev = start
    let spin = 0
    const frame = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000))
      prev = now
      const elapsed = Math.max(0, Math.min(now - start, total))
      const idx = Math.min(chapters.length - 1, Math.floor(elapsed / CHAPTER_MS))
      const local = (elapsed - idx * CHAPTER_MS) / CHAPTER_MS
      if (idx !== lastChapter) {
        lastChapter = idx
        setChapter(idx)
        if (idx === chapters.length - 1) setFinished(true)
      }

      // Particles chase the current formation (first 35% of a chapter is the morph)
      const t = ease(Math.min(1, local / 0.35))
      const tgt = targets[idx]
      const speed = 1 - Math.exp(-dt * (3.2 + t * 2.5))
      const pos = geo.attributes.position.array
      const col = geo.attributes.color.array
      colA.set(palette[idx][0])
      colB.set(palette[idx][1])
      const swirl = Math.sin(now * 0.001) * 0.02
      for (let i = 0; i < PARTICLES; i++) {
        const k = i * 3
        pos[k] += (tgt[k] - pos[k]) * speed + swirl * (pos[k + 2] * 0.02)
        pos[k + 1] += (tgt[k + 1] - pos[k + 1]) * speed + Math.sin(now * 0.002 + i) * 0.002
        pos[k + 2] += (tgt[k + 2] - pos[k + 2]) * speed
        const mix = (i % 100) / 100
        col[k] += (colA.r * (1 - mix) + colB.r * mix - col[k]) * 0.05
        col[k + 1] += (colA.g * (1 - mix) + colB.g * mix - col[k + 1]) * 0.05
        col[k + 2] += (colA.b * (1 - mix) + colB.b * mix - col[k + 2]) * 0.05
      }
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true

      // Camera fly-through: glide between chapter keyframes, orbit slightly, follow mouse
      const from = cameraKeys[Math.max(0, idx - 1)]
      const to = cameraKeys[idx]
      const c = ease(Math.min(1, local / 0.6))
      const orbit = now * 0.00025
      camTarget.set(
        from[0] + (to[0] - from[0]) * c + Math.sin(orbit) * 1.2 + mouse.x * 1.2,
        from[1] + (to[1] - from[1]) * c + mouse.y * -0.8,
        from[2] + (to[2] - from[2]) * c + Math.cos(orbit) * 0.8
      )
      camera.position.lerp(camTarget, 0.08)
      look.set(0, 0, 0)
      camera.lookAt(look)

      const isShape = !chapters[idx].text
      spin += ((isShape ? 0.22 : 0) * dt)
      const wobble = isShape ? 0 : Math.sin(now * 0.0004) * 0.08
      cloud.rotation.y += ((isShape ? spin : wobble) - cloud.rotation.y) * Math.min(1, dt * 3)
      knot.rotation.x = now * 0.0003
      knot.rotation.y = now * 0.0005
      rings.forEach((r, i) => (r.rotation.z = now * 0.0002 * (i % 2 ? -1 : 1)))
      dust.rotation.y = now * 0.00005

      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        o.geometry?.dispose()
        o.material?.map?.dispose()
        o.material?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  const exit = () => {
    setLeaving(true)
    setTimeout(() => doneRef.current(), 700)
  }

  useEffect(() => {
    const onKey = (e) => (e.key === 'Escape' || e.key === 'Enter') && exit()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ch = chapters[chapter]
  return (
    <div
      role="dialog"
      aria-label="3D introduction"
      className={`fixed inset-0 z-[100] bg-[#030014] transition-opacity duration-700 ${leaving ? 'opacity-0' : 'opacity-100'}`}
    >
      <div ref={mount} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,0,20,0.85)_100%)]" />

      <div className="absolute left-0 right-0 bottom-0 px-6 pb-10 md:pb-14 text-center pointer-events-none">
        <div key={chapter} className="intro-caption mx-auto max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#06b6d4] font-mono">{ch.kicker}</span>
          <h2 className="mt-2 font-display font-black text-2xl md:text-4xl text-white">{ch.title}</h2>
          <p className="mt-2 text-sm md:text-base text-gray-400">{ch.sub}</p>
        </div>
        <div className="mx-auto mt-6 flex max-w-xs gap-1.5">
          {chapters.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{
                  width: i < chapter ? '100%' : i === chapter ? '100%' : '0%',
                  transition: i === chapter ? `width ${CHAPTER_MS}ms linear` : 'none',
                  transform: i === chapter ? 'translateX(0)' : undefined
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-5 right-5 flex gap-3">
        {finished && (
          <button
            onClick={exit}
            className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/40 hover:scale-105 transition-transform"
          >
            Enter portfolio →
          </button>
        )}
        <button
          onClick={exit}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 hover:bg-white/10"
        >
          Skip intro
        </button>
      </div>
    </div>
  )
}
