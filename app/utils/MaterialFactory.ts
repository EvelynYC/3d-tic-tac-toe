import * as THREE from "three";

export type MaterialType = "base" | "column" | "walnut" | "birch";

export interface MaterialConfig {
  base: {
    color: number;
    size: number;
  };
  column: {
    color: number;
    size: number;
  };
  walnut: {
    color: number;
    size: number;
  };
  birch: {
    color: number;
    size: number;
  };
}

export class MaterialFactory {
  private static config: MaterialConfig = {
    base: { color: 0xc4a484, size: 512 },
    column: { color: 0xc4a484, size: 256 },
    walnut: { color: 0x8d6e63, size: 256 },
    birch: { color: 0xe8d5b7, size: 256 },
  };

  // Material cache to avoid duplicate creation
  private static materialCache = new Map<string, THREE.Material>();

  static createBaseMaterial(): THREE.MeshLambertMaterial {
    return this.createWoodMaterial("base", "horizontal");
  }

  static createColumnMaterial(): THREE.MeshLambertMaterial {
    return this.createWoodMaterial("column", "vertical");
  }

  static createTokenMaterial(
    type: "walnut" | "birch"
  ): THREE.MeshPhongMaterial {
    const cacheKey = `token_${type}`;
    if (this.materialCache.has(cacheKey)) {
      return this.materialCache.get(cacheKey) as THREE.MeshPhongMaterial;
    }
    const material = this.createTokenWoodMaterial(type);
    this.materialCache.set(cacheKey, material);
    return material;
  }

  static createPreviewMaterial(
    type: "walnut" | "birch"
  ): THREE.MeshPhongMaterial {
    const cacheKey = `preview_${type}`;
    if (this.materialCache.has(cacheKey)) {
      return this.materialCache.get(cacheKey) as THREE.MeshPhongMaterial;
    }
    const material = this.createTokenWoodMaterial(type);
    material.transparent = true;
    material.opacity = 0.5;
    this.materialCache.set(cacheKey, material);
    return material;
  }

  private static createWoodMaterial(
    type: "base" | "column",
    direction: "horizontal" | "vertical"
  ): THREE.MeshLambertMaterial {
    const config = this.config[type];
    const canvas = document.createElement("canvas");
    canvas.width = config.size;
    canvas.height = config.size;
    const ctx = canvas.getContext("2d")!;

    // Base wood color
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, 0, config.size, config.size);

    if (direction === "horizontal") {
      this.addHorizontalWoodGrain(ctx, config.size);
    } else {
      this.addVerticalWoodGrain(ctx, config.size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, direction === "vertical" ? 2 : 1);

    return new THREE.MeshLambertMaterial({
      map: texture,
      color: config.color,
    });
  }

  private static createTokenWoodMaterial(
    type: "walnut" | "birch"
  ): THREE.MeshPhongMaterial {
    const config = this.config[type];
    const canvas = document.createElement("canvas");
    canvas.width = config.size;
    canvas.height = config.size;
    const ctx = canvas.getContext("2d")!;

    // Base color
    const baseColor = type === "walnut" ? "#8D6E63" : "#E8D5B7";
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, config.size, config.size);

    if (type === "walnut") {
      this.addWalnutGrain(ctx, config.size);
    } else {
      this.addBirchGrain(ctx, config.size);
    }

    this.addWoodKnots(ctx, config.size, type);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return new THREE.MeshPhongMaterial({
      map: texture,
      color: config.color,
      shininess: 30,
      specular: 0x222222,
    });
  }

  private static addHorizontalWoodGrain(
    ctx: CanvasRenderingContext2D,
    size: number
  ): void {
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * size;
      const width = Math.random() * 20 + 5;
      const alpha = Math.random() * 0.3 + 0.1;
      ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }

    for (let i = 0; i < 50; i++) {
      const y = Math.random() * size;
      const width = Math.random() * 3 + 1;
      const alpha = Math.random() * 0.2 + 0.05;
      ctx.fillStyle = `rgba(160, 82, 45, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }
  }

  private static addVerticalWoodGrain(
    ctx: CanvasRenderingContext2D,
    size: number
  ): void {
    for (let i = 0; i < 30; i++) {
      const x = (i / 30) * size;
      const width = Math.random() * 8 + 2;
      const alpha = Math.random() * 0.4 + 0.1;
      ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
      ctx.fillRect(x, 0, width, size);
    }

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * size;
      const width = Math.random() * 2 + 0.5;
      const alpha = Math.random() * 0.3 + 0.05;
      ctx.fillStyle = `rgba(160, 82, 45, ${alpha})`;
      ctx.fillRect(x, 0, width, size);
    }
  }

  private static addWalnutGrain(
    ctx: CanvasRenderingContext2D,
    size: number
  ): void {
    for (let i = 0; i < 18; i++) {
      const y = (i / 18) * size;
      const width = Math.random() * 12 + 6;
      const alpha = Math.random() * 0.3 + 0.15;
      ctx.fillStyle = `rgba(93, 64, 55, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }

    for (let i = 0; i < 45; i++) {
      const y = Math.random() * size;
      const width = Math.random() * 2 + 0.5;
      const alpha = Math.random() * 0.25 + 0.08;
      ctx.fillStyle = `rgba(76, 52, 44, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }
  }

  private static addBirchGrain(
    ctx: CanvasRenderingContext2D,
    size: number
  ): void {
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * size;
      const width = Math.random() * 12 + 6;
      const alpha = Math.random() * 0.3 + 0.1;
      ctx.fillStyle = `rgba(245, 230, 211, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }

    for (let i = 0; i < 50; i++) {
      const y = Math.random() * size;
      const width = Math.random() * 2 + 0.5;
      const alpha = Math.random() * 0.2 + 0.05;
      ctx.fillStyle = `rgba(220, 200, 180, ${alpha})`;
      ctx.fillRect(0, y, size, width);
    }
  }

  private static addWoodKnots(
    ctx: CanvasRenderingContext2D,
    size: number,
    type?: "walnut" | "birch"
  ): void {
    const knotCount = type === "walnut" ? 4 : 2;
    const baseColor =
      type === "walnut" ? "rgba(60, 40, 32" : "rgba(200, 180, 160";
    const endColor =
      type === "walnut" ? "rgba(93, 64, 55, 0)" : "rgba(245, 230, 211, 0)";

    for (let i = 0; i < knotCount; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 18 + 6;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `${baseColor}, ${Math.random() * 0.4 + 0.2})`);
      gradient.addColorStop(1, endColor);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
