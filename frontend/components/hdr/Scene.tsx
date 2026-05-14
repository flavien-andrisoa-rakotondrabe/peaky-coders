"use client";

import { OrbitControls, Environment } from "@react-three/drei";

export function HDRScene({ hdrPath }: { hdrPath: string }) {
  return (
    <>
      {/* 
        On utilise le HDR comme environnement ET comme fond (background).
        blur={0} permet de garder l'image nette.
      */}
      <Environment files={hdrPath} background blur={0} />

      {/* 
        OrbitControls fait pivoter la caméra. 
        Comme il n'y a pas d'objet, l'utilisateur a l'impression 
        de faire tourner l'environnement lui-même.
      */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        // Bloque la rotation verticale pour ne tourner que de gauche à droite
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        // Rotation automatique pour un effet cinématique
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}
