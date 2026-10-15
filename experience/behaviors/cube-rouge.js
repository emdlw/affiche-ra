/** @type {import('../../core/behaviors').Behavior} */
export default {
  onFound(ctx) {
    if (!ctx.state.cube) {
      // Cube 3D : 20 % de la largeur de l'affiche (1 unité = largeur de l'affiche)
      const size = 0.2
      const geometry = new ctx.THREE.BoxGeometry(size, size, size)
      const material = new ctx.THREE.MeshStandardMaterial({
        color: 0xff3b30,
        roughness: 0.35,
        metalness: 0.15,
      })
      const cube = new ctx.THREE.Mesh(geometry, material)

      // Centre de l'affiche (0.5, 0.5), décollé de 0.15 vers le spectateur (z = 0.15)
      cube.position.copy(ctx.toLocal(0.5, 0.5, 0.15))

      ctx.poster.add(cube)
      ctx.state.cube = cube
    } else if (ctx.state.cube.parent !== ctx.poster) {
      ctx.poster.add(ctx.state.cube)
    }

    ctx.state.cube.visible = true
  },

  onLost(ctx) {
    if (ctx.state.cube) {
      ctx.state.cube.visible = false
    }
  },

  onUpdate(ctx, t, dt) {
    const cube = ctx.state.cube
    if (!cube || !cube.visible) return

    // Rotation douce et continue sur deux axes
    cube.rotation.x += dt * 0.6
    cube.rotation.y += dt * 1.0
  },
}
