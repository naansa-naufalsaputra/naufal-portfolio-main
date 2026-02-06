import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Octahedron, Environment } from '@react-three/drei';

const Geometries = () => {
    const icoRef = useRef();
    const torusRef = useRef();
    const octaRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Rotate geometries
        if (icoRef.current) {
            icoRef.current.rotation.x = t * 0.2;
            icoRef.current.rotation.y = t * 0.3;
        }
        if (torusRef.current) {
            torusRef.current.rotation.x = t * 0.1;
            torusRef.current.rotation.y = t * 0.1;
            torusRef.current.rotation.z = t * 0.05;
        }
        if (octaRef.current) {
            octaRef.current.rotation.x = -t * 0.2;
            octaRef.current.rotation.z = t * 0.1;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Icosahedron ref={icoRef} args={[1, 0]} position={[-3, 2, -2]}>
                    <meshStandardMaterial color="#06b6d4" wireframe />
                </Icosahedron>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                <Torus ref={torusRef} args={[1.5, 0.2, 16, 100]} position={[4, -1, -3]}>
                    <meshStandardMaterial color="#8b5cf6" wireframe />
                </Torus>
            </Float>

            <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
                <Octahedron ref={octaRef} args={[0.8]} position={[-2, -3, -1]}>
                    <meshStandardMaterial color="#ec4899" wireframe />
                </Octahedron>
            </Float>
        </group>
    );
}

const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Geometries />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default FloatingShapes;
